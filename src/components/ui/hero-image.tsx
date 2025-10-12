
'use client';
import React from 'react';
import Image from 'next/image';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection } from 'firebase/firestore';
import type { Skill } from '@/lib/types';
import { Skeleton } from './skeleton';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  .profileCard_container {
    animation: spin-slow 20s linear infinite;
  }
`;


const HeroImage = ({ imageUrl, altText }: { imageUrl: string; altText: string; }) => {
    const firestore = useFirestore();
    const skillsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return collection(firestore, 'skills');
    }, [firestore]);

    const { data: skills, isLoading } = useCollection<Skill>(skillsQuery);
    const iconCount = skills?.length || 6;
    const angleStep = 360 / iconCount;

  return (
    <div className="relative h-full w-full flex items-center justify-center">
       <StyledWrapper>
        <div className="profileCard_container relative p-14 border-2 border-dashed rounded-full border-gray-400/50">
            {isLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="absolute rounded-full bg-cover cursor-pointer border border-gray-400/50 p-2 w-[50px] h-[50px] bg-card"
                        style={{ transform: `rotate(${index * 60}deg) translate(140px) rotate(-${index * 60}deg)` }}
                    >
                        <Skeleton className="w-full h-full rounded-full" />
                    </div>
                ))
            ) : (
                skills?.map((skill, index) => (
                <div
                    key={skill.id}
                    className="profile_item absolute rounded-full bg-cover cursor-pointer border border-gray-400/50 p-2 active:scale-95 hover:scale-95 transition-all duration-500 w-[50px] h-[50px] bg-card text-muted-foreground z-[2]"
                    style={{ transform: `rotate(${index * angleStep}deg) translate(140px) rotate(-${index * angleStep}deg)` }}
                >
                    <div dangerouslySetInnerHTML={{ __html: skill.icon }} className="w-full h-full flex items-center justify-center" />
                </div>
                ))
            )}
        </div>
      </StyledWrapper>
      <div className="absolute">
        <button className="profile_item w-[250px] h-[250px] p-1 border-2 rounded-full hover:border-gray-400/50 cursor-pointer transition-all duration-500 z-0">
          <div className="w-full bg-white h-full flex items-center justify-center p-2 rounded-full active:scale-95 hover:scale-95 object-cover transition-all duration-500">
            <Image
              src={imageUrl}
              alt={altText}
              width={250}
              height={250}
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
