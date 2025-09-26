
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export const TextHoverEffect = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [hovered, setHovered] = useState(false);
  const text = typeof children === 'string' ? children : '';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn("flex flex-wrap", className)}
    >
      {text.split(' ').map((word, idx) => (
        <motion.span
          key={idx}
          className="mr-[7px] mt-[2px] transition-colors duration-300"
          style={{
            color: hovered ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))',
          }}
          transition={{
            duration: 0.15,
            delay: idx * 0.02,
            ease: "linear"
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};
