"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Counter } from "./counter";

type Status = "idle" | "loading" | "success" | "error";

export function WaitlistForm({ initialCount }: { initialCount: number }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const [count, setCount] = useState(initialCount);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok: boolean; count?: number; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something blocked your signup. Try again.");
        return;
      }
      setStatus("success");
      setMessage("You're on the list. Watch your inbox.");
      if (typeof data.count === "number") setCount(data.count);
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network failed. Try again.");
    }
  }

  return (
    <div className="w-full">
      <form
        onSubmit={onSubmit}
        className="glass shadow-glass mx-auto flex w-full max-w-md items-center gap-1 rounded-full p-1.5"
      >
        <input
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
          className="h-11 flex-1 rounded-full bg-transparent px-5 text-sm text-white placeholder:text-white/60 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-11 rounded-full bg-white px-5 text-sm font-medium text-navy transition hover:bg-accent hover:text-ink disabled:opacity-60"
        >
          {status === "loading" ? "Joining..." : "Join Waitlist"}
        </button>
      </form>

      <div className="mt-4 flex flex-col items-center gap-1 text-center">
        <p className="text-sm text-white/70">
          <Counter target={count} /> people already joined
        </p>
        <AnimatePresence mode="wait">
          {message && (
            <motion.p
              key={message}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={
                status === "success"
                  ? "text-xs text-accent"
                  : "text-xs text-rose-300"
              }
              role={status === "error" ? "alert" : "status"}
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
