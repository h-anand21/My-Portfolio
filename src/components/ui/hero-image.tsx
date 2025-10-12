
'use client';
import React from 'react';
import Image from 'next/image';
import { Figma, Code, Bot, Wind, Database } from 'lucide-react';

const HeroImage = ({ imageUrl, altText }: { imageUrl: string; altText: string; }) => {
  const icons = [
    { icon: <Figma />, style: { top: '-4px', left: '45px' } },
    { icon: <Code />, style: { top: '80px', right: '-4px' } },
    { icon: <Bot />, style: { bottom: '8px', right: '40px' } },
    { icon: <Wind />, style: { bottom: '-4px', left: '45px' } },
    { icon: <Database />, style: { top: '80px', left: '-4px' } },
  ];

  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <div className="profileCard_container relative p-10 border-2 border-dashed rounded-full border-gray-400/50">
        {icons.map((item, index) => (
          <button 
              key={index} 
              className="profile_item absolute rounded-full bg-cover cursor-pointer border border-gray-400/50 p-[2px] active:scale-95 hover:scale-95 transition-all duration-500"
              style={item.style as React.CSSProperties}
          >
            <span className="block w-[40px] h-[40px] transition-all duration-500 rounded-full z-[2] bg-card p-2 text-muted-foreground">
              {item.icon}
            </span>
          </button>
        ))}

        <button className="profile_item w-[200px] h-[200px] p-1 border-2 rounded-full hover:border-gray-400/50 cursor-pointer transition-all duration-500 z-0">
          <div className="w-full bg-white h-full flex items-center justify-center p-2 rounded-full active:scale-95 hover:scale-95 object-cover transition-all duration-500">
            <Image
              src={imageUrl}
              alt={altText}
              width={200}
              height={200}
              className="rounded-full object-cover aspect-square"
              priority
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default HeroImage;
