import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import BookNowButton from '@/components/BookNowButton';

const navLinks = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'SERVICES', href: '#services' },
  { label: 'THERAPIES', href: '#therapies' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navigation() {
  const scrollY = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isScrolled = scrollY > 100;
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          isScrolled
            ? 'bg-linen border-b border-gold/15 shadow-card'
            : 'bg-linen border-b border-gold/10 shadow-[0_8px_30px_rgba(27,48,34,0.08)]'
        }`}
      >
        <div className="content-max flex items-center justify-between h-[72px] md:h-[72px]">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3" onClick={() => handleNavClick('#home')}>
            <div className="w-10 h-10 rounded-full bg-forest/10 border border-gold/30 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-forest">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor" opacity="0.3"/>
                <path d="M12 6c-3.31 0-6 2.69-6 6 0 1.66.67 3.16 1.76 4.24l.01.01c.18.15.38.28.59.39.37.2.79.32 1.23.36.15.01.3.02.45.02h1.92c.15 0 .3-.01.45-.02.44-.04.86-.16 1.23-.36.21-.11.41-.24.59-.39l.01-.01C17.33 15.16 18 13.66 18 12c0-3.31-2.69-6-6-6zm-2 8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm4 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" fill="currentColor"/>
                <path d="M12 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4 3c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm8 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" fill="#C5A059"/>
              </svg>
            </div>
            <span className="font-display font-medium text-base tracking-wide text-forest transition-colors">
              Chintaluru Ayurveda
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`relative font-body font-medium text-[13px] tracking-[0.1em] transition-colors duration-300 group text-forest hover:text-gold ${
                  activeSection === link.href.replace('#', '') ? 'text-gold' : ''
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <BookNowButton
            label="Book Now"
            className={`hidden md:inline-flex items-center gap-2 font-body font-semibold text-xs px-6 py-2.5 rounded-pill transition-all duration-300 bg-gold text-white hover:shadow-gold-glow hover:-translate-y-0.5`}
          />

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-forest transition-colors"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-forest/97 backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className="font-display text-2xl text-linen hover:text-gold transition-colors"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {link.label}
            </a>
          ))}
          <BookNowButton
            label="Book Now"
            className="mt-4 inline-flex items-center gap-2 bg-gold text-white font-body font-semibold text-sm px-8 py-3 rounded-pill hover:shadow-gold-glow transition-all duration-300"
          />
        </div>
      )}
    </>
  );
}
