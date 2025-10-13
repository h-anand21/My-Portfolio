'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const WelcomeScreen = () => {
  return (
    <div className="card">
      <div className="relative bg-black w-[300px] sm:w-[400px] group transition-all duration-700 aspect-video flex items-center justify-center">
        <div className="transition-all flex flex-col items-center py-5 justify-start duration-300 group-hover:duration-1000 bg-card text-card-foreground w-full h-full absolute group-hover:-translate-y-16">
          <div className="text-center p-4">
              <p className="text-lg md:text-xl">👋 Welcome friends!</p>
              <p className="text-sm md:text-base mt-2">Coding karte rahe, haste rahe, muskuraate rahe! 💻✨</p>
          </div>
        </div>
        <button className="seal bg-primary text-primary-foreground w-10 aspect-square rounded-full z-40 text-[10px] flex items-center justify-center font-semibold [clip-path:polygon(50%_0%,_80%_10%,_100%_35%,_100%_70%,_80%_90%,_50%_100%,_20%_90%,_0%_70%,_0%_35%,_20%_10%)] group-hover:opacity-0 transition-all duration-1000 group-hover:scale-0 group-hover:rotate-180 border-4 border-primary-foreground/50">
          click here
        </button>
        <div className="tp transition-all duration-1000 group-hover:duration-100 bg-neutral-800 absolute group-hover:[clip-path:polygon(50%_0%,_100%_0,_0_0)] w-full h-full [clip-path:polygon(50%_50%,_100%_0,_0_0)]" />
        <div className="lft transition-all duration-700 absolute w-full h-full bg-neutral-900 [clip-path:polygon(50%_50%,_0_0,_0_100%)]" />
        <div className="rgt transition-all duration-700 absolute w-full h-full bg-neutral-800 [clip-path:polygon(50%_50%,_100%_0,_100%_100%)]" />
        <div className="btm transition-all duration-700 absolute w-full h-full bg-neutral-900 [clip-path:polygon(50%_50%,_100%_100%,_0_100%)]" />
      </div>
    </div>
  );
}

export default WelcomeScreen;
