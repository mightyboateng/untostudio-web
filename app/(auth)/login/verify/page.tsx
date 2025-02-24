import { Metadata } from "next";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { appDetails, appRoutes } from "@/lib/constants";
import Image from "next/image";
import OtpFormComponent from "@/components/auths/OtpFormComponent";

export const metadata: Metadata = {
  title: `Verifying mail | ${appDetails.name}`,
  description: "Verifying user email Boiler plate",
};

const page = async () => {
  const userLoginDetail = (await cookies()).get(appDetails.loginDetailForOtp)
    ? JSON.parse(
        (await cookies()).get(appDetails.loginDetailForOtp)?.value || "{}"
      )
    : null;

  if (!userLoginDetail) {
    console.log('there is nothing here')
    redirect(appRoutes.login);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="md:mx-auto mx-5 w-full max-w-md space-y-8 md:py-0 py-8">
        <div className="flex flex-col items-center space-y-2">
          <div>
            <Image
              src={appDetails.logo}
              className="w-full h-full object-cover"
              alt="logo"
              width={30}
              height={30}
              priority={true}
            />
          </div>
          <h2 className="text-4xl font-bold">Verification</h2>
          <p className="text-sm text-muted-foreground">
            Enter code sent to{" "}
            <span className="font-bold">{userLoginDetail?.email}</span>
          </p>
        </div>
        <div className="grid gap-6 place-items-center">
          <OtpFormComponent />
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

export default page;
