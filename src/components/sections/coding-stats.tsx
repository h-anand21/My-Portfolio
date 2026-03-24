
'use client';

import { Github, CodeSquare } from 'lucide-react';
import React from 'react';

const CodingStatsSection = () => {
    const githubUsername = "h-anand21";
    const leetcodeUsername = "hanand21";

    return (
        <section id="coding-stats" className="py-12 bg-neo-black text-white border-y-4 border-black relative overflow-hidden">
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            ></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Compact Header */}
                <div className="flex justify-between items-center mb-6 border-b-2 border-white pb-3">
                    <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
                        CODING<span className="text-neo-green">_STATS</span>
                    </h2>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <p className="font-mono text-neo-green text-xs font-bold">LIVE</p>
                    </div>
                </div>

                {/* Two Column Layout: GitHub | LeetCode */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:auto-rows-fr">
                    {/* GitHub Column */}
                    <div className="reveal flex flex-col h-full">
                        <div className="flex items-center gap-2 mb-4 border-b border-white/20 pb-2">
                            <div className="w-8 h-8 bg-neo-green border-2 border-white flex items-center justify-center">
                                <Github className="h-5 w-5 text-black" />
                            </div>
                            <h3 className="text-2xl font-black uppercase text-white">GITHUB</h3>
                        </div>

                        {/* GitHub Block */}
                        <div
                            className="border-4 border-white/20 p-6 bg-black flex-1 flex flex-col shadow-[8px_8px_0_rgba(0,0,0,1)] relative group">
                            {/* Profile Header */}
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                                <div className="flex items-center gap-3">
                                    <Github className="text-3xl text-neo-green" />
                                    <div>
                                        <h4 className="text-xl font-black text-white leading-tight">{githubUsername}</h4>
                                        <p className="text-[10px] font-mono text-neo-green uppercase tracking-widest">Midnight
                                            Coder</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div id="total-contributions"
                                        className="text-2xl font-black text-neo-green tracking-tighter">--</div>
                                    <p className="text-[8px] font-mono text-gray-500 uppercase">Commits</p>
                                </div>
                            </div>

                            {/* GitHub Badges Container */}
                            <div
                                className="mb-8 border-2 border-white/20 p-4 bg-neo-black/60 relative group shadow-[4px_4px_0_rgba(51,255,87,0.1)] hover:border-neo-green transition-colors duration-500 h-auto md:h-[160px] flex flex-col">
                                <div
                                    className="text-[9px] font-mono text-neo-green uppercase tracking-widest opacity-70 mb-3 flex items-center justify-between">
                                    <span>Trophy_Room</span>
                                    <span id="gh-badges-status" className="animate-pulse text-neo-yellow">Fetching...</span>
                                </div>

                                <div className="flex flex-col md:flex-row gap-4 flex-1">
                                    {/* Active/Locked Badge */}
                                    <div
                                        className="w-full md:w-1/3 flex flex-col items-center justify-center border-b-2 md:border-b-0 md:border-r-2 border-dashed border-white/10 pb-4 md:pb-0 md:pr-4">
                                        <div className="text-[8px] font-mono text-gray-400 uppercase mb-2">Highest Rank</div>
                                        <div id="gh-active-badge"
                                            className="flex flex-col items-center justify-center w-full h-full min-h-[60px]">
                                            {/* Skeleton */}
                                            <div
                                                className="w-10 h-10 rounded-full border-2 border-white/20 border-t-neo-green animate-spin mb-2">
                                            </div>
                                        </div>
                                    </div>

                                    {/* History Awards Scroll Area */}
                                    <div className="w-full md:w-2/3 flex flex-col relative overflow-hidden">
                                        <div className="text-[8px] font-mono text-gray-400 uppercase mb-2">Achievements</div>
                                        <div
                                            className="relative w-full flex-1 overflow-hidden marquee-container group/scroller border-l border-r border-white/5">
                                            {/* Gradient Masks for Marquee */}
                                            <div
                                                className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-neo-black/90 to-transparent z-10 pointer-events-none">
                                            </div>
                                            <div
                                                className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-neo-black/90 to-transparent z-10 pointer-events-none">
                                            </div>

                                            <div id="gh-history-badges"
                                                className="flex gap-4 pb-2 items-center h-full absolute animate-marquee px-4">
                                                {/* Skeletons */}
                                                <div
                                                    className="min-w-[70px] flex flex-col items-center animate-pulse opacity-50">
                                                    <div className="w-10 h-10 bg-white/10 rounded-full mb-2"></div>
                                                    <div className="w-8 h-2 bg-white/10 rounded"></div>
                                                </div>
                                                <div
                                                    className="min-w-[70px] flex flex-col items-center animate-pulse opacity-50">
                                                    <div className="w-10 h-10 bg-white/10 rounded-full mb-2"></div>
                                                    <div className="w-8 h-2 bg-white/10 rounded"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Simplified Stats Grid (2x2) */}
                            <div className="grid grid-cols-2 gap-4 mb-8 uppercase">
                                <div
                                    className="border-2 border-neo-green/30 bg-neo-black/60 p-4 relative group overflow-hidden hover:border-neo-green transition-colors shadow-[4px_4px_0_rgba(51,255,87,0.1)]">
                                    <div
                                        className="text-[9px] font-mono text-neo-green mb-1 uppercase tracking-widest opacity-70">
                                        Repositories</div>
                                    <div id="repos-count" className="text-white font-black text-3xl tracking-tighter">--</div>
                                </div>
                                <div
                                    className="border-2 border-neo-green/30 bg-neo-black/60 p-4 relative group overflow-hidden hover:border-neo-green transition-colors shadow-[4px_4px_0_rgba(51,255,87,0.1)]">
                                    <div
                                        className="text-[9px] font-mono text-neo-green mb-1 uppercase tracking-widest opacity-70">
                                        Followers</div>
                                    <div id="followers-count" className="text-white font-black text-3xl tracking-tighter">--
                                    </div>
                                </div>
                                <div
                                    className="border-2 border-neo-green/30 bg-neo-black/60 p-4 relative group overflow-hidden hover:border-neo-green transition-colors shadow-[4px_4px_0_rgba(51,255,87,0.1)]">
                                    <div
                                        className="text-[9px] font-mono text-neo-green mb-1 uppercase tracking-widest opacity-70">
                                        Commits</div>
                                    <div id="total-contributions-grid"
                                        className="text-white font-black text-3xl tracking-tighter">--</div>
                                </div>
                                <div
                                    className="border-2 border-neo-green/30 bg-neo-black/60 p-4 relative group overflow-hidden hover:border-neo-green transition-colors shadow-[4px_4px_0_rgba(51,255,87,0.1)]">
                                    <div
                                        className="text-[9px] font-mono text-neo-green mb-1 uppercase tracking-widest opacity-70">
                                        Joined</div>
                                    <div id="created-at"
                                        className="text-white font-black text-xl tracking-tighter mt-1 leading-none">--</div>
                                </div>
                            </div>

                            {/* Activity Graph parallel to LeetCode Heatmap */}
                            <div className="flex-1 flex flex-col justify-center mb-8">
                                <div
                                    className="bg-black border-2 border-neo-green/30 p-2 overflow-hidden shadow-[4px_4px_0_rgba(51,255,87,0.1)] group hover:border-neo-green transition-colors duration-500 relative">
                                    {/* NeoBrutalist accent dot */}
                                    <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-neo-green rounded-full animate-pulse">
                                    </div>
                                    <p className="text-[8px] font-mono text-neo-green/50 uppercase tracking-[0.2em] mb-1">
                                        Matrix_Output</p>
                                    <img src={`https://ghchart.rshah.org/33FF57/${githubUsername}`} alt="GitHub Contribution Graph"
                                        className="w-full h-auto filter brightness-110" style={{ imageRendering: 'auto' }} />
                                </div>
                            </div>

                            {/* Command Line Footer */}
                            <div
                                className="mt-auto flex items-center justify-between text-neo-green p-3 border-2 border-white/10 bg-neo-black font-mono text-[11px]">
                                <div className="flex items-center gap-2">
                                    <span className="text-white/30">$</span>
                                    <span className="text-neo-green">gh --stats</span>
                                    <span className="animate-pulse">_</span>
                                </div>
                                <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noopener noreferrer"
                                    className="text-neo-green px-3 py-1 font-black uppercase border border-neo-green hover:bg-neo-green hover:text-black transition-all">
                                    VIEW_GH →
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* LeetCode Column */}
                    <div className="reveal flex flex-col h-full">
                        <div className="flex items-center gap-2 mb-4 border-b border-white/20 pb-2">
                            <div className="w-8 h-8 bg-neo-orange border-2 border-white flex items-center justify-center">
                                <CodeSquare className="h-5 w-5 text-black" />
                            </div>
                            <h3 className="text-2xl font-black uppercase text-white">LEETCODE</h3>
                        </div>

                        {/* LeetCode Block */}
                        <div
                            className="border-4 border-white/20 p-6 bg-black flex-1 flex flex-col shadow-[8px_8px_0_rgba(0,0,0,1)] relative group">
                            {/* Profile Header */}
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                                <div className="flex items-center gap-3">
                                    <CodeSquare className="text-3xl text-neo-orange" />
                                    <div>
                                        <h4 className="text-xl font-black text-white leading-tight">{leetcodeUsername}</h4>
                                        <p className="text-[10px] font-mono text-neo-orange uppercase tracking-widest">
                                            Problem
                                            solver</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-black text-neo-orange tracking-tighter">#Top</div>
                                    <p className="text-[8px] font-mono text-gray-500 uppercase">Ranking</p>
                                </div>
                            </div>

                            {/* LeetCode Badges Container */}
                            <div
                                className="mb-8 border-2 border-white/20 p-4 bg-neo-black/60 relative group shadow-[4px_4px_0_rgba(255,107,0,0.1)] hover:border-neo-orange transition-colors duration-500 h-auto md:h-[160px] flex flex-col">
                                <div
                                    className="text-[9px] font-mono text-neo-orange uppercase tracking-widest opacity-70 mb-3 flex items-center justify-between">
                                    <span>Performance_Badges</span>
                                    <span id="lc-badges-status" className="animate-pulse text-neo-yellow">Fetching...</span>
                                </div>

                                <div className="flex flex-col md:flex-row gap-4 flex-1">
                                    {/* Active/Locked Badge */}
                                    <div
                                        className="w-full md:w-1/3 flex flex-col items-center justify-center border-b-2 md:border-b-0 md:border-r-2 border-dashed border-white/10 pb-4 md:pb-0 md:pr-4">
                                        <div className="text-[8px] font-mono text-gray-400 uppercase mb-2">Active Badge</div>
                                        <div id="lc-active-badge"
                                            className="flex flex-col items-center justify-center w-full h-full min-h-[60px]">
                                            {/* Skeleton */}
                                            <div
                                                className="w-10 h-10 rounded-full border-2 border-white/20 border-t-neo-orange animate-spin mb-2">
                                            </div>
                                        </div>
                                    </div>

                                    {/* History Awards Scroll Area */}
                                    <div className="w-full md:w-2/3 flex flex-col relative overflow-hidden">
                                        <div className="text-[8px] font-mono text-gray-400 uppercase mb-2">History Awards</div>
                                        <div
                                            className="relative w-full flex-1 overflow-hidden marquee-container group/scroller border-l border-r border-white/5">
                                            {/* Gradient Masks for Marquee */}
                                            <div
                                                className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-neo-black/90 to-transparent z-10 pointer-events-none">
                                            </div>
                                            <div
                                                className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-neo-black/90 to-transparent z-10 pointer-events-none">
                                            </div>

                                            <div id="lc-history-badges"
                                                className="flex gap-4 pb-2 items-center h-full absolute animate-marquee px-4">
                                                {/* Skeletons */}
                                                <div
                                                    className="min-w-[70px] flex flex-col items-center animate-pulse opacity-50">
                                                    <div className="w-10 h-10 bg-white/10 rounded-full mb-2"></div>
                                                    <div className="w-8 h-2 bg-white/10 rounded"></div>
                                                </div>
                                                <div
                                                    className="min-w-[70px] flex flex-col items-center animate-pulse opacity-50">
                                                    <div className="w-10 h-10 bg-white/10 rounded-full mb-2"></div>
                                                    <div className="w-8 h-2 bg-white/10 rounded"></div>
                                                </div>
                                                <div
                                                    className="min-w-[70px] flex flex-col items-center animate-pulse opacity-50">
                                                    <div className="w-10 h-10 bg-white/10 rounded-full mb-2"></div>
                                                    <div className="w-8 h-2 bg-white/10 rounded"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Activity Box parallel to GitHub Matrix */}
                            <div className="flex-1 flex flex-col justify-center mb-8">
                                <div
                                    className="border-2 border-neo-orange/30 p-2 overflow-hidden bg-black shadow-[4px_4px_0_rgba(255,107,0,0.1)] group hover:border-neo-orange transition-colors duration-500 relative">
                                    {/* NeoBrutalist accent dot */}
                                    <div
                                        className="absolute top-1 right-1 w-1.5 h-1.5 bg-neo-orange rounded-full animate-pulse">
                                    </div>
                                    <img src={`https://leetcard.jacoblin.cool/${leetcodeUsername}?theme=dark&font=Ubuntu&ext=heatmap`}
                                        alt="LeetCode Stats" className="w-full h-auto object-contain filter contrast-125" />
                                </div>
                            </div>

                            {/* Command Line Footer */}
                            <div
                                className="mt-auto flex items-center justify-between text-neo-orange p-3 border-2 border-white/10 bg-neo-black font-mono text-[11px]">
                                <div className="flex items-center gap-2">
                                    <span className="text-white/30">$</span>
                                    <span className="text-neo-orange">leetcode --u</span>
                                    <span className="animate-pulse">_</span>
                                </div>
                                <a href={`https://leetcode.com/u/${leetcodeUsername}/`} target="_blank" rel="noopener noreferrer"
                                    className="text-neo-orange px-3 py-1 font-black uppercase border border-neo-orange hover:bg-neo-orange hover:text-black transition-all">
                                    VIEW_LC →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CodingStatsSection;
