import { PageShell, makeMetadata } from "@/components/page-shell";

export const metadata = makeMetadata(
  "Privacy Policy",
  "How Moveasy handles your data.",
);

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      intro="Last updated: June 2026. This is a placeholder while we finalise with counsel. Reach us at moveasyhq@gmail.com with any questions."
      illustration="privacy"
    >
      <h2>What we collect</h2>
      <p>
        When you join the waitlist we collect your email address. When you
        use Moveasy on WhatsApp we collect the messages you send to the
        Moveasy number, the trip details required to dispatch a ride, and
        your approximate location at the time of a booking.
      </p>

      <h2>How we use it</h2>
      <ul>
        <li>To run the service: matching you to a driver, processing payment, sending you a receipt.</li>
        <li>To support you: looking up a past trip when you ask.</li>
        <li>To improve the product: aggregate analytics that never identify you to anyone outside Moveasy.</li>
      </ul>

      <h2>What we do not do</h2>
      <p>
        We do not sell your data. We do not share your WhatsApp messages
        with advertisers. We do not use your location for anything other
        than dispatching the ride you asked for.
      </p>

      <h2>Your rights</h2>
      <p>
        You can request a copy of your data, ask us to delete it, or take
        yourself off the waitlist at any time by emailing{" "}
        <a href="mailto:moveasyhq@gmail.com">moveasyhq@gmail.com</a>.
      </p>

      <h2>Where the data lives</h2>
      <p>
        Waitlist data is stored in Supabase (EU region). Trip data is
        stored on infrastructure we operate in compliance with the
        Nigeria Data Protection Regulation.
      </p>

      <h2>Changes</h2>
      <p>
        If we change this policy we will update the &ldquo;Last
        updated&rdquo; date above and email anyone with an active account.
      </p>
    </PageShell>
  );
}
