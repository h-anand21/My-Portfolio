
"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function SmoothCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
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
        cursor.style.transform = "translate(-50%, -50%) scale(0.8) rotate(0deg)";
      }
    };

    const mouseUp = () => {
      isgrabbing.current = false;
      if (cursor) {
        cursor.style.transform = "translate(-50%, -50%) scale(1) rotate(0deg)";
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
          if (isgrabbing.current) {
            cursor.style.transform = `translate(-50%, -50%) scale(0.8) rotate(${angle}deg)`;
          } else {
            cursor.style.transform = `translate(-50%, -50%) scale(1) rotate(${angle}deg)`;
          }
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
    <div
      ref={cursorRef}
      className={cn(
        "pointer-events-none fixed z-[9999] h-8 w-8 bg-primary transition-transform duration-300 ease-in-out",
        "shadow-[0_5px_15px_rgba(var(--primary-rgb),0.4)]"
      )}
      style={{
        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
      }}
    />
  );
}
