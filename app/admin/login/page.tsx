"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LogoMark } from "@/components/logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const from = search.get("from") || "/admin";

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Wrong password.");
        setLoading(false);
        return;
      }
      router.replace(from.startsWith("/admin") ? from : "/admin");
      router.refresh();
    } catch {
      setError("Network failed. Try again.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-hero-radial text-white">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-12">
        <div className="mb-8 flex items-center gap-2 text-white">
          <LogoMark className="h-8 w-8" />
          <span className="text-xl font-semibold tracking-tight">Moveasy admin</span>
        </div>
        <h1 className="text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
          Sign in.
        </h1>
        <p className="mt-2 text-sm text-white/65">
          Enter the admin password to view waitlist data.
        </p>

        <form onSubmit={onSubmit} className="glass shadow-glass mt-8 rounded-3xl p-5">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              Password
            </span>
            <input
              type="password"
              autoComplete="current-password"
              autoFocus
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-5 text-base text-white placeholder:text-white/55 focus:border-white/30 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-white/15 transition disabled:opacity-60"
            />
          </label>

          {error && (
            <p role="alert" className="mt-3 text-sm text-rose-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="mt-5 h-12 w-full rounded-2xl bg-white text-sm font-medium text-navy transition hover:bg-accent hover:text-ink disabled:cursor-not-allowed disabled:bg-white/80"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
