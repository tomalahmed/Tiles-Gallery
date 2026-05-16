"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faGrip,
  faHouse,
  faRightFromBracket,
  faUser,
  faXmark,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import { authClient } from "@/lib/auth-client";
import Button from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home", icon: faHouse },
  { href: "/architects", label: "Architects", icon: faBuilding },
  { href: "/all-tiles", label: "All Tiles", icon: faGrip },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const loginHref = pathname ? `/login?next=${encodeURIComponent(pathname)}` : "/login";
  const registerHref = pathname ? `/register?next=${encodeURIComponent(pathname)}` : "/register";
  const mobileMenuId = "mobile-primary-nav";
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = async () => {
    await authClient.signOut();
    setIsMobileMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-(--color-border) bg-(--color-surface) backdrop-blur">
      <div className="mx-auto flex h-[76px] w-full max-w-[1280px] items-center justify-between px-6">
        <Link href="/" className="text-xs font-semibold tracking-[0.3em] text-(--color-primary) uppercase">
          Aesthetique Tiles
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-2 text-xs tracking-wide text-(--color-text-muted) transition-colors hover:text-foreground"
            >
              {link.icon ? <FontAwesomeIcon icon={link.icon} className="h-3.5 w-3.5" /> : null}
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            <span className="text-xs tracking-wide text-(--color-text-muted) uppercase">Loading</span>
          ) : session?.user ? (
            <>
              <Button as={Link} href="/my-profile" variant="ghost" aria-label="My Profile">
                <FontAwesomeIcon icon={faUser} className="h-3.5 w-3.5" />
              </Button>
              <Button onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} className="h-3.5 w-3.5" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button as={Link} href={loginHref}>
                <FontAwesomeIcon icon={faUser} className="h-3.5 w-3.5" />
                Login
              </Button>
              <Button as={Link} href={registerHref} variant="ghost">
                Register
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls={mobileMenuId}
          onClick={() => setIsMobileMenuOpen((previous) => !previous)}
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-sm border border-(--color-border) text-foreground transition-colors hover:bg-background md:hidden"
        >
          <FontAwesomeIcon
            icon={isMobileMenuOpen ? faXmark : faBars}
            className={`h-5 w-5 transition-transform duration-300 ${isMobileMenuOpen ? "rotate-90" : "rotate-0"}`}
          />
        </button>
      </div>

      <div
        id={mobileMenuId}
        className={`overflow-hidden border-t border-(--color-border) bg-(--color-surface) transition-all duration-400 ease-out md:hidden ${
          isMobileMenuOpen ? "max-h-[420px] opacity-100 translate-y-0" : "pointer-events-none max-h-0 opacity-0 -translate-y-2"
        }`}
      >
        <div className="mx-auto w-full max-w-[1280px] space-y-5 px-6 py-4">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                style={{ transitionDelay: isMobileMenuOpen ? `${90 + index * 45}ms` : "0ms" }}
                className={`inline-flex items-center gap-2 text-sm font-medium text-(--color-text-muted) transition-all duration-300 hover:text-foreground ${
                  isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
                }`}
              >
                {link.icon ? <FontAwesomeIcon icon={link.icon} className="h-4 w-4" /> : null}
                {link.label}
              </Link>
            ))}
          </nav>

          <div
            style={{ transitionDelay: isMobileMenuOpen ? `${90 + navLinks.length * 45}ms` : "0ms" }}
            className={`flex flex-col gap-2 transition-all duration-300 ${
              isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            {isPending ? (
              <span className="text-xs tracking-wide text-(--color-text-muted) uppercase">Loading</span>
            ) : session?.user ? (
              <>
                <Button as={Link} href="/my-profile" onClick={closeMobileMenu} variant="ghost" className="w-full justify-center">
                  <FontAwesomeIcon icon={faUser} className="h-3.5 w-3.5" />
                  My Profile
                </Button>
                <Button onClick={handleLogout} className="w-full justify-center">
                  <FontAwesomeIcon icon={faRightFromBracket} className="h-3.5 w-3.5" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button as={Link} href={loginHref} onClick={closeMobileMenu} className="w-full justify-center">
                  <FontAwesomeIcon icon={faUser} className="h-3.5 w-3.5" />
                  Login
                </Button>
                <Button as={Link} href={registerHref} onClick={closeMobileMenu} variant="ghost" className="w-full justify-center">
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
