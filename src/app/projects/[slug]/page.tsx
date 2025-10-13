
'use server';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import GenerateSummary from '@/components/generate-summary';
import { initializeApp, getApps, App as AdminApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { credential } from 'firebase-admin';
import type { Project } from '@/lib/types';
import { projects as localProjects } from '@/lib/projects';

function initializeFirebaseAdmin(): AdminApp {
  if (getApps().length > 0) {
    return getApps()[0];
  }
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    return initializeApp({
      credential: credential.json(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY))
    });
  }
  return initializeApp();
}

async function getProjectBySlug(slug: string): Promise<Project | undefined> {
    try {
        const adminApp = initializeFirebaseAdmin();
        const firestore = getFirestore(adminApp);
        const projectsCollection = firestore.collection('projects');
        const q = firestore.collection('projects').where('slug', '==', slug).limit(1);
        const snapshot = await q.get();

        if (snapshot.empty) {
            // Fallback to local projects if not found in Firestore
            return localProjects.find((p) => p.slug === slug);
        }

        const doc = snapshot.docs[0];
        const data = doc.data();

        // Firestore data might not have caseStudy, so we create a default one
        const caseStudy = data.caseStudy || {
            problem: 'Details for this case study have not been written yet.',
            solution: 'Please check back later for more information.',
            outcome: '',
            learnings: '',
        };

        return {
            id: doc.id,
            slug: data.slug,
            title: data.title,
            description: data.description,
            shortSummary: data.shortSummary,
            tech: data.tech,
            thumbnailUrl: data.thumbnailUrl,
            demoUrl: data.demoUrl,
            githubUrl: data.githubUrl,
            caseStudy,
        };
    } catch (error) {
        console.error("Error fetching project by slug:", error);
        // On error, still try to find in local projects
        return localProjects.find((p) => p.slug === slug);
    }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }
  return {
    title: `${project.title} | Portfolio Pro`,
    description: project.shortSummary || project.description,
  }
}

// This function can be removed if you only want to generate pages for Firestore projects
// Or modified to fetch all slugs from both sources. For now, we keep local for fallback.
export async function generateStaticParams() {
   // We will start with local projects. For a fully dynamic site, 
   // you would fetch all slugs from Firestore here.
  return localProjects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }
  
  const techArray = Array.isArray(project.tech) ? project.tech : [];

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
            <p className="text-xl text-muted-foreground mb-6">{project.shortSummary || project.description}</p>
            <div className="flex flex-wrap items-center gap-4">
                <div className="flex flex-wrap gap-2">
                    {techArray.map((tech) => (
                        <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                </div>
                 <div className="flex gap-2">
                    {project.demoUrl && (
                         <Button variant="outline" asChild>
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Live Demo
                            </a>
                        </Button>
                    )}
                    {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub repository" className="neumorphic-icon-button h-10 w-10 !p-2 inline-flex items-center justify-center">
                            <Github className="h-5 w-5" />
                        </a>
                    )}
                </div>
            </div>
          </header>

          <div className="prose dark:prose-invert max-w-none prose-lg">
            <div className="relative aspect-video mb-12 rounded-lg overflow-hidden shadow-2xl">
                <Image 
                    src={project.thumbnailUrl} 
                    alt={`${project.title} screenshot`} 
                    fill 
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            <GenerateSummary projectId={project.id} />
            
            {project.caseStudy && (
                <>
                    <h2>The Problem</h2>
                    <p>{project.caseStudy.problem}</p>

                    <h2>The Solution</h2>
                    <p>{project.caseStudy.solution}</p>
                    
                    {project.caseStudy.outcome && (
                        <>
                            <h2>Outcome & Results</h2>
                            <p>{project.caseStudy.outcome}</p>
                        </>
                    )}

                    {project.caseStudy.learnings && (
                        <>
                            <h2>What I Learned</h2>
                            <p>{project.caseStudy.learnings}</p>
                        </>
                    )}
                </>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}

    