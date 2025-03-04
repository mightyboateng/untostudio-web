import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import SocialLoginComponent from "@/components/auths/SocialLoginComponent";
import EmailOTPSignIn from "@/components/auths/EmailOTPSignIn";

export const metadata: Metadata = {
  title: "Connect here | Boiler plate",
  description: "Enter your email to connect to Boiler plate",
};

const page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="md:mx-auto mx-5 w-full max-w-md space-y-8 md:py-0 py-8">
        <div className="flex flex-col items-center space-y-2">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="logo"
              width={50}
              height={50}
              priority={true}
            />
          </Link>
          <h2 className="text-2xl font-bold">Connect from here</h2>
          <p className="text-sm text-muted-foreground">
            Enter your email address
          </p>
        </div>
        <div className="grid gap-6">
          <EmailOTPSignIn />

          <div className=" flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>

          <SocialLoginComponent />
        </div>
      </div>
    </div>
  );
};

export default page;
