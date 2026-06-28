import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "./nav";
import { Footer } from "./footer";
import { PageIllustration, type IllustrationKind } from "./page-illustration";

export function PageShell({
  title,
  intro,
  illustration,
  children,
}: {
  title: string;
  intro?: string;
  illustration?: IllustrationKind;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-navy-900 text-white">
      <Nav />
      <section className="relative isolate overflow-hidden bg-hero-radial pb-16 pt-28 sm:pt-36">
        <div aria-hidden className="absolute inset-0 grid-floor" />
        {/* Large blended background illustration (transparent + soft) */}
        {illustration && (
          <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <PageIllustration kind={illustration} variant="background" />
          </div>
        )}
        <div className="relative z-10 mx-auto max-w-3xl px-5">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back to home
          </Link>
          <div className="relative mt-6">
            <h1 className="max-w-xl text-balance pr-0 text-4xl font-medium leading-tight tracking-tight sm:pr-48 sm:text-5xl lg:pr-64">
              {title}
            </h1>
            {intro && (
              <p className="mt-5 max-w-2xl text-pretty pr-0 text-base text-white/75 sm:text-lg">
                {intro}
              </p>
            )}
          </div>
        </div>
      </section>

      <article className="prose-moveasy mx-auto max-w-3xl px-5 py-16 sm:py-20">
        {children}
      </article>

      <Footer />
    </main>
  );
}

export function makeMetadata(title: string, description: string): Metadata {
  return {
    title: `${title} | Moveasy`,
    description,
    openGraph: { title: `${title} | Moveasy`, description },
  };
}
