import { Metadata } from "next";
import { appDetails } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { cookies } from "next/headers";
import {
  appWriteCreateAdminClient,
  createSessionClient,
} from "@/lib/server/app-write";
import { redirect } from "next/navigation";
import { appRoutes } from "@/lib/constants";
import { Query } from "node-appwrite";

export const metadata: Metadata = {
  title: `Verifying mail | ${appDetails.name}`,
  description: "Verifying user email Boiler plate",
};

const page = async () => {
  const userLoginDetail = (await cookies()).get("userInfo")
    ? JSON.parse((await cookies()).get("userInfo")?.value || "{}")
    : null;

  if (!userLoginDetail) {
    redirect(appRoutes.login);
  }

  const handleSubmit = async (formData: FormData) => {
    "use server";

    const secret = formData.get("otp") as string;

    const { account } = await appWriteCreateAdminClient();

    const session = await account.createSession(userLoginDetail.userId, secret);

    (await cookies()).set("session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    if (session) {
      // console.log("session in ", session);
      const { databases } = await createSessionClient();

      const usersCollection = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE!,
        process.env.NEXT_PUBLIC_USERS_COLLECTION!,
        [Query.equal("uid", session.userId)]
      );

      if (usersCollection.total > 0) {
        (await cookies()).set(
          "user",
          JSON.stringify({
            username: usersCollection.documents[0].username,
            uid: usersCollection.documents[0].uid,
            email: usersCollection.documents[0].email,
            isAdmin: usersCollection.documents[0].isAdmin,
            userType: usersCollection.documents[0].userType,
            photoUrl: usersCollection.documents[0].photoUrl,
          })
        );
      }

      redirect(appRoutes.home);
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
              className="w-full p-2 border border-default rounded-md"
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
            <Button
              type="submit"
              className="mt-4 bg-default hover:bg-default-hover text-default-foreground font-bold py-2 px-4 w-full"
            >
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

export default page;
