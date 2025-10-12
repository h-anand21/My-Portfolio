'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection } from 'firebase/firestore';
import type { Skill } from '@/lib/types';
import { Skeleton } from './skeleton';

const HeroImage = ({ imageUrl, altText }: { imageUrl: string; altText: string }) => {
  const firestore = useFirestore();

  const skillsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'skills');
  }, [firestore]);

  const { data: skills, isLoading } = useCollection<Skill>(skillsQuery);

  if (isLoading) {
    return (
        <div className="relative flex items-center justify-center h-full w-full">
            <Skeleton className="w-48 h-48 md:w-64 md:h-64 rounded-full" />
        </div>
    )
  }

  const icons = skills || [];
  const iconCount = icons.length;

  return (
    <div className="relative flex items-center justify-center w-full h-[280px] sm:h-[340px] md:h-[480px]">
      {/* Rotating orbit icons */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="absolute flex items-center justify-center"
        style={{
          width: 'clamp(240px, 60vw, 480px)',
          height: 'clamp(240px, 60vw, 480px)',
        }}
      >
        {icons.map((item, index) => {
          const angle = (360 / iconCount) * index;
          return (
            <motion.div
              key={item.id}
              className="absolute w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-card shadow-lg border border-border/50"
              style={{
                transform: `rotate(${angle}deg) translate(clamp(120px, 30vw, 240px)) rotate(-${angle}deg)`,
              }}
               whileHover={{ scale: 1.1, zIndex: 10, transition: { type: "spring", stiffness: 300, damping: 10 } }}
            >
                <div 
                    className="w-6 h-6 md:w-8 md:h-8 text-foreground"
                    dangerouslySetInnerHTML={{ __html: item.icon }} 
                />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Glowing Ring */}
       <div 
        className="absolute rounded-full z-0 animate-spin-slow"
        style={{
          width: 'clamp(240px, 60vw, 480px)',
          height: 'clamp(240px, 60vw, 480px)',
          boxShadow: '0 0 20px 0px hsl(var(--primary))',
        }}
       />

      {/* Profile Image */}
      <div className="relative rounded-full border-[3px] border-gray-700 overflow-hidden z-10 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
        style={{
          width: 'clamp(200px, 50vw, 400px)',
          height: 'clamp(200px, 50vw, 400px)',
        }}
      >
        <Image
          src={imageUrl}
          alt={altText}
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default HeroImage;
