"use client";

import { useState } from "react";
import { Toast, type ToastTone } from "./toast";

type Status = "idle" | "loading" | "success" | "error";

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path
        d="M21 12a9 9 0 0 1-9 9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [toast, setToast] = useState<{ message: string; tone: ToastTone } | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string; duplicate?: boolean };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setToast({
          message: data.error ?? "Something blocked your signup. Try again.",
          tone: "error",
        });
        return;
      }
      setStatus("success");
      setToast({
        message: data.duplicate
          ? "You're already on the list. We'll be in touch."
          : "You're on the list. Watch your inbox.",
        tone: "success",
      });
      setEmail("");
    } catch {
      setStatus("error");
      setToast({ message: "Network failed. Try again.", tone: "error" });
    }
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="glass shadow-glass mx-auto flex w-full max-w-md items-center gap-2 rounded-full p-2"
      >
        <input
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
          disabled={status === "loading"}
          className="h-12 flex-1 min-w-0 rounded-full bg-transparent px-5 text-base text-white placeholder:text-white/55 focus:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="grid h-12 shrink-0 grid-flow-col items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-navy transition hover:bg-accent hover:text-ink disabled:cursor-not-allowed disabled:bg-white/85"
          aria-busy={status === "loading"}
        >
          {status === "loading" ? (
            <>
              <Spinner />
              <span>Joining</span>
            </>
          ) : (
            <span>Join Waitlist</span>
          )}
        </button>
      </form>

      <Toast
        message={toast?.message ?? null}
        tone={toast?.tone ?? "success"}
        onDismiss={() => setToast(null)}
      />
    </>
  );
}
