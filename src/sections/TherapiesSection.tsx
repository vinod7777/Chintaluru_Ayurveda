import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import BookNowButton from '@/components/BookNowButton';
import { BOOKING_MESSAGE } from '@/lib/booking';

gsap.registerPlugin(ScrollTrigger);

const therapies = [
  {
    image: '/images/therapy-rejuvenation.jpg',
    title: 'Rejuvenation & Relaxation Massage',
    description: 'Ayurvedic therapies treat the body and mind, stimulating immunity and slowing degeneration. Our rejuvenation and relaxation massage is a head-to-toe therapy with herbal steam, excellent for overcoming body stress and muscular problems.',
  },
  {
    image: '/images/therapy-abhyangam.jpg',
    title: 'Abhyangam',
    description: 'Abhyangam means anointing the whole body with warm medicated oil. The word literally means "motion in different directions." Regular Abhyangam enhances proper blood circulation, increases immunity, improves complexion, prevents early degeneration and relaxes the mind.',
  },
  {
    image: '/images/therapy-kizhi.jpg',
    title: 'Abhyangam with Kizhi',
    description: 'This is very effective for relieving spasm and stiffness of muscles, lubricating the joints, strengthening spinal muscles and relieving joint pain especially backache. This therapy enhances peripheral blood circulation, cleanses channels of circulation and detoxifies.',
  },
  {
    image: '/images/therapy-podikizhi.jpg',
    title: 'Choorna Pinda Swedam / Podikizhi',
    description: 'A specialized therapy in which coarse or fine powder of medicinal plants is bundled into a bolus. Sweda means fomentation or sudation. This swedana therapy is commonly used for pain relief and giving strength to tissues, relieving spasms and stiffness.',
  },
  {
    image: '/images/therapy-elakizhi.jpg',
    title: 'Elakizhi / Patra Pinda Sweda',
    description: 'One of the major sudation processes using herbal bundle fomentation. Medicinal leaves are processed in medicated oils, tied in a muslin bag, and applied over the body after dipping in warm medicated oils. Effective in chronic back pain, rheumatic complaints, arthritis and paralysis.',
  },
  {
    image: '/images/therapy-shirodhara.jpg',
    title: 'Shirodhara',
    description: 'Shirodhara is the pouring of medicated lukewarm oil in a steady stream on the upper forehead. It helps relieve symptoms of anxiety, stress, fatigue and hypertension. It regulates mood and gives feelings of pleasure and relaxation.',
  },
];

export default function TherapiesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.therapies-header', {
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

      const rows = gsap.utils.toArray<HTMLElement>('.therapy-row');
      rows.forEach((row, i) => {
        const image = row.querySelector('.therapy-image');
        const text = row.querySelector('.therapy-text');
        const isReverse = i % 2 !== 0;

        gsap.from(image, {
          x: isReverse ? 60 : -60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 75%',
            once: true,
          },
        });

        gsap.from(text, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 75%',
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="therapies"
      className="py-20 md:py-24 lg:py-28"
      style={{ background: 'linear-gradient(180deg, #1B3022 0%, #2A4535 100%)' }}
    >
      <div className="content-max">
        {/* Section Header */}
        <div className="therapies-header text-center mb-12 md:mb-16">
          <span className="label-style mb-3 block">SIGNATURE THERAPIES</span>
          <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-[40px] text-linen mb-4">
            Ancient Therapies, Modern Healing
          </h2>
          <p className="font-body text-linen/70 max-w-2xl mx-auto">
            Time-tested treatments administered with precision and care.
          </p>
        </div>

        {/* Therapy Rows */}
        <div className="space-y-16 md:space-y-20">
          {therapies.map((therapy, i) => (
            <div
              key={i}
              className={`therapy-row grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                i % 2 !== 0 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className={`therapy-image ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className="aspect-video rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                  <img
                    src={therapy.image}
                    alt={therapy.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Text */}
              <div className={`therapy-text ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                <h3 className="font-display font-semibold text-xl md:text-2xl text-linen mb-4">
                  {therapy.title}
                </h3>
                <div className="w-10 h-[2px] bg-gold mb-5" />
                <p className="font-body text-sm md:text-[15px] text-linen/80 leading-relaxed mb-6">
                  {therapy.description}
                </p>
                <BookNowButton
                  label="Book Now"
                  message={`${BOOKING_MESSAGE} - Therapy: ${therapy.title}`}
                  className="inline-flex items-center gap-2 bg-gold text-white font-body font-semibold text-xs px-5 py-3 rounded-pill hover:bg-[#D4B76A] hover:shadow-gold-glow transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
