import React, { useState } from "react";
import { useQueries } from "../hooks/useQueries";
import { useUserUtils } from "../hooks/useUserUtils";
import { useAsyncAction } from "../hooks/useAsyncAction";
import type { Bill } from "../backend";
import ConfirmModal from "./ConfirmModal";
import { DeleteIcon } from "./Icons";

interface BillsListProps {
  bills: Bill[];
  onViewBill: (billId: number) => void;
  setLoading: (loading: boolean) => void;
}

const BillsList: React.FC<BillsListProps> = ({
  bills,
  onViewBill,
  setLoading,
}) => {
  const { getUsernameById, isCurrentUser } = useUserUtils();
  const { useDeleteBill, usePact } = useQueries();
  const { data: pact } = usePact();
  const deleteBillMutation = useDeleteBill();
  const { executeAsync } = useAsyncAction({ setLoading });

  const [billToDelete, setBillToDelete] = useState<number | null>(null);

  const handleDeleteClick = (e: React.MouseEvent, billId: number) => {
    e.stopPropagation();
    setBillToDelete(billId);
  };

  const handleConfirmDelete = async () => {
    if (!billToDelete) return;

    await executeAsync(() => deleteBillMutation.mutateAsync(billToDelete), {
      onSuccess: () => setBillToDelete(null),
    });
  };

  const handleCancelDelete = () => {
    setBillToDelete(null);
  };

  return (
    <>
      {bills.map((bill) => {
        const creatorUsername = getUsernameById(bill.createdBy.toText());
        const isCreator = isCurrentUser(bill.createdBy.toText());

        return (
          <div
            key={bill.id}
            className="pact-user"
            onClick={() => onViewBill(Number(bill.id))}
          >
            <span className="pact-user-name">
              {bill.name}
              <span>
                Paid by {creatorUsername}
                {isCreator ? " - you" : ""}
              </span>
            </span>
            <span className="pact-user-amount">
              {(Number(bill.amount) / 100).toLocaleString()}
              <span>{pact?.currency}</span>
            </span>
            <div
              className="pact-user-delete"
              onClick={(e) => handleDeleteClick(e, Number(bill.id))}
            >
              <DeleteIcon />
            </div>
          </div>
        );
      })}

      {billToDelete && (
        <ConfirmModal
          title="Are you sure that you want to remove this bill?"
          subtitle="You cannot undo this action."
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          confirmText="Remove"
          cancelText="Cancel"
        />
      )}
    </>
  );
};

export default BillsList;
