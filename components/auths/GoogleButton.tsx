"use client";

import { boilerAuth } from "@/boiler-plate-controllers/auth-controls";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Google } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setDisableOtherLoginOptions } from "@/redux/slides/localState";
import { Loader2 } from "lucide-react";
// import { signUpWithGoogle } from "@/lib/server/oauth";

const GoogleButton = ({ disableButton }: { disableButton: boolean }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = async () => {
    dispatch(setDisableOtherLoginOptions(true));
    setIsLoading(true);
  };

  return (
    boilerAuth.google && (
      <form
        onSubmit={() => {
          // e.preventDefault();
          handleOnClick();
        }}
      >
        <Button
          variant="outline"
          disabled={disableButton}
          className="w-full border-teal-600"
          type="submit"
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
      </form>
    )
  );
};

export default GoogleButton;
