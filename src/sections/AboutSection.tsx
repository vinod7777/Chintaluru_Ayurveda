import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const expertiseTags = [
  'Panchakarma',
  'Herbal Medicine',
  'Pain Management',
  'Stress Relief',
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      tl.from('.about-label, .about-heading', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });

      tl.from('.about-image', {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.6');

      tl.from('.about-card', {
        x: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.8');

      tl.from('.about-tag', {
        y: 10,
        opacity: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power3.out',
      }, '-=0.4');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 md:py-24 lg:py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #E8EDE6 0%, #F9F8F4 100%)' }}
    >
      {/* Decorative Leaf */}
      <svg
        viewBox="0 0 200 200"
        className="absolute right-[-5%] top-[10%] w-[300px] md:w-[400px] opacity-[0.06] text-forest pointer-events-none"
      >
        <path
          d="M100 10 C40 30 10 80 10 120 C10 160 40 190 100 190 C160 190 190 160 190 120 C190 80 160 30 100 10Z"
          fill="currentColor"
        />
      </svg>

      <div className="content-max relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="about-label flex items-center justify-center gap-3 mb-4">
            <span className="w-10 h-[2px] bg-gold" />
            <span className="label-style">OUR HERITAGE</span>
            <span className="w-10 h-[2px] bg-gold" />
          </div>
          <h2 className="about-heading font-display font-semibold text-3xl md:text-4xl lg:text-[40px] text-forest max-w-2xl mx-auto leading-tight">
            Rooted in Ancient Wisdom. Guided by Modern Care.
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Doctor Image */}
          <div className="lg:col-span-5">
            <div className="about-image relative mx-auto lg:mx-0">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-card border-2 border-gold/20">
                <img
                  src="/images/doctor-portrait.jpg"
                  alt="Dr. Kasi Vishwanath Tejaswi - Ayurvedic Physician"
                  className="block w-full h-full object-cover object-center"
                />
              </div>
              {/* Decorative badge */}
              <div className="absolute -bottom-4 -right-4 bg-gold text-white rounded-2xl px-5 py-3 shadow-gold-glow">
                <p className="font-display font-semibold text-lg">Est. 2016</p>
                <p className="font-body text-[10px] tracking-wider uppercase opacity-90">7th Generation</p>
              </div>
            </div>
          </div>

          {/* Profile Card */}
          <div className="lg:col-span-7">
            <div className="about-card glass-card rounded-3xl p-8 md:p-10 shadow-glass">
              <h3 className="font-display font-semibold text-2xl md:text-[28px] text-forest mb-1">
                Dr. Kasi Vishwanath Tejaswi
              </h3>
              <p className="font-body font-medium text-sm text-sage mb-4">
                B.A.M.S. | Experienced Ayurvedic Physician
              </p>
              <div className="w-10 h-[2px] bg-gold mb-5" />
              <p className="font-body text-charcoal leading-relaxed mb-6">
                A dedicated Ayurvedic physician with deep expertise in root-cause diagnosis and personalized 
                treatment protocols. Trained in traditional Ayurvedic practices passed down through generations, 
                Dr. Tejaswi combines time-honored wisdom with a compassionate, patient-centered approach to 
                restore balance and promote lasting wellness.
              </p>
              <p className="font-body text-charcoal leading-relaxed mb-6">
                With years of clinical experience, he specializes in Panchakarma therapies, chronic pain 
                management, stress relief, and holistic wellness programs tailored to each individual's 
                unique constitution.
              </p>

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-2">
                {expertiseTags.map((tag) => (
                  <span
                    key={tag}
                    className="about-tag inline-block bg-sage/10 text-sage font-body font-medium text-xs px-4 py-1.5 rounded-pill"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
