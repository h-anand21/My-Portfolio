
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaAws, FaReact, FaWordpress } from "react-icons/fa";
import { SiMongodb, SiLaravel, SiTailwindcss, SiFigma, SiNestjs, SiOpenai } from "react-icons/si";

const HeroImage = ({ imageUrl, altText }: { imageUrl: string; altText: string }) => {

  const icons = [
    { icon: <SiMongodb size={36} className="text-[#4DB33D]" />, angle: 0 },
    { icon: <FaAws size={36} className="text-[#FF9900]" />, angle: 45 },
    { icon: <SiOpenai size={36} className="text-[#10A37F]" />, angle: 90 },
    { icon: <SiNestjs size={36} className="text-[#E0234E]" />, angle: 135 },
    { icon: <FaReact size={36} className="text-[#61DAFB]" />, angle: 180 },
    { icon: <SiFigma size={36} className="text-[#F24E1E]" />, angle: 225 },
    { icon: <SiTailwindcss size={36} className="text-[#38BDF8]" />, angle: 270 },
    { icon: <SiLaravel size={36} className="text-[#FF2D20]" />, angle: 315 },
    { icon: <FaWordpress size={36} className="text-[#21759B]" />, angle: 360 },
  ];

  return (
    <div className="relative flex items-center justify-center h-full w-full">
        {/* Rotating Icons */}
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute w-[220px] h-[220px] md:w-[280px] md:h-[280px] rounded-full flex items-center justify-center"
        >
            {icons.map((item, index) => (
            <motion.div
                key={index}
                className="absolute"
                style={{
                    transform: `rotate(${item.angle}deg) translate(110px) rotate(-${item.angle}deg)`,
                }}
                whileHover={{ scale: 1.3 }}
            >
                {item.icon}
            </motion.div>
            ))}
        </motion.div>
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
    </div>
  );
};

export default HeroImage;
