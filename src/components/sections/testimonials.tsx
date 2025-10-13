
'use client';

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { useFirestore } from '@/firebase';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, query } from 'firebase/firestore';
import { useMemoFirebase } from '@/firebase/provider';
import { Skeleton } from '../ui/skeleton';
import type { Testimonial } from '@/lib/types';
import { TextHoverEffect } from "../ui/text-hover-effect";
import DotPattern from '../ui/dot-pattern';


const TestimonialsSection = () => {
    const firestore = useFirestore();

    const testimonialsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'testimonials'));
    }, [firestore]);

    const { data: testimonials, isLoading } = useCollection<Testimonial>(testimonialsQuery);

    return (
        <section id="testimonials" className="bg-background py-8 md:py-12 relative overflow-hidden">
            <DotPattern
                width={20}
                height={20}
                cx={1}
                cy={1}
                cr={1}
                className="[mask-image:linear-gradient(to_bottom,white,transparent,white)]"
            />
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold">
                        What People Are Saying
                    </h2>
                     <TextHoverEffect className="mt-4 max-w-2xl mx-auto justify-center">
                        I take pride in delivering results. Here's what collaborators and clients have to say about my work.
                    </TextHoverEffect>
                </div>
                 {isLoading && (
                    <div className="flex flex-col items-center justify-center">
                        <Skeleton className="h-40 w-full max-w-4xl" />
                    </div>
                )}
                {testimonials && testimonials.length > 0 && (
                    <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
                )}
                 {testimonials && testimonials.length === 0 && !isLoading && (
                    <div className="text-center text-muted-foreground mt-8">
                        <p>No testimonials have been added yet.</p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default TestimonialsSection;
