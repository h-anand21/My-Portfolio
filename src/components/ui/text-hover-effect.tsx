
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

export const TextHoverEffect = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const text = typeof children === 'string' ? children : '';

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.1,
        staggerChildren: 0.03,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.p
      ref={ref}
      className={cn("flex flex-wrap text-muted-foreground", className)}
      variants={sentence}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {text.split(' ').map((word, idx) => (
        <motion.span
          key={idx}
          variants={letter}
          className="mr-[6px] mt-[2px] transition-colors duration-300 text-lg md:text-xl"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};
