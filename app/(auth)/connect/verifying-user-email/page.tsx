import React from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { appRoutes } from "@/lib/constants";
import { appWriteClient } from "@/lib/server/app-write";
import { Metadata } from "next";
import { appDetails } from "@/lib/constants";
// import { cookies } from "next/headers";
// import { appWriteCreateAdminClient } from "@/lib/server/app-write";

export const metadata: Metadata = {
  title: `Verifying mail | ${appDetails.name}`,
  description: "Verifying user email Boiler plate",
};

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ secret: string; userId: string }>;
}) => {
  const secret = (await searchParams).secret;
  const userId = (await searchParams).userId;

  if (!secret && !userId) {
    redirect(appRoutes.login);
  }

  try {
    const { account } = await appWriteClient();

    const session = await account.createSession(userId, secret);
    console.log("session", session);

    if (session) {
      redirect(appRoutes.home);
    }
  } catch (error) {
    console.log("error", error);
    // redirect(appRoutes.login);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 h-screen">
      <Image
        className="mb-4"
        src="/logo.png"
        alt="logo"
        width={50}
        height={50}
        priority={true}
      />
      <p className="text-sm text-muted-foreground">Checking your email...</p>
      <Loader2 className="w-6 h-6 animate-spin" />
    </div>
  );
};

export default page;
