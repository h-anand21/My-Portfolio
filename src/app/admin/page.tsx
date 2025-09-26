'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useFirestore } from '@/firebase';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, doc } from 'firebase/firestore';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { useMemo, useState } from 'react';
import { useMemoFirebase } from '@/firebase/provider';
import { projects as localProjects } from '@/lib/projects';
import { deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';

export default function AdminDashboard() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [projectToDelete, setProjectToDelete] = useState<any>(null);

  const projectsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'projects');
  }, [firestore]);
  const { data: firestoreProjects, isLoading } = useCollection(projectsQuery);

  const allProjects = useMemo(() => {
    const combined = [...localProjects.map(p => ({...p, id: p.slug, shortSummary: p.shortDescription, published: true, isLocal: true}))];
    
    if (firestoreProjects) {
      firestoreProjects.forEach(fp => {
        if (!combined.some(p => p.slug === fp.slug)) {
          combined.push(fp);
        }
      });
    }
    
    return combined.sort((a, b) => (a.title > b.title ? 1 : -1));
  }, [firestoreProjects]);

  const handleDeleteProject = () => {
    if (!firestore || !projectToDelete) return;

    // Only attempt to delete from Firestore if it's not a local project
    if (!projectToDelete.isLocal) {
        const projectRef = doc(firestore, 'projects', projectToDelete.id);
        deleteDocumentNonBlocking(projectRef);
    }

    toast({
      title: 'Project Action',
      description: `"${projectToDelete.title}" has been removed from the view.`,
    });

    // Note: This will only visually remove local projects for the current session.
    // A page refresh would bring them back as they are hardcoded.
    // To permanently remove them, you would need to edit the source code.
    const projectIndex = allProjects.findIndex(p => p.id === projectToDelete.id);
    if (projectIndex > -1) {
        allProjects.splice(projectIndex, 1);
    }

    setProjectToDelete(null);
  };


  return (
    <div className="container py-12">
      <AlertDialog>
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <Button asChild>
            <Link href="/admin/projects/new">Add New Project</Link>
          </Button>
        </header>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Your Projects</h2>
          {isLoading && <p>Loading projects...</p>}
          {allProjects && allProjects.length === 0 && !isLoading && (
            <p>You haven't added any projects yet.</p>
          )}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allProjects?.map((project) => (
              <Card key={project.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="truncate">{project.title}</span>
                    <Badge variant={project.published ? 'default' : 'secondary'}>
                        {project.published ? 'Published' : 'Draft'}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{project.isLocal ? 'Sample Project' : 'From Firestore'}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-3">
                    {project.shortSummary}
                  </p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/projects/edit/${project.id}`}>Edit</Link>
                  </Button>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setProjectToDelete(project)}
                    >
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the
                    project "{projectToDelete?.title}" from your database if it's a Firestore project, or remove it from the view if it's a sample.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setProjectToDelete(null)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteProject}>
                    Continue
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
