import { ObjectId } from "mongodb";
import { db } from "@/lib/mongodb";

const ACCOUNT_SETTINGS_COLLECTION = "user_account_settings";

const DEFAULT_SETTINGS = {
  productLaunchAlerts: true,
  sampleKitUpdates: true,
  marketingDigest: false,
};

function toUserKey(userId) {
  return String(userId ?? "").trim();
}

function parseMaybeObjectId(value) {
  if (typeof value === "string" && ObjectId.isValid(value)) {
    return new ObjectId(value);
  }
  return value;
}

function getCollection() {
  return db.collection(ACCOUNT_SETTINGS_COLLECTION);
}

function normalizeSettings(input = {}) {
  return {
    productLaunchAlerts: Boolean(input.productLaunchAlerts),
    sampleKitUpdates: Boolean(input.sampleKitUpdates),
    marketingDigest: Boolean(input.marketingDigest),
  };
}

async function findSettingsDoc(userId) {
  const userKey = toUserKey(userId);
  if (!userKey) {
    return null;
  }

  const collection = getCollection();
  const objectIdKey = parseMaybeObjectId(userKey);

  const [byStringKey, byObjectIdKey] = await Promise.all([
    collection.findOne({ userId: userKey }),
    objectIdKey instanceof ObjectId ? collection.findOne({ userId: objectIdKey }) : Promise.resolve(null),
  ]);

  return byStringKey ?? byObjectIdKey ?? null;
}

export async function getAccountSettings(userId) {
  const doc = await findSettingsDoc(userId);
  return {
    ...DEFAULT_SETTINGS,
    ...normalizeSettings(doc ?? {}),
  };
}

export async function updateAccountSettings(userId, nextSettings) {
  const userKey = toUserKey(userId);
  if (!userKey) {
    return { ...DEFAULT_SETTINGS };
  }

  const normalizedSettings = normalizeSettings(nextSettings);
  const collection = getCollection();

  await collection.updateOne(
    { userId: userKey },
    {
      $setOnInsert: { userId: userKey, createdAt: new Date() },
      $set: {
        ...normalizedSettings,
        updatedAt: new Date(),
      },
    },
    { upsert: true },
  );

  return getAccountSettings(userKey);
}

