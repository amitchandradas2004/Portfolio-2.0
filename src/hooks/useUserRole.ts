import { useSession } from "@/lib/auth-client";

export interface UserRoleState {
  session: ReturnType<typeof useSession>["data"];
  user: ReturnType<typeof useSession>["data"] extends { user: infer U } ? U : any;
  role: "admin" | "demo" | string;
  isAdmin: boolean;
  isReadOnly: boolean;
  isPending: boolean;
}

export function useUserRole(): UserRoleState {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const role = ((user as Record<string, any>)?.role as string) || "demo";
  const isAdmin = role === "admin";
  const isReadOnly = !isAdmin;

  return {
    session,
    user,
    role,
    isAdmin,
    isReadOnly,
    isPending,
  };
}
