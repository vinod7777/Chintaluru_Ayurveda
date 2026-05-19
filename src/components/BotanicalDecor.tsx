import { useEffect, useRef } from 'react';
import {
  Leaf,
  Sprout,
  Flower2,
  FlaskConical,
  Pill,
  Droplet,
} from 'lucide-react';

/**
 * BotanicalDecor
 * --------------
 * A section-scoped layer of decorative leaf + Ayurvedic medicine icons that
 * react to the cursor. Each element:
 *   - Gently floats in place (CSS keyframe `botanical-float`)
 *   - Gets a parallax offset from cursor position within the section
 *   - "Scatters" — drifts AWAY from the cursor when it gets close, like
 *     brushing your hand through hanging herbs
 *
 * Drop it as a sibling inside any `position: relative` section. It is
 * absolutely positioned, pointer-events-none, and sits behind content.
 *
 * Usage:
 *   <section className="relative ...">
 *     <BotanicalDecor variant="leaves" density="medium" />
 *     // ...content...
 *   </section>
 */

type Variant = 'leaves' | 'medicine' | 'mixed';
type Density = 'low' | 'medium' | 'high';

interface BotanicalDecorProps {
  variant?: Variant;
  density?: Density;
  /** Tint class for icons (Tailwind text-* color). Defaults to a soft gold. */
  colorClass?: string;
  /** Extra className for the wrapper. */
  className?: string;
  /**
   * Multiplier applied to each item's opacity. Use values > 1 on dark
   * backgrounds where the default subtle opacity (~0.12–0.30) disappears.
   * Final opacity is clamped to [0, 1].
   */
  opacityBoost?: number;
  /** Stroke width override for the icons. Defaults to 1.4. */
  strokeWidth?: number;
}

type IconType = typeof Leaf;

const LEAF_ICONS: IconType[] = [Leaf, Sprout, Flower2];
const MEDICINE_ICONS: IconType[] = [FlaskConical, Pill, Droplet];

interface Item {
  Icon: IconType;
  /** percent from left (0–100) */
  x: number;
  /** percent from top (0–100) */
  y: number;
  /** px size */
  size: number;
  /** base rotation deg */
  rot: number;
  /** parallax strength (0–1) — deeper items move less */
  depth: number;
  /** float duration in seconds */
  dur: number;
  /** float delay in seconds */
  delay: number;
  /** base opacity */
  opacity: number;
}

// Deterministic pseudo-random so SSR + first render match and items don't
// reshuffle every re-render.
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildItems(variant: Variant, count: number, seed: number): Item[] {
  const rand = mulberry32(seed);
  const pool: IconType[] =
    variant === 'leaves'
      ? LEAF_ICONS
      : variant === 'medicine'
      ? MEDICINE_ICONS
      : [...LEAF_ICONS, ...LEAF_ICONS, ...MEDICINE_ICONS]; // bias toward leaves

  const items: Item[] = [];
  for (let i = 0; i < count; i++) {
    const Icon = pool[Math.floor(rand() * pool.length)];
    items.push({
      Icon,
      x: rand() * 100,
      y: rand() * 100,
      size: 18 + Math.floor(rand() * 26), // 18–44px
      rot: Math.floor(rand() * 360),
      depth: 0.35 + rand() * 0.65, // 0.35–1.0
      dur: 6 + rand() * 6, // 6–12s
      delay: rand() * -8, // negative so each starts mid-cycle
      opacity: 0.12 + rand() * 0.18, // 0.12–0.30
    });
  }
  return items;
}

const DENSITY_COUNT: Record<Density, number> = {
  low: 8,
  medium: 14,
  high: 22,
};

