import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Google, GitHub, Apple, Microsoft } from "@mui/icons-material";
import { boilerAuth } from "@/boiler-plate-controllers/auth-controls";
import { Metadata } from "next";
import EmailPassword from "@/components/auths/EmailPassword";


export const metadata: Metadata = {
  title: "Log in | Boiler plate",
  description: "Log in to Boiler plate",
};

const page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="md:mx-auto mx-5 w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-2">
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={70} height={70} />
          </Link>
          <h2 className="text-2xl font-bold">First time here</h2>
          <p className="text-sm text-muted-foreground">
            Create an account with your email
          </p>
        </div>
        <div className="grid gap-6">
          <EmailPassword login={false} signup={true} />
          <div className=" flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>

          <div className="grid gap-4">
            {boilerAuth.gitAuth && (
              <Button variant="outline" className="w-full border-teal-600">
                <GitHub className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            )}
            {boilerAuth.google && (
              <Button variant="outline" className="w-full border-teal-600">
                <Google className="mr-2 h-4 w-4" />
                Google
              </Button>
            )}
            {boilerAuth.microsoft && (
              <Button variant="outline" className="w-full border-teal-600">
                <Microsoft className="mr-2 h-4 w-4" />
                Microsoft
              </Button>
            )}
            {boilerAuth.microsoft && (
              <Button variant="outline" className="w-full border-teal-600">
                <Apple className="mr-2 h-4 w-4" />
                Apple
              </Button>
            )}
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/log-in"
              className="underline text-teal-600"
              prefetch={false}
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
