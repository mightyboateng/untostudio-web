"use client";

import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {



  // if (!isAuthenticated) {
  //   return null; // or a loading spinner
  // }

  return <div>{children}</div>;
};

export default Layout;
