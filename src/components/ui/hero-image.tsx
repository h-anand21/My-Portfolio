
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FaReact,
  FaWordpress,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiFigma,
  SiMongodb,
  SiLaravel,
  SiNestjs,
  SiAwslambda,
} from "react-icons/si";
import { RiOpenaiFill } from "react-icons/ri";

const HeroImage = ({ imageUrl, altText }: { imageUrl: string; altText: string; }) => {
    
   const icons = [
    { icon: <SiMongodb className="text-green-500" />, angle: 270 },
    { icon: <SiAwslambda className="text-yellow-400" />, angle: 310 },
    { icon: <RiOpenaiFill className="text-white" />, angle: 350 },
    { icon: <SiNestjs className="text-pink-500" />, angle: 30 },
    { icon: <FaReact className="text-cyan-400" />, angle: 70 },
    { icon: <SiTailwindcss className="text-sky-400" />, angle: 110 },
    { icon: <FaWordpress className="text-blue-400" />, angle: 150 },
    { icon: <SiLaravel className="text-red-500" />, angle: 200 },
    { icon: <SiFigma className="text-pink-400" />, angle: 230 },
  ];

  return (
    <div className="relative h-full w-full flex items-center justify-center">
        {/* --- Profile Image --- */}
        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-gray-700 overflow-hidden z-10">
          <Image
            src={imageUrl}
            alt={altText}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* --- Rotating Circle --- */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-[220px] h-[220px] md:w-[280px] md:h-[280px] -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {icons.map((item, index) => (
            <div
              key={index}
              className="absolute w-12 h-12 rounded-full bg-card flex items-center justify-center shadow-lg border border-border text-2xl"
              style={{
                transform: `rotate(${item.angle}deg) translate(110px) rotate(-${item.angle}deg)`,
              }}
            >
              {item.icon}
            </div>
          ))}
        </motion.div>
    </div>
  );
};

export default HeroImage;
