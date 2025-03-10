// import { SocialPlatform } from "@/types/socialType";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TikTok from "next-auth/providers/tiktok";
import { createSessionServer } from "./lib/server/app-write";
import { AppwriteException } from "node-appwrite";
// import { ID } from "node-appwrite";
// import GitHubProvider from "next-auth/providers/github";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          scope:
            "https://www.googleapis.com/auth/youtube.readonly profile email",
        },
      },
    }),
    TikTok,

    // GoogleProvider,
    // GitHubProvider,
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
        token.provider = account.provider;
      }

      return token;
    },
    async session({ session, token }) {
      if (session && token) {
        let socialCollectionId = "";
        if (token.provider === "google") {
          socialCollectionId = process.env.NEXT_PUBLIC_YOUTUBE_COLLECTION!;
        } else if (token.provider === "facebook") {
          socialCollectionId = process.env.NEXT_PUBLIC_FACEBOOK_COLLECTION!;
        } else if (token.provider === "instagram") {
          socialCollectionId = process.env.NEXT_PUBLIC_INSTAGRAM_COLLECTION!;
        }

        try {
          const { databases } = await createSessionServer();
          const { account } = await createSessionServer();
          const user = await account.get();

          // Add access token to session
          session.accessToken = token.accessToken as string;

          // Check if document already exists
          try {
            await databases.getDocument(
              process.env.NEXT_PUBLIC_DATABASE!,
              socialCollectionId,
              user.$id
            );

            // Document exists, update it
            await databases.updateDocument(
              process.env.NEXT_PUBLIC_DATABASE!,
              socialCollectionId,
              user.$id,
              {
                platform: token.provider,
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
                expiresAt: token.exp
                  ? new Date(token.exp * 1000).toISOString()
                  : null,
              }
            );
          } catch (error) {
            // Document doesn't exist, create new one
            if ((error as AppwriteException).code === 404) {
              await databases.createDocument(
                process.env.NEXT_PUBLIC_DATABASE!,
                socialCollectionId,
                user.$id,
                {
                  platform: token.provider,
                  accessToken: token.accessToken,
                  refreshToken: token.refreshToken,
                  expiresAt: token.exp
                    ? new Date(token.exp * 1000).toISOString()
                    : null,
                }
              );
            } else {
              throw error; // Re-throw if it's a different error
            }
          }
        } catch (error) {
          console.error("Error handling session in Appwrite:", error);
        }
      } else {
        console.log("No session or token available");
      }
      return session;
    },
  },
});
