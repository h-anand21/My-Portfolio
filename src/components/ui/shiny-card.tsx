
'use client';

import React from 'react';

type ShinyCardProps = {
    name: string;
    designation: string;
    quote: string;
};

export const ShinyCard = ({ name, designation, quote }: ShinyCardProps) => {
  return (
    <div className="w-full h-full relative border border-solid border-white/20 rounded-2xl overflow-hidden">
      <div className="w-full h-full p-1 absolute bg-primary/20">
        <div className="w-full h-full rounded-xl rounded-tr-[80px] rounded-br-[30px] bg-card" />
      </div>
      <div className="w-full h-full flex items-center justify-center relative backdrop-blur-lg rounded-2xl">
      </div>
      <div className="w-full h-full p-6 flex flex-col justify-between absolute inset-0">
        <div className="w-full p-4 pt-3 pb-1.5 flex flex-col rounded-xl backdrop-blur-lg bg-black/10 dark:bg-white/5 text-foreground">
          <span className="text-xl font-bold font-headline">{name}</span>
          <span className="text-xs text-muted-foreground font-sans">{designation}</span>
          <blockquote className="mt-4 text-sm text-foreground/80 italic line-clamp-6">
            "{quote}"
          </blockquote>
        </div>
        <div className="h-full pt-2 flex flex-col items-end text-muted-foreground">
          <div className="w-8 h-8 mt-auto flex items-center justify-center rounded-full backdrop-blur-lg bg-black/10 dark:bg-gray-50/20 cursor-pointer transition-all duration-300 hover:bg-gray-50/30">
            <span className="font-serif text-white/80">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" className="w-4 h-4">
                <g fill="none">
                  <path d="M4.646 2.146a.5.5 0 0 0 0 .708L7.793 6L4.646 9.146a.5.5 0 1 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z" fill="currentColor" />
                </g>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
