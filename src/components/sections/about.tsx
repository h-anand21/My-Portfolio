
'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useDoc } from '@/firebase/firestore/use-doc';
import { doc } from 'firebase/firestore';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { TextHoverEffect } from '../ui/text-hover-effect';
import { Skeleton } from '../ui/skeleton';
import { AboutCard } from '../ui/about-card';

const AboutSection = () => {
    const firestore = useFirestore();

    const adminUserRef = useMemoFirebase(() => {
        if (!firestore) return null;
        const adminUid = "P2GcGewB82MHZtxIfR4PFr8eI323"; 
        return doc(firestore, 'users', adminUid);
    }, [firestore]);


    const { data: userProfile, isLoading } = useDoc<any>(adminUserRef);
    
    const resumeUrl = userProfile?.resumeUrl || 'https://drive.google.com/uc?export=download&id=1MbT8wtl8vq_2B0XrGYpDgHmEQ8BHPj8V';
    const defaultAboutImage = PlaceHolderImages.find(img => img.id === 'hero-photo');

    const aboutImage = userProfile?.aboutMeImageUrl || defaultAboutImage?.imageUrl;
    const aboutImageAlt = defaultAboutImage?.description || 'About me image';

    const defaultP1 = "I'm a passionate and results-oriented software developer with a knack for building beautiful, functional, and user-centric web applications. With a strong foundation in modern JavaScript frameworks like React and Next.js, I thrive on turning complex problems into elegant solutions.";
    const defaultP2 = "My journey in tech has been driven by a curiosity for how things work and a desire to create impactful digital experiences. From architecting scalable backends to crafting pixel-perfect UIs, I enjoy every aspect of the development process.";
    
    const aboutMeText = userProfile ? `${userProfile.aboutMeP1} ${userProfile.aboutMeP2}` : `${defaultP1} ${defaultP2}`;


    return (
        <section id="about" className="py-8 md:py-12">
            <div className="container">
                <div className="bg-card text-card-foreground rounded-3xl shadow-2xl border border-border overflow-hidden">
                   <div className="title p-8 md:p-12 relative">
                     <div className="aurora">
                        <div className="aurora__item"></div>
                        <div className="aurora__item"></div>
                        <div className="aurora__item"></div>
                        <div className="aurora__item"></div>
                    </div>
                    <div className="text-center mb-12 relative z-10">
                        <h2 className="font-headline text-5xl md:text-6xl font-bold text-card-foreground">{userProfile?.aboutMeTitle || 'About Me'}</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                        <div className="space-y-6">
                            {isLoading ? (
                                <div className="space-y-4">
                                    <Skeleton className="h-6 w-full" />
                                    <Skeleton className="h-6 w-5/6" />
                                    <Skeleton className="h-6 w-full" />
                                    <Skeleton className="h-6 w-4/5" />
                                </div>
                            ) : (
                                <>
                                    <TextHoverEffect>
                                        {userProfile?.aboutMeP1 || defaultP1}
                                    </TextHoverEffect>
                                    <TextHoverEffect>
                                        {userProfile?.aboutMeP2 || defaultP2}
                                    </TextHoverEffect>
                                </>
                            )}
                             <div className="pt-6">
                                <Button asChild size="lg" className="w-full md:w-auto" variant="outline">
                                    <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                                        <Download className="mr-2 h-5 w-5" />
                                        Download My Resume
                                    </a>
                                </Button>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                           <AboutCard
                                name="Himanshu Anand"
                                aboutMe={aboutMeText}
                                imageUrl={aboutImage || ''}
                                altText={aboutImageAlt}
                           />
                        </div>
                    </div>
                   </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
