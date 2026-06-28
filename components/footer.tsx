import Link from "next/link";
import { LogoMark } from "./logo";

type Column = {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
};

const columns: Column[] = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];

const socials: { label: string; href: string; icon: React.ReactNode }[] = [
  {
    label: "X",
    href: "https://x.com/moveasyhq",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2H21.5l-7.5 8.59L22.75 22h-6.93l-5.43-7.09L4.13 22H.87l8.04-9.2L1.25 2h7.1l4.9 6.5L18.244 2Zm-1.215 18h1.92L7.06 4H5.04l11.99 16Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/moveasyhq",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Docs",
    href: "/about",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M8 13h8" />
        <path d="M8 17h6" />
      </svg>
    ),
  },
];

/** Subtle road + cars that fades into the partner section above and footer below. */
function FooterRoad() {
  const path =
    "M -50 180 C 150 120, 350 220, 540 150, 720 80, 900 180, 1100 120, 1300 60";

  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-8 h-52 overflow-hidden">
      <svg
        viewBox="0 0 1200 240"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full opacity-70"
      >
        <defs>
          <linearGradient id="footerFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="45%" stopColor="white" stopOpacity="0.35" />
            <stop offset="75%" stopColor="white" stopOpacity="0.7" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="footerRoadMask">
            <rect width="1200" height="240" fill="url(#footerFade)" />
          </mask>
        </defs>

        <g mask="url(#footerRoadMask)">
          <g fill="none" strokeLinecap="round">
            <path d={path} stroke="rgba(42,53,104,0.28)" strokeWidth="36" />
            <path
              d={path}
              stroke="rgba(255,236,170,0.12)"
              strokeWidth="1"
              strokeDasharray="6 10"
            />
          </g>

          <g>
            <g transform="rotate(90)">
              <rect x="-9" y="-15" width="18" height="30" rx="5" fill="#F2A93B" />
              <rect x="-6" y="-8" width="12" height="10" rx="2" fill="rgba(11,18,59,0.55)" />
            </g>
            <animateMotion dur="22s" repeatCount="indefinite" rotate="auto" path={path} />
          </g>
          <g>
            <g transform="rotate(90)">
              <rect x="-9" y="-15" width="18" height="30" rx="5" fill="#FFFFFF" />
              <rect x="-6" y="-8" width="12" height="10" rx="2" fill="rgba(11,18,59,0.6)" />
            </g>
            <animateMotion
              dur="28s"
              repeatCount="indefinite"
              rotate="auto"
              path={path}
              keyTimes="0; 0.55; 0.55; 1"
              keyPoints="0.45; 1; 0; 0.45"
              calcMode="linear"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative -mt-16 overflow-hidden bg-navy-900 pb-10 pt-24 text-white/75 sm:-mt-20 sm:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0a1030] to-navy-900"
      />
      <FooterRoad />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 sm:grid-cols-[1.4fr,1fr,1fr]">
          <div>
            <Link
              href="/"
              aria-label="Moveasy home"
              className="inline-flex items-center gap-2 text-white"
            >
              <LogoMark className="h-8 w-8" />
              <span className="text-xl font-semibold tracking-tight">
                Moveasy
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-white/65">
              Movement Made Easy. Born in Akwa, built for Africa.
            </p>
            <a
              href="mailto:moveasyhq@gmail.com"
              className="mt-4 inline-block text-sm font-medium text-white/80 underline-offset-4 hover:text-white hover:underline"
            >
              moveasyhq@gmail.com
            </a>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => {
                  const isExternal = l.external || /^https?:/.test(l.href);
                  if (isExternal) {
                    return (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-white/80 transition hover:text-white"
                        >
                          {l.label}
                        </a>
                      </li>
                    );
                  }
                  return (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-white/80 transition hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-white/55">
            &copy; {year} Moveasy. All rights reserved.
          </p>
          <ul className="flex items-center gap-2">
            {socials.map((s) => {
              const isExternal = /^https?:/.test(s.href);
              const className =
                "grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/5 text-white/85 transition hover:border-white/30 hover:bg-white/10 hover:text-white";
              return (
                <li key={s.label}>
                  {isExternal ? (
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className={className}
                    >
                      {s.icon}
                    </a>
                  ) : (
                    <Link href={s.href} aria-label={s.label} className={className}>
                      {s.icon}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
