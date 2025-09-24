"use client";
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Project } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ArrowRight, Github } from 'lucide-react';

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
            <Card className="h-full flex flex-col overflow-hidden transition-shadow hover:shadow-xl duration-300">
                <CardHeader>
                    <div className="aspect-video relative mb-4">
                        <Image
                            src={project.thumbnailUrl}
                            alt={project.title}
                            fill
                            className="object-cover rounded-t-lg"
                        />
                    </div>
                    <CardTitle className="font-headline text-2xl">{project.title}</CardTitle>
                    <CardDescription>{project.shortDescription}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2">
                        {project.tech.map((tag) => (
                            <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm" asChild>
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                Live Demo
                            </a>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub repository">
                                <Github className="h-4 w-4" />
                            </a>
                        </Button>
                    </div>
                    <Button asChild>
                        <Link href={`/projects/${project.slug}`}>
                            Case Study <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
};

export default ProjectCard;
