import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return;
    
    const cursor = cursorRef.current;
    
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    const trail: { x: number; y: number }[] = [];
    const trailLength = 6;

    // Initialize trail positions
    for (let i = 0; i < trailLength; i++) {
      trail.push({ x: 0, y: 0 });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseDown = () => {
      cursor.classList.add('click');
      trailRefs.current.forEach(trailEl => {
        if (trailEl) trailEl.classList.add('click');
      });
    };

    const handleMouseUp = () => {
      cursor.classList.remove('click');
      trailRefs.current.forEach(trailEl => {
        if (trailEl) trailEl.classList.remove('click');
      });
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches('button, a, [role="button"], input, textarea, .clickable')) {
        cursor.classList.add('hover');
        trailRefs.current.forEach(trailEl => {
          if (trailEl) trailEl.classList.add('hover');
        });
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches('button, a, [role="button"], input, textarea, .clickable')) {
        cursor.classList.remove('hover');
        trailRefs.current.forEach(trailEl => {
          if (trailEl) trailEl.classList.remove('hover');
        });
      }
    };

    // Magnetic trail animation with elastic effect
    const animateCursor = () => {
      // Update trail positions with magnetic effect
      trail[0].x = mouseX;
      trail[0].y = mouseY;
      
      for (let i = 1; i < trailLength; i++) {
        const prev = trail[i - 1];
        const current = trail[i];
        const speed = 0.2 - (i * 0.02); // Progressive delay
        
        current.x += (prev.x - current.x) * speed;
        current.y += (prev.y - current.y) * speed;
      }
      
      // Update main cursor position
      cursor.style.transform = `translate(${trail[0].x - 10}px, ${trail[0].y - 10}px)`;
      
      // Update trail elements
      trailRefs.current.forEach((trailEl, index) => {
        if (trailEl && trail[index + 1]) {
          const pos = trail[index + 1];
          const opacity = (trailLength - index - 1) / trailLength * 0.7;
          const scale = 1 - (index * 0.15);
          trailEl.style.transform = `translate(${pos.x - 6}px, ${pos.y - 6}px) scale(${scale})`;
          trailEl.style.opacity = opacity.toString();
        }
      });
      
      requestAnimationFrame(animateCursor);
    };

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    // Start animation
    animateCursor();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      {Array.from({ length: 6 }, (_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailRefs.current[i] = el;
          }}
          className="cursor-trail"
        />
      ))}
    </>
  );
}