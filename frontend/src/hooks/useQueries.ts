import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Principal } from "@dfinity/principal";
import { useActor } from "./useActor";
import type { Bill, Pact, User, UserSummary, ImageData } from "../backend";

export function useQueries() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  // Pact queries
  const usePact = () => {
    return useQuery({
      queryKey: ["pact"],
      queryFn: async () => {
        if (!actor) throw new Error("Actor not available");
        return await actor.getPact();
      },
      enabled: !!actor,
      retry: false,
    });
  };

  // Users queries
  const useUsers = () => {
    return useQuery({
      queryKey: ["users"],
      queryFn: async () => {
        if (!actor) throw new Error("Actor not available");
        return await actor.getAllUsers();
      },
      enabled: !!actor,
    });
  };

  // Bills queries
  const useBills = () => {
    return useQuery({
      queryKey: ["bills"],
      queryFn: async () => {
        if (!actor) throw new Error("Actor not available");
        return await actor.getAllBills();
      },
      enabled: !!actor,
    });
  };

  const useBillById = (billId: number) => {
    return useQuery({
      queryKey: ["bill", billId],
      queryFn: async () => {
        if (!actor) throw new Error("Actor not available");
        return await actor.getBillById(BigInt(billId));
      },
      enabled: !!actor && !!billId,
    });
  };

  const useBillImage = (billId: number, hasImage: boolean) => {
    return useQuery({
      queryKey: ["billImage", billId],
      queryFn: async () => {
        if (!actor) throw new Error("Actor not available");
        return await actor.getImageByBillId(BigInt(billId));
      },
      enabled: !!actor && !!billId && hasImage,
    });
  };

  // Summary queries
  const useSummary = () => {
    return useQuery({
      queryKey: ["summary"],
      queryFn: async () => {
        if (!actor) throw new Error("Actor not available");
        return await actor.summary();
      },
      enabled: !!actor,
    });
  };

  // Mutations
  const useCreatePact = () => {
    return useMutation({
      mutationFn: async ({
        name,
        currency,
        username,
      }: {
        name: string;
        currency: string;
        username: string;
      }) => {
        if (!actor) throw new Error("Actor not available");
        return await actor.initPact(name, currency, username);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["pact"] });
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    });
  };

  const useJoinPact = () => {
    return useMutation({
      mutationFn: async (username: string) => {
        if (!actor) throw new Error("Actor not available");
        return await actor.addUserSelf(username);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        queryClient.invalidateQueries({ queryKey: ["pact"] });
      },
    });
  };

  const useAddBill = () => {
    return useMutation({
      mutationFn: async ({
        name,
        amount,
        participants,
        image,
      }: {
        name: string;
        amount: number;
        participants: string[];
        image?: { contentType: string; data: Uint8Array } | null;
      }) => {
        if (!actor) throw new Error("Actor not available");

        const principals = participants.map((p) => {
          try {
            return Principal.fromText(p);
          } catch (error) {
            throw new Error(`Invalid principal: ${p}`);
          }
        });

        return await actor.addBill(
          name,
          BigInt(amount),
          principals,
          image || null,
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["bills"] });
        queryClient.invalidateQueries({ queryKey: ["summary"] });
      },
    });
  };

  const useDeleteBill = () => {
    return useMutation({
      mutationFn: async (billId: number) => {
        if (!actor) throw new Error("Actor not available");
        return await actor.removeBillById(BigInt(billId));
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["bills"] });
        queryClient.invalidateQueries({ queryKey: ["summary"] });
      },
    });
  };

  const useSettlePact = () => {
    return useMutation({
      mutationFn: async () => {
        if (!actor) throw new Error("Actor not available");
        return await actor.settle();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["pact"] });
        queryClient.invalidateQueries({ queryKey: ["summary"] });
      },
    });
  };

  return {
    // Queries
    usePact,
    useUsers,
    useBills,
    useBillById,
    useBillImage,
    useSummary,

    // Mutations
    useCreatePact,
    useJoinPact,
    useAddBill,
    useDeleteBill,
    useSettlePact,
  };
}
