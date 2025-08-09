"use client";
import { useEffect } from "react";
import { useAuth, UserRole } from "../context/AuthContext";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: UserRole;
  redirectTo: string;
}

export default function ProtectedRoute({ children, allowedRole, redirectTo }: ProtectedRouteProps) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user !== allowedRole) {
      router.replace(redirectTo);
    }
  }, [user, allowedRole, router, redirectTo]);

  if (user !== allowedRole) return null;
  return <>{children}</>;
}
