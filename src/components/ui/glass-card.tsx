
'use client';

import React from 'react';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection } from 'firebase/firestore';
import type { Skill } from '@/lib/types';
import { Skeleton } from './skeleton';

export const GlassCard = () => {
    const firestore = useFirestore();
    const skillsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return collection(firestore, 'skills');
    }, [firestore]);

    const { data: skills, isLoading } = useCollection<Skill>(skillsQuery);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[250px] gap-4">
                <Skeleton className="w-[180px] h-[200px] rounded-lg" />
                <Skeleton className="w-[180px] h-[200px] rounded-lg" />
                <Skeleton className="w-[180px] h-[200px] rounded-lg" />
            </div>
        );
    }
    
    if (!skills || skills.length === 0) {
        return <div className="text-center text-muted-foreground mt-8">No skills have been added yet.</div>;
    }

  return (
    <div className="relative flex flex-wrap justify-center items-center min-h-[250px] group gap-5">
        {skills.map((skill, index) => {
            const rotation = (index - Math.floor(skills.length / 2)) * 15;
            return (
                <div 
                    key={skill.id}
                    className="relative w-[180px] h-[200px] bg-gradient-to-b from-white/10 to-transparent border border-white/10 shadow-lg flex justify-center items-center transition-transform duration-500 rounded-lg backdrop-blur-sm group-hover:rotate-0 group-hover:mx-2.5"
                    style={{ transform: `rotate(${rotation}deg)`, margin: '0 -30px' }}
                >
                    <div className="absolute bottom-0 w-full h-10 bg-white/5 flex justify-center items-center text-white font-semibold">{skill.name}</div>
                    <div className="[&>svg]:w-12 [&>svg]:h-12 [&>svg]:fill-white" dangerouslySetInnerHTML={{ __html: skill.icon }}></div>
                </div>
            )
        })}
    </div>
  );
};
