import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

import BookNowButton from '@/components/BookNowButton';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    image: '/images/service-pain.jpg',
    title: 'Pain Relief',
    description: 'Struggling with back pain, knee pain, or arthritis? Our specialized treatments target the root cause using herbal remedies and therapeutic massages for long-term relief.',
  },
  {
    image: '/images/service-weight.jpg',
    title: 'Weight Loss Treatment',
    description: 'Battling weight issues? Ayurveda focuses on a holistic approach to weight management, addressing underlying causes such as digestion, metabolism, and stress.',
  },
  {
    image: '/images/service-stress.jpg',
    title: 'Stress Relief',
    description: 'Feeling overwhelmed? Our Ayurvedic stress relief treatments help reduce mental clutter, promote relaxation, and restore mental clarity through natural therapies.',
  },
  {
    image: '/images/service-hair.jpg',
    title: 'Hair Fall Treatment',
    description: 'Worried about hair fall and thinning? We offer the best Ayurvedic hair treatment designed to strengthen and revitalize your hair naturally.',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.services-header', {
        y: 30,
        opacity: 0,
        immediateRender: false,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      gsap.from('.service-card', {
        y: 50,
        opacity: 0,
        immediateRender: false,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 80%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="bg-linen py-20 md:py-24 lg:py-28">
      <div className="content-max">
        {/* Section Header */}
        <div className="services-header text-center mb-12 md:mb-16">
          <span className="label-style mb-3 block">SPECIALIZED SERVICES</span>
          <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-[40px] text-forest mb-4">
            Conditions We Treat With Care
          </h2>
          <p className="font-body text-charcoal max-w-2xl mx-auto">
            Personalized Ayurvedic treatments addressing the root cause, not just symptoms.
          </p>
        </div>

        {/* Service Cards */}
        <div className="services-grid grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className="service-card group bg-white rounded-3xl overflow-hidden shadow-card border border-gold/[0.08] hover:shadow-card-hover hover:-translate-y-3 transition-all duration-400 transform-gpu cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="flex h-full flex-col p-7 md:p-8">
                <h3 className="font-display font-semibold text-2xl text-forest mb-3">
                  {service.title}
                </h3>
                <div className="w-8 h-[2px] bg-gold mb-4" />
                <p className="font-body text-base text-charcoal leading-relaxed mb-6 flex-1">
                  {service.description}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <BookNowButton
                    label="Book Now"
                    className="inline-flex items-center gap-2 bg-gold text-white font-body font-semibold text-xs px-5 py-3 rounded-pill hover:bg-[#D4B76A] hover:shadow-gold-glow transition-all duration-300"
                  />
                  <span className="inline-flex items-center gap-1.5 font-body font-semibold text-xs text-gold tracking-wider uppercase group-hover:gap-2.5 transition-all">
                    Read More
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
