import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import CardShell from "@/components/ui/card-shell";
import SectionTitle from "@/components/ui/section-title";
import { getTileDetails } from "@/lib/tiles-service";
import Chip from "@/components/ui/chip";
import FavoriteButton from "@/components/tiles/favorite-button";
import BackButton from "@/components/ui/back-button";
import { getServerSession } from "@/lib/server-session";
import { getFavoriteTileIdSet } from "@/lib/favorites-service";

export default async function TileDetailsPage({ params }) {
  const { tileId } = await params;
  const sessionData = await getServerSession();
  const user = sessionData?.user ?? sessionData?.session?.user;

  if (!user) {
    redirect(`/login?next=${encodeURIComponent(`/tiles/${tileId}`)}`);
  }

  const tile = await getTileDetails(tileId);
  if (!tile) {
    notFound();
  }

  const favoriteTileIdSet = await getFavoriteTileIdSet(user.id);
  const initialIsFavorited = favoriteTileIdSet.has(tile.id);

  const creator = tile.creator || "Aesthetique Studio";
  const styleDescription = tile.styleDescription || tile.description;
  const tags = Array.isArray(tile.tags) && tile.tags.length
    ? tile.tags
    : [tile.category, tile.material, tile.inStock ? "In Stock" : "Out of Stock"].filter(Boolean);

  return (
    <div className="w-full space-y-6">
      <SectionTitle
        eyebrow="Private Detail"
        title={tile.title}
        subtitle="Technical and material profile for specification workflows."
      />
      <BackButton />
      <CardShell>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="relative h-72 overflow-hidden rounded-sm border border-(--color-border) lg:h-[420px]">
            <Image
              src={tile.image}
              alt={tile.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-2xl font-semibold text-foreground">{tile.title}</h3>
              <FavoriteButton tileId={tile.id} initialIsFavorited={initialIsFavorited} refreshOnSuccess />
            </div>
            <p className="text-sm text-(--color-text-muted)">{styleDescription}</p>
            <dl className="grid gap-3 text-sm">
              <div className="flex items-center justify-between gap-4 border-b border-(--color-border) pb-2">
                <dt className="text-(--color-text-muted)">Creator</dt>
                <dd className="font-semibold text-foreground">{creator}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-(--color-border) pb-2">
                <dt className="text-(--color-text-muted)">Category</dt>
                <dd className="font-semibold text-foreground">{tile.category}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-(--color-border) pb-2">
                <dt className="text-(--color-text-muted)">Material</dt>
                <dd className="font-semibold text-foreground">{tile.material}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-(--color-border) pb-2">
                <dt className="text-(--color-text-muted)">Dimensions</dt>
                <dd className="font-semibold text-foreground">{tile.dimensions}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 pb-2">
                <dt className="text-(--color-text-muted)">Price</dt>
                <dd className="font-semibold text-(--color-primary)">${tile.price.toFixed(2)}</dd>
              </div>
            </dl>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Chip key={tag}>{tag}</Chip>
              ))}
            </div>
          </div>
        </div>
      </CardShell>
    </div>
  );
}
