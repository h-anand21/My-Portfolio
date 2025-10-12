
"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import { ShinyCard } from '@/components/ui/shiny-card';

import { useEffect, useState } from "react";

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  designation: string;
  src: string;
};
export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, testimonials.length]);

  const randomRotateY = () => {
    if (!isClient) return 0;
    return Math.floor(Math.random() * 21) - 10;
  };
  return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-5xl lg:max-w-7xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
        <div className="flex items-center justify-center">
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    zIndex: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -40, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    zIndex: -100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <Image
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-contain object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="relative flex flex-col justify-center">
             <AnimatePresence mode="wait">
                <motion.div
                    key={active}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="h-[350px] w-full"
                >
                  <ShinyCard
                      name={testimonials[active].name}
                      designation={testimonials[active].designation}
                      quote={testimonials[active].quote}
                  />
                </motion.div>
            </AnimatePresence>
          <div className="flex gap-4 pt-12 md:pt-8 z-10">
            <button
              onClick={handlePrev}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-secondary-foreground"
            >
              <IconArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover/button:rotate-12" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-secondary-foreground"
            >
              <IconArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/button:-rotate-12" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
