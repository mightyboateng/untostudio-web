"use client";

import { auth } from "@/utils/firebase";
import { checkIfUserIsCreatedAlready } from "@/utils/realtimeDb";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user.emailVerified) {
          const checkUser: any = await checkIfUserIsCreatedAlready(user.uid);
          if (checkUser.length > 0) {
            if (checkUser[0].displayName) {
              router.push("/pro");
            } else {
              setIsAuthenticated(true);
            }
          }
          setIsAuthenticated(true);
        } else {
          router.push("/verify-email");
        }
      } else {
        router.push("/log-in");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return <div>{children}</div>;
};

export default Layout;
