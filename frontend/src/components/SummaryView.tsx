import React from "react";
import { useQueries } from "../hooks/useQueries";
import { useActor } from "../hooks/useActor";

const SummaryView: React.FC = () => {
  const { principal } = useActor();
  const { useSummary, usePact, useBills } = useQueries();
  const { data: summary = [] } = useSummary();
  const { data: pact } = usePact();
  const { data: bills = [] } = useBills();

  return (
    <>
      {summary.map((summaryItem, index) => {
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
                  .reduce((sum, debt) => sum + Number(debt.amount) / 100, 0)
                  .toFixed(2)}
                <span>{pact?.currency}</span>
              </span>
            </div>

            {summaryItem.debts.map((debt, debtIndex) => (
              <div key={debtIndex} className="summary-list-item debt">
                <span
                  className={`debt-item${summaryItem.spent < 0 ? " to-pay" : ""}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g opacity="0.8">
                      <path
                        d="M5.00195 11.998L17.502 12.002"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13 17L18 12L13 7"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </g>
                  </svg>
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
      })}
    </>
  );
};

export default SummaryView;
