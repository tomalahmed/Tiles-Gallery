"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function RegisterForm({ nextPath = "/" }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const loginHref = `/login?next=${encodeURIComponent(nextPath)}`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsEmailLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");
    const termsAccepted = formData.get("terms") === "on";

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsEmailLoading(false);
      return;
    }

    if (!termsAccepted) {
      setError("Please accept the trade terms and conditions.");
      setIsEmailLoading(false);
      return;
    }

    try {
      const response = await authClient.signUp.email({ name, email, password });

      if (response.error) {
        setError(response.error.message || "Unable to create account.");
        setIsEmailLoading(false);
        return;
      }

      router.push(loginHref);
      router.refresh();
    } catch {
      setError("Registration failed. Please try again.");
      setIsEmailLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col bg-[#0d0c0c] text-[#f4efe7] md:flex-row">
      <section className="relative hidden min-h-screen overflow-hidden md:flex md:w-1/2">
        <Image src="/banner.jpg" alt="Architectural Visionary" fill priority sizes="50vw" className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-b from-[#080808]/35 via-[#0c0b0b]/55 to-[#070707]/72" />

        <div className="relative z-10 flex h-full w-full flex-col justify-between px-8 py-10 lg:px-16 lg:py-14">
          <h1 className="text-3xl font-light tracking-[0.16em] text-[#f4efe7] lg:text-4xl">AESTHETIQUE TILES</h1>

          <div className="max-w-xl">
            <h2 className="mb-5 text-5xl font-light leading-tight text-[#f4efe7]">
              Crafted for the Modern
              <br />
              Visionary.
            </h2>
            <p className="text-base leading-7 text-[#d7cab9] lg:text-lg">
              Join an exclusive network of architects and designers shaping the future of spatial materiality.
            </p>
          </div>

          <div className="flex gap-8 text-xs tracking-[0.16em] text-[#d7cab9]">
            <span>ESTABLISHED 1990</span>
            <span>DHAKA, BD</span>
          </div>
        </div>
      </section>

      <section className="relative flex min-h-screen w-full items-center justify-center bg-[#0d0c0c] px-5 py-12 sm:px-8 md:w-1/2 md:px-16">
        <div className="absolute inset-0 md:hidden">
          <Image src="/banner.jpg" alt="Architectural Visionary" fill sizes="100vw" className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-[#0c0b0b]/80" />
        </div>

        <div className="relative z-10 w-full max-w-md space-y-10">
          <div className="space-y-4">
            <h2 className="text-4xl font-light text-[#f4efe7]">Create Account</h2>
            <p className="text-base leading-7 text-[#c8bca9]">
              Register to access professional trade pricing and exclusive sample kits.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-[0.14em] text-[#c8bca9]">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="ALEXANDER VOORHEES"
                required
                disabled={isEmailLoading}
                className="w-full border-x-0 border-b border-t-0 border-[#705d40] bg-[#111010] px-0 py-3 text-[#f4efe7] outline-none transition-colors placeholder:text-[#9f927e] focus:border-[#d2ae6d] disabled:cursor-not-allowed disabled:opacity-70"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-[0.14em] text-[#c8bca9]">
                Email Address (Trade Professional)
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="PRO@FIRM.COM"
                required
                disabled={isEmailLoading}
                className="w-full border-x-0 border-b border-t-0 border-[#705d40] bg-[#111010] px-0 py-3 text-[#f4efe7] outline-none transition-colors placeholder:text-[#9f927e] focus:border-[#d2ae6d] disabled:cursor-not-allowed disabled:opacity-70"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-xs uppercase tracking-[0.14em] text-[#c8bca9]">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="........"
                minLength={8}
                required
                disabled={isEmailLoading}
                className="w-full border-x-0 border-b border-t-0 border-[#705d40] bg-[#111010] px-0 py-3 text-[#f4efe7] outline-none transition-colors placeholder:text-[#9f927e] focus:border-[#d2ae6d] disabled:cursor-not-allowed disabled:opacity-70"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-xs uppercase tracking-[0.14em] text-[#c8bca9]">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="........"
                minLength={8}
                required
                disabled={isEmailLoading}
                className="w-full border-x-0 border-b border-t-0 border-[#705d40] bg-[#111010] px-0 py-3 text-[#f4efe7] outline-none transition-colors placeholder:text-[#9f927e] focus:border-[#d2ae6d] disabled:cursor-not-allowed disabled:opacity-70"
              />
            </div>

            <div className="flex items-start gap-3 pt-1">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                disabled={isEmailLoading}
                className="mt-1 h-4 w-4 rounded-none border border-[#705d40] bg-transparent text-[#d2ae6d] focus:ring-1 focus:ring-[#d2ae6d] disabled:cursor-not-allowed"
              />
              <label htmlFor="terms" className="text-sm leading-6 text-[#c8bca9]">
                I agree to the{" "}
                <Link href="#" className="text-[#d2ae6d] transition-colors hover:underline">
                  Trade Terms &amp; Conditions
                </Link>{" "}
                and consent to receiving architectural updates.
              </label>
            </div>

            {error ? <p className="text-sm text-red-400">{error}</p> : null}

            <button
              type="submit"
              disabled={isEmailLoading}
              className="mt-2 w-full bg-[#c8a15d] py-5 text-sm tracking-[0.16em] text-[#1a1611] transition-all hover:bg-[#ddb978] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isEmailLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </button>
          </form>

          <div className="border-t border-[#3a3126] pt-8 text-center text-base text-[#c8bca9]">
            Already have an account?
            <Link href={loginHref} className="ml-2 font-semibold text-[#d2ae6d] transition-colors hover:underline">
              Log In
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
