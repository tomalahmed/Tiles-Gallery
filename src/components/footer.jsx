import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faPinterestP,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const socialLinks = [
  { href: "https://www.instagram.com", label: "Instagram", icon: faInstagram },
  { href: "https://www.pinterest.com", label: "Pinterest", icon: faPinterestP },
  { href: "https://www.facebook.com", label: "Facebook", icon: faFacebookF },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/10 bg-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.35em] text-black uppercase">
              Aesthetique Tiles
            </p>
            <p className="max-w-sm text-sm text-black/60">
              Crafted for architects, designers, and every space that needs a
              timeless surface story.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-black">Social Media</h3>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/20 text-black/70 transition-colors hover:text-black"
                  aria-label={social.label}
                >
                  <FontAwesomeIcon icon={social.icon} className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-black">Contact Us</h3>
            <p className="flex items-center gap-2 text-sm text-black/60">
              <FontAwesomeIcon icon={faEnvelope} className="h-3.5 w-3.5" />
              <span>support@aesthetiquetiles.com</span>
            </p>
            <p className="flex items-center gap-2 text-sm text-black/60">
              <FontAwesomeIcon icon={faPhone} className="h-3.5 w-3.5" />
              <span>+(880) 129845-2022</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
