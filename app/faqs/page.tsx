import { PageShell, makeMetadata } from "@/components/page-shell";

export const metadata = makeMetadata(
  "FAQs",
  "Common questions about Moveasy: how it works, coverage, pricing, and safety.",
);

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "Do I need to install anything?",
    a: "No. Open WhatsApp, message the Moveasy number, and you can book a ride. A native app is coming for power users, but the chat is the product.",
  },
  {
    q: "Where are you launching first?",
    a: "Awka, Anambra. Then Lagos, Abuja, Port Harcourt, and Kano in that order.",
  },
  {
    q: "What rides can I book?",
    a: "Sedans and SUVs to start. Kekes and motorbikes follow city by city based on demand. We pair the right vehicle to the trip, not the other way around.",
  },
  {
    q: "How do I pay?",
    a: "Card, bank transfer, or USSD. Cash is supported when the driver opts in. Fare splits with friends work directly from the chat.",
  },
  {
    q: "Will this work on a 2G connection?",
    a: "Yes. WhatsApp text messages land on 2G. That is the whole reason we built this on top of WhatsApp instead of a data-hungry app.",
  },
  {
    q: "Can companies use Moveasy for staff transport?",
    a: "Yes, this is one of our launch use cases. Reach out at moveasyhq@gmail.com and we will set up a shared route for your team.",
  },
  {
    q: "Is it safe?",
    a: "Every driver is verified. Every trip is tracked. You can share a live trip link with a contact from inside the chat.",
  },
  {
    q: "When can I start using it?",
    a: "Join the waitlist on the home page and you will get a message the day we open up your city.",
  },
];

export default function FaqsPage() {
  return (
    <PageShell
      title="Questions, answered."
      intro="If something is not covered here, send us a note at moveasyhq@gmail.com."
    >
      {faqs.map((item) => (
        <div key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
    </PageShell>
  );
}
