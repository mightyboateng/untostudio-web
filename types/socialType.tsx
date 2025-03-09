export type SocialPlatform = "youtube" | "tiktok" | "facebook" | "instagram";

export interface SocialAccountType {
  userId: string;
  platform: SocialPlatform;
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}


export interface ScheduledPost {
  platform: SocialPlatform;
  videoId: string;
  scheduleTime: Date;
  status: "pending" | "published" | "failed";
}