import React from "react";
import { useQueries } from "../hooks/useQueries";
import { useFormHandler } from "../hooks/useFormHandler";

interface JoinPactStepProps {
  onSuccess: () => void;
  setLoading: (loading: boolean) => void;
}

const JoinPactStep: React.FC<JoinPactStepProps> = ({
  onSuccess,
  setLoading,
}) => {
  const { usePact, useJoinPact } = useQueries();
  const { data: pact } = usePact();
  const joinPactMutation = useJoinPact();

  const initialValues = { name: "" };

  const { formData, handleSubmit, updateField } = useFormHandler({
    initialValues,
    onSubmit: async (values) => {
      await joinPactMutation.mutateAsync(values.name);
    },
    onSuccess,
    setLoading,
  });

  return (
    <div className="step active">
      <h3>
        <span>Join this pact</span>
      </h3>
      <form onSubmit={handleSubmit} id="join-form">
        <div className="join-title">
          You were invited to <span>{pact?.name}</span>. Please enter your name
          if you would like to join.
        </div>
        <div>
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            minLength={3}
            maxLength={20}
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          className="btn"
          disabled={joinPactMutation.isPending}
        >
          <span>Join</span>
        </button>
      </form>
    </div>
  );
};

export default JoinPactStep;
