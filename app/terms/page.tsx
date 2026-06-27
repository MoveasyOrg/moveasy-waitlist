import { PageShell, makeMetadata } from "@/components/page-shell";

export const metadata = makeMetadata(
  "Terms & Conditions",
  "The terms of using Moveasy.",
);

export default function TermsPage() {
  return (
    <PageShell
      title="Terms & Conditions"
      intro="Last updated: June 2026. This is a placeholder while we finalise with counsel. Reach us at moveasyhq@gmail.com with any questions."
    >
      <h2>Who we are</h2>
      <p>
        Moveasy is operated by the Moveasy team out of Awka, Anambra,
        Nigeria. By using the service you agree to these terms.
      </p>

      <h2>Using Moveasy</h2>
      <ul>
        <li>You must be 18 or older to book a ride.</li>
        <li>You agree to give accurate information when requesting a trip.</li>
        <li>You agree to treat drivers and other passengers with respect.</li>
      </ul>

      <h2>Payments and fees</h2>
      <p>
        Fares are quoted in the chat before you confirm a ride. Surge
        pricing, if any, is shown in the quote, not added on after.
        Disputes are handled by replying to the booking thread.
      </p>

      <h2>Cancellations</h2>
      <p>
        You can cancel a ride free of charge until the driver is two
        minutes from pickup. After that a small cancellation fee applies
        to compensate the driver for fuel and time.
      </p>

      <h2>Liability</h2>
      <p>
        Moveasy connects passengers with independent drivers. We vet and
        verify the drivers we work with, but you accept that road travel
        carries inherent risk. Our liability is limited to the value of
        the trip in question, except where the law says otherwise.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms as the product evolves. We will update
        the &ldquo;Last updated&rdquo; date and let you know if anything
        material changes.
      </p>
    </PageShell>
  );
}
