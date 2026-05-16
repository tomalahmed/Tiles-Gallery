import { cn } from "@/lib/cn";

export default function CardShell({ className, children }) {
  return (
    <article
      className={cn(
        "surface-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-(--color-primary)/50 hover:shadow-[0_18px_34px_rgba(0,0,0,0.42)]",
        className,
      )}
    >
      {children}
    </article>
  );
}
