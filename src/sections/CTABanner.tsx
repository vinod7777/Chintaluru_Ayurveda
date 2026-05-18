import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import BookNowButton from '@/components/BookNowButton';

gsap.registerPlugin(ScrollTrigger);

export default function CTABanner() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-content', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-gold py-12 md:py-14">
      <div className="content-max">
        <div className="cta-content flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="font-display font-semibold text-xl md:text-2xl lg:text-[28px] text-forest text-center md:text-left">
            Your First Step Towards True Health And Happiness Starts Here
          </h2>
          <BookNowButton
            label="Book Now"
            className="shrink-0 inline-flex items-center gap-2 bg-forest text-linen font-body font-semibold text-xs md:text-sm px-8 py-3.5 rounded-pill hover:bg-[#2A4535] transition-colors"
          />
        </div>
      </div>
    </section>
  );
}
