import { Metadata } from "next";
import { appDetails, appRoutes } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSessionClient } from "@/lib/server/app-write";
import { User } from "lucide-react";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `Onboarding process | ${appDetails.name}`,
  description: "Complete the onboarding process and you are good to go!",
};

const page = async () => {
  async function handleSubmit(formData: FormData) {
    "use server";

    const username = formData.get("username") as string;

    const { databases } = await createSessionClient();

    const { account } = await createSessionClient();

    const user = await account.get();

    const response = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE!,
      process.env.NEXT_PUBLIC_USERS_COLLECTION!,
      ID.unique(),
      {
        username,
        uid: user.$id,
        email: user.email,
        createdAt: user.$createdAt,
      }
    );

    if (response) {
      (await cookies()).set(
        "user",
        JSON.stringify({
          username,
          uid: user.$id,
          email: user.email,
          isAdmin: false,
          photoUrl: null,
          userType: null,
        })
      );

      redirect(appRoutes.home)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <form
        className="flex flex-col p-8 space-y-4 md:min-w-96"
        action={handleSubmit}
      >
        <div className="flex flex-col items-center">
          <label className="mt-2 cursor-pointer">
            {/* <input
              type="file"
              className="hidden"
              aria-label="Upload profile picture"
            />
            <Photo /> */}
            <div className="flex justify-center items-center border rounded-full w-20 h-20">
              <User className="w-10 h-10 " />
            </div>
          </label>
          <h2 className="mt-2 text-lg font-semibold">
            Please enter your details
          </h2>
        </div>
        <div className="flex gap-4">
          <Input
            type="text"
            name="username"
            aria-label="full name"
            required={true}
            placeholder="Enter your full name"
            className="border rounded-md p-2 flex-grow"
          />
          {/* <Input
            type="text"
            aria-label="Doctor's last name"
            placeholder="Last name"
            className="border rounded-md p-2 flex-grow"
          /> */}
        </div>
        {/* <Input
          type="text"
          aria-label="Doctor's title"
          placeholder="Doctor's title"
          className="border rounded-md p-2"
        /> */}

        <Button
          type="submit"
          className="mt-4 bg-default hover:bg-default-hover text-default-foreground font-bold py-2 px-4"
        >
          Continue
        </Button>
      </form>
    </div>
  );
};

export default page;
