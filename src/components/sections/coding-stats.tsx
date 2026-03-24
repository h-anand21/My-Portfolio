
'use client';

import { Github, CodeSquare } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// Interfaces for our data
interface GitHubStats {
    public_repos: number;
    followers: number;
    created_at: string;
}

interface GitHubTrophy {
    label: string;
    rank: 'SECRET' | 'SSS' | 'SS' | 'S' | 'AAA' | 'AA' | 'A' | 'B' | 'C';
}


const CodingStatsSection = () => {
    const githubUsername = "h-anand21";
    const leetcodeUsername = "hanand21";

    // State for GitHub data
    const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
    const [githubTrophies, setGithubTrophies] = useState<GitHubTrophy[] | null>(null);
    const [ghStatsLoading, setGhStatsLoading] = useState(true);
    const [ghTrophiesLoading, setGhTrophiesLoading] = useState(true);

    useEffect(() => {
        // Fetch GitHub User Stats
        setGhStatsLoading(true);
        fetch(`https://api.github.com/users/${githubUsername}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data: GitHubStats) => {
                setGithubStats(data);
            })
            .catch(err => console.error("Failed to fetch GitHub stats:", err))
            .finally(() => setGhStatsLoading(false));

        // Fetch GitHub Trophies
        setGhTrophiesLoading(true);
        fetch(`https://github-profile-trophy.vercel.app/api/trophies?username=${githubUsername}`)
            .then(res => {
                 if (!res.ok) {
                    throw new Error('Network response was not ok for trophies');
                }
                return res.json()
            })
            .then((data: GitHubTrophy[]) => {
                // Filter out any potential errors/empty objects from the API
                const validTrophies = Array.isArray(data) ? data.filter(trophy => trophy.rank && trophy.label) : [];
                setGithubTrophies(validTrophies);
            })
            .catch(err => {
                console.error("Failed to fetch GitHub trophies:", err);
                setGithubTrophies([]); // Set to empty array on error to stop loading
            })
            .finally(() => setGhTrophiesLoading(false));
            
    }, [githubUsername]);
    
    // For the marquee effect to be smooth, we need to duplicate the items
    const duplicatedTrophies = githubTrophies ? [...githubTrophies, ...githubTrophies] : [];


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
                                     <span id="gh-badges-status" className={ghTrophiesLoading ? "animate-pulse text-neo-yellow" : ""}>
                                        {ghTrophiesLoading ? 'Fetching...' : 'Loaded'}
                                    </span>
                                </div>

                                <div className="flex flex-col md:flex-row gap-4 flex-1">
                                    {/* Active/Locked Badge */}
                                    <div
                                        className="w-full md:w-1/3 flex flex-col items-center justify-center border-b-2 md:border-b-0 md:border-r-2 border-dashed border-white/10 pb-4 md:pb-0 md:pr-4">
                                        <div className="text-[8px] font-mono text-gray-400 uppercase mb-2">Highest Rank</div>
                                        <div
                                            className="flex flex-col items-center justify-center w-full h-full min-h-[60px]">
                                             {ghTrophiesLoading ? (
                                                <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-neo-green animate-spin mb-2"></div>
                                            ) : githubTrophies && githubTrophies.length > 0 ? (
                                                <>
                                                    <img src={`https://github-profile-trophy.vercel.app/api/trophy?username=${githubUsername}&theme=darkhub&no-frame=true&no-bg=true&rank=${githubTrophies[0].rank}`} alt={githubTrophies[0].label} className="w-16 h-16"/>
                                                    <p className="text-[10px] font-mono text-white mt-1 text-center">{githubTrophies[0].label}</p>
                                                </>
                                            ) : (
                                                <p className="text-xs text-gray-500">No trophies</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* History Awards Scroll Area */}
                                    <div className="w-full md:w-2/3 flex flex-col relative overflow-hidden">
                                        <div className="text-[8px] font-mono text-gray-400 uppercase mb-2">Achievements</div>
                                        <div
                                            className="relative w-full flex-1 overflow-hidden marquee-container group/scroller border-l border-r border-white/5">
                                            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-neo-black/90 to-transparent z-10 pointer-events-none"></div>
                                            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-neo-black/90 to-transparent z-10 pointer-events-none"></div>

                                            <div className="flex gap-4 pb-2 items-center h-full absolute animate-marquee group-hover/scroller:[animation-play-state:paused] px-4">
                                                 {ghTrophiesLoading ? (
                                                    [...Array(4)].map((_, i) => (
                                                    <div key={i} className="min-w-[70px] flex flex-col items-center animate-pulse opacity-50">
                                                        <div className="w-10 h-10 bg-white/10 rounded-full mb-2"></div>
                                                        <div className="w-12 h-2 bg-white/10 rounded"></div>
                                                    </div>
                                                    ))
                                                ) : duplicatedTrophies.length > 0 ? (
                                                    duplicatedTrophies.map((trophy, index) => (
                                                        <div key={index} className="min-w-[70px] flex flex-col items-center">
                                                            <img src={`https://github-profile-trophy.vercel.app/api/trophy?username=${githubUsername}&theme=darkhub&no-frame=true&no-bg=true&rank=${trophy.rank}`} alt={trophy.label} className="w-10 h-10 opacity-70 group-hover/scroller:opacity-100 transition-opacity"/>
                                                            <p className="text-[9px] text-center font-mono text-gray-400 mt-1 truncate w-full">{trophy.label}</p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-xs text-gray-500 pl-4">No achievements found</p>
                                                )}
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
                                    <div id="repos-count" className="text-white font-black text-3xl tracking-tighter">
                                        {ghStatsLoading ? '--' : githubStats?.public_repos ?? '0'}
                                    </div>
                                </div>
                                <div
                                    className="border-2 border-neo-green/30 bg-neo-black/60 p-4 relative group overflow-hidden hover:border-neo-green transition-colors shadow-[4px_4px_0_rgba(51,255,87,0.1)]">
                                    <div
                                        className="text-[9px] font-mono text-neo-green mb-1 uppercase tracking-widest opacity-70">
                                        Followers</div>
                                    <div id="followers-count" className="text-white font-black text-3xl tracking-tighter">
                                        {ghStatsLoading ? '--' : githubStats?.followers ?? '0'}
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
                                        className="text-white font-black text-xl tracking-tighter mt-1 leading-none">
                                        {ghStatsLoading ? '--' : githubStats ? new Date(githubStats.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'N/A'}
                                    </div>
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
                                    <span className="text-neo-yellow">N/A</span>
                                </div>

                                <div className="flex flex-col md:flex-row gap-4 flex-1">
                                    <div
                                        className="w-full flex flex-col items-center justify-center">
                                        <p className="text-gray-500 text-xs text-center">Badge API not available for LeetCode.</p>
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

    