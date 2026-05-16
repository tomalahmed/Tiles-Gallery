import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/server-session";
import { getAccountSettings, updateAccountSettings } from "@/lib/account-settings-service";

function getSessionUserId(sessionData) {
  const user = sessionData?.user ?? sessionData?.session?.user;
  return user?.id ? String(user.id) : "";
}

export async function GET() {
  const sessionData = await getServerSession();
  const userId = getSessionUserId(sessionData);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = await getAccountSettings(userId);
  return NextResponse.json({ settings });
}

export async function PUT(request) {
  const sessionData = await getServerSession();
  const userId = getSessionUserId(sessionData);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const settings = await updateAccountSettings(userId, {
    productLaunchAlerts: payload?.productLaunchAlerts,
    sampleKitUpdates: payload?.sampleKitUpdates,
    marketingDigest: payload?.marketingDigest,
  });

  return NextResponse.json({ settings });
}

