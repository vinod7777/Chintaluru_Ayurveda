import { useEffect, useRef, useState } from 'react'

import BotanicalDecor from '@/components/BotanicalDecor'

const images = [
  '/images/therapy-rejuvenation.jpg',
  '/images/therapy-podikizhi.jpg',
  '/images/therapy-kizhi.jpg',
  '/images/therapy-elakizhi.jpg',
]

export default function GallerySection() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const element = ref.current
      if (!element) return

      const rect = element.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const rawProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height)

      setProgress(Math.min(1, Math.max(0, rawProgress)))
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  const scale = 1 + progress * 0.08
  const y = -progress * 8

  return (
    <section id="gallery" ref={ref} className="relative overflow-hidden py-20 bg-white">
      <BotanicalDecor variant="leaves" density="medium" colorClass="text-sage" />
      <div className="content-max relative z-10">
        <div className="text-center mb-10">
          <span className="label-style mb-3 block">GALLERY</span>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-forest">Healing Moments</h2>
          <p className="font-body text-charcoal max-w-2xl mx-auto mt-4">A calm visual journey through our therapies — subtle parallax creates depth as you scroll.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((src, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl shadow-card h-56 md:h-72"
              style={{ transform: `translateY(${y}px)` }}
            >
              <img
                src={src}
                alt={`gallery-${i}`}
                className="w-full h-full object-cover"
                style={{ transform: `scale(${scale})` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
