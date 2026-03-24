import HeroSection from '@/components/sections/hero';
import ProjectsSection from '@/components/sections/projects';
import SkillsSection from '@/components/sections/skills';
import AboutSection from '@/components/sections/about';
import ContactSection from '@/components/sections/contact';
import TestimonialsSection from '@/components/sections/testimonials';
import CodingStatsSection from '@/components/sections/coding-stats';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <CodingStatsSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
