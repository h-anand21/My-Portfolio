
'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useDoc } from '@/firebase/firestore/use-doc';
import { doc } from 'firebase/firestore';
import { useFirestore, useMemoFirebase } from '@/firebase';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const AboutSection = () => {
    const firestore = useFirestore();

    const adminUserRef = useMemoFirebase(() => {
        if (!firestore) return null;
        const adminUid = "P2GcGewB82MHZtxIfR4PFr8eI323"; 
        return doc(firestore, 'users', adminUid);
    }, [firestore]);


    const { data: userProfile } = useDoc<{resumeUrl: string}>(adminUserRef);
    const resumeUrl = userProfile?.resumeUrl || 'https://drive.google.com/uc?export=download&id=1MbT8wtl8vq_2B0XrGYpDgHmEQ8BHPj8V';
    const aboutImage = PlaceHolderImages.find(img => img.id === 'hero-photo');

    return (
        <section id="about" className="py-24 md:py-32">
            <div className="container">
                <div className="bg-card text-card-foreground rounded-3xl p-8 md:p-12 shadow-2xl border border-border">
                    <div className="text-center mb-12">
                        <div className="inline-block bg-primary/20 text-primary font-bold py-2 px-6 rounded-lg">
                           <h2 className="font-headline text-5xl md:text-6xl">ABOUT</h2>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                             {aboutImage && (
                                <Image
                                src={aboutImage.imageUrl}
                                alt={aboutImage.description}
                                data-ai-hint={aboutImage.imageHint}
                                fill
                                className="object-cover"
                                />
                            )}
                        </div>
                        <div className="space-y-6">
                            <p className="text-lg md:text-xl text-muted-foreground">
                                I'm a passionate and results-oriented software developer with a knack for building beautiful,
                                functional, and user-centric web applications. With a strong foundation in modern JavaScript frameworks
                                like React and Next.js, I thrive on turning complex problems into elegant solutions.
                            </p>
                             <p className="text-lg md:text-xl text-muted-foreground">
                                My journey in tech has been driven by a curiosity for how things work and a desire to create
                                impactful digital experiences. From architecting scalable backends to crafting pixel-perfect
                                UIs, I enjoy every aspect of the development process.
                            </p>
                             <div className="pt-6">
                                <Button asChild size="lg" className="w-full md:w-auto" variant="outline">
                                    <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                                        <Download className="mr-2 h-5 w-5" />
                                        Download My Resume
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
