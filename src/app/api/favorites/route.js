import { NextResponse } from "next/server";
import { getTileById } from "@/lib/tiles-db";
import { getServerSession } from "@/lib/server-session";
import { addFavoriteTile, getFavoriteTileIds, getFavoriteTilesByUserId } from "@/lib/favorites-service";

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

  const [tileIds, tiles] = await Promise.all([getFavoriteTileIds(userId), getFavoriteTilesByUserId(userId)]);
  return NextResponse.json({ tileIds, tiles });
}

export async function POST(request) {
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

  const tileId = String(payload?.tileId ?? "").trim();
  if (!tileId) {
    return NextResponse.json({ error: "tileId is required." }, { status: 400 });
  }

  const tile = await getTileById(tileId);
  if (!tile) {
    return NextResponse.json({ error: "Tile not found." }, { status: 404 });
  }

  const tileIds = await addFavoriteTile(userId, tileId);
  return NextResponse.json({ tileIds, tileId, favorited: true });
}
