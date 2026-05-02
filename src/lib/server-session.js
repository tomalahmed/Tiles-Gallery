import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getServerSession() {
  try {
    const requestHeaders = await headers();
    const sessionData = await auth.api.getSession({
      headers: requestHeaders,
    });

    if (!sessionData) {
      return null;
    }

    const user = sessionData.user ?? sessionData.session?.user ?? null;
    if (!user) {
      return null;
    }

    return {
      ...sessionData,
      user,
    };
  } catch {
    return null;
  }
}
