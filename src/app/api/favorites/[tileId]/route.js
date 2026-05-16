import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/server-session";
import { removeFavoriteTile } from "@/lib/favorites-service";

function getSessionUserId(sessionData) {
  const user = sessionData?.user ?? sessionData?.session?.user;
  return user?.id ? String(user.id) : "";
}

export async function DELETE(_request, { params }) {
  const sessionData = await getServerSession();
  const userId = getSessionUserId(sessionData);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resolvedParams = await params;
  const tileId = String(resolvedParams?.tileId ?? "").trim();
  if (!tileId) {
    return NextResponse.json({ error: "tileId is required." }, { status: 400 });
  }

  const tileIds = await removeFavoriteTile(userId, tileId);
  return NextResponse.json({ tileIds, tileId, favorited: false });
}
