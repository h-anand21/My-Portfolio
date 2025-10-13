
"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function SmoothCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const clickEffectRef = useRef<HTMLDivElement>(null);
  const isgrabbing = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;
    let speed = 0.1;

    const mouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const mouseDown = () => {
      isgrabbing.current = true;
      if (cursor) {
        cursor.classList.add('opacity-0');
      }
      if(clickEffectRef.current) {
        clickEffectRef.current.classList.remove('hidden');
      }
    };

    const mouseUp = () => {
      isgrabbing.current = false;
      if (cursor) {
        cursor.classList.remove('opacity-0');
      }
      if(clickEffectRef.current) {
        clickEffectRef.current.classList.add('hidden');
      }
    };

    const animate = () => {
      let distX = mouseX - cursorX;
      let distY = mouseY - cursorY;

      cursorX = cursorX + distX * speed;
      cursorY = cursorY + distY * speed;
      
      const angle = Math.atan2(distY, distX) * (180 / Math.PI) + 90;

      if (cursor) {
          cursor.style.left = cursorX + "px";
          cursor.style.top = cursorY + "px";
          cursor.style.transform = `translate(-50%, -50%) scale(1) rotate(${angle}deg)`;
      }

      if (clickEffectRef.current) {
        clickEffectRef.current.style.left = cursorX + "px";
        clickEffectRef.current.style.top = cursorY + "px";
      }

      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mousedown", mouseDown);
    document.addEventListener("mouseup", mouseUp);
    animate();

    return () => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mousedown", mouseDown);
      document.removeEventListener("mouseup", mouseUp);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={cn(
          "pointer-events-none fixed z-[9999] h-8 w-8 transition-opacity duration-300 ease-in-out"
        )}
        style={{
          backgroundColor: 'hsl(var(--cursor-color))',
          clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)'
        }}
      />
      <div
        ref={clickEffectRef}
        className="pointer-events-none fixed z-[9998] hidden"
      >
        <div 
          className="h-16 w-16 rounded-full border-2" 
          style={{ borderColor: 'hsl(var(--cursor-color))', animation: 'click-pulse 0.5s ease-out' }} 
        />
      </div>
    </>
  );
}