export default function BotanicalDecor({
  variant = 'mixed',
  density = 'medium',
  colorClass = 'text-gold',
  className = '',
  opacityBoost = 1,
  strokeWidth = 1.4,
}: BotanicalDecorProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLSpanElement | null>>([]);
  // Stable items across renders
  const itemsRef = useRef<Item[]>(
    buildItems(variant, DENSITY_COUNT[density], hashSeed(variant, density)),
  );

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Skip on touch / reduced motion — keep them as static decoration
    const isTouch = window.matchMedia('(hover: none)').matches;
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (isTouch || prefersReduced) return;

    let rafId = 0;
    let pending = false;
    let mouseX = 0;
    let mouseY = 0;
    let rect = wrapper.getBoundingClientRect();
    let active = false;

    const updateRect = () => {
      rect = wrapper.getBoundingClientRect();
    };

    const apply = () => {
      pending = false;
      const items = itemsRef.current;
      // Normalize cursor to -1..1 relative to section center
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = (mouseX - cx) / (rect.width / 2);
      const ny = (mouseY - cy) / (rect.height / 2);

      for (let i = 0; i < items.length; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const item = items[i];

        if (!active) {
          // Ease back toward 0
          el.style.setProperty('--tx', `0px`);
          el.style.setProperty('--ty', `0px`);
          el.style.setProperty('--trot', `0deg`);
          continue;
        }

        // --- Parallax: shallow items move more, deep ones less ---
        const parallaxStrength = 18; // px max
        const px = -nx * parallaxStrength * (1 - item.depth + 0.2);
        const py = -ny * parallaxStrength * (1 - item.depth + 0.2);

        // --- Scatter: push away from cursor if close ---
        const itemPxX = rect.left + (item.x / 100) * rect.width;
        const itemPxY = rect.top + (item.y / 100) * rect.height;
        const dx = itemPxX - mouseX;
        const dy = itemPxY - mouseY;
        const dist = Math.hypot(dx, dy);
        const radius = 140;
        let sx = 0;
        let sy = 0;
        let extraRot = 0;
        if (dist < radius) {
          const force = (1 - dist / radius) ** 2; // 0..1
          const angle = Math.atan2(dy, dx);
          const push = 28 * force; // px
          sx = Math.cos(angle) * push;
          sy = Math.sin(angle) * push;
          extraRot = force * 25 * (item.depth > 0.6 ? 1 : -1);
        }

        el.style.setProperty('--tx', `${px + sx}px`);
        el.style.setProperty('--ty', `${py + sy}px`);
        el.style.setProperty('--trot', `${extraRot}deg`);
      }
    };

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      active = true;
      if (!pending) {
        pending = true;
        rafId = requestAnimationFrame(apply);
      }
    };

    const onLeave = () => {
      active = false;
      if (!pending) {
        pending = true;
        rafId = requestAnimationFrame(apply);
      }
    };

    // The wrapper itself is pointer-events:none (so it never blocks clicks
    // on the section content). We therefore track pointer position globally
    // and check whether it lies within our bounding rect. This gives us the
    // "section is the hot zone" behavior without stealing any clicks.
    const onWindowMove = (e: PointerEvent) => {
      const r = rect;
      if (
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom
      ) {
        onMove(e);
      } else if (active) {
        onLeave();
      }
    };

    window.addEventListener('pointermove', onWindowMove, { passive: true });
    window.addEventListener('scroll', updateRect, { passive: true });
    window.addEventListener('resize', updateRect);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onWindowMove);
      window.removeEventListener('scroll', updateRect);
      window.removeEventListener('resize', updateRect);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {itemsRef.current.map((item, i) => {
        const Icon = item.Icon;
        return (
          <span
            key={i}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className={`botanical-item ${colorClass}`}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              opacity: Math.min(1, item.opacity * opacityBoost),
              ['--rot' as never]: `${item.rot}deg`,
              ['--dur' as never]: `${item.dur}s`,
              ['--delay' as never]: `${item.delay}s`,
            }}
          >
            <span>
              <Icon size={item.size} strokeWidth={strokeWidth} />
            </span>
          </span>
        );
      })}
    </div>
  );
}

function hashSeed(variant: Variant, density: Density): number {
  // Tiny deterministic seed so each (variant, density) combo has a stable layout
  const s = `${variant}-${density}`;
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
