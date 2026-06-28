"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

export function CityCombobox({
  value,
  onChange,
  options,
  disabled,
  placeholder = "Your city",
  className = "",
}: {
  value: string;
  onChange: (next: string) => void;
  options: string[];
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const [highlight, setHighlight] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Keep query in sync when the parent value changes (e.g. on reset)
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.toLowerCase().includes(q));
  }, [options, query]);

  const showOptions = open && filtered.length > 0;

  // Scroll the highlighted option into view
  useEffect(() => {
    if (!showOptions) return;
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-idx="${highlight}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [highlight, showOptions]);

  const choose = (next: string) => {
    onChange(next);
    setQuery(next);
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <input
        type="text"
        role="combobox"
        autoComplete="off"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-autocomplete="list"
        placeholder={placeholder}
        disabled={disabled}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(e.target.value);
          setOpen(true);
          setHighlight(0);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            setHighlight((h) => Math.min(h + 1, filtered.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlight((h) => Math.max(h - 1, 0));
          } else if (e.key === "Enter" && showOptions) {
            e.preventDefault();
            choose(filtered[highlight]);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        className="h-12 w-full rounded-2xl bg-white/5 px-5 pr-10 text-base text-white placeholder:text-white/55 border border-white/10 focus:border-white/30 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-white/15 transition disabled:opacity-60"
      />
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/55 transition-transform ${open ? "rotate-180" : ""}`}
        aria-hidden
      >
        <path d="m6 9 6 6 6-6" />
      </svg>

      {showOptions && (
        <ul
          id={`${id}-list`}
          ref={listRef}
          role="listbox"
          className="absolute left-0 right-0 top-full z-30 mt-2 max-h-64 overflow-y-auto rounded-2xl border border-white/12 bg-navy-900/95 p-1 shadow-[0_18px_50px_-12px_rgba(6,9,32,0.7)] backdrop-blur-xl"
        >
          {filtered.map((opt, i) => {
            const active = i === highlight;
            return (
              <li
                key={opt}
                role="option"
                data-idx={i}
                aria-selected={active}
                onMouseDown={(e) => {
                  e.preventDefault();
                  choose(opt);
                }}
                onMouseEnter={() => setHighlight(i)}
                className={`cursor-pointer rounded-xl px-4 py-2 text-sm transition ${
                  active ? "bg-white/12 text-white" : "text-white/80"
                }`}
              >
                {opt}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
