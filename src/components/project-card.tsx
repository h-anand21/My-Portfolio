"use client";
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Project } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
    const cardVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    };

    return (
        <motion.div variants={cardVariants}>
            <Card className="h-full flex flex-col overflow-hidden transition-transform duration-300 transform-gpu hover:-translate-y-2 hover:shadow-primary/20 hover:shadow-2xl bg-card">
                <CardHeader>
                     <Link href={`/projects/${project.slug}`} className="block">
                        <div className="aspect-video relative mb-4 overflow-hidden rounded-lg">
                            <Image
                                src={project.thumbnailUrl}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    </Link>
                    <CardTitle className="font-headline text-2xl">{project.title}</CardTitle>
                    <CardDescription>{project.shortDescription}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow pt-4">
                     <div className="flex flex-wrap items-center justify-between">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech.map((tag) => (
                                <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="icon" asChild>
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub repository">
                                    <Github className="h-5 w-5 text-muted-foreground hover:text-primary" />
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                                    <ExternalLink className="h-5 w-5 text-muted-foreground hover:text-primary" />
                                </a>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default ProjectCard;
