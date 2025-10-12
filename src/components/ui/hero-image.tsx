
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaReact, FaJava } from "react-icons/fa";
import { SiTailwindcss, SiFigma, SiJavascript, SiMongodb, SiSpring, SiNodedotjs } from "react-icons/si";

const HeroImage = ({ imageUrl, altText }: { imageUrl: string; altText: string; }) => {
    
   const icons = [
    { icon: <SiFigma size="1.5em" className="text-pink-500" />, angle: 230 },
    { icon: <FaJava size="1.5em" className="text-red-500" />, angle: 250 },
    { icon: <FaReact size="1.5em" className="text-cyan-400" />, angle: 300 },
    { icon: <SiTailwindcss size="1.5em" className="text-blue-400" />, angle: 330 },
    { icon: <SiSpring size="1.5em" className="text-green-500" />, angle: 30 },
    { icon: <SiMongodb size="1.5em" className="text-green-600" />, angle: 60 },
    { icon: <SiJavascript size="1.5em" className="text-yellow-400" />, angle: 100 },
    { icon: <SiNodedotjs size="1.5em" className="text-green-400" />, angle: 130 },
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
          className="absolute top-1/2 left-1/2 w-[300px] h-[300px] md:w-[420px] md:h-[420px] -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {icons.map((item, index) => (
            <div
              key={index}
              className="absolute w-12 h-12 rounded-full bg-card flex items-center justify-center shadow-lg border border-border"
              style={{
                transform: `rotate(${item.angle}deg) translate(150px) rotate(-${item.angle}deg)`,
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
