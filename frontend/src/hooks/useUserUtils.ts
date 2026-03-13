import { useQueries } from "./useQueries";
import { useActor } from "./useActor";

export const useUserUtils = () => {
  const { principal } = useActor();
  const { useUsers } = useQueries();
  const { data: users = [] } = useUsers();

  const getUsernameById = (principalText: string): string => {
    const user = users.find((user) => user.id.toText() === principalText);
    return user?.username || "Unknown";
  };

  const getUserById = (principalText: string) => {
    return users.find((user) => user.id.toText() === principalText);
  };

  const isCurrentUser = (userPrincipal: string): boolean => {
    return userPrincipal === principal?.toText();
  };

  const getCurrentUser = () => {
    if (!principal) return null;
    return getUserById(principal.toText());
  };

  const getCurrentUsername = (): string | null => {
    const currentUser = getCurrentUser();
    return currentUser?.username || null;
  };

  return {
    users,
    principal,
    getUsernameById,
    getUserById,
    isCurrentUser,
    getCurrentUser,
    getCurrentUsername,
  };
};
