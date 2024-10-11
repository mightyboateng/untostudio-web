import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ForgotPasswordForm from "@/components/auths/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot password | Boiler plate",
  description: "Forgot password to Boiler plate",
};

const page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="md:mx-auto mx-5 w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-2">
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={70} height={70} />
          </Link>
          <h2 className="text-2xl font-bold">Forgot your password?</h2>
          <p className="text-sm text-muted-foreground">Enter your email here</p>
        </div>
        <div className="grid gap-6">
          <ForgotPasswordForm />
        </div>
        <div className="text-center text-sm text-muted-foreground">
          Remember your password?{" "}
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
  );
};

export default page;
