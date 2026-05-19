import { useRef, type PointerEvent, type ReactNode } from 'react';

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  /** Maximum pull distance in pixels. Keep small — 6–10 feels premium. */
  strength?: number;
  as?: 'div' | 'span';
};

/**
 * Wraps a single child (button/anchor) and applies a subtle magnetic pull
 * toward the cursor on hover. Disabled on coarse pointers via CSS.
 */
export default function MagneticButton({
  children,
  className = '',
  strength = 8,
  as = 'span',
}: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement | HTMLDivElement>(null);

  const handleMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    // Clamp by half the element width to keep things gentle
    const limit = Math.min(rect.width, rect.height) / 2;
    const nx = Math.max(-1, Math.min(1, dx / limit));
    const ny = Math.max(-1, Math.min(1, dy / limit));
    el.style.setProperty('--tx', `${(nx * strength).toFixed(2)}px`);
    el.style.setProperty('--ty', `${(ny * strength).toFixed(2)}px`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--tx', '0px');
    el.style.setProperty('--ty', '0px');
  };

  const Tag = (as === 'div' ? 'div' : 'span') as any;

  return (
    <Tag
      ref={ref as any}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`magnetic ${className}`}
    >
      {children}
    </Tag>
  );
}
