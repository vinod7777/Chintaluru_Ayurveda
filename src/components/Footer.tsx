import { Phone, Mail, MapPin, MessageCircle, Instagram, Facebook } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Therapies', href: '#therapies' },
  { label: 'Our Doctor', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const treatmentLinks = [
  'Panchakarma',
  'Abhyangam',
  'Shirodhara',
  'Pain Relief',
  'Weight Loss',
];

export default function Footer() {
  const handleClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="site-footer" className="bg-forest text-linen">
      <div className="content-max py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-linen/10 border border-gold/30 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gold">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="currentColor" opacity="0.5"/>
                  <path d="M12 6c-3.31 0-6 2.69-6 6 0 1.66.67 3.16 1.76 4.24.18.15.38.28.59.39.37.2.79.32 1.23.36.15.01.3.02.45.02h1.92c.15 0 .3-.01.45-.02.44-.04.86-.16 1.23-.36.21-.11.41-.24.59-.39C17.33 15.16 18 13.66 18 12c0-3.31-2.69-6-6-6z" fill="currentColor"/>
                </svg>
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-linen">Chintaluru Ayurveda</h3>
                <p className="font-body text-xs text-linen/60">Pharmacy Vaidyashala | Est. 2016</p>
              </div>
            </div>
            <p className="font-body font-light text-sm text-linen/70 leading-relaxed max-w-[280px]">
              Authentic Ayurvedic healthcare rooted in 300+ years of healing tradition. Restoring balance through nature's wisdom.
            </p>
            <div className="flex items-center gap-5 mt-6">
              <a href="https://www.instagram.com/chintaluru_ayurveda" target="_blank" rel="noopener noreferrer" className="text-linen/50 hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-linen/50 hover:text-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://wa.me/919032990138" target="_blank" rel="noopener noreferrer" className="text-linen/50 hover:text-gold transition-colors">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="label-style mb-5">QUICK LINKS</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                    className="font-body text-sm text-linen/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatments */}
          <div>
            <h4 className="label-style mb-5">TREATMENTS</h4>
            <ul className="space-y-3">
              {treatmentLinks.map((t) => (
                <li key={t}>
                  <a href="#therapies" onClick={(e) => { e.preventDefault(); handleClick('#therapies'); }} className="font-body text-sm text-linen/70 hover:text-gold transition-colors">
                    {t}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="label-style mb-5">CONTACT</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-gold mt-0.5 shrink-0" />
                <div>
                  <a href="tel:+919032990138" className="font-body text-sm text-linen/70 hover:text-gold transition-colors">+91 9032990138</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle size={16} className="text-gold mt-0.5 shrink-0" />
                <div>
                  <a href="https://wa.me/919032990138" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-linen/70 hover:text-gold transition-colors">9032990138</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-gold mt-0.5 shrink-0" />
                <div>
                  <a href="mailto:dr.d.vishwanath@gmail.com" className="font-body text-sm text-linen/70 hover:text-gold transition-colors">dr.d.vishwanath@gmail.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
                <span className="font-body text-sm text-linen/70">Visakhapatnam, Andhra Pradesh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Special Note */}
        <div className="mt-10 py-4 border-t border-gold/20 text-center">
          <p className="font-accent italic text-gold text-base">"Special Panchakarma: Ladies & Kids Only."</p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-linen/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body font-light text-xs text-linen/40">
            &copy; 2025 Chintaluru Ayurveda Pharmacy Vaidyashala. All rights reserved.
          </p>
          <p className="font-body font-light text-xs italic text-linen/40">
            Crafted with care for your wellness
          </p>
        </div>
      </div>
    </footer>
  );
}
