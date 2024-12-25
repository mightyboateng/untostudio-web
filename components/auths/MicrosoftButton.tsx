"use client";

import { boilerAuth } from "@/boiler-plate-controllers/auth-controls";
import React from "react";
import { Button } from "../ui/button";
import { Microsoft } from "@mui/icons-material";
const MicrosoftButton = ({ disableButton }: { disableButton: boolean }) => {
  const gitHubHandler = () => {};
  return (
    boilerAuth.microsoft && (
      <Button
        variant="outline"
        onClick={gitHubHandler}
        disabled={disableButton}
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
        <Microsoft className="mr-2 h-4 w-4" />
        Microsoft
      </Button>
    )
  );
};

export default MicrosoftButton;
