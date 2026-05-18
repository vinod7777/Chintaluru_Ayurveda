import { useEffect, useRef } from 'react';

export default function CursorFollower() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const targetRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const activeRef = useRef(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) {
      return;
    }

    const interactiveSelector = 'a, button, input, textarea, select, [role="button"], [data-cursor="interactive"]';

    const animate = () => {
      positionRef.current.x += (targetRef.current.x - positionRef.current.x) * 0.18;
      positionRef.current.y += (targetRef.current.y - positionRef.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%) scale(${activeRef.current ? 1.35 : 1})`;
        ringRef.current.style.opacity = '1';
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetRef.current.x}px, ${targetRef.current.y}px, 0) translate(-50%, -50%) scale(${activeRef.current ? 1.7 : 1})`;
        dotRef.current.style.opacity = '1';
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    const handleMove = (event: PointerEvent) => {
      targetRef.current = { x: event.clientX, y: event.clientY };
    };

    const setInteractive = () => {
      activeRef.current = true;
      if (ringRef.current) {
        ringRef.current.dataset.active = 'true';
      }
      if (dotRef.current) {
        dotRef.current.dataset.active = 'true';
      }
    };

    const setIdle = () => {
      activeRef.current = false;
      if (ringRef.current) {
        ringRef.current.dataset.active = 'false';
      }
      if (dotRef.current) {
        dotRef.current.dataset.active = 'false';
      }
    };

    const handleOver = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest(interactiveSelector)) {
        setInteractive();
      }
    };

    const handleOut = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest(interactiveSelector)) {
        setIdle();
      }
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('pointerover', handleOver, { passive: true });
    window.addEventListener('pointerout', handleOut, { passive: true });

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerover', handleOver);
      window.removeEventListener('pointerout', handleOut);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-12 w-12 rounded-full border border-gold/60 bg-gold/10 opacity-0 mix-blend-multiply blur-[0.2px] transition-[opacity,transform] duration-200 md:block"
        style={{ transform: 'translate3d(0, 0, 0) translate(-50%, -50%) scale(1)' }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[91] hidden h-2.5 w-2.5 rounded-full bg-gold opacity-0 shadow-[0_0_18px_rgba(197,160,89,0.55)] transition-[opacity,transform] duration-100 md:block"
        style={{ transform: 'translate3d(0, 0, 0) translate(-50%, -50%) scale(1)' }}
      />
    </>
  );
}
