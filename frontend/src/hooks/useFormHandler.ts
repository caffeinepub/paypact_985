import { useState, useCallback } from "react";

export interface FormHandlerConfig<T> {
  initialValues: T;
  onSubmit: (values: T) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: any) => void;
  setLoading?: (loading: boolean) => void;
}

export const useFormHandler = <T extends Record<string, any>>({
  initialValues,
  onSubmit,
  onSuccess,
  onError,
  setLoading,
}: FormHandlerConfig<T>) => {
  const [formData, setFormData] = useState<T>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (setLoading) setLoading(true);
      setIsSubmitting(true);

      try {
        await onSubmit(formData);
        setFormData(initialValues);
        onSuccess?.();
      } catch (error) {
        if (onError) {
          onError(error);
        } else {
          console.error("Form submission failed:", error);
        }
      } finally {
        if (setLoading) setLoading(false);
        setIsSubmitting(false);
      }
    },
    [formData, initialValues, onSubmit, onSuccess, onError, setLoading],
  );

  const updateField = useCallback((field: keyof T, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialValues);
  }, [initialValues]);

  return {
    formData,
    isSubmitting,
    handleSubmit,
    updateField,
    resetForm,
  };
};
