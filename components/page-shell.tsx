import type { Metadata } from "next";
import { Nav } from "./nav";
import { Footer } from "./footer";

export function PageShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-navy-900 text-white">
      <Nav />
      <section className="relative isolate overflow-hidden bg-hero-radial pb-16 pt-32 sm:pt-40">
        <div aria-hidden className="absolute inset-0 grid-floor" />
        <div className="relative mx-auto max-w-3xl px-5">
          <h1 className="text-balance text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-5 max-w-2xl text-pretty text-base text-white/75 sm:text-lg">
              {intro}
            </p>
          )}
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
