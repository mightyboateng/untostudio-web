import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { boilerAuth } from "@/boiler-plate-controllers/auth-controls";
import { ID } from "node-appwrite";
import { appWriteCreateAdminClient } from "@/lib/server/app-write";
import { appRoutes } from "@/lib/constants";
import { redirect } from "next/navigation";
import ClientSideButton from "../reusable/ClientSideButton";
import { cookies } from "next/headers";

const EmailOTPSignIn = async () => {
  async function handleSubmit(formData: FormData) {
    "use server";

    const email = formData.get("email") as string;

    const { account } = await appWriteCreateAdminClient();

    const userInfo = await account.createEmailToken(ID.unique(), email, false);

    (await cookies()).set(
      "userInfo",
      JSON.stringify({ userId: userInfo.userId, email })
    );

    redirect(appRoutes.verifyEmail);
  }

  return (
    boilerAuth.email_link_sign_in && (
      <form
        className="grid gap-4"
        action={handleSubmit}
      >
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required={true}
            placeholder="name@example.com"
          />
        </div>

        {/* <Button
          type="submit"
          disabled={disableOtherLoginOptions}
          className="w-full bg-teal-600 text-white hover:bg-teal-900"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Continue"}
        </Button> */}
        <ClientSideButton />
      </form>
    )
  );
};

export default EmailOTPSignIn;
