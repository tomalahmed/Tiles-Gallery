"use client";

async function parseResponse(response) {
  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const errorMessage = payload?.error || "Favorites request failed.";
    const error = new Error(errorMessage);
    error.status = response.status;
    throw error;
  }

  return payload;
}

export async function addFavorite(tileId) {
  const response = await fetch("/api/favorites", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tileId }),
  });
  return parseResponse(response);
}

export async function removeFavorite(tileId) {
  const response = await fetch(`/api/favorites/${encodeURIComponent(tileId)}`, {
    method: "DELETE",
  });
  return parseResponse(response);
}
