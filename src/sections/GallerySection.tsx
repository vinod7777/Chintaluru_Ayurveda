import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const images = [
  '/images/therapy-rejuvenation.jpg',
  '/images/therapy-podikizhi.jpg',
  '/images/therapy-kizhi.jpg',
  '/images/therapy-elakizhi.jpg',
]

export default function GallerySection() {
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref })

  // Parallax scale map: when element enters, images slightly zoom
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])

  return (
    <section id="gallery" ref={ref} className="py-20 bg-white">
      <div className="content-max">
        <div className="text-center mb-10">
          <span className="label-style mb-3 block">GALLERY</span>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-forest">Healing Moments</h2>
          <p className="font-body text-charcoal max-w-2xl mx-auto mt-4">A calm visual journey through our therapies — subtle parallax creates depth as you scroll.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((src, i) => (
            <motion.div
              key={i}
              className="overflow-hidden rounded-2xl shadow-card h-72"
              style={{ y }}
              whileInView={{ scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <motion.img src={src} alt={`gallery-${i}`} className="w-full h-full object-cover"
                style={{ scale }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
