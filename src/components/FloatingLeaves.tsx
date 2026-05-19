import { useEffect, useRef } from 'react';

/**
 * Ambient drifting Ayurveda-themed ornaments (leaves + petals) that respond
 * subtly to the cursor via parallax. Pointer-events-none and reduced-motion aware.
 *
 * Sits behind all content (z-0). Place once at the root of the app.
 */

type Ornament = {
  id: number;
  // Position as viewport percentages
  x: number;
  y: number;
  size: number; // px
  rotate: number; // deg
  hue: 'gold' | 'forest' | 'sage';
  opacity: number;
  depth: number; // 0..1, used for parallax strength
  shape: 'leaf' | 'petal' | 'sprig';
  floatDelay: number; // s
  floatDuration: number; // s
};

const ORNAMENTS: Ornament[] = [
  { id: 1, x: 6,  y: 14, size: 56, rotate: -18, hue: 'sage',   opacity: 0.10, depth: 0.7, shape: 'leaf',  floatDelay: 0,   floatDuration: 9 },
  { id: 2, x: 92, y: 22, size: 44, rotate: 28,  hue: 'gold',   opacity: 0.14, depth: 0.9, shape: 'petal', floatDelay: 1.5, floatDuration: 11 },
  { id: 3, x: 14, y: 62, size: 70, rotate: 12,  hue: 'forest', opacity: 0.07, depth: 0.4, shape: 'sprig', floatDelay: 0.8, floatDuration: 13 },
  { id: 4, x: 88, y: 70, size: 50, rotate: -32, hue: 'sage',   opacity: 0.09, depth: 0.6, shape: 'leaf',  floatDelay: 2.2, floatDuration: 10 },
  { id: 5, x: 50, y: 38, size: 38, rotate: 45,  hue: 'gold',   opacity: 0.08, depth: 1.0, shape: 'petal', floatDelay: 3,   floatDuration: 12 },
  { id: 6, x: 30, y: 88, size: 60, rotate: -8,  hue: 'sage',   opacity: 0.08, depth: 0.5, shape: 'leaf',  floatDelay: 1,   floatDuration: 14 },
  { id: 7, x: 74, y: 92, size: 42, rotate: 20,  hue: 'gold',   opacity: 0.10, depth: 0.8, shape: 'petal', floatDelay: 2.5, floatDuration: 11 },
];

const hueToStroke: Record<Ornament['hue'], string> = {
  gold: '#C5A059',
  forest: '#1B3022',
  sage: '#4A7C59',
};

function LeafSvg({ stroke }: { stroke: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" width="100%" height="100%" aria-hidden>
      <path
        d="M32 4c14 8 22 20 22 32 0 12-10 24-22 24S10 48 10 36 18 12 32 4z"
        stroke={stroke}
        strokeWidth="1.2"
        fill={stroke}
        fillOpacity="0.08"
      />
      <path d="M32 8v52" stroke={stroke} strokeWidth="0.8" />
      <path d="M32 22c5 0 10 2 14 6" stroke={stroke} strokeWidth="0.6" />
      <path d="M32 22c-5 0-10 2-14 6" stroke={stroke} strokeWidth="0.6" />
      <path d="M32 36c6 0 12 3 16 8" stroke={stroke} strokeWidth="0.6" />
      <path d="M32 36c-6 0-12 3-16 8" stroke={stroke} strokeWidth="0.6" />
    </svg>
  );
}

function PetalSvg({ stroke }: { stroke: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" width="100%" height="100%" aria-hidden>
      <g>
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <ellipse
            key={deg}
            cx="32"
            cy="18"
            rx="6"
            ry="14"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
            fillOpacity="0.08"
            transform={`rotate(${deg} 32 32)`}
          />
        ))}
        <circle cx="32" cy="32" r="3" fill={stroke} fillOpacity="0.25" />
      </g>
    </svg>
  );
}

function SprigSvg({ stroke }: { stroke: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" width="100%" height="100%" aria-hidden>
      <path d="M32 60c0-20 6-36 18-52" stroke={stroke} strokeWidth="1.2" fill="none" />
      <path d="M38 48c-4-2-6-6-6-12" stroke={stroke} strokeWidth="0.8" />
      <path d="M42 38c-4-2-6-6-6-12" stroke={stroke} strokeWidth="0.8" />
      <path d="M46 28c-4-2-6-6-6-12" stroke={stroke} strokeWidth="0.8" />
      <ellipse cx="38" cy="48" rx="5" ry="2.5" stroke={stroke} strokeWidth="0.8" fill={stroke} fillOpacity="0.10" transform="rotate(-30 38 48)" />
      <ellipse cx="42" cy="38" rx="5" ry="2.5" stroke={stroke} strokeWidth="0.8" fill={stroke} fillOpacity="0.10" transform="rotate(-30 42 38)" />
      <ellipse cx="46" cy="28" rx="5" ry="2.5" stroke={stroke} strokeWidth="0.8" fill={stroke} fillOpacity="0.10" transform="rotate(-30 46 28)" />
    </svg>
  );
}

function Shape({ shape, stroke }: { shape: Ornament['shape']; stroke: string }) {
  if (shape === 'petal') return <PetalSvg stroke={stroke} />;
  if (shape === 'sprig') return <SprigSvg stroke={stroke} />;
  return <LeafSvg stroke={stroke} />;
}

export default function FloatingLeaves() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReducedMotion) return;

    const handleMove = (e: PointerEvent) => {
      // Normalize -0.5..0.5 around screen center
      targetRef.current = {
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      };
    };

    const animate = () => {
      // Ease toward target
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.06;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.06;

      ORNAMENTS.forEach((orn, i) => {
        const el = itemRefs.current[i];
        if (!el) return;
        // Subtle parallax: max ~12px times depth
        const tx = -currentRef.current.x * 24 * orn.depth;
        const ty = -currentRef.current.y * 24 * orn.depth;
        el.style.setProperty('--px', `${tx}px`);
        el.style.setProperty('--py', `${ty}px`);
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {ORNAMENTS.map((orn, i) => (
        <div
          key={orn.id}
          ref={(el) => { itemRefs.current[i] = el; }}
          className="floating-leaf absolute will-change-transform"
          style={{
            left: `${orn.x}%`,
            top: `${orn.y}%`,
            width: orn.size,
            height: orn.size,
            opacity: orn.opacity,
            // CSS vars updated by the rAF loop; animation handles the gentle drift
            // The combined transform lives in index.css under .floating-leaf
            ['--px' as any]: '0px',
            ['--py' as any]: '0px',
            ['--rot' as any]: `${orn.rotate}deg`,
            animationDelay: `${orn.floatDelay}s`,
            animationDuration: `${orn.floatDuration}s`,
          }}
        >
          <Shape shape={orn.shape} stroke={hueToStroke[orn.hue]} />
        </div>
      ))}
    </div>
  );
}
