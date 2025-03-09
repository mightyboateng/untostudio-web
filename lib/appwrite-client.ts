import { Account, Client, Databases } from "appwrite";
import { getCurrentSession } from "./server/cookies-action";

export const appWriteRawClient = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_PROJECT!);

export const appWriteRawDatabase = new Databases(appWriteRawClient);
export const appWriteRawAccount = new Account(appWriteRawClient);

export const getSessionClientUser = async () => {
  try {
    // Get session directly from cookie named 'session'
    const sessionId = await getCurrentSession();

    if (sessionId) {
      // Set the session in the client
      appWriteRawClient.setSession(sessionId);

      // Verify the session by getting current user
      const account = await appWriteRawAccount.get();
      return account;
    } else {
      console.log("no session cookie");
    }
    return null;
  } catch (error) {
    console.error("Session error:", error);
    return null;
  }
};
