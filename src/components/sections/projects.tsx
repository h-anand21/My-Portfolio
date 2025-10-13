
"use client";
import { motion } from 'framer-motion';
import ProjectCard from '../project-card';
import { useFirestore } from '@/firebase';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, query, where } from 'firebase/firestore';
import { useMemoFirebase } from '@/firebase/provider';
import type { Project } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';
import { TextHoverEffect } from '../ui/text-hover-effect';
import DotPattern from '../ui/dot-pattern';

const ProjectsSection = () => {
    const firestore = useFirestore();
    const projectsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'projects'), where('published', '==', true));
    }, [firestore]);

    const { data: projects, isLoading } = useCollection<Project>(projectsQuery);

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    return (
        <section id="projects" className="py-8 md:py-12 relative overflow-hidden">
            <DotPattern
                width={20}
                height={20}
                cx={1}
                cy={1}
                cr={1}
                className="[mask-image:linear-gradient(to_bottom,white,transparent,white)]"
            />
            <div className="container">
                <div className="max-w-2xl mx-auto text-center mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold breathe-text">
                        My Work
                    </h2>
                     <TextHoverEffect className="mt-4 max-w-2xl mx-auto justify-center">
                        Here are some of the projects I'm proud to have worked on. Each one was a unique challenge and a great learning experience.
                    </TextHoverEffect>
                </div>
                 {isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <Skeleton className="h-[450px] w-full" />
                        </div>
                        <div className="space-y-4">
                            <Skeleton className="h-[450px] w-full" />
                        </div>
                    </div>
                )}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {projects?.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </motion.div>
                {projects && projects.length === 0 && !isLoading && (
                    <div className="text-center text-muted-foreground mt-8">
                        <p>No published projects yet. Check back soon!</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProjectsSection;




