"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faRightFromBracket,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/all-tiles", label: "All Tiles" },
  { href: "/my-profile", label: "My Profile" },
];

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
    setIsMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  const closeMobileMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-3"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/20 text-xs font-semibold tracking-wide text-black">
            AT
          </span>
          <span className="text-xs font-semibold tracking-[0.35em] text-black uppercase sm:text-sm">
            Aesthetique Tiles
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-black/70 transition-colors hover:text-black"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            <span className="text-sm text-black/50">Loading...</span>
          ) : session?.user ? (
            <>
              <Link
                href="/my-profile"
                className="rounded border border-black/20 px-4 py-2 text-sm text-black transition-colors hover:bg-black/5"
              >
                {session.user.name || "Profile"}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded bg-black px-4 py-2 text-sm text-white transition-opacity hover:opacity-90"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded bg-black px-4 py-2 text-sm text-white transition-opacity hover:opacity-90"
            >
              Login
            </Link>
          )}
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded border border-black/20 text-black md:hidden"
        >
          <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} className="h-4 w-4" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-black/10 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="rounded px-3 py-2 text-sm text-black/80 transition-colors hover:bg-black/5 hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 border-t border-black/10 pt-4">
            {isPending ? (
              <span className="text-sm text-black/50">Loading...</span>
            ) : session?.user ? (
              <div className="flex flex-col gap-3">
                <Link
                  href="/my-profile"
                  onClick={closeMobileMenu}
                  className="inline-flex items-center gap-2 rounded border border-black/20 px-4 py-2 text-sm text-black transition-colors hover:bg-black/5"
                >
                  <FontAwesomeIcon icon={faUser} className="h-3.5 w-3.5" />
                  <span>{session.user.name || "Profile"}</span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center gap-2 rounded bg-black px-4 py-2 text-sm text-white transition-opacity hover:opacity-90"
                >
                  <FontAwesomeIcon icon={faRightFromBracket} className="h-3.5 w-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={closeMobileMenu}
                className="inline-flex w-full items-center justify-center rounded bg-black px-4 py-2 text-sm text-white transition-opacity hover:opacity-90"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
