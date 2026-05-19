import { useMemo, useState } from 'react';
import { Wind, Flame, Droplets, RotateCcw, ArrowRight } from 'lucide-react';

import BotanicalDecor from '@/components/BotanicalDecor';
import { BOOKING_MESSAGE, createWhatsAppLink } from '@/lib/booking';

type Dosha = 'vata' | 'pitta' | 'kapha';

type Question = {
  prompt: string;
  options: { label: string; dosha: Dosha }[];
};

const QUESTIONS: Question[] = [
  {
    prompt: 'How would you describe your natural body frame?',
    options: [
      { label: 'Light, slim, finds it hard to gain weight', dosha: 'vata' },
      { label: 'Medium, athletic, gains and loses easily',  dosha: 'pitta' },
      { label: 'Solid, sturdy, gains weight easily',        dosha: 'kapha' },
    ],
  },
  {
    prompt: 'How do you respond to stress?',
    options: [
      { label: 'Anxious, restless, racing thoughts',   dosha: 'vata' },
      { label: 'Irritable, intense, short-tempered',   dosha: 'pitta' },
      { label: 'Withdrawn, slow, prefer to rest it off', dosha: 'kapha' },
    ],
  },
  {
    prompt: 'How is your appetite and digestion?',
    options: [
      { label: 'Variable — sometimes strong, often skipped', dosha: 'vata' },
      { label: 'Strong, sharp — I get irritable if I miss a meal', dosha: 'pitta' },
      { label: 'Steady but slow — I can easily skip a meal', dosha: 'kapha' },
    ],
  },
];

const DOSHA_INFO: Record<Dosha, {
  name: string;
  tagline: string;
  description: string;
  icon: typeof Wind;
  accent: string;        // tailwind text color
  ring: string;          // tailwind border color
  bg: string;            // soft bg
}> = {
  vata: {
    name: 'Vata',
    tagline: 'Air & Ether — movement, creativity',
    description: 'You thrive on rhythm and warmth. Grounding routines, warm oils and Abhyangam help balance restlessness and dryness.',
    icon: Wind,
    accent: 'text-sage',
    ring: 'border-sage/40',
    bg: 'bg-sage/5',
  },
  pitta: {
    name: 'Pitta',
    tagline: 'Fire & Water — transformation, focus',
    description: 'Sharp and driven by nature. Cooling therapies like Shirodhara and herbal regimens help calm internal heat and intensity.',
    icon: Flame,
    accent: 'text-gold',
    ring: 'border-gold/50',
    bg: 'bg-gold/5',
  },
  kapha: {
    name: 'Kapha',
    tagline: 'Earth & Water — stability, endurance',
    description: 'Steady and nurturing. Stimulating treatments such as Podikizhi and Udwarthanam help refresh circulation and energy.',
    icon: Droplets,
    accent: 'text-forest',
    ring: 'border-forest/30',
    bg: 'bg-forest/5',
  },
};

export default function DoshaQuizSection() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Dosha[]>([]);

  const isFinished = step >= QUESTIONS.length;

  const result = useMemo<Dosha | null>(() => {
    if (!isFinished) return null;
    const counts: Record<Dosha, number> = { vata: 0, pitta: 0, kapha: 0 };
    answers.forEach((d) => { counts[d] += 1; });
    let top: Dosha = 'vata';
    let topCount = -1;
    (Object.keys(counts) as Dosha[]).forEach((d) => {
      if (counts[d] > topCount) { top = d; topCount = counts[d]; }
    });
    return top;
  }, [answers, isFinished]);

  const handleSelect = (d: Dosha) => {
    setAnswers((prev) => [...prev, d]);
    setStep((s) => s + 1);
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
  };

  const progress = Math.min(100, ((isFinished ? QUESTIONS.length : step) / QUESTIONS.length) * 100);

  return (
    <section id="dosha-quiz" className="relative section-padding bg-linen overflow-hidden">
      {/* Subtle decorative arcs */}
      <div aria-hidden className="absolute -top-24 -right-24 w-72 h-72 rounded-full border border-gold/15" />
      <div aria-hidden className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full border border-sage/15" />

      {/* Cursor-interactive botanical layer */}
      <BotanicalDecor variant="leaves" density="medium" colorClass="text-forest" />

      <div className="content-max relative">
        <div className="text-center mb-10">
          <span className="label-style mb-3 block">DISCOVER YOUR DOSHA</span>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-forest">
            A 60-second self-discovery
          </h2>
          <p className="font-body text-charcoal/80 max-w-2xl mx-auto mt-4">
            In Ayurveda, your constitution — or <em>prakriti</em> — is shaped by three doshas:
            Vata, Pitta and Kapha. Answer three quick questions to see which one most expresses
            itself in you today. This is a friendly introduction, not a diagnosis.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1.5 flex-1 rounded-full bg-mist overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gold to-sage transition-[width] duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-body text-xs text-charcoal/60 tabular-nums">
              {Math.min(step, QUESTIONS.length)} / {QUESTIONS.length}
            </span>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-card p-6 md:p-10 border border-gold/15">
            {!isFinished && (
              <div key={step} className="quiz-step animate-[fadeUp_0.4s_ease-out]">
                <p className="font-display text-xl md:text-2xl text-forest mb-6">
                  {QUESTIONS[step].prompt}
                </p>
                <div className="flex flex-col gap-3">
                  {QUESTIONS[step].options.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => handleSelect(opt.dosha)}
                      className="group text-left rounded-xl border border-gold/20 hover:border-gold bg-linen/50 hover:bg-white px-5 py-4 transition-all hover:shadow-card hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold/50"
                    >
                      <span className="font-body text-charcoal group-hover:text-forest transition-colors">
                        {opt.label}
                      </span>
                      <ArrowRight
                        size={16}
                        className="inline-block ml-2 -mr-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-gold"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isFinished && result && (() => {
              const info = DOSHA_INFO[result];
              const Icon = info.icon;
              return (
                <div className="animate-[fadeUp_0.5s_ease-out]">
                  <div className={`inline-flex items-center gap-3 rounded-full px-4 py-2 ${info.bg} border ${info.ring} mb-4`}>
                    <Icon size={18} className={info.accent} />
                    <span className={`font-body text-xs tracking-[0.18em] uppercase ${info.accent}`}>
                      Your dominant dosha
                    </span>
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl text-forest mb-1">
                    {info.name}
                  </h3>
                  <p className="font-accent italic text-charcoal/70 mb-5">{info.tagline}</p>
                  <p className="font-body text-charcoal leading-relaxed mb-6">
                    {info.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={createWhatsAppLink(`${BOOKING_MESSAGE} (My dominant dosha appears to be ${info.name}.)`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-forest text-linen px-6 py-3 font-body text-sm tracking-wide hover:bg-forest/90 transition-colors shadow-card hover:shadow-card-hover"
                    >
                      Book a consultation
                      <ArrowRight size={16} />
                    </a>
                    <button
                      onClick={reset}
                      className="inline-flex items-center gap-2 rounded-full border border-gold/40 text-forest px-5 py-3 font-body text-sm hover:bg-gold/10 transition-colors"
                    >
                      <RotateCcw size={14} />
                      Retake
                    </button>
                  </div>

                  {/* Small breakdown chips */}
                  <div className="mt-6 pt-5 border-t border-gold/15 flex flex-wrap gap-2">
                    {(Object.keys(DOSHA_INFO) as Dosha[]).map((d) => {
                      const count = answers.filter((a) => a === d).length;
                      const I = DOSHA_INFO[d].icon;
                      return (
                        <div
                          key={d}
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-body ${
                            d === result ? `${DOSHA_INFO[d].bg} ${DOSHA_INFO[d].accent} border ${DOSHA_INFO[d].ring}` : 'text-charcoal/60 border border-mist'
                          }`}
                        >
                          <I size={12} />
                          {DOSHA_INFO[d].name} · {count}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>

          <p className="font-body text-xs text-charcoal/50 text-center mt-4">
            For an accurate <em>prakriti</em> assessment, please consult Dr. Kasi Vishwanath Tejaswi in person.
          </p>
        </div>
      </div>
    </section>
  );
}
