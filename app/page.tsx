import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { WhatsappDemo } from "@/components/whatsapp-demo";
import { WhyMoveasy } from "@/components/why-moveasy";
import {
  VoiceBookingFeature,
  PhotoBookingFeature,
  FareSplitFeature,
} from "@/components/feature-sections";
import { Coverage } from "@/components/coverage";
import { Footer } from "@/components/footer";
import { Bridge, COLORS } from "@/components/bridge";

export const revalidate = 60;

export default function Page() {
  return (
    <main className="min-h-screen bg-navy-900 text-white">
      <Nav />
      <Hero />
      <Bridge from={COLORS.navyMid} to={COLORS.navyDeep} height={32} />
      <WhatsappDemo />
      <Bridge from={COLORS.navyDeep} to={COLORS.paper} height={40} />
      <WhyMoveasy />
      <VoiceBookingFeature />
      <Bridge from={COLORS.paper} to="#EFEAFB" height={32} />
      <PhotoBookingFeature />
      <Bridge from="#EFEAFB" to="#FCF5E2" height={32} />
      <FareSplitFeature />
      <Bridge from="#FCF5E2" to={COLORS.navy} height={40} />
      <Coverage />
      <Bridge from={COLORS.navy} to={COLORS.navyDeep} height={40} />
      <Footer />
    </main>
  );
}
