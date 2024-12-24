"use client";

import SideNavBar from "@/components/SideNavBar";
import { auth } from "@/utils/firebase";
import { checkIfUserIsCreatedAlready } from "@/utils/realtimeDb";
import {
  onAuthStateChanged,
} from "firebase/auth";

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
              setIsAuthenticated(true);
            } else {
              console.log('user is not created')
              router.push("/user-details");
              setIsAuthenticated(false);
            }
          }else{
            console.log('user is not created in realtime db')
            router.push("/user-details");
          }
        } else {
          setIsAuthenticated(false);
          router.push("/verify-email");
        }
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
    <div className="flex h-screen w-full md:flex-row flex-col overflow-hidden">
      <SideNavBar />
      <div className="flex-1 md:p-6 p-3 overflow-y-scroll">{children}</div>
    </div>
  );
};

export default Layout;
