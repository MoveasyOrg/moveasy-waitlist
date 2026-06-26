import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { WhatsappDemo } from "@/components/whatsapp-demo";
import { WhyMoveasy } from "@/components/why-moveasy";
import { Coverage } from "@/components/coverage";
import { Founders } from "@/components/founders";
import { Footer } from "@/components/footer";
import { getSupabase, hasServiceRole } from "@/lib/supabase";

export const revalidate = 60;

async function getInitialCount(): Promise<number> {
  const baseline = Number(process.env.NEXT_PUBLIC_WAITLIST_BASELINE ?? "128");
  const sb = getSupabase();
  if (!sb || !hasServiceRole()) return baseline;
  const { count } = await sb
    .from("waitlist")
    .select("*", { count: "exact", head: true });
  return Math.max(baseline, count ?? 0);
}

export default async function Page() {
  const initialCount = await getInitialCount();
  const launchAt =
    process.env.NEXT_PUBLIC_LAUNCH_AT ?? "2026-09-01T08:00:00.000Z";

  return (
    <main className="min-h-screen bg-navy-900 text-white">
      <Nav />
      <Hero initialCount={initialCount} launchAt={launchAt} />
      <WhatsappDemo />
      <WhyMoveasy />
      <Coverage />
      <Founders />
      <Footer />
    </main>
  );
}
