import React from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { appWriteAccount } from "@/utils/app-write";
import { redirect } from "next/navigation";
import { appRoutes } from "@/utils/constants";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ secret: string; userId: string }>;
}) => {
  try {
    const secret = (await searchParams).secret;
    const userId = (await searchParams).userId;

    await appWriteAccount().createSession(userId, secret);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
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
