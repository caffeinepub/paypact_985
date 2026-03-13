import React, { useState } from "react";
import { useQueries } from "../hooks/useQueries";
import { useActor } from "../hooks/useActor";
import BillsList from "./BillsList";
import SummaryView from "./SummaryView";
import { AddIcon, PlusIcon, SettleIcon } from "./Icons";

interface PactDashboardProps {
  onAddBill: () => void;
  onViewBill: (billId: number) => void;
  onInvite: () => void;
  onSettle: () => void;
  setLoading: (loading: boolean) => void;
}

const PactDashboard: React.FC<PactDashboardProps> = ({
  onAddBill,
  onViewBill,
  onInvite,
  onSettle,
  setLoading,
}) => {
  const { principal } = useActor();
  const { usePact, useBills, useSettlePact } = useQueries();
  const { data: pact } = usePact();
  const { data: bills = [] } = useBills();
  const [activeTab, setActiveTab] = useState<"bills" | "summary">("bills");
  const settlePactMutation = useSettlePact();

  const handleSettle = async () => {
    setLoading(true);
    try {
      await settlePactMutation.mutateAsync();
      onSettle();
      // The mutation will trigger a refetch and the app will navigate appropriately
    } catch (error) {
      console.error("Failed to settle pact:", error);
    }
    setLoading(false);
  };

  const isCreator =
    pact && principal && pact.createdBy.toText() === principal.toText();

  const handleTabChange = (tab: "bills" | "summary") => {
    // Prevent clicking on already active tab
    if (tab === activeTab) return;

    setActiveTab(tab);
  };

  return (
    <div className="step active">
      <h3>
        <span id="pact-title">{pact?.name}</span>
        <AddIcon className="add-user" onClick={onInvite} />
      </h3>
      <div className="tabs">
        <div className="tabs-btns">
          <div
            className={`tabs-btn ${activeTab === "bills" ? "active" : ""}`}
            onClick={() => handleTabChange("bills")}
          >
            Bills
          </div>
          <div
            className={`tabs-btn ${activeTab === "summary" ? "active" : ""}`}
            onClick={() => handleTabChange("summary")}
          >
            Summary
          </div>
        </div>
        <div id="tabs-content">
          <div
            id="bills"
            className={`tab-content ${activeTab === "bills" ? "active" : ""}`}
          >
            <BillsList
              bills={bills}
              onViewBill={onViewBill}
              setLoading={setLoading}
            />
          </div>
          <div
            id="summary"
            className={`tab-content ${activeTab === "summary" ? "active" : ""}`}
          >
            <SummaryView />
          </div>
        </div>
        {bills.length === 0 && activeTab === "bills" && (
          <span className="bills-empty">The bills list is empty for now.</span>
        )}
        <button
          className={`btn ${activeTab === "bills" ? "" : "hidden"}`}
          id="add-new-bill-btn"
          onClick={onAddBill}
        >
          <div className="btn-icon">
            <PlusIcon />
          </div>
          <span>Add new bill</span>
        </button>
        <button
          className={`btn ${activeTab === "summary" && isCreator ? "" : "hidden"}`}
          id="settle-btn"
          onClick={handleSettle}
        >
          <div className="btn-icon">
            <SettleIcon />
          </div>
          <span>Settle</span>
        </button>
      </div>
    </div>
  );
};

export default PactDashboard;
