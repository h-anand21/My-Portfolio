
"use client";
import { motion } from 'framer-motion';
import ProjectCard from '../project-card';
import { useFirestore } from '@/firebase';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, query, where } from 'firebase/firestore';
import { useMemoFirebase } from '@/firebase/provider';
import type { Project } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';

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
        <section id="projects" className="pt-12 pb-24 md:pt-20 md:pb-32">
            <div className="container">
                <div className="max-w-2xl mx-auto text-center mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold">
                        My Work
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">Here are some of the projects I'm proud to have worked on. Each one was a unique challenge and a great learning experience.</p>
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


