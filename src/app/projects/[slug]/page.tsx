import { projects } from '@/lib/projects';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Github } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import GenerateSummary from '@/components/generate-summary';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }
  return {
    title: `${project.title} | Portfolio Pro`,
    description: project.shortDescription,
  }
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="py-12 md:py-20">
      <div className="container max-w-4xl">
        <Button variant="ghost" asChild className="mb-8">
            <Link href="/#projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
            </Link>
        </Button>

        <article>
          <header className="mb-12">
            <h1 className="font-headline text-4xl font-extrabold tracking-tighter md:text-5xl mb-4">{project.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{project.description}</p>
            <div className="flex flex-wrap items-center gap-4">
                <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                        <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" asChild>
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">Live Demo</a>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub repository">
                            <Github className="h-4 w-4" />
                        </a>
                    </Button>
                </div>
            </div>
          </header>

          <div className="prose dark:prose-invert max-w-none">
            <div className="relative aspect-video mb-12">
                <Image 
                    src={project.thumbnailUrl} 
                    alt={`${project.title} screenshot`} 
                    fill 
                    className="object-cover rounded-lg shadow-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            <GenerateSummary projectId={project.id} />
            
            <h2>The Problem</h2>
            <p>{project.caseStudy.problem}</p>

            <h2>The Solution</h2>
            <p>{project.caseStudy.solution}</p>
            
            <h2>Outcome & Results</h2>
            <p>{project.caseStudy.outcome}</p>

            <h2>What I Learned</h2>
            <p>{project.caseStudy.learnings}</p>
          </div>
        </article>
      </div>
    </div>
  );
}
