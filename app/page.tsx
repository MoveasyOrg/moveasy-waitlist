import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { WhatsappDemo } from "@/components/whatsapp-demo";
import { WhyMoveasy } from "@/components/why-moveasy";
import {
  PhotoBookingFeature,
  FareSplitFeature,
} from "@/components/feature-sections";
import { Coverage } from "@/components/coverage";
import { EarlyPartners } from "@/components/early-partners";
import { Footer } from "@/components/footer";
import { Bridge, COLORS } from "@/components/bridge";

export const revalidate = 60;

export default function Page() {
  return (
    <main className="min-h-screen bg-navy-900 text-white">
      <Nav />
      <Hero />
      <WhatsappDemo />
      <Bridge from={COLORS.navyDeep} to="#EFEAFB" height={40} />
      <PhotoBookingFeature />
      <Bridge from="#EFEAFB" to="#FCF5E2" height={32} />
      <FareSplitFeature />
      <Bridge from="#FCF5E2" to={COLORS.paper} height={32} />
      <WhyMoveasy />
      <Bridge from={COLORS.paper} to={COLORS.navy} height={40} />
      <Coverage />
      <EarlyPartners />
      <Bridge from={COLORS.navy} to={COLORS.navyDeep} height={40} />
      <Footer />
    </main>
  );
}
