import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

import BookNowButton from '@/components/BookNowButton';
import BotanicalDecor from '@/components/BotanicalDecor';

gsap.registerPlugin(ScrollTrigger);

const conditions = [
  {
    image: '/images/parenthood.jpg',
    title: 'Parenthood Support',
    description: 'Struggling to become a parent? Ayurveda focuses on restoring balance and harmony in your body, with personalized treatments to address underlying fertility issues.',
  },
  {
    image: '/images/back-pain.jpg',
    title: 'Back Pain Treatment',
    description: 'Suffering from chronic back pain? Our Ayurvedic therapies offer proven treatments to strengthen and align your spine, providing lasting relief.',
  },
  {
    image: '/images/gastric.jpg',
    title: 'Gastrointestinal Care',
    description: 'Frequent digestive issues? Ayurveda is known for its powerful digestive treatments. Whether it is bloating, indigestion, or IBS, our personalized solutions restore health naturally.',
  },
  {
    image: '/images/arthritis.jpg',
    title: 'Osteoarthritis & Joint Health',
    description: 'Feeling the strain on your joints? Ayurveda helps regenerate the strength of your joints, especially in the early stages of osteoarthritis. Our holistic treatments can relieve pain and promote mobility.',
  },
];

export default function ConditionsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.condition-card', {
        y: 40,
        opacity: 0,
        immediateRender: false,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.conditions-grid',
          start: 'top 80%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-linen pb-20 md:pb-24 lg:pb-28">
      <BotanicalDecor variant="medicine" density="medium" colorClass="text-gold" />
      <div className="content-max relative z-10">
        <div className="conditions-grid grid grid-cols-1 lg:grid-cols-2 gap-6">
          {conditions.map((condition, i) => (
            <div
              key={i}
              className="condition-card group bg-white rounded-3xl overflow-hidden shadow-card border-l-[3px] border-l-gold hover:shadow-card-hover hover:-translate-y-3 transition-all duration-400 transform-gpu cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={condition.image}
                  alt={condition.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="flex h-full flex-col p-6 md:p-7">
                <h3 className="font-display font-semibold text-2xl text-forest mb-3">
                  {condition.title}
                </h3>
                <div className="w-8 h-[2px] bg-gold mb-4" />
                <p className="font-body text-base text-charcoal leading-relaxed mb-6 flex-1">
                  {condition.description}
                </p>
                <div className="flex items-center gap-3">
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
