import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

import BotanicalDecor from '@/components/BotanicalDecor';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: 'Excellent treatment by Dr. Kasi Vishwanath Tejaswi. Good care by all the staff at Chintaluru Ayurveda. 100% recommended for authentic Ayurvedic treatments.',
    author: 'Mujeeb Rahman',
    detail: 'Visakhapatnam',
  },
  {
    quote: 'Chintaluru Ayurveda Center is one of the best Ayurvedic treatment centers in the city. The staff and doctors are too generous and friendly, that you will feel yourself at home.',
    author: 'Kiran Ravindran & Lekshmi',
    detail: 'Visakhapatnam',
  },
  {
    quote: 'I came with severe back pain and after just two weeks of treatment, I feel so much better. The personalized care and attention to detail is remarkable. Truly authentic Ayurveda.',
    author: 'Priya Sharma',
    detail: 'Visakhapatnam',
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonials-header', {
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

      gsap.from('.testimonial-card', {
        x: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.testimonials-carousel',
          start: 'top 80%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (index: number) => setActiveIndex(index);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-linen py-20 md:py-24 lg:py-28">
      <BotanicalDecor variant="leaves" density="medium" colorClass="text-sage" />
      <div className="content-max relative z-10">
        {/* Header */}
        <div className="testimonials-header text-center mb-12">
          <span className="label-style mb-3 block">TESTIMONIALS</span>
          <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-[40px] text-forest">
            Our Clients Affirm The Same
          </h2>
        </div>

        {/* Carousel */}
        <div className="testimonials-carousel relative max-w-4xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={goPrev}
            aria-label="Previous testimonial"
            className="absolute left-1 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-12 z-10 w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center text-forest hover:bg-gold hover:text-white transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goNext}
            aria-label="Next testimonial"
            className="absolute right-1 md:right-0 top-1/2 -translate-y-1/2 md:translate-x-12 z-10 w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center text-forest hover:bg-gold hover:text-white transition-colors"
          >
            <ChevronRight size={20} />
          </button>

          {/* Cards */}
          <div className="overflow-hidden px-4">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="testimonial-card w-full shrink-0 px-2 md:px-4"
                >
                  <div className="bg-white rounded-2xl p-8 md:p-10 shadow-card border-l-[3px] border-l-gold">
                    <Quote size={36} className="text-gold opacity-40 mb-4" />
                    <p className="font-body text-charcoal leading-relaxed italic mb-6">
                      "{t.quote}"
                    </p>
                    <div className="w-8 h-[1px] bg-gold/30 mb-4" />
                    <p className="font-body font-semibold text-sm text-forest">
                      {t.author}
                    </p>
                    <p className="font-body text-xs text-sage">{t.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === activeIndex ? 'bg-gold' : 'bg-gold/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
