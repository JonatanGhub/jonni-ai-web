import { SiteNav } from '@/components/site-nav';
import { TerminalIntro } from '@/components/terminal-intro';
import { Hero } from '@/components/sections/hero';
import { PromiseSection } from '@/components/sections/promise';
import { Manifesto } from '@/components/sections/manifesto';
import { Capabilities } from '@/components/sections/capabilities';
import { Now } from '@/components/sections/now';
import { Projects } from '@/components/sections/projects';
import { Path } from '@/components/sections/path';
import { Stack } from '@/components/sections/stack';
import { Method } from '@/components/sections/method';
import { Contact } from '@/components/sections/contact';
import { SiteFooter } from '@/components/site-footer';

export default function Page() {
  return (
    <>
      <SiteNav />
      <main className="relative z-10">
        <TerminalIntro />
        <Hero />
        <PromiseSection />
        <Manifesto />
        <Capabilities />
        <Now />
        <Projects />
        <Path />
        <Stack />
        <Method />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
