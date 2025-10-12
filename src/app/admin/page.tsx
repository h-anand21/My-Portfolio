
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
import { Textarea } from '@/components/ui/textarea';

export default function AdminDashboard() {
  const firestore = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();
  const [projectToDelete, setProjectToDelete] = useState<any>(null);
  const [resumeUrl, setResumeUrl] = useState('');
  const [isSavingResume, setIsSavingResume] = useState(false);
  const [aboutMeTitle, setAboutMeTitle] = useState('');
  const [aboutMeP1, setAboutMeP1] = useState('');
  const [aboutMeP2, setAboutMeP2] = useState('');
  const [isSavingAbout, setIsSavingAbout] = useState(false);
  const [heroImageUrl, setHeroImageUrl] = useState('');
  const [aboutMeImageUrl, setAboutMeImageUrl] = useState('');
  const [isSavingImages, setIsSavingImages] = useState(false);

  const userProfileRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);
  const { data: userProfile } = useDoc<any>(userProfileRef);

  useEffect(() => {
    if (userProfile) {
      setResumeUrl(userProfile.resumeUrl || '');
      setAboutMeTitle(userProfile.aboutMeTitle || '');
      setAboutMeP1(userProfile.aboutMeP1 || '');
      setAboutMeP2(userProfile.aboutMeP2 || '');
      setHeroImageUrl(userProfile.heroImageUrl || '');
      setAboutMeImageUrl(userProfile.aboutMeImageUrl || '');
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

  const handleSaveAboutMe = async () => {
    if (!userProfileRef) return;
    setIsSavingAbout(true);
    try {
        await setDocumentNonBlocking(userProfileRef, { 
            aboutMeTitle,
            aboutMeP1,
            aboutMeP2
        }, { merge: true });
        toast({
            title: 'Success!',
            description: 'Your "About Me" section has been updated.',
        });
    } catch (error) {
        toast({
            title: 'Error',
            description: 'Failed to update "About Me" section.',
            variant: 'destructive',
        });
    } finally {
        setIsSavingAbout(false);
    }
  };

  const handleSaveImages = async () => {
    if (!userProfileRef) return;
    setIsSavingImages(true);
    try {
        await setDocumentNonBlocking(userProfileRef, { 
            heroImageUrl,
            aboutMeImageUrl,
        }, { merge: true });
        toast({
            title: 'Success!',
            description: 'Your images have been updated.',
        });
    } catch (error) {
        toast({
            title: 'Error',
            description: 'Failed to update images.',
            variant: 'destructive',
        });
    } finally {
        setIsSavingImages(false);
    }
  };


  return (
    <div className="container py-12">
      <AlertDialog>
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        </header>

        <div className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <Card>
            <CardHeader>
                <CardTitle>Resume Management</CardTitle>
                <CardDescription>Update the public URL for your resume.</CardDescription>
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
                    <CardTitle>About Me</CardTitle>
                    <CardDescription>Edit the content of your "About Me" section.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="aboutMeTitle">Title</Label>
                        <Input 
                            id="aboutMeTitle" 
                            value={aboutMeTitle}
                            onChange={(e) => setAboutMeTitle(e.target.value)}
                            placeholder="Your Title (e.g., Software Developer)"
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="aboutMeP1">Paragraph 1</Label>
                        <Textarea 
                            id="aboutMeP1" 
                            value={aboutMeP1}
                            onChange={(e) => setAboutMeP1(e.target.value)}
                            placeholder="First paragraph of your bio."
                            rows={4}
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="aboutMeP2">Paragraph 2</Label>
                        <Textarea 
                            id="aboutMeP2" 
                            value={aboutMeP2}
                            onChange={(e) => setAboutMeP2(e.target.value)}
                            placeholder="Second paragraph of your bio."
                            rows={4}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSaveAboutMe} disabled={isSavingAbout}>
                        {isSavingAbout ? 'Saving...' : 'Save About Me'}
                    </Button>
                </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Image Management</CardTitle>
                <CardDescription>Update the images on your site.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="heroImageUrl">Hero Image URL</Label>
                  <Input
                    id="heroImageUrl"
                    value={heroImageUrl}
                    onChange={(e) => setHeroImageUrl(e.target.value)}
                    placeholder="URL for hero image"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aboutMeImageUrl">About Me Image URL</Label>
                  <Input
                    id="aboutMeImageUrl"
                    value={aboutMeImageUrl}
                    onChange={(e) => setAboutMeImageUrl(e.target.value)}
                    placeholder="URL for about me image"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveImages} disabled={isSavingImages}>
                  {isSavingImages ? 'Saving...' : 'Save Images'}
                </Button>
              </CardFooter>
            </Card>
           <Card>
                <CardHeader>
                    <CardTitle>Testimonials</CardTitle>
                    <CardDescription>Manage the testimonials that appear on your homepage.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Add, edit, or delete testimonials.</p>
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
