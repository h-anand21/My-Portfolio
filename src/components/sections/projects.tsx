"use client";
import { motion } from 'framer-motion';
import { projects } from '@/lib/projects';
import ProjectCard from '../project-card';

const ProjectsSection = () => {
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    return (
        <section id="projects" className="pb-24 md:pb-32">
            <div className="container">
                <div className="max-w-2xl mx-auto text-center mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold">
                        My Work
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">Here are some of the projects I'm proud to have worked on. Each one was a unique challenge and a great learning experience.</p>
                </div>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectsSection;
