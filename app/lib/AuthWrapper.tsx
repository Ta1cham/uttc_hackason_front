"use client";
import { useAuth } from "../hooks/useAuth";
import { usePathname } from "next/navigation";
import Loading from "./Loading"; // ローディングページを利用

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  if (pathname.startsWith("/auth") || pathname === "/") {
    // /authとデフォルトページでは何も処理しない
    return <>{children}</>;
  }

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return null; 
  }

  return <>{children}</>;
}