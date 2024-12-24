"use client";

import { boilerAuth } from "@/boiler-plate-controllers/auth-controls";
import React from "react";
import { Button } from "../ui/button";
import { Google } from "@mui/icons-material";
const GoogleButton = () => {

  const googleHandler = () => {

  };
  return (
    boilerAuth.google && (
      <Button
        variant="outline"
        onClick={googleHandler}
        // disabled={btnIsLoading}
        className="w-full border-teal-600"
      >
        {/* {btnIsLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <Google className="mr-2 h-4 w-4" />
            Google
          </>
        )} */}
        <Google className="mr-2 h-4 w-4" />
        Google
      </Button>
    )
  );
};

export default GoogleButton;
