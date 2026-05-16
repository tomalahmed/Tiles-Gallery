import Image from "next/image";
import Link from "next/link";
import CardShell from "@/components/ui/card-shell";
import Chip from "@/components/ui/chip";
import Button from "@/components/ui/button";
import FavoriteButton from "@/components/tiles/favorite-button";

export default function TileCard({ tile, detailsHref, initialIsFavorited = false }) {
  const resolvedDetailsHref = detailsHref || `/tiles/${tile.id}`;

  return (
    <CardShell className="h-full space-y-4">
      <div className="relative h-40 overflow-hidden rounded-sm border border-(--color-border)">
        <Image
          src={tile.image}
          alt={tile.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute right-2 top-2">
          <FavoriteButton tileId={tile.id} initialIsFavorited={initialIsFavorited} size="sm" />
        </div>
      </div>
      <div className="space-y-2">
        <Chip>{tile.material || tile.category}</Chip>
        <h3 className="text-lg font-semibold text-foreground">{tile.title}</h3>
        <p className="text-sm text-(--color-text-muted)">{tile.description}</p>
      </div>
      <div className="flex items-center justify-between pt-2">
        <span className="text-sm font-semibold text-(--color-primary)">${tile.price.toFixed(2)}</span>
        <Button as={Link} href={resolvedDetailsHref} variant="subtle" className="px-3 py-2 text-[10px]">
          Details
        </Button>
      </div>
    </CardShell>
  );
}
