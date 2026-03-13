import { useCallback } from "react";

export interface AsyncActionConfig {
  setLoading?: (loading: boolean) => void;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useAsyncAction = (config: AsyncActionConfig = {}) => {
  const { setLoading, onSuccess, onError } = config;

  const executeAsync = useCallback(
    async (
      action: () => Promise<void>,
      options?: {
        onSuccess?: () => void;
        onError?: (error: any) => void;
      },
    ) => {
      if (setLoading) setLoading(true);

      try {
        await action();
        (options?.onSuccess || onSuccess)?.();
      } catch (error) {
        const errorHandler = options?.onError || onError;
        if (errorHandler) {
          errorHandler(error);
        } else {
          console.error("Action failed:", error);
        }
      } finally {
        if (setLoading) setLoading(false);
      }
    },
    [setLoading, onSuccess, onError],
  );

  return {
    executeAsync,
  };
};
