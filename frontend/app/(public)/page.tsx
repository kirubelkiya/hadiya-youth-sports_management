import { fetchNews, fetchEvents, fetchYouth, fetchSports, fetchAchievements } from "@/lib/server-api";
import HeroSection from "@/components/home/HeroSection";
import AboutPreview from "@/components/home/AboutPreview";
import YouthSection from "@/components/home/YouthSection";
import SportsSection from "@/components/home/SportsSection";
import NewsSection from "@/components/home/NewsSection";
import EventsSection from "@/components/home/EventsSection";
import AchievementsSection from "@/components/home/AchievementsSection";
import CTASection from "@/components/home/CTASection";

// All data fetched in parallel on the server — zero client-side loading
export default async function HomePage() {
  const [news, events, youthPrograms, sports, achievements] = await Promise.all([
    fetchNews(3),
    fetchEvents(3),
    fetchYouth(3),
    fetchSports(4),
    fetchAchievements(4),
  ]);

  return (
    <>
      <HeroSection />
      <AboutPreview />
      <YouthSection programs={youthPrograms} />
      <SportsSection sports={sports} />
      <NewsSection news={news} />
      <EventsSection events={events} />
      <AchievementsSection achievements={achievements} />
      <CTASection />
    </>
  );
}
