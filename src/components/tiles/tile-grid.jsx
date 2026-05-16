import TileCard from "@/components/tiles/tile-card";
import { getServerSession } from "@/lib/server-session";
import { getFavoriteTileIdSet } from "@/lib/favorites-service";

export default async function TileGrid({ tiles = [] }) {
  if (!tiles.length) {
    return (
      <div className="surface-card p-8 text-center">
        <p className="text-sm text-(--color-text-muted)">No tiles matched your search. Try another category or keyword.</p>
      </div>
    );
  }

  const sessionData = await getServerSession();
  const user = sessionData?.user ?? sessionData?.session?.user;
  const favoriteTileIdSet = user?.id ? await getFavoriteTileIdSet(user.id) : new Set();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tiles.map((tile, index) => {
        const detailsPath = `/tiles/${tile.id}`;
        const detailsHref = user ? detailsPath : `/login?next=${encodeURIComponent(detailsPath)}`;

        return (
          <TileCard
            key={tile.id}
            tile={tile}
            index={index}
            detailsHref={detailsHref}
            initialIsFavorited={favoriteTileIdSet.has(tile.id)}
          />
        );
      })}
    </div>
  );
}
