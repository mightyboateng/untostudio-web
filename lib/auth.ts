import { cookies } from "next/headers";
import { createSessionServer } from "./server/app-write";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

const auth = {
  user: undefined as unknown | undefined,
  sessionCookies: undefined as RequestCookie | undefined,

  getUser: async () => {
    auth.sessionCookies = (await cookies()).get("session") ?? undefined;

    try {
      if (auth.sessionCookies?.value) {
        const { account } = await createSessionServer();

        auth.user = await account.get();
      }
    } catch (error) {
      console.log("error", error);
      auth.user = undefined;
      auth.sessionCookies = undefined;
    }

    return auth.user;
  },
};

export default auth;
