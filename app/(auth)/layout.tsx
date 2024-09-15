"use client";

import { auth } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          console.log(" auth User is signed in and email is verified");
          setIsAuthenticated(false);
          router.push("/pro");
        } else {
          // console.log("auth User is signed in and email is not verified");
          // setIsAuthenticated(false);
          router.push("/verify-email");
        }
      } else {
        console.log("auth User is signed out");
        setIsAuthenticated(true);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }
  return <div>{children}</div>;
};

export default layout;
