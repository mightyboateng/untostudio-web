import { AppwriteException } from "node-appwrite";
import { createSessionServer } from "../server/app-write";
import { google } from "googleapis";

export async function getYoutubeTotalNumber() {
  const { account } = await createSessionServer();
  const { databases } = await createSessionServer();
  const user = await account.get();

  try {
    const youtubeData = await databases.getDocument(
      process.env.NEXT_PUBLIC_DATABASE!,
      process.env.NEXT_PUBLIC_YOUTUBE_COLLECTION!,
      user.$id
    );

    if (youtubeData) {
      const oauth2Client = new google.auth.OAuth2(
        process.env.AUTH_GOOGLE_ID,
        process.env.AUTH_GOOGLE_SECRET
      );
      oauth2Client.setCredentials({
        access_token: youtubeData.accessToken,
      });

      const youtube = google.youtube({
        version: "v3",
        auth: oauth2Client,
      });

      // Fetch user's channel data
      const response = await youtube.channels.list({
        part: ["statistics"],
        mine: true,
      });

      const channel = response.data.items ? response.data.items[0] : null;

      if (channel && channel.statistics) {
        //  number += parseInt(channel.statistics.subscriberCount || "0");
        return parseInt(channel.statistics.subscriberCount || "0");
      }
    }
  } catch (error) {
    if ((error as AppwriteException).code === 404) {
      console.log("brother man there is no data");
    } else if ((error as Error).message === "Invalid Credentials") {
      console.log("Invalid credentials, deleting old value");
      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_DATABASE!,
        process.env.NEXT_PUBLIC_YOUTUBE_COLLECTION!,
        user.$id
      );
    } else {
      console.log("error here please", error);
//       throw error;
    }

    return 0;
  }
}
