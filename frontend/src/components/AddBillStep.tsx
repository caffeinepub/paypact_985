import React, { useState } from "react";
import { useQueries } from "../hooks/useQueries";
import { useActor } from "../hooks/useActor";
import { useFormHandler } from "../hooks/useFormHandler";
import UserCheckboxes from "./UserCheckboxes";
import { FileIcon, DeleteIcon, BackIcon } from "./Icons";

interface AddBillStepProps {
  onBack: () => void;
  onSuccess: () => void;
  setLoading: (loading: boolean) => void;
}

const AddBillStep: React.FC<AddBillStepProps> = ({
  onBack,
  onSuccess,
  setLoading,
}) => {
  const { principal } = useActor();
  const { usePact, useAddBill } = useQueries();
  const { data: pact } = usePact();
  const addBillMutation = useAddBill();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const initialValues = {
    billName: "",
    amount: "",
    participants: [] as string[],
  };

  const { formData, handleSubmit, updateField } = useFormHandler({
    initialValues,
    onSubmit: async (values) => {
      let imageData: null | { contentType: string; data: Uint8Array } = null;
      if (selectedFile) {
        const fileContent = await selectedFile.arrayBuffer();
        imageData = {
          contentType: selectedFile.type,
          data: new Uint8Array(fileContent),
        };
      }

      await addBillMutation.mutateAsync({
        name: values.billName,
        amount: Math.round(parseFloat(values.amount) * 100),
        participants: values.participants,
        image: imageData,
      });

      // Reset file state
      setSelectedFile(null);
      const fileInput = document.getElementById("file") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    },
    onSuccess,
    setLoading,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedFile(null);
    const fileInput = document.getElementById("file") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="step active">
      <h3>
        <div className="back" onClick={onBack}>
          <BackIcon />
        </div>
        <span>Add new bill</span>
      </h3>
      <form onSubmit={handleSubmit} id="add-bill-form">
        <div>
          <label htmlFor="bill-name">Bill name</label>
          <input
            type="text"
            name="bill-name"
            id="bill-name"
            required
            minLength={3}
            maxLength={20}
            placeholder="Bill name"
            value={formData.billName}
            onChange={(e) => updateField("billName", e.target.value)}
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="amount">Amount</label>
          <div className="relative">
            <input
              type="number"
              name="amount"
              id="amount"
              required
              inputMode="decimal"
              pattern="^\d+[.,]?\d*$"
              step="any"
              placeholder="Amount"
              value={formData.amount}
              onChange={(e) => updateField("amount", e.target.value)}
              autoComplete="off"
            />
            <span id="add-bill-currency">{pact?.currency?.toUpperCase()}</span>
          </div>
        </div>
        <div className="relative">
          <label htmlFor="members">Members</label>
          <UserCheckboxes
            selectedParticipants={formData.participants}
            onChange={(participants) =>
              updateField("participants", participants)
            }
          />
        </div>
        <div id="custom-file" className={selectedFile ? "chosen" : ""}>
          <label className="btn-secondary" htmlFor="file">
            <FileIcon />
            <span>{selectedFile ? selectedFile.name : "Attach photo"}</span>
            {selectedFile && (
              <div id="remove-file" onClick={removeFile}>
                <DeleteIcon />
              </div>
            )}
          </label>
          <input
            type="file"
            id="file"
            name="file"
            className="custom-file-input"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button
          type="submit"
          className="btn"
          disabled={
            addBillMutation.isPending || formData.participants.length === 0
          }
        >
          <span>Done</span>
        </button>
      </form>
    </div>
  );
};

export default AddBillStep;
