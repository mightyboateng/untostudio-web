// "use client";

import { boilerAuth } from "@/boiler-plate-controllers/auth-controls";
// import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { appWriteCreateAdminClient } from "@/lib/server/app-write";
import { cookies } from "next/headers";
import { appRoutes } from "@/lib/constants";
import { redirect } from "next/navigation";

const EmailPassword = ({
  login,
  signup,
}: {
  login: boolean;
  signup: boolean;
}) => {
  // const [isLoading, setIsLoading] = useState(false);

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target as HTMLFormElement);
  //   const email = formData.get("email") as string;
  //   const password = formData.get("password") as string;

  //   setIsLoading(true);
  //   if (login) {
  //     handleLogin({ email, password });
  //   } else {
  //     handleSignUp({ email, password });
  //   }
  // };

  // // This is for login user
  // const handleLogin = ({
  //   email,
  //   password,
  // }: {
  //   email: string;
  //   password: string;
  // }) => {
  //   console.log(email, password);
  // };

  // // This is for signup user
  // const handleSignUp = ({
  //   email,
  //   password,
  // }: {
  //   email: string;
  //   password: string;
  // }) => {
  //   console.log(email, password);
  // };
  async function createSessionForm(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { account } = await appWriteCreateAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("session", session.secret, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(session.expire),
      path: appRoutes.home,
    });

    redirect(appRoutes.home);
  }

  return (
    boilerAuth.email_password && (
      <form className="grid gap-4" action={createSessionForm}>
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
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required={true}
            placeholder="**********"
          />
        </div>
        {login && (
          <div>
            <Link
              href="/forgot-password"
              className="text-sm text-default-hover"
            >
              Forgot password?
            </Link>
          </div>
        )}
        <Button
          type="submit"
          // disabled={isLoading}
          className="w-full bg-teal-600 text-white hover:bg-teal-900"
        >
          {/* {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : signup ? (
            "Sign up"
          ) : (
            "Sign in"
          )} */}
          signup
        </Button>
      </form>
    )
  );
};

export default EmailPassword;
