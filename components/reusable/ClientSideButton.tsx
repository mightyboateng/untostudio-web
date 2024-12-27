"use client";

import { localStateType } from "@/types/localType";
import React from "react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
// import { Loader2 } from "lucide-react";

const ClientSideButton = () => {
  //   const [isLoading, setIsLoading] = useState(false);
  const disableOtherLoginOptions = useSelector(
    (state: localStateType) => state.localState.disableOtherLoginOptions
  );

  //   const dispatch = useDispatch();

  return (
    <Button
      type="submit"
      disabled={disableOtherLoginOptions}
      className="w-full bg-default text-black hover:bg-default-hover"
    >
      {/* {isLoading ? <Loader2 className="animate-spin" /> : "Continue"} */}
      Continue
    </Button>
  );
};

export default ClientSideButton;
