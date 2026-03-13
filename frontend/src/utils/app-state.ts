import { useState, useCallback } from "react";

export enum AppStep {
  Login = "login",
  JoinPact = "join-pact",
  CreatePact = "create-pact",
  Pact = "pact",
  AddBill = "add-bill",
  Bill = "bill",
  Invite = "invite",
  Settle = "settle",
}

export interface AppState {
  currentStep: AppStep;
  selectedBillId?: number;
  isLoading: boolean;
}

export const initialAppState: AppState = {
  currentStep: AppStep.Login,
  isLoading: false,
};

export const useAppState = (initialState: AppState = initialAppState) => {
  const [state, setState] = useState<AppState>(initialState);

  const setStep = useCallback((step: AppStep, billId?: number) => {
    setState((prev) => ({
      ...prev,
      currentStep: step,
      selectedBillId: billId,
    }));
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    setState((prev) => ({ ...prev, isLoading }));
  }, []);

  const resetState = useCallback(() => {
    setState(initialAppState);
  }, []);

  return {
    state,
    setStep,
    setLoading,
    resetState,
  };
};

export const getStepTitle = (step: AppStep): string => {
  const titles: Record<AppStep, string> = {
    [AppStep.Login]: "Login",
    [AppStep.JoinPact]: "Join Pact",
    [AppStep.CreatePact]: "Create Pact",
    [AppStep.Pact]: "Pact Dashboard",
    [AppStep.AddBill]: "Add Bill",
    [AppStep.Bill]: "Bill Details",
    [AppStep.Invite]: "Invite Members",
    [AppStep.Settle]: "Settle Pact",
  };
  return titles[step] || "PayPact";
};

export const canGoBack = (step: AppStep): boolean => {
  const noBackSteps = [
    AppStep.Login,
    AppStep.CreatePact,
    AppStep.JoinPact,
    AppStep.Pact,
  ];
  return !noBackSteps.includes(step);
};
