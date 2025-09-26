import HeroSection from '@/components/sections/hero';
import ProjectsSection from '@/components/sections/projects';
import AboutSection from '@/components/sections/about';
import ContactSection from '@/components/sections/contact';
import TestimonialsSection from '@/components/sections/testimonials';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
