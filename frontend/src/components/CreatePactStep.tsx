import React from "react";
import { useQueries } from "../hooks/useQueries";
import { useFormHandler } from "../hooks/useFormHandler";
import CurrencySelector from "./CurrencySelector";

interface CreatePactStepProps {
  onSuccess: () => void;
  setLoading: (loading: boolean) => void;
}

const CreatePactStep: React.FC<CreatePactStepProps> = ({
  onSuccess,
  setLoading,
}) => {
  const { useCreatePact } = useQueries();
  const createPactMutation = useCreatePact();

  const initialValues = {
    pactName: "",
    name: "",
    currency: "",
  };

  const { formData, handleSubmit, updateField } = useFormHandler({
    initialValues,
    onSubmit: async (values) => {
      await createPactMutation.mutateAsync({
        name: values.pactName,
        currency: values.currency,
        username: values.name,
      });
    },
    onSuccess,
    setLoading,
  });

  return (
    <div className="step active">
      <h3>
        <span>Create a pact</span>
      </h3>
      <form onSubmit={handleSubmit} id="create-form">
        <div>
          <label htmlFor="pact-name">Pact name</label>
          <input
            type="text"
            id="pact-name"
            name="pact-name"
            required
            minLength={3}
            maxLength={20}
            placeholder="Pact name"
            value={formData.pactName}
            onChange={(e) => updateField("pactName", e.target.value)}
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            minLength={3}
            maxLength={20}
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="relative">
          <label htmlFor="currency">Currency</label>
          <CurrencySelector
            value={formData.currency}
            onChange={(value) => updateField("currency", value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn"
          disabled={createPactMutation.isPending}
        >
          <span>Create</span>
        </button>
      </form>
    </div>
  );
};

export default CreatePactStep;
