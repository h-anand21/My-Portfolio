
'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export const GlassCard = () => {
  return (
    <div className="relative flex justify-center items-center min-h-[250px] group">
        <div 
            className="relative w-[180px] h-[200px] bg-gradient-to-b from-white/10 to-transparent border border-white/10 shadow-lg flex justify-center items-center transition-transform duration-500 rounded-lg mx-[-45px] backdrop-blur-sm group-hover:rotate-0 group-hover:mx-2.5"
            style={{ transform: 'rotate(calc(var(--r) * 1deg))', '--r': -15 } as React.CSSProperties}
        >
            <div className="absolute bottom-0 w-full h-10 bg-white/5 flex justify-center items-center text-white before:content-[attr(data-text)]" data-text="React"></div>
            <svg viewBox="0 0 110 99" fill="none" xmlns="http://www.w3.org/2000/svg" height="2.5em" className="fill-white">
                <ellipse rx="10" ry="4.5" cx="55" cy="50" fill="#61DAFB"/>
                <ellipse rx="50" ry="20" cx="55" cy="50" stroke="#61DAFB" strokeWidth="4"/>
                <ellipse rx="50" ry="20" cx="55" cy="50" stroke="#61DAFB" strokeWidth="4" transform="rotate(60 55 50)"/>
                <ellipse rx="50" ry="20" cx="55" cy="50" stroke="#61DAFB" strokeWidth="4" transform="rotate(120 55 50)"/>
            </svg>
        </div>
        <div 
            className="relative w-[180px] h-[200px] bg-gradient-to-b from-white/10 to-transparent border border-white/10 shadow-lg flex justify-center items-center transition-transform duration-500 rounded-lg mx-[-45px] backdrop-blur-sm group-hover:rotate-0 group-hover:mx-2.5"
            style={{ transform: 'rotate(calc(var(--r) * 1deg))', '--r': 5 } as React.CSSProperties}
        >
            <div className="absolute bottom-0 w-full h-10 bg-white/5 flex justify-center items-center text-white before:content-[attr(data-text)]" data-text="JavaScript"></div>
            <svg viewBox="0 0 64 64" height="2.5em" xmlns="http://www.w3.org/2000/svg" className="fill-white">
                <path d="M0 0h64v64H0z" fill="#F7DF1E"/>
                <path d="M48.5 48.4H38.2V33.4c0-4.6-2.1-6.1-5.3-6.1-2.4 0-4.4 1.1-5.2 3.1h-.1v28H17.3V16.3h10.3v4.9h.1c1.3-3.8 4.2-5.7 8.3-5.7 5.1 0 9.5 3.3 9.5 11.2v21.7z"/>
            </svg>
        </div>
        <div 
            className="relative w-[180px] h-[200px] bg-gradient-to-b from-white/10 to-transparent border border-white/10 shadow-lg flex justify-center items-center transition-transform duration-500 rounded-lg mx-[-45px] backdrop-blur-sm group-hover:rotate-0 group-hover:mx-2.5"
            style={{ transform: 'rotate(calc(var(--r) * 1deg))', '--r': 25 } as React.CSSProperties}
        >
            <div className="absolute bottom-0 w-full h-10 bg-white/5 flex justify-center items-center text-white before:content-[attr(data-text)]" data-text="Node.js"></div>
            <svg viewBox="0 0 24 24" height="2.5em" xmlns="http://www.w3.org/2000/svg" className="fill-white">
                <path d="M21.25,9.65,13.1,4.45a1.85,1.85,0,0,0-2.2,0L2.75,9.65a1.8,1.8,0,0,0-.9,1.55v10.6a1.8,1.8,0,0,0,.9,1.55l8.15,5.2a1.85,1.85,0,0,0,2.2,0l8.15-5.2a1.8,1.8,0,0,0,.9-1.55V11.2A1.8,1.8,0,0,0,21.25,9.65ZM14,23.35l-1.8.8-1.8-.8V17.25l-2.7-1.35,1.8-3.3,4.5,2.15Zm-3.8-9.9,1.6,3.15,1.8.9V21.1l4.5-2.25V8.8l-1.35.65-4.5-2.2L10.2,13.45ZM4.65,11.2l7.25-3.55,7.25,3.55,1.35-.65L13.1,1.75a.35.35,0,0,0-.2-.05.3.3,0,0,0-.2.05L5.3,6.8,4.65,11.2ZM3.7,21.8,2.35,21.1v-9.9L3.7,11.8Zm16.6,0L19,11.8l1.35-.6v9.9Z" fill="#8CC84B"/>
            </svg>
        </div>
    </div>
  );
};
