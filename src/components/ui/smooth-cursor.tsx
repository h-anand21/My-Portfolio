
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
        cursor.style.transform = "translate(-50%, -50%) scale(0.8)";
      }
    };

    const mouseUp = () => {
      isgrabbing.current = false;
      if (cursor) {
        cursor.style.transform = "translate(-50%, -50%) scale(1)";
      }
    };

    const animate = () => {
      let distX = mouseX - cursorX;
      let distY = mouseY - cursorY;

      cursorX = cursorX + distX * speed;
      cursorY = cursorY + distY * speed;

      cursor.style.left = cursorX + "px";
      cursor.style.top = cursorY + "px";

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
        "pointer-events-none fixed z-[9999] h-6 w-6 rounded-full bg-primary/50 backdrop-blur-sm transition-transform duration-300 ease-in-out",
      )}
    />
  );
}
