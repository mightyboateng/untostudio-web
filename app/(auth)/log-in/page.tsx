import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import EmailPassword from "@/components/auths/EmailPassword";
import SocialLoginComponent from "@/components/auths/SocialLoginComponent";

export const metadata: Metadata = {
  title: "Log in | Boiler plate",
  description: "Log in to Boiler plate",
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
          <h2 className="text-2xl font-bold">Welcome back</h2>
          <p className="text-sm text-muted-foreground">Login here</p>
        </div>
        <div className="grid gap-6">
          <EmailPassword login={true} signup={false} />

          <div className=" flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>

          <SocialLoginComponent />

          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="underline text-teal-600"
              prefetch={false}
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
