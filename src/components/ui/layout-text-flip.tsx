"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const LayoutTextFlip = ({
  text = "Build Amazing",
  words = ["Landing Pages", "Component Blocks", "Page Sections", "3D Shaders"],
  duration = 2000,
  className,
}: {
  text: string;
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <div className={cn("text-lg text-muted-foreground md:text-xl mb-8", className)}>
        <motion.span
            layoutId="subtext"
            className="font-headline"
        >
            {text}{' '}
        </motion.span>
        
        <motion.span
            layout
            className="relative inline-block h-[30px] w-[150px] text-left"
        >
            <AnimatePresence mode="popLayout">
            <motion.span
                key={currentIndex}
                initial={{ y: -30, opacity: 0 }}
                animate={{
                    y: 0,
                    opacity: 1,
                }}
                exit={{ y: 30, opacity: 0 }}
                transition={{
                    duration: 0.3,
                    ease: "easeIn"
                }}
                className={cn("absolute inset-0 whitespace-nowrap font-headline text-primary")}
            >
                {words[currentIndex]}
            </motion.span>
            </AnimatePresence>
        </motion.span>
         web experiences.
    </div>
  );
};
