import React from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { appRoutes } from "@/utils/constants";
import { appWriteCreateAdminClient } from "@/lib/server/app-write";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ secret: string; userId: string }>;
}) => {
  try {
    const secret = (await searchParams).secret;
    const userId = (await searchParams).userId;

    const { account } = await appWriteCreateAdminClient();

    const session = await account.createSession(userId, secret);
    console.log("session", session);

    // if (user) {
    //   redirect(appRoutes.pro);
    // }
  } catch (error) {
    console.log("error", error);
    redirect(appRoutes.login);
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
