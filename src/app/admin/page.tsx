
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useFirestore, useUser } from '@/firebase';
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
import { useMemo, useState, useEffect } from 'react';
import { useMemoFirebase } from '@/firebase/provider';
import { projects as localProjects } from '@/lib/projects';
import { deleteDocumentNonBlocking, setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDoc } from '@/firebase/firestore/use-doc';

export default function AdminDashboard() {
  const firestore = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();
  const [projectToDelete, setProjectToDelete] = useState<any>(null);
  const [resumeUrl, setResumeUrl] = useState('');
  const [isSavingResume, setIsSavingResume] = useState(false);

  const userProfileRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);
  const { data: userProfile } = useDoc(userProfileRef);

  useEffect(() => {
    if (userProfile?.resumeUrl) {
      setResumeUrl(userProfile.resumeUrl);
    }
  }, [userProfile]);


  const projectsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'projects');
  }, [firestore]);
  const { data: firestoreProjects, isLoading } = useCollection(projectsQuery);

  const allProjects = useMemo(() => {
    const combinedProjects: any[] = firestoreProjects ? [...firestoreProjects] : [];
    const firestoreProjectSlugs = new Set(combinedProjects.map(p => p.slug));

    localProjects.forEach(localProject => {
        if (!firestoreProjectSlugs.has(localProject.slug)) {
            combinedProjects.push({
                ...localProject,
                shortSummary: localProject.shortDescription, // Align property name
                isLocal: true,
            });
        }
    });

    return combinedProjects.sort((a, b) => a.title.localeCompare(b.title));
  }, [firestoreProjects]);

  const handleDeleteProject = () => {
    if (!firestore || !projectToDelete) return;

    if (!projectToDelete.isLocal) {
        const projectRef = doc(firestore, 'projects', projectToDelete.id);
        deleteDocumentNonBlocking(projectRef);
    }

    toast({
      title: 'Project Action',
      description: `"${projectToDelete.title}" has been removed from the view.`,
    });
    
    // The view will update automatically due to state changes from useCollection
    // and the re-computation of `allProjects`. No manual splice needed.

    setProjectToDelete(null);
  };
  
  const handleSaveResume = async () => {
    if (!userProfileRef) return;
    setIsSavingResume(true);
    try {
      await setDocumentNonBlocking(userProfileRef, { resumeUrl }, { merge: true });
      toast({
        title: 'Success!',
        description: 'Your resume URL has been updated.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update resume URL.',
        variant: 'destructive',
      });
    } finally {
      setIsSavingResume(false);
    }
  };


  return (
    <div className="container py-12">
      <AlertDialog>
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        </header>

        <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
           <Card>
            <CardHeader>
                <CardTitle>Resume Management</CardTitle>
                <CardDescription>Update the public URL for your resume. This link will be used on the "Download Resume" buttons across your site.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="resumeUrl">Resume URL</Label>
                    <Input 
                        id="resumeUrl" 
                        value={resumeUrl}
                        onChange={(e) => setResumeUrl(e.target.value)}
                        placeholder="https://example.com/your-resume.pdf"
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleSaveResume} disabled={isSavingResume}>
                    {isSavingResume ? 'Saving...' : 'Save Resume URL'}
                </Button>
            </CardFooter>
           </Card>
           <Card>
                <CardHeader>
                    <CardTitle>Testimonials</CardTitle>
                    <CardDescription>Manage the testimonials that appear on your homepage in the "What People Are Saying" section.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Add, edit, or delete testimonials to keep your social proof fresh and relevant.</p>
                </CardContent>
                <CardFooter>
                    <Button asChild>
                        <Link href="/admin/testimonials">Manage Testimonials</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>


        <div className="space-y-4">
          <header className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Your Projects</h2>
            <Button asChild>
                <Link href="/admin/projects/new">Add New Project</Link>
            </Button>
          </header>
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
