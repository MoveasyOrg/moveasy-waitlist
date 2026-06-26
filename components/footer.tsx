import { LogoMark } from "./logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-900 py-12 text-white/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-navy">
            <LogoMark className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display text-lg text-white leading-none">Moveasy</p>
            <p className="text-xs">Movement Made Easy</p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <a href="https://x.com/moveasyhq" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            X
          </a>
          <a href="https://wa.me/2348000000000" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            WhatsApp
          </a>
          <a href="https://github.com/moveasyhq" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            GitHub
          </a>
          <a href="mailto:hello@moveasy.africa" className="hover:text-white">
            hello@moveasy.africa
          </a>
        </nav>

        <p className="text-xs text-white/50">
          &copy; {year} Moveasy. Awka, Nigeria.
        </p>
      </div>
    </footer>
  );
}
