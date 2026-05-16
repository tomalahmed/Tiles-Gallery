"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const DEFAULT_PROFILE_IMAGE = "/default-profile.svg";

export default function RegisterForm({ nextPath = "/" }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
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
      const response = await authClient.signUp.email({
        name,
        email,
        password,
        image: DEFAULT_PROFILE_IMAGE,
      });

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

  const handleGoogleLogin = async () => {
    setError("");
    setIsGoogleLoading(true);

    try {
      const response = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (response?.error) {
        setError(response.error.message || "Google login is unavailable right now.");
        setIsGoogleLoading(false);
      }
    } catch {
      setError("Google login is not configured. Use email and password.");
      setIsGoogleLoading(false);
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
                disabled={isEmailLoading || isGoogleLoading}
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
                disabled={isEmailLoading || isGoogleLoading}
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
                disabled={isEmailLoading || isGoogleLoading}
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
                disabled={isEmailLoading || isGoogleLoading}
                className="w-full border-x-0 border-b border-t-0 border-[#705d40] bg-[#111010] px-0 py-3 text-[#f4efe7] outline-none transition-colors placeholder:text-[#9f927e] focus:border-[#d2ae6d] disabled:cursor-not-allowed disabled:opacity-70"
              />
            </div>

            <div className="flex items-start gap-3 pt-1">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                disabled={isEmailLoading || isGoogleLoading}
                className="mt-1 h-4 w-4 rounded-none border border-[#705d40] bg-transparent text-[#d2ae6d] focus:ring-1 focus:ring-[#d2ae6d] disabled:cursor-not-allowed"
              />
              <label htmlFor="terms" className="text-sm leading-6 text-[#c8bca9]">
                I agree to the{" "}
                <Link href="/trade-terms" className="text-[#d2ae6d] transition-colors hover:underline">
                  Trade Terms &amp; Conditions
                </Link>{" "}
                and consent to receiving architectural updates.
              </label>
            </div>

            {error ? <p className="text-sm text-red-400">{error}</p> : null}

            <button
              type="submit"
              disabled={isEmailLoading || isGoogleLoading}
              className="mt-2 w-full bg-[#c8a15d] py-5 text-sm tracking-[0.16em] text-[#1a1611] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#ddb978] active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isEmailLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </button>

            <div className="flex items-center gap-4 py-1">
              <div className="h-px grow bg-[#3a3126]" />
              <span className="text-[10px] tracking-[0.16em] text-[#9f927e]">OR</span>
              <div className="h-px grow bg-[#3a3126]" />
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isEmailLoading || isGoogleLoading}
              className="flex w-full items-center justify-center gap-3 bg-[#f5f1ea] py-4 text-sm tracking-[0.12em] text-[#171411] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#ebe2d6] active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              {isGoogleLoading ? "CONNECTING GOOGLE..." : "LOGIN WITH GOOGLE"}
            </button>
          </form>

          <div className="border-t border-[#3a3126] pt-8 text-center text-base text-[#c8bca9]">
            Already have an account?
            <Link
              href={loginHref}
              className="ml-2 inline-block font-semibold text-[#d2ae6d] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:underline active:translate-y-0 active:scale-[0.99]"
            >
              Log In
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
