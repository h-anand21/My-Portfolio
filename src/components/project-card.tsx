"use client";
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

interface ProjectCardProps {
    project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {

    const techArray = Array.isArray(project.tech) ? project.tech : [];

    const handleExternalLinkClick = (e: React.MouseEvent<HTMLButtonElement>, url: string) => {
        e.preventDefault();
        e.stopPropagation();
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <CardContainer>
             <Link href={`/projects/${project.slug}`} className="block group">
                <CardBody className="bg-card relative group/card dark:hover:shadow-2xl dark:hover:shadow-primary/20 w-auto h-auto rounded-xl p-6 border border-border">
                    <CardItem translateZ="50" className="w-full">
                        <div className="aspect-video relative mb-4 overflow-hidden rounded-lg">
                            <Image
                                src={project.thumbnailUrl}
                                alt={project.title}
                                fill
                                className="object-contain transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    </CardItem>
                    <CardItem
                        translateZ="60"
                        className="w-full"
                    >
                        <h3 className="font-headline text-2xl font-bold text-card-foreground">{project.title}</h3>
                        <p className="text-sm text-muted-foreground mt-2">{project.shortSummary || project.shortDescription}</p>
                    </CardItem>

                    <div className="flex justify-between items-center mt-8 w-full">
                         <CardItem
                            translateZ={20}
                            className="flex flex-wrap gap-2"
                         >
                            {techArray.map((tag) => (
                                <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                        </CardItem>

                        <CardItem
                            translateZ={20}
                            className="flex gap-2"
                        >
                            {project.githubUrl && (
                                <Button variant="ghost" size="icon" onClick={(e) => handleExternalLinkClick(e, project.githubUrl!)} aria-label="GitHub repository">
                                    <Github className="h-5 w-5 text-muted-foreground hover:text-primary" />
                                </Button>
                            )}
                            {project.demoUrl && (
                                <Button variant="ghost" size="icon" onClick={(e) => handleExternalLinkClick(e, project.demoUrl!)} aria-label="Live Demo">
                                    <ExternalLink className="h-5 w-5 text-muted-foreground hover:text-primary" />
                                </Button>
                            )}
                        </CardItem>
                    </div>
                </CardBody>
            </Link>
        </CardContainer>
    );
};

export default ProjectCard;

    