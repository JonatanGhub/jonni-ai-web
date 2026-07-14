import { SiteNav } from '@/components/site-nav';
import { Hero } from '@/components/sections/hero';
import { Manifesto } from '@/components/sections/manifesto';
import { Now } from '@/components/sections/now';
import { Projects } from '@/components/sections/projects';
import { Path } from '@/components/sections/path';
import { Stack } from '@/components/sections/stack';
import { Method } from '@/components/sections/method';
import { Cta } from '@/components/sections/cta';
import { SiteFooter } from '@/components/site-footer';

export default function Page() {
  return (
    <>
      <SiteNav />
      <main className="relative z-10">
        <Hero />
        <Manifesto />
        <Now />
        <Projects />
        <Path />
        <Stack />
        <Method />
        <Cta />
      </main>
      <SiteFooter />
    </>
  );
}
