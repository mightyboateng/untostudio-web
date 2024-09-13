"use client";

import SideNavBar from "@/components/SideNavBar";
import { auth } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in");
        setIsAuthenticated(true);
      } else {
        console.log("User is signed out");
        setIsAuthenticated(false);
        router.push("/log-in");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex h-screen w-full">
      <SideNavBar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Layout;
