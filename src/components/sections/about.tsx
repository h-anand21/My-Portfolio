
'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useDoc } from '@/firebase/firestore/use-doc';
import { doc } from 'firebase/firestore';
import { useFirestore, useMemoFirebase } from '@/firebase';

const AboutSection = () => {
    const firestore = useFirestore();

    const adminUserRef = useMemoFirebase(() => {
        if (!firestore) return null;
        // This should be managed in a better way for a real multi-user app.
        // For this solo portfolio, we fetch a specific admin doc.
        const adminUid = "P2GcGewB82MHZtxIfR4PFr8eI323"; 
        return doc(firestore, 'users', adminUid);
    }, [firestore]);


    const { data: userProfile } = useDoc<{resumeUrl: string}>(adminUserRef);

    const resumeUrl = userProfile?.resumeUrl || 'https://drive.google.com/uc?export=download&id=1MbT8wtl8vq_2B0XrGYpDgHmEQ8BHPj8V';


    return (
        <section id="about" className="py-24 md:py-32">
            <div className="container">
                <div className="bg-[#D4FF00] text-black rounded-3xl p-8 md:p-12 shadow-2xl">
                    <div className="grid md:grid-cols-3 gap-8 items-center">
                        <div className="md:col-span-1">
                            <h2 className="font-headline text-5xl md:text-6xl font-bold leading-none">
                                ABOUT<br/>MYSELF
                            </h2>
                        </div>
                        <div className="md:col-span-2 space-y-6">
                            <p className="text-lg md:text-xl">
                                I'm a passionate and results-oriented software developer with a knack for building beautiful,
                                functional, and user-centric web applications. With a strong foundation in modern JavaScript frameworks
                                like React and Next.js, I thrive on turning complex problems into elegant solutions.
                            </p>
                             <p className="text-lg md:text-xl">
                                My journey in tech has been driven by a curiosity for how things work and a desire to create
                                impactful digital experiences. From architecting scalable backends to crafting pixel-perfect
                                UIs, I enjoy every aspect of the development process.
                            </p>
                        </div>
                    </div>
                </div>
                 <div className="text-center mt-12">
                    <Button asChild size="lg">
                        <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                            <Download className="mr-2 h-4 w-4" />
                            Download My Resume
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
