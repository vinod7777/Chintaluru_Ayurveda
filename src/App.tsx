import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CursorFollower from './components/CursorFollower';
import WhatsAppButton from '@/components/WhatsAppButton';
import IntroOverlay from '@/components/IntroOverlay';
import FloatingLeaves from '@/components/FloatingLeaves';

import HeroSection from '@/sections/HeroSection';
import InfoBar from '@/sections/InfoBar';
import AboutSection from '@/sections/AboutSection';
import ServicesSection from '@/sections/ServicesSection';
import ConditionsSection from '@/sections/ConditionsSection';
import TherapiesSection from '@/sections/TherapiesSection';
import WhyChooseSection from '@/sections/WhyChooseSection';
import DoshaQuizSection from '@/sections/DoshaQuizSection';
import TestimonialsSection from '@/sections/TestimonialsSection';
import CTABanner from '@/sections/CTABanner';
import ContactSection from '@/sections/ContactSection';
import GallerySection from '@/sections/GallerySection';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll and connect it to GSAP ScrollTrigger
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    // Use requestAnimationFrame loop for Lenis
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Proxy scroll methods so ScrollTrigger uses Lenis for scroll position
    const scroller = (document.scrollingElement || document.documentElement) as any;
    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value?: number) {
        if (typeof value === 'number') {
          // jump instantly when ScrollTrigger tries to set scrollTop
          try {
            (lenis as any).scrollTo?.(value, { immediate: true });
          } catch (e) {
            // fallback
            (lenis as any).scroll?.to?.(value);
          }
        }
        // return current scroll position
        // @ts-ignore - access internal instance
        const current = (lenis as any).scroll && (lenis as any).scroll.instance ? (lenis as any).scroll.instance.scroll.y : scroller.scrollTop;
        return typeof current === 'number' ? current : scroller.scrollTop;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight } as DOMRect;
      },
      // pinType based on transform support
      pinType: scroller.style.transform ? 'transform' : 'fixed',
    });

    // Update ScrollTrigger on Lenis RAF and when refreshed
    lenis.on('scroll', ScrollTrigger.update);
    const onRefresh = () => {
      if (typeof (lenis as any).update === 'function') {
        (lenis as any).update();
      } else if (typeof (lenis as any).raf === 'function') {
        // call raf once to sync
        (lenis as any).raf(performance.now());
      }
    };
    ScrollTrigger.addEventListener('refresh', onRefresh);
    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(rafId);
      try {
        lenis.destroy();
      } catch (e) {
        // ignore
      }
      ScrollTrigger.removeEventListener('refresh', onRefresh);
    };
  }, []);

  return (
    <div className="relative">
      <FloatingLeaves />
      <CursorFollower />
      <IntroOverlay />
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <GallerySection />
        <InfoBar />
        <AboutSection />
        <ServicesSection />
        <ConditionsSection />
        <TherapiesSection />
        <WhyChooseSection />
        <DoshaQuizSection />
        <TestimonialsSection />
        <CTABanner />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
