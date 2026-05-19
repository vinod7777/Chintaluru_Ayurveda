import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Stethoscope, Leaf, BookOpen, Heart } from 'lucide-react';

import BookNowButton from '@/components/BookNowButton';
import BotanicalDecor from '@/components/BotanicalDecor';
import TiltCard from '@/components/TiltCard';
import MagneticButton from '@/components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Stethoscope,
    title: 'Experienced Doctors & Therapists',
    description: 'Our team brings years of clinical expertise in traditional Ayurvedic medicine.',
  },
  {
    icon: Leaf,
    title: 'Reinstating Organic Lifestyle',
    description: 'We believe in the power of an organic lifestyle and natural remedies for sustainable health.',
  },
  {
    icon: BookOpen,
    title: 'Integrated & Traditional Approach',
    description: 'Combining ancient Ayurvedic wisdom with modern diagnostic precision.',
  },
  {
    icon: Heart,
    title: 'Personalized Care With Natural Remedies',
    description: 'Every treatment is tailored to your unique body constitution and health needs.',
  },
];

export default function WhyChooseSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.why-header', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      gsap.from('.feature-card', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.features-grid',
          start: 'top 80%',
          once: true,
        },
      });

      gsap.from('.why-cta', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.why-cta',
          start: 'top 90%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-24 lg:py-28 overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/specialties-bg.jpg"
          alt="Ayurvedic herbs background"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-forest/80" />
      </div>

      {/* Cursor-interactive botanical layer (sits above bg image, below content) */}
      <BotanicalDecor variant="mixed" density="medium" colorClass="text-gold" />

      <div className="content-max relative z-10">
        {/* Header */}
        <div className="why-header text-center mb-12 md:mb-16">
          <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-[40px] text-linen mb-4">
            Why Choose Chintaluru Ayurveda?
          </h2>
          <p className="font-body text-linen/80 max-w-2xl mx-auto">
            Here is what makes us the trusted choice for Ayurvedic healing in Visakhapatnam.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="features-grid grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, i) => (
            <TiltCard
              key={i}
              className="feature-card rounded-2xl"
              max={5}
            >
              <div className="group bg-linen/[0.12] backdrop-blur-md border border-gold/20 rounded-2xl p-8 transition-colors duration-300 hover:bg-linen/[0.18] h-full">
                <feature.icon size={28} className="text-gold mb-4" />
                <h3 className="font-display font-semibold text-lg text-linen mb-3">
                  {feature.title}
                </h3>
                <p className="font-body text-sm text-linen/75 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* CTA */}
        <div className="why-cta text-center mt-12">
          <MagneticButton strength={10}>
            <BookNowButton
              label="Book An Appointment"
              className="inline-flex items-center gap-2 bg-gold text-white font-body font-semibold text-sm px-10 py-4 rounded-pill hover:bg-[#D4B76A] hover:shadow-gold-glow transition-all duration-300"
            />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
