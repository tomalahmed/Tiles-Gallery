import { ObjectId } from "mongodb";
import { db } from "@/lib/mongodb";
import { getTileById } from "@/lib/tiles-db";

const FAVORITES_COLLECTION = "user_favorites";

function toUserKey(userId) {
  return String(userId ?? "").trim();
}

function normalizeTileIds(tileIds) {
  if (!Array.isArray(tileIds)) {
    return [];
  }

  return [...new Set(tileIds.map((tileId) => String(tileId ?? "").trim()).filter(Boolean))];
}

function parseMaybeObjectId(value) {
  if (typeof value === "string" && ObjectId.isValid(value)) {
    return new ObjectId(value);
  }
  return value;
}

function getFavoritesCollection() {
  return db.collection(FAVORITES_COLLECTION);
}

async function findFavoritesDoc(userId) {
  const userKey = toUserKey(userId);
  if (!userKey) {
    return null;
  }

  const collection = getFavoritesCollection();
  const objectIdKey = parseMaybeObjectId(userKey);

  const [byStringKey, byObjectIdKey] = await Promise.all([
    collection.findOne({ userId: userKey }),
    objectIdKey instanceof ObjectId ? collection.findOne({ userId: objectIdKey }) : Promise.resolve(null),
  ]);

  return byStringKey ?? byObjectIdKey ?? null;
}

export async function getFavoriteTileIds(userId) {
  const favoriteDoc = await findFavoritesDoc(userId);
  return normalizeTileIds(favoriteDoc?.tileIds);
}

export async function getFavoriteTileIdSet(userId) {
  const tileIds = await getFavoriteTileIds(userId);
  return new Set(tileIds);
}

export async function addFavoriteTile(userId, tileId) {
  const userKey = toUserKey(userId);
  const normalizedTileId = String(tileId ?? "").trim();

  if (!userKey || !normalizedTileId) {
    return [];
  }

  const collection = getFavoritesCollection();
  await collection.updateOne(
    { userId: userKey },
    {
      $setOnInsert: { userId: userKey, createdAt: new Date() },
      $addToSet: { tileIds: normalizedTileId },
      $set: { updatedAt: new Date() },
    },
    { upsert: true },
  );

  return getFavoriteTileIds(userKey);
}

export async function removeFavoriteTile(userId, tileId) {
  const userKey = toUserKey(userId);
  const normalizedTileId = String(tileId ?? "").trim();

  if (!userKey || !normalizedTileId) {
    return [];
  }

  const collection = getFavoritesCollection();
  await collection.updateOne(
    { userId: userKey },
    {
      $pull: { tileIds: normalizedTileId },
      $set: { updatedAt: new Date() },
    },
  );

  return getFavoriteTileIds(userKey);
}

export async function getFavoriteTilesByUserId(userId) {
  const tileIds = await getFavoriteTileIds(userId);
  if (!tileIds.length) {
    return [];
  }

  const tiles = await Promise.all(tileIds.map((tileId) => getTileById(tileId)));
  return tiles.filter(Boolean);
}
