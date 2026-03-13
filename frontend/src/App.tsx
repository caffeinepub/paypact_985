import React, { useEffect } from "react";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { useActor } from "./hooks/useActor";
import LoginStep from "./components/LoginStep";
import CreatePactStep from "./components/CreatePactStep";
import JoinPactStep from "./components/JoinPactStep";
import PactDashboard from "./components/PactDashboard";
import AddBillStep from "./components/AddBillStep";
import BillDetailStep from "./components/BillDetailStep";
import InviteStep from "./components/InviteStep";
import SettleStep from "./components/SettleStep";
import LoadingOverlay from "./components/LoadingOverlay";
import AppHeader from "./components/shared/AppHeader";
import NotificationSystem from "./components/shared/NotificationSystem";
import ErrorBoundary from "./components/shared/ErrorBoundary";
import { useAppState, AppStep, getStepTitle } from "./utils/app-state";
import { useNotifications, formatErrorMessage } from "./utils/notifications";
import { useQueries } from "./hooks/useQueries";
import { useUserUtils } from "./hooks/useUserUtils";

const App: React.FC = () => {
  const { identity, login, isInitializing } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const { users } = useUserUtils();

  const { state, setStep, setLoading, resetState } = useAppState();
  const {
    notifications,
    showSuccess,
    showError,
    showInfo,
    dismissNotification,
  } = useNotifications();

  const isAuthenticated = !!identity;
  const principal = identity?.getPrincipal();

  const handleLogout = () => {
    resetState();
  };

  const handleError = (error: any, action: string) => {
    const message = formatErrorMessage(error);
    showError(`Failed to ${action}: ${message}`);
  };

  useEffect(() => {
    if (isAuthenticated && actor) {
      checkPactStatus();
    }
  }, [isAuthenticated, actor]);

  const checkPactStatus = async () => {
    if (!actor) return;

    setLoading(true);
    try {
      const pact = await actor.getPact();

      if (!pact.isActive) {
        setStep(AppStep.Settle);
      } else {
        const users = await actor.getAllUsers();
        const userInPact = users.some(
          (user) => user.id.toText() === principal?.toText(),
        );

        if (userInPact) {
          setStep(AppStep.Pact);
        } else {
          setStep(AppStep.JoinPact);
        }
      }
    } catch (error) {
      setStep(AppStep.CreatePact);
    }
    setLoading(false);
  };

  // Show login panel if not authenticated and not initializing
  if (!isAuthenticated && !isInitializing) {
    return <LoginStep onLogin={login} />;
  }

  // Show loading if we're still initializing auth or loading the actor
  const isLoadingActor = isAuthenticated && actorFetching && !actor;
  if (isInitializing || isLoadingActor) {
    return <LoadingOverlay isActive={true} />;
  }

  const stepConfig = {
    [AppStep.CreatePact]: {
      component: CreatePactStep,
      props: {
        onSuccess: checkPactStatus,
        setLoading,
      },
    },
    [AppStep.JoinPact]: {
      component: JoinPactStep,
      props: {
        onSuccess: checkPactStatus,
        setLoading,
      },
    },
    [AppStep.Pact]: {
      component: PactDashboard,
      props: {
        onAddBill: () => setStep(AppStep.AddBill),
        onViewBill: (billId: number) => setStep(AppStep.Bill, billId),
        onInvite: () => setStep(AppStep.Invite),
        onSettle: () => setStep(AppStep.Settle),
        setLoading,
      },
    },
    [AppStep.AddBill]: {
      component: AddBillStep,
      props: {
        onBack: () => setStep(AppStep.Pact),
        onSuccess: () => setStep(AppStep.Pact),
        setLoading,
      },
    },
    [AppStep.Bill]: {
      component: BillDetailStep,
      props: {
        billId: state.selectedBillId!,
        onBack: () => setStep(AppStep.Pact),
        setLoading,
      },
    },
    [AppStep.Invite]: {
      component: InviteStep,
      props: {
        onBack: () => setStep(AppStep.Pact),
      },
    },
    [AppStep.Settle]: {
      component: SettleStep,
      props: {
        onBack: () => setStep(AppStep.Pact),
        onInvite: () => setStep(AppStep.Invite),
        setLoading,
      },
    },
  };

  const renderCurrentStep = () => {
    const config =
      stepConfig[state.currentStep as keyof typeof stepConfig] ||
      stepConfig[AppStep.CreatePact];
    const Component = config.component as any;
    return <Component {...config.props} />;
  };

  return (
    <ErrorBoundary onError={(error) => handleError(error, "load application")}>
      <div className="app">
        {isAuthenticated && (
          <AppHeader
            title={getStepTitle(state.currentStep)}
            onLogout={handleLogout}
            users={users}
          />
        )}

        <main className="app-main">{renderCurrentStep()}</main>

        <LoadingOverlay isActive={state.isLoading} />

        <NotificationSystem
          notifications={notifications}
          onDismiss={dismissNotification}
        />
      </div>
    </ErrorBoundary>
  );
};

export default App;
