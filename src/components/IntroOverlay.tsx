import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function IntroOverlay() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(true)
  const revealed = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // subtle entrance animation for overlay content
    gsap.from(el.querySelectorAll('.intro-item'), {
      y: 20,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
    })

    const reveal = () => {
      if (revealed.current) return
      revealed.current = true
      // animate clip-path to shrink overlay to center, revealing page
      gsap.to(el, {
        clipPath: 'circle(0% at 50% 50%)',
        opacity: 0,
        duration: 1.1,
        ease: 'power2.inOut',
        onComplete() {
          setVisible(false)
        },
      })
      removeListeners()
    }

    const onUser = () => reveal()
    const removeListeners = () => {
      window.removeEventListener('wheel', onUser)
      window.removeEventListener('touchstart', onUser)
      window.removeEventListener('keydown', onUser)
      window.removeEventListener('click', onUser)
    }

    window.addEventListener('wheel', onUser, { passive: true })
    window.addEventListener('touchstart', onUser, { passive: true })
    window.addEventListener('keydown', onUser)
    window.addEventListener('click', onUser)

    // auto reveal after 2s
    const t = window.setTimeout(reveal, 2000)

    return () => {
      clearTimeout(t)
      removeListeners()
    }
  }, [])

  if (!visible) return null

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-linen text-forest"
      style={{
        clipPath: 'circle(150% at 50% 50%)',
        willChange: 'clip-path, opacity',
      }}
    >
      <div className="text-center px-6">
        <div className="intro-item mb-4">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-white/80 mx-auto flex items-center justify-center shadow-lg overflow-hidden">
            <img
              src="/images/dr.jpg"
              alt="intro portrait"
              className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement
                if (img.src.includes('dr.jpg')) {
                  img.src = '/images/intro-portrait.jpg'
                } else if (img.src.includes('intro-portrait.jpg')) {
                  img.src = '/images/doctor-portrait.jpg'
                }
              }}
            />
          </div>
        </div>
        <h2 className="intro-item font-display text-3xl md:text-4xl font-semibold mb-2">Welcome to Ayurveda</h2>
        <p className="intro-item font-body text-sm text-charcoal max-w-xl mx-auto">A gentle journey to balance — scroll to enter the world of traditional healing.</p>
      </div>
    </div>
  )
}
