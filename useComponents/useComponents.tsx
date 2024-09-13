import { redirect, useRouter } from "next/navigation";

export function routeTo(path: string) {
  redirect(path);
}
