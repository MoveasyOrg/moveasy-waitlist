"use client";

const founders = [
  {
    name: "Duke",
    role: "Co-founder. Frontend and onchain.",
    handle: "@dukeofdev",
    href: "https://x.com/dukeofdev",
  },
  {
    name: "Kris",
    role: "Co-founder. Ops and growth.",
    handle: "@kris",
    href: "https://x.com/kris",
  },
];

export function Founders() {
  return (
    <section className="bg-paper py-20 text-ink sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-xs uppercase tracking-[0.24em] text-navy/70">
          Building it
        </p>
        <h2 className="mt-3 text-balance text-3xl font-medium leading-tight sm:text-4xl">
          Two people. One stubborn idea.
        </h2>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {founders.map((f) => (
            <li
              key={f.name}
              className="flex items-center justify-between rounded-3xl border border-navy/10 bg-white p-6"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-navy font-display text-xl text-white">
                  {f.name[0]}
                </span>
                <div>
                  <p className="text-base font-medium">{f.name}</p>
                  <p className="text-sm text-ink/65">{f.role}</p>
                </div>
              </div>
              <a
                href={f.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-navy/15 px-3 py-1.5 text-xs font-medium text-navy transition hover:border-navy/40"
              >
                {f.handle}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
