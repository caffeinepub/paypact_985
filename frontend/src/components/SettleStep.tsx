import React from "react";
import { useQueries } from "../hooks/useQueries";
import { useActor } from "../hooks/useActor";
import { ShareIcon, ArrowRightIcon } from "./Icons";

interface SettleStepProps {
  onBack: () => void;
  onInvite: () => void;
  setLoading: (loading: boolean) => void;
}

const SettleStep: React.FC<SettleStepProps> = ({ onInvite }) => {
  const { principal } = useActor();
  const { usePact, useSummary, useUsers, useSettlePact, useBills } =
    useQueries();
  const { data: pact } = usePact();
  const { data: summary = [] } = useSummary();
  const { data: users = [] } = useUsers();
  const { data: bills = [] } = useBills();

  const handleShare = async () => {
    const shareData = {
      title: "PayPact",
      text: "Click the link to join our pact:",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Share failed:", error);
      }
    } else {
      // Fall back to invite step with copy-to-clipboard
      onInvite();
    }
  };

  const isCreator =
    pact && principal && pact.createdBy.toText() === principal.toText();

  return (
    <div className="step active">
      <h3>
        <span id="settle-title">{pact?.name}</span>
      </h3>

      <div className="settle-outer-wrapper">
        <div id="settle">
          {summary.length === 0 ? (
            // No debts case
            <>
              {users.map((user) => {
                const isCurrentUser = user.id.toText() === principal?.toText();
                return (
                  <div key={user.id.toText()} className="settle-wrapper">
                    <div id="settle-header">
                      <span>
                        {user.username}
                        {isCurrentUser && <span> - you</span>} owes
                      </span>
                      <span>
                        0.00 <span>{pact?.currency}</span>
                      </span>
                    </div>
                  </div>
                );
              })}

              <p>
                Everything's been settled fairly — all paid, and no one owes
                anything. Couldn't be better!
              </p>
            </>
          ) : (
            // Settlement summary - reuse the exact structure from vanilla implementation
            summary.map((summaryItem, index) => {
              const isCurrentUser =
                summaryItem.participant.id.toText() === principal?.toText();

              return (
                <div key={index} className="summary-wrapper">
                  <div id="summary-header">
                    <span>
                      {summaryItem.participant.username}
                      {isCurrentUser && <span> - you</span>}
                    </span>
                    <span></span>
                  </div>

                  <div className="summary-list-item subheader">
                    <span>Bills paid</span>
                  </div>

                  {summaryItem.bills
                    .filter(
                      (bill) =>
                        bill.payer.id.toText() ===
                        summaryItem.participant.id.toText(),
                    )
                    .map((bill, billIndex) => (
                      <div key={billIndex} className="summary-list-item">
                        <span>{bill.name}</span>
                        <span>
                          {(
                            Number(
                              bills.find(
                                (summaryBill) => summaryBill.name === bill.name,
                              )?.amount || bill.amount,
                            ) / 100
                          ).toFixed(2)}
                          <span>{pact?.currency}</span>
                        </span>
                      </div>
                    ))}

                  <div className="summary-list-item subheader consumed">
                    <span>Consumed</span>
                  </div>

                  {summaryItem.bills.map((bill, billIndex) => (
                    <div key={billIndex} className="summary-list-item">
                      <span>{bill.name}</span>
                      <span>
                        {(Number(bill.amount) / 100).toFixed(2)}
                        <span>{pact?.currency}</span>
                      </span>
                    </div>
                  ))}

                  <div className="summary-list-item final">
                    <span>To {summaryItem.spent < 0 ? "pay" : "receive"}</span>
                    <span>
                      {summaryItem.debts
                        .reduce(
                          (sum, debt) => sum + Number(debt.amount) / 100,
                          0,
                        )
                        .toFixed(2)}
                      <span>{pact?.currency}</span>
                    </span>
                  </div>

                  {summaryItem.debts.map((debt, debtIndex) => (
                    <div key={debtIndex} className="summary-list-item debt">
                      <span
                        className={`debt-item${summaryItem.spent < 0 ? " to-pay" : ""}`}
                      >
                        <ArrowRightIcon />
                        {summaryItem.spent < 0
                          ? debt.creditor.username
                          : debt.debtor.username}
                      </span>
                      <span>
                        {(Number(debt.amount) / 100).toFixed(2)}
                        <span>{pact?.currency}</span>
                      </span>
                    </div>
                  ))}
                </div>
              );
            })
          )}
        </div>

        <button className="btn add-user" id="share-btn" onClick={handleShare}>
          <div className="btn-icon">
            <ShareIcon />
          </div>
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default SettleStep;
