import { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { appDetails } from "@/lib/constants";
import UserOnboardingForm from "@/components/onboarding/UserOnboardingForm";
// import Image from "next/image";
// import OtpFormComponent from "@/components/auths/OtpFormComponent";

export const metadata: Metadata = {
  title: `Verifying mail | ${appDetails.name}`,
  description: "Verifying user email Boiler plate",
};

const page = async () => {
  // const userLoginDetail = (await cookies()).get(appDetails.loginDetailForOtp)
  //   ? JSON.parse(
  //       (await cookies()).get(appDetails.loginDetailForOtp)?.value || "{}"
  //     )
  //   : null;

  // if (!userLoginDetail) {
  //   redirect(appRoutes.login);
  // }

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <Card className="md:border-2 border-none rounded md:w-[600px]">
        <CardHeader>
          <CardTitle>Complete your connection</CardTitle>
          <CardDescription>Complete the onboarding process</CardDescription>
        </CardHeader>
        <CardContent>
          <UserOnboardingForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
