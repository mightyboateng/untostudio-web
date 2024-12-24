"use client";

import { boilerAuth } from "@/boiler-plate-controllers/auth-controls";
import React from "react";
import { Button } from "../ui/button";
import { GitHub } from "@mui/icons-material";
const GitHubButton = () => {
  const gitHubHandler = () => {};
  return (
    boilerAuth.gitAuth && (
      <Button
        variant="outline"
        onClick={gitHubHandler}
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
        <GitHub className="mr-2 h-4 w-4" />
        GitHub
      </Button>
    )
  );
};

export default GitHubButton;
