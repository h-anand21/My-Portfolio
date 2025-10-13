
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
import DotPattern from '../ui/dot-pattern';

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

    const defaultP1 = "Check out my new trending post on LinkedIn for my latest thoughts on AI and web development!";
    const defaultP2 = "";
    
    const aboutMeText = userProfile ? `${userProfile.aboutMeP1 || ''} ${userProfile.aboutMeP2 || ''}`.trim() : `${defaultP1} ${defaultP2}`.trim();


    return (
        <section id="about" className="py-8 md:py-12 relative overflow-hidden">
             <DotPattern
                width={20}
                height={20}
                cx={1}
                cy={1}
                cr={1}
                className="[mask-image:linear-gradient(to_bottom,white,transparent,white)]"
            />
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
                                aboutMe=""
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
