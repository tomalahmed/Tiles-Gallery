import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/server-session";
import { getFavoriteTilesByUserId } from "@/lib/favorites-service";
import SavedCollectionsSection from "@/components/profile/saved-collections-section";

const DEFAULT_PROFILE_IMAGE = "/default-profile.svg";

export default async function MyProfilePage() {
  const sessionData = await getServerSession();
  const user = sessionData?.user ?? sessionData?.session?.user;

  if (!user) {
    redirect("/login?next=/my-profile");
  }

  const favoriteTiles = user.id ? await getFavoriteTilesByUserId(user.id) : [];

  return (
    <div className="w-full bg-background px-3 py-5 text-foreground sm:px-4 md:px-6 md:py-8">
      <div className="mx-auto w-full max-w-[1180px] space-y-8">
        <section className="relative overflow-hidden rounded-sm border border-(--color-border) bg-(--color-surface) p-5 md:p-8">
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-[#c8a15d14] via-transparent to-transparent" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="relative h-20 w-20 overflow-hidden rounded-sm border border-(--color-border) bg-background md:h-24 md:w-24">
                <img
                  src={user.image || DEFAULT_PROFILE_IMAGE}
                  alt={user.name || "Profile"}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-2">
                <p className="text-[10px] tracking-[0.2em] text-(--color-accent)">PROFESSIONAL ARCHITECT</p>
                <h1 className="text-3xl font-semibold text-foreground md:text-5xl">{user.name || "Designer Profile"}</h1>
                <p className="text-xs text-(--color-text-muted) md:text-sm">{user.email}</p>
              </div>
            </div>

            <div className="flex w-full flex-wrap items-center gap-3 md:w-auto md:justify-end">
              <Link
                href="/my-profile/update"
                className="inline-flex min-h-11 flex-1 items-center justify-center border border-(--color-border) bg-(--color-primary) px-4 py-2.5 text-xs font-semibold tracking-[0.14em] text-[#1a1611] transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 md:min-h-0 md:flex-none"
              >
                EDIT PROFILE
              </Link>
              <Link
                href="/all-tiles"
                className="inline-flex min-h-11 flex-1 items-center justify-center border border-(--color-border) px-4 py-2.5 text-xs tracking-[0.14em] text-(--color-primary) transition-all duration-300 hover:-translate-y-0.5 hover:border-(--color-primary) md:min-h-0 md:flex-none"
              >
                EXPLORE TILES
              </Link>
            </div>
          </div>
        </section>

        <SavedCollectionsSection initialTiles={favoriteTiles} />

        <section className="space-y-4 border-t border-(--color-border) pt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">Account Settings</h2>
            <p className="text-xs tracking-[0.14em] text-(--color-text-muted)">SECURE & MANAGE</p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <Link
              href="/my-profile/update"
              className="group rounded-sm border border-(--color-border) bg-(--color-surface) p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-(--color-primary)"
            >
              <p className="text-[10px] tracking-[0.16em] text-(--color-accent)">PROFILE</p>
              <p className="mt-2 text-sm font-semibold text-foreground">Professional Details</p>
              <p className="mt-1 text-xs text-(--color-text-muted)">Update your name, firm details, and profile image.</p>
              <p className="mt-4 text-xs tracking-[0.14em] text-(--color-primary) transition group-hover:translate-x-1">MANAGE →</p>
            </Link>

            <Link
              href="/my-profile/settings?tab=notifications"
              className="group rounded-sm border border-(--color-border) bg-(--color-surface) p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-(--color-primary)"
            >
              <p className="text-[10px] tracking-[0.16em] text-(--color-accent)">NOTIFICATIONS</p>
              <p className="mt-2 text-sm font-semibold text-foreground">Alert Preferences</p>
              <p className="mt-1 text-xs text-(--color-text-muted)">Control updates for launches, samples, and offers.</p>
              <p className="mt-4 text-xs tracking-[0.14em] text-(--color-primary) transition group-hover:translate-x-1">MANAGE →</p>
            </Link>

            <Link
              href="/my-profile/settings?tab=security"
              className="group rounded-sm border border-(--color-border) bg-(--color-surface) p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-(--color-primary)"
            >
              <p className="text-[10px] tracking-[0.16em] text-(--color-accent)">SECURITY</p>
              <p className="mt-2 text-sm font-semibold text-foreground">Login & Password</p>
              <p className="mt-1 text-xs text-(--color-text-muted)">Review account access and keep your profile protected.</p>
              <p className="mt-4 text-xs tracking-[0.14em] text-(--color-primary) transition group-hover:translate-x-1">MANAGE →</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
