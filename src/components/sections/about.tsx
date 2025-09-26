
'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useDoc } from '@/firebase/firestore/use-doc';
import { doc } from 'firebase/firestore';
import { useFirestore, useUser, useMemoFirebase } from '@/firebase';

const AboutSection = () => {
    const { user } = useUser();
    const firestore = useFirestore();

    const userProfileRef = useMemoFirebase(() => {
        if (!firestore || !user) return null;
        // In a real multi-user app, you might fetch this from a public profile ID
        // For this solo portfolio, we fetch the logged-in admin's profile
        return doc(firestore, 'users', 'himanshuanand563@gmail.com'.replace(/[@.]/g, '_'));
    }, [firestore]);

    const adminUserRef = useMemoFirebase(() => {
        if (!firestore) return null;
        // A better approach for a public page would be to fetch a specific "site-settings" doc
        // But for simplicity, we'll try to get the admin's doc if we can guess the ID.
        // This won't work well if the admin's doc ID isn't known.
        // A better long-term solution is a dedicated 'settings' collection.
        const adminUid = "P2GcGewB82MHZtxIfR4PFr8eI323"; // This should not be hardcoded in a real app
        return doc(firestore, 'users', adminUid);
    }, [firestore]);


    const { data: userProfile } = useDoc<{resumeUrl: string}>(adminUserRef);

    const resumeUrl = userProfile?.resumeUrl || 'https://drive.google.com/uc?export=download&id=1MbT8wtl8vq_2B0XrGYpDgHmEQ8BHPj8V';


    return (
        <section id="about" className="py-24 md:py-32 bg-secondary">
            <div className="container max-w-3xl">
                <div className="max-w-2xl mx-auto text-center mb-12">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold">
                        About Me
                    </h2>
                </div>
                <div className="text-center text-lg text-muted-foreground space-y-6">
                    <p>
                        I'm a passionate and results-oriented software developer with a knack for building beautiful,
                        functional, and user-centric web applications. With a strong foundation in modern JavaScript frameworks
                        like React and Next.js, I thrive on turning complex problems into elegant solutions.
                    </p>
                    <p>
                        My journey in tech has been driven by a curiosity for how things work and a desire to create
                        impactful digital experiences. From architecting scalable backends to crafting pixel-perfect
                        UIs, I enjoy every aspect of the development process.
                    </p>
                    <p>
                        When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                        or enjoying a good cup of coffee.
                    </p>
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
