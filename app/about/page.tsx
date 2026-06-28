import { PageShell, makeMetadata } from "@/components/page-shell";

export const metadata = makeMetadata(
  "About",
  "Why Moveasy exists, who's building it, and where we're headed.",
);

export default function AboutPage() {
  return (
    <PageShell
      title="Movement, made easy."
      intro="Moveasy is a WhatsApp-first mobility platform for Nigeria. Book rides, plan trips, and coordinate the way Africa actually moves. No app, no friction."
      illustration="about"
    >
      <h2>The problem</h2>
      <p>
        Bolt, Uber, and Indrive treat African cities like satellite versions
        of Lagos and Nairobi. The reality is harder: spotty data, two-bar
        networks, drivers who switch between sedans and kekes mid-shift,
        passengers who split fares three ways and pay in mixed methods.
      </p>
      <p>
        The product gap is not the brand. It is the surface. Mobile apps
        only work when the network does. WhatsApp works when nothing else
        does.
      </p>

      <h2>What we&rsquo;re building</h2>
      <p>
        A single Moveasy number on WhatsApp that can:
      </p>
      <ul>
        <li>Book a ride from a voice note, a pin, or a photo of where you&rsquo;re going.</li>
        <li>Split fares with the friend you&rsquo;re going to meet.</li>
        <li>Coordinate office staff transport without a separate dashboard.</li>
        <li>Plan multi-leg trips: airport pickup, hotel, mall, return.</li>
      </ul>
      <p>
        The native app comes later, for power users who want a richer
        surface. The default surface is the chat you already have open.
      </p>

      <h2>Where we&rsquo;re starting</h2>
      <p>
        Awka, Anambra. Then Lagos, Abuja, Port Harcourt, Kano. Real
        roads, real drivers, real support before we plant a flag in a
        city.
      </p>

      <h2>Who&rsquo;s building</h2>
      <p>
        Duke (frontend &amp; onchain) and Kris (operations &amp; growth).
        Reachable at <a href="mailto:moveasyhq@gmail.com">moveasyhq@gmail.com</a>.
      </p>
    </PageShell>
  );
}
