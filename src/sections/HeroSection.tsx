import { MouseEvent, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import BookNowButton from '@/components/BookNowButton';

const FloatingLeaf = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <svg
    viewBox="0 0 100 100"
    className={`absolute opacity-20 text-sage pointer-events-none ${className}`}
    style={{ animationDelay: `${delay}s` }}
  >
    <path
      d="M50 5 C20 20 5 45 5 65 C5 85 25 95 50 95 C75 95 95 85 95 65 C95 45 80 20 50 5Z"
      fill="currentColor"
      opacity="0.4"
    />
    <path d="M50 15 Q50 55 50 90" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
    <path d="M50 35 Q30 45 20 55" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.25" />
    <path d="M50 50 Q70 55 80 65" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.25" />
  </svg>
);

const heroSlides = [
  {
    src: '/images/hero-bg.jpg',
    label: 'Ayurvedic roots',
    quote: 'svāsthyaṃ svāsthya rakṣaṇaṃ āturāsya roga nivāraṇaṃ',
    intro: 'Seeking Holistic Wellness And Natural Healing From Health Issues?',
    headline: '300 Years of Healing. A Lifetime of Peace.',
    subline: 'Experience root-cause diagnosis and personalized therapies from a 7th-generation Ayurvedic legacy.',
  },
  {
    src: '/images/specialties-bg.jpg',
    label: 'Specialized care',
    quote: 'Balance the body. Calm the mind. Restore vitality.',
    intro: 'Personalized care designed around your body type and health goals.',
    headline: 'Specialized Healing for Lasting Relief.',
    subline: 'From diagnosis to treatment, every step is shaped around your comfort and recovery.',
  },
  {
    src: '/images/service-pain.jpg',
    label: 'Pain relief focus',
    quote: 'Ancient therapies. Modern comfort.',
    intro: 'Find relief with focused treatments for pain, stress, and fatigue.',
    headline: 'Feel Better With Targeted Ayurvedic Therapies.',
    subline: 'Book a consultation to begin a treatment plan that responds to your condition, not just the symptoms.',
  },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 42 });

  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5200);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Background animation
      tl.from(bgRef.current, {
        scale: 1.05,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
      });

      // Sanskrit quote
      tl.from('.hero-sanskrit', {
        y: 30,
        opacity: 0,
        duration: 0.8,
      }, '-=1');

      // Headline word by word
      tl.from('.hero-headline-word', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
      }, '-=0.6');

      // Subline
      tl.from('.hero-subline', {
        y: 20,
        opacity: 0,
        duration: 0.8,
      }, '-=0.6');

      // CTAs
      tl.from('.hero-cta', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
      }, '-=0.4');

      // Floating leaves
      tl.from('.floating-leaf', {
        opacity: 0,
        scale: 0.8,
        duration: 2,
        stagger: 0.2,
        ease: 'power1.out',
      }, '-=1.5');
    }, sectionRef);

    return () => {
      window.clearInterval(slideTimer);
      try {
        ctx.revert();
      } catch (error) {
        void error;
      }
    };
  }, []);

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    setMousePosition({
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
    });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'transform' }}
      >
        {heroSlides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.label}
            className={`absolute inset-0 w-full h-full object-cover scale-110 md:scale-125 transition-[opacity,transform] duration-1000 ${
              index === activeSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ objectPosition: 'center center' }}
          />
        ))}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest/25 via-forest/55 to-forest/90" />
        <div
          className="absolute inset-0 opacity-80 mix-blend-screen transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(197,160,89,0.24) 0%, rgba(197,160,89,0.08) 18%, transparent 42%)`,
          }}
        />
      </div>

      {/* Floating Leaves */}
      <FloatingLeaf className="w-24 md:w-40 top-[15%] left-[5%] animate-float-slow" delay={0} />
      <FloatingLeaf className="w-16 md:w-28 top-[25%] right-[8%] animate-float" delay={1} />
      <FloatingLeaf className="w-20 md:w-32 bottom-[20%] left-[10%] animate-float" delay={2} />
      <FloatingLeaf className="w-14 md:w-24 bottom-[30%] right-[5%] animate-float-slow" delay={0.5} />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto pt-20 transform-gpu transition-transform duration-300"
        key={activeSlide}
        style={{
          transform: `translate3d(${(mousePosition.x - 50) * 0.08}px, ${(mousePosition.y - 50) * 0.06}px, 0)`,
        }}
      >
        {/* Sanskrit Quote */}
        <p className="hero-sanskrit font-accent italic text-lg md:text-2xl text-gold mb-4">
          {heroSlides[activeSlide].quote}
        </p>

        {/* Subtitle */}
        <p className="hero-sanskrit font-display text-lg md:text-xl text-linen/90 mb-8">
          {heroSlides[activeSlide].intro}
        </p>

        {/* Main Headline */}
        <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-linen leading-tight mb-6">
          {heroSlides[activeSlide].headline.split(' ').map((word, i) => (
            <span key={i} className="hero-headline-word inline-block mr-[0.25em]">
              {word}
            </span>
          ))}
        </h1>

        {/* Sub-headline */}
        <p className="hero-subline font-body font-light text-sm md:text-lg text-linen/85 max-w-2xl mx-auto mb-10">
          {heroSlides[activeSlide].subline}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="tel:+919032990138"
            className="hero-cta inline-flex items-center gap-2 bg-gold text-white font-body font-semibold text-sm px-8 py-3.5 rounded-pill border-2 border-gold hover:bg-transparent hover:text-gold hover:shadow-gold-glow transition-all duration-300"
          >
            Call Us NOW!
          </a>
          <BookNowButton
            label="Book Consultation"
            className="hero-cta inline-flex items-center gap-2 bg-transparent text-linen font-body font-semibold text-sm px-8 py-3.5 rounded-pill border-2 border-linen/40 hover:border-gold hover:text-gold transition-all duration-300"
          />
        </div>
      </div>

      {/* Slider Indicator */}
      <div className="absolute bottom-8 left-6 md:left-10 z-10 flex items-center gap-4 rounded-full border border-linen/20 bg-forest/30 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-2">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setActiveSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeSlide ? 'w-8 bg-gold' : 'w-2 bg-linen/50'
              }`}
              aria-label={`Show slide ${index + 1}`}
            />
          ))}
        </div>
        <span className="font-body text-[10px] uppercase tracking-[0.2em] text-linen/80">
          {heroSlides[activeSlide].label}
        </span>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="font-body text-[10px] tracking-[0.2em] text-linen uppercase">Scroll</span>
        <div className="w-5 h-8 border-2 border-linen/50 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-linen rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
