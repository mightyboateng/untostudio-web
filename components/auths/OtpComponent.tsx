import React from "react";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSeparator,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { cookies } from "next/headers";
import { appWriteCreateAdminServer } from "@/lib/server/app-write";
import { redirect } from "next/navigation";
import { appRoutes } from "@/lib/constants";
// import { useSelector } from "react-redux";
// import { reduxUserType } from "@/types/userType";
// import { appWriteClient } from "@/lib/server/app-write";

const OtpComponent = async () => {
  //   const userLoginDetail = useSelector(
  //     (state: reduxUserType) => state.user.loginDetail
  //   );

  const userLoginDetail = (await cookies()).get("userInfo")
    ? JSON.parse((await cookies()).get("userInfo")?.value || "{}")
    : null;

  if (!userLoginDetail) {
    redirect(appRoutes.login);
  }

  console.log("userLoginDetail", userLoginDetail);

  const handleSubmit = async (formData: FormData) => {
    "use server";
    const secret = formData.get("otp") as string;
    const { account } = await appWriteCreateAdminServer();

    const session = await account.createSession(userLoginDetail.userId, secret);

    (await cookies()).set("session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    if (session) {
      redirect(appRoutes.dashboard);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="md:mx-auto mx-5 w-full max-w-md space-y-8 md:py-0 py-8">
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-4xl font-bold">Verification</h2>
          <p className="text-sm text-muted-foreground">
            Enter code sent to{" "}
            <span className="font-bold">{userLoginDetail?.email}</span>
          </p>
        </div>
        <div className="grid gap-6 place-items-center">
          <form action={handleSubmit}>
            <input
              type="number"
              name="otp"
              placeholder="Enter OTP"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {/* <InputOTP maxLength={6} className="text-2xl">
              <InputOTPGroup>
                <InputOTPSlot
                  index={0}
                  autoFocus={true}
                  className="w-12 h-12 text-center"
                />
                <InputOTPSlot index={1} className="w-12 h-12 text-center" />
                <InputOTPSlot index={2} className="w-12 h-12 text-center" />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} className="w-12 h-12 text-center" />
                <InputOTPSlot index={4} className="w-12 h-12 text-center" />
                <InputOTPSlot index={5} className="w-12 h-12 text-center" />
              </InputOTPGroup>
            </InputOTP> */}
            <Button type="submit" className="w-full mt-5">
              Continue
            </Button>
          </form>
          <Link
            href="/login"
            className="text-xs underline text-blue-500 flex items-center gap-2"
          >
            <MoveLeft className="w-4 h-4" /> Go back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OtpComponent;
