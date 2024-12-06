"use client";
import { useEffect, useState } from "react";
import { fireAuth } from "../firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname.startsWith("/auth") || pathname === "/") {
      // auth関係のページでは何も処理しない
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(fireAuth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (!currentUser) {
        router.push("/auth/login");
      }
    });

    return () => unsubscribe();
  }, [router, pathname]);

  return { user, loading };
};
