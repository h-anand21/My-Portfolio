
'use client';

import React from 'react';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection } from 'firebase/firestore';
import type { Skill } from '@/lib/types';
import { Skeleton } from './skeleton';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  .container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 250px;
    gap: 5px;
    flex-wrap: wrap;
  }

  .container .glass {
    position: relative;
    width: 180px;
    height: 200px;
    background: linear-gradient(#fff2, transparent);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 25px 25px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
    border-radius: 10px;
    margin: 0 -30px;
    backdrop-filter: blur(10px);
    transform: rotate(calc(var(--r) * 1deg));
  }

  .container:hover .glass {
    transform: rotate(0deg);
    margin: 0 10px;
  }

  .container .glass::before {
    content: attr(data-text);
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    background: rgba(255, 255, 255, 0.05);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: 600;
  }
  
  .container .glass svg {
    width: 4rem;
    height: 4rem;
    fill: #fff;
  }
`;

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
    <StyledWrapper>
        <div className="container group">
            {skills.map((skill, index) => {
                const rotation = (index - Math.floor(skills.length / 2)) * 15;
                return (
                    <div 
                        key={skill.id}
                        data-text={skill.name}
                        style={{ '--r': rotation } as React.CSSProperties}
                        className="glass"
                    >
                        <div dangerouslySetInnerHTML={{ __html: skill.icon }}></div>
                    </div>
                )
            })}
        </div>
    </StyledWrapper>
  );
};
