import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-(--color-border) bg-(--color-surface)">
      <div className="mx-auto grid w-full max-w-[1280px] gap-8 px-6 py-8 text-[11px] tracking-wide text-(--color-text-muted) md:grid-cols-3">
        <div>
          <p className="font-semibold tracking-[0.28em] text-(--color-primary)">Aesthetique Tiles</p>
          <p className="mt-1 text-[10px] tracking-[0.08em] normal-case">
            Crafted for architects, designers, and premium earthy interiors.
          </p>
        </div>

        <div>
          <h3 className="text-[10px] font-semibold tracking-[0.18em] uppercase text-foreground">Social Links</h3>
          <div className="mt-3 flex flex-col gap-2 text-[10px] tracking-[0.12em] normal-case">
            <Link href="https://facebook.com" className="hover:text-foreground" target="_blank" rel="noreferrer">
              Facebook
            </Link>
            <Link href="https://instagram.com" className="hover:text-foreground" target="_blank" rel="noreferrer">
              Instagram
            </Link>
            <Link href="https://linkedin.com" className="hover:text-foreground" target="_blank" rel="noreferrer">
              LinkedIn
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-semibold tracking-[0.18em] uppercase text-foreground">Contact Us</h3>
          <p className="mt-3 text-[10px] tracking-[0.08em] normal-case">Email: support@aesthetiquetiles.com</p>
          <p className="mt-1 text-[10px] tracking-[0.08em] normal-case">Phone: +880 1700-123456</p>
          <p className="mt-1 text-[10px] tracking-[0.08em] normal-case">Location: Dhaka, Bangladesh</p>
        </div>

        <div className="md:col-span-3">
          <p className="border-t border-(--color-border) pt-4 text-[10px] tracking-[0.08em] normal-case">
            © {new Date().getFullYear()} Aesthetique Tiles. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
