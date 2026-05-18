import { useState } from 'react';
import BookNowButton from '@/components/BookNowButton';
import { BOOKING_MESSAGE } from '@/lib/booking';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [messageText, setMessageText] = useState('');

  const contactMessage = `${BOOKING_MESSAGE} - Section: Contact Us\nName: ${name || '-'}\nEmail: ${email || '-'}\nMessage: ${messageText || '-'}`;
  return (
    <section id="contact" className="bg-white py-20">
      <div className="content-max">
        <div className="text-center mb-12">
          <span className="label-style mb-3 block">GET IN TOUCH</span>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-forest">
            Contact Us
          </h2>
          <p className="font-body text-charcoal max-w-2xl mx-auto mt-4">
            For appointments, enquiries or personalised treatment plans, reach out
            and our team will get back to you shortly.
          </p>
          <div className="mt-6 flex justify-center">
            <BookNowButton
              label="Book Now on WhatsApp"
              className="inline-flex items-center gap-2 bg-gold text-white font-body font-semibold text-sm px-6 py-3 rounded-pill hover:bg-[#D4B76A] hover:shadow-gold-glow transition-all duration-300"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="font-body text-charcoal">
              <strong>Doctor:</strong> <span className="text-forest">Dr. Vishwanath Tejaswi D, B.A.M.S.</span>
            </p>
            <p className="font-body text-charcoal">
              <strong>Phone:</strong> <a href="tel:+919032990138" className="text-forest">+91 90329 90138</a>
            </p>
            <p className="font-body text-charcoal">
              <strong>Email:</strong> <a href="mailto:dr.d.vishwanath@gmail.com" className="text-forest">dr.d.vishwanath@gmail.com</a>
            </p>
            <div className="font-body text-charcoal">
              <strong>Locations:</strong>
              <ul className="mt-2 space-y-2 list-none pl-0">
                <li>
                  <strong className="text-forest">Chintaluru Ayurveda Pharmacy</strong><br />
                  Opp Mother School, Town Kotharoad, Visakhapatnam - 530001
                </li>
                <li>
                  <strong className="text-forest">Chintaluru Ayurveda Pharmacy</strong><br />
                  Hotel Greenpark Down, Jagadamba Junction, Visakhapatnam - 530002
                </li>
                <li>
                  <strong className="text-forest">Chintaluru Ayurveda Pharmacy</strong><br />
                  Opp Balaji Temple, H.B. Colony Road, Seethammadhara, Visakhapatnam - 530022
                </li>
              </ul>
            </div>
          </div>

          <form className="space-y-4 bg-linen p-6 rounded-2xl" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-charcoal">Name</label>
              <input
                className="mt-1 block w-full rounded-md border border-border px-3 py-2"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal">Email</label>
              <input
                className="mt-1 block w-full rounded-md border border-border px-3 py-2"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal">Message</label>
              <textarea
                className="mt-1 block w-full rounded-md border border-border px-3 py-2"
                rows={4}
                placeholder="How can we help?"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
            </div>
            <div className="text-center">
              <BookNowButton
                label="Book On WhatsApp"
                message={contactMessage}
                className="inline-flex items-center gap-2 bg-forest text-white px-5 py-3 rounded-full hover:bg-[#2A4535] transition-colors"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
