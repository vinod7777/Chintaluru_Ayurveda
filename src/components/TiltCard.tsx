import { useRef, type PointerEvent, type ReactNode } from 'react';

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Maximum tilt angle in degrees. */
  max?: number;
  /** Show a soft gold "spotlight" that tracks the cursor. */
  spotlight?: boolean;
};

/**
 * Lightweight 3D tilt wrapper. CSS-driven (no rAF) — sets CSS variables on
 * pointer move and lets transitions do the work. Honors prefers-reduced-motion
 * via the media query in index.css.
 */
export default function TiltCard({
  children,
  className = '',
  max = 6,
  spotlight = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;  // 0..1
    const py = (e.clientY - rect.top) / rect.height;  // 0..1
    const rx = (0.5 - py) * max * 2; // rotateX
    const ry = (px - 0.5) * max * 2; // rotateY
    el.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
    el.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
    el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
    el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`tilt-card ${spotlight ? 'tilt-card--spotlight' : ''} ${className}`}
    >
      <div className="tilt-card__inner">{children}</div>
    </div>
  );
}
