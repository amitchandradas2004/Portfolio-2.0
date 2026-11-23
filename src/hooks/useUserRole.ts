import { useSession } from "@/lib/auth-client";

export type UserRole = "admin" | "demo" | (string & {});

type SessionData = ReturnType<typeof useSession>["data"];
type SessionUser = NonNullable<SessionData>["user"] & {
  role?: UserRole;
};

export interface UserRoleState {
  session: SessionData;
  user: SessionUser | undefined;
  role: UserRole;
  isAdmin: boolean;
  isReadOnly: boolean;
  isPending: boolean;
}

export function useUserRole(): UserRoleState {
  const { data: session, isPending } = useSession();
  const user = session?.user as SessionUser | undefined;
  const role: UserRole = user?.role ?? "demo";
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
