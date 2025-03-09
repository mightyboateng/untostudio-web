"use server";

import { cookies } from "next/headers";

export const getCurrentUser = async () => {
  const user = (await cookies()).get("user");

  if (!user) {
    return null;
  }

  return user.value;
};

export const getCurrentSession = async () => {
  const session = (await cookies()).get("session");

  if (!session) {
    return null;
  }

  return session.value;
};
