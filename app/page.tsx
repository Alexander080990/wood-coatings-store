import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ShadeStudio from '@/components/ShadeStudio';
import SystemsSection from '@/components/SystemsSection';
import CatalogSection from '@/components/CatalogSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <ShadeStudio />
      <SystemsSection />
      <CatalogSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
