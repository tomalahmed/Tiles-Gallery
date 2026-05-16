"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LoginForm({ nextPath = "/" }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const registerHref = `/register?next=${encodeURIComponent(nextPath)}`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsEmailLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      const response = await authClient.signIn.email({ email, password });

      if (response.error) {
        setError(response.error.message || "Unable to sign in.");
        setIsEmailLoading(false);
        return;
      }

      router.push(nextPath);
      router.refresh();
    } catch {
      setError("Sign in failed. Please try again.");
      setIsEmailLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setIsGoogleLoading(true);

    try {
      const response = await authClient.signIn.social({
        provider: "google",
        callbackURL: nextPath || "/",
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
    <main className="relative flex min-h-screen w-full bg-[#0d0c0c] text-[#f4efe7]">
      <div className="relative hidden min-h-screen w-1/2 overflow-hidden lg:block">
        <Image
          src="/login.png"
          alt="Luxury architectural surface pattern"
          fill
          priority
          sizes="50vw"
          className="object-cover grayscale opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#070707]/90 via-[#0d0d0f]/45 to-transparent" />
        <div className="absolute bottom-0 left-0 z-10 max-w-xl p-10 xl:p-16">
          <h1 className="mb-5 text-5xl font-light leading-tight text-white">
            Mastery in
            <br />
            Materiality.
          </h1>
          <p className="max-w-md text-base leading-7 text-[#d7cab9]">
            Access our curated collection of architectural surfaces designed for the modern visionary.
          </p>
        </div>
      </div>

      <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-5 py-10 sm:px-8 lg:w-1/2">
        <div className="absolute inset-0 lg:hidden">
          <Image
            src="/login.png"
            alt="Luxury architectural surface pattern"
            fill
            sizes="100vw"
            className="object-cover opacity-30 grayscale"
          />
          <div className="absolute inset-0 bg-[#0c0b0b]/80" />
        </div>

        <div className="relative z-10 w-full max-w-[440px] border border-[#7d6438]/35 bg-linear-to-b from-[#130f0f]/72 to-[#0f0d0d]/72 p-8 shadow-[0_24px_85px_rgba(0,0,0,0.5)] backdrop-blur-xl md:p-12">
          <div className="mb-10">
            <span className="mb-4 block text-xs tracking-[0.22em] text-[#d2ae6d]">WELCOME BACK</span>
            <h2 className="text-4xl font-light text-[#f4efe7]">Architect Login</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="group">
              <label className="mb-2 block text-xs tracking-[0.16em] text-[#c8bca9] transition-colors group-focus-within:text-[#d2ae6d]">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                name="email"
                placeholder="e.g. renzo@piano.com"
                autoComplete="email"
                required
                className="w-full border-x-0 border-b border-t-0 border-[#705d40] bg-transparent py-3 text-base text-[#f4efe7] outline-none transition-colors placeholder:text-[#9f927e] focus:border-[#d2ae6d]"
                disabled={isEmailLoading || isGoogleLoading}
              />
            </div>

            <div className="group">
              <div className="mb-2 flex items-end justify-between">
                <label className="text-xs tracking-[0.16em] text-[#c8bca9] transition-colors group-focus-within:text-[#d2ae6d]">
                  PASSWORD
                </label>
                <Link href="/forgot-password" className="text-[10px] tracking-[0.12em] text-[#b9ac9a] transition-colors hover:text-[#d2ae6d]">
                  FORGOT PASSWORD?
                </Link>
              </div>
              <input
                type="password"
                name="password"
                placeholder="........"
                autoComplete="current-password"
                required
                className="w-full border-x-0 border-b border-t-0 border-[#705d40] bg-transparent py-3 text-base text-[#f4efe7] outline-none transition-colors placeholder:text-[#9f927e] focus:border-[#d2ae6d]"
                disabled={isEmailLoading || isGoogleLoading}
              />
            </div>

            {error ? <p className="text-sm text-red-400">{error}</p> : null}

            <div className="space-y-5 pt-2">
              <button
                type="submit"
                disabled={isEmailLoading || isGoogleLoading}
                className="w-full bg-[#c8a15d] py-4 text-sm tracking-[0.18em] text-[#1a1611] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#ddb978] active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isEmailLoading ? "SIGNING IN..." : "LOG INTO ACCOUNT"}
              </button>

              <div className="flex items-center gap-4 py-1">
                <div className="h-px grow bg-[#3a3126]" />
                <span className="text-[10px] tracking-[0.16em] text-[#9f927e]">OR</span>
                <div className="h-px grow bg-[#3a3126]" />
              </div>

              <Link
                href={registerHref}
                className="block w-full border border-[#65533a] bg-transparent py-4 text-center text-sm tracking-[0.18em] text-[#f4efe7] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#d2ae6d] hover:text-[#d2ae6d] active:translate-y-0 active:scale-[0.99]"
              >
                CREATE AN ACCOUNT
              </Link>

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
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-[#c8bca9]">
            Are you a trade professional?{" "}
            <Link
              href="/trade-access"
              className="border-b border-[#d2ae6d]/45 text-[#d2ae6d] transition-colors hover:border-[#d2ae6d]"
            >
              Request trade access
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
