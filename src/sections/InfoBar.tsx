import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Clock, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const infoItems = [
  {
    icon: Users,
    title: 'ABOUT US',
    content: 'We provide authentic Ayurvedic treatment in all aspects of life, emphasizing the importance of living in harmony with nature.',
  },
  {
    icon: Clock,
    title: 'OPEN HOURS',
    content: 'Mon - Sat: 09:00 AM - 09:00 PM\nSunday: 10:00 AM - 02:00 PM',
  },
  {
    icon: Phone,
    title: 'CONTACTS',
    content: '',
    links: [
      { label: '+91 9032990138', href: 'tel:+919032990138' },
      { label: 'WhatsApp: 9032990138', href: 'https://wa.me/919032990138' },
      { label: 'dr.d.vishwanath@gmail.com', href: 'mailto:dr.d.vishwanath@gmail.com' },
    ],
  },
];

export default function InfoBar() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.info-item', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-linen py-12 md:py-14 gold-border-bottom">
      <div className="content-max">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {infoItems.map((item, i) => (
            <div
              key={i}
              className="info-item flex flex-col items-center text-center px-4"
            >
              <item.icon size={32} className="text-gold mb-4" />
              <h3 className="label-style text-forest mb-3">{item.title}</h3>
              {item.content ? (
                <p className="font-body text-sm text-charcoal leading-relaxed whitespace-pre-line">
                  {item.content}
                </p>
              ) : (
                <div className="space-y-1.5">
                  {item.links?.map((link, j) => (
                    <a
                      key={j}
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="block font-body text-sm text-charcoal hover:text-gold transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
