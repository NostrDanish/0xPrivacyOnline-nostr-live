import { useRef, useState } from 'react';
import { useSeoMeta } from '@unhead/react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FeedSection } from '@/components/FeedSection';
import { ToolsSection } from '@/components/ToolsSection';
import { ManifestoSection } from '@/components/ManifestoSection';
import { ComposeSection } from '@/components/ComposeSection';
import { Footer } from '@/components/Footer';

const SECTIONS = ['feed', 'tools', 'manifesto', 'compose'] as const;
type SectionId = typeof SECTIONS[number];

const Index = () => {
  const [activeSection, setActiveSection] = useState<SectionId | undefined>();
  const sectionRefs = useRef<Record<SectionId, HTMLElement | null>>({
    feed: null,
    tools: null,
    manifesto: null,
    compose: null,
  });

  useSeoMeta({
    title: '0xPrivacy — Sovereign Nostr Client',
    description:
      'A censorship-resistant, cypherpunk Nostr client. Privacy. Anonymity. Freedom. No KYC. No surveillance. Build it. Ship it. Stay free.',
  });

  const scrollToSection = (section: string) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(section as SectionId);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header activeSection={activeSection} onNavigate={scrollToSection} />

      <main>
        {/* Hero — full viewport */}
        <HeroSection onNavigate={scrollToSection} />

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent mx-8" />

        {/* Feed */}
        <FeedSection id="feed" />

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent mx-8" />

        {/* Tools */}
        <ToolsSection id="tools" />

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent mx-8" />

        {/* Manifesto */}
        <ManifestoSection id="manifesto" />

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent mx-8" />

        {/* Compose / Broadcast */}
        <ComposeSection id="compose" />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
