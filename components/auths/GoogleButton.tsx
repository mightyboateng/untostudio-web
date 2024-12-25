"use client";

import { boilerAuth } from "@/boiler-plate-controllers/auth-controls";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Google } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setDisableOtherLoginOptions } from "@/redux/slides/localState";
import { Loader2 } from "lucide-react";
const GoogleButton = ({ disableButton }: { disableButton: boolean }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const googleHandler = () => {
    dispatch(setDisableOtherLoginOptions(true));

    setIsLoading(true);
  };

  return (
    boilerAuth.google && (
      <Button
        variant="outline"
        onClick={googleHandler}
        disabled={disableButton}
        className="w-full border-teal-600"
      >
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <Google className="mr-2 h-4 w-4" />
            Google
          </>
        )}
        
      </Button>
    )
  );
};

export default GoogleButton;
