import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-[var(--color-primary)] text-[#181512] hover:-translate-y-0.5 hover:opacity-95 active:translate-y-0",
  ghost:
    "bg-transparent text-(--color-text) border border-[var(--color-border)] hover:-translate-y-0.5 hover:bg-white/5 active:translate-y-0",
  subtle:
    "bg-[var(--color-surface)] text-(--color-text) border border-[var(--color-border)] hover:-translate-y-0.5 hover:border-[var(--color-primary)] active:translate-y-0",
};

export default function Button({
  as: Component = "button",
  variant = "primary",
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={cn(
        "inline-flex items-center justify-center rounded-sm px-5 py-2.5 text-xs font-semibold tracking-[0.16em] uppercase transition-all duration-300",
        variants[variant] ?? variants.primary,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
