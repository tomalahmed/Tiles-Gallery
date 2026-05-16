import TileCard from "@/components/tiles/tile-card";
import SectionTitle from "@/components/ui/section-title";
import Button from "@/components/ui/button";
import { getServerSession } from "@/lib/server-session";
import { getFavoriteTileIdSet } from "@/lib/favorites-service";

export default async function FeaturedGrid({ tiles = [] }) {
  const sessionData = await getServerSession();
  const user = sessionData?.user ?? sessionData?.session?.user;
  const favoriteTileIdSet = user?.id ? await getFavoriteTileIdSet(user.id) : new Set();

  return (
    <section className="mt-10 space-y-6">
      <SectionTitle
        eyebrow="Featured Collection"
        title="Hand-picked textures for premium earthy spaces"
        subtitle="Built for designers seeking warm palettes, tactile finishes, and modern architectural utility."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {tiles.map((tile, index) => (
          <TileCard key={tile.id} tile={tile} index={index} initialIsFavorited={favoriteTileIdSet.has(tile.id)} />
        ))}
      </div>

      <div className="flex justify-center pt-2">
        <Button as="a" href="/all-tiles" variant="ghost">
          Load More Collections
        </Button>
      </div>
    </section>
  );
}
