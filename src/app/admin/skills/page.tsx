
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { addDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection, doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Loader2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useCollection } from '@/firebase/firestore/use-collection';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Skill } from '@/lib/types';
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


const skillSchema = z.object({
  name: z.string().min(1, 'Skill name is required.'),
  icon: z.string().min(10, 'SVG Icon code is required.'),
});

export default function SkillsAdminPage() {
  const firestore = useFirestore();
  const { user } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);

  const skillsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'skills');
  }, [firestore]);

  const { data: skillsData, isLoading } = useCollection<Skill>(skillsQuery);

  const form = useForm<z.infer<typeof skillSchema>>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: '',
      icon: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof skillSchema>) => {
    if (!firestore || !user) return;
    setIsSubmitting(true);
    
    const skillData = {
        ...data,
        authorId: user.uid,
        createdAt: new Date(),
    };

    try {
      const skillsCollection = collection(firestore, 'skills');
      await addDocumentNonBlocking(skillsCollection, skillData);
      toast({
        title: 'Skill Added!',
        description: 'The new skill has been saved.',
      });
      form.reset();
    } catch (error) {
      console.error('Error adding skill:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not save the skill. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = () => {
    if (!firestore || !skillToDelete) return;
    const docRef = doc(firestore, 'skills', skillToDelete.id);
    deleteDocumentNonBlocking(docRef);
    toast({
      title: 'Skill Deleted',
      description: `The skill "${skillToDelete.name}" has been removed.`,
    });
    setSkillToDelete(null);
  };

  return (
    <div className="container py-12">
      <AlertDialog>
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Manage Skills</h1>
            <p className="text-muted-foreground">Add or remove skills from your homepage.</p>
          </div>
          <Button variant="outline" onClick={() => router.push('/admin')}>Back to Dashboard</Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Add New Skill</CardTitle>
                        <CardDescription>Fill out the form to add a new skill.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField control={form.control} name="name" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Skill Name</FormLabel>
                                        <FormControl><Input placeholder="React" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="icon" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>SVG Icon</FormLabel>
                                        <FormControl><Textarea rows={5} placeholder='<svg>...</svg>' {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <Button type="submit" disabled={isSubmitting} className="w-full">
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Add Skill
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Current Skills</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {isLoading && <p>Loading skills...</p>}
                        {skillsData && skillsData.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {skillsData.map((skill) => (
                                    <div key={skill.id} className="relative group flex flex-col items-center justify-center rounded-lg border p-4 text-center">
                                        <div className="flex-grow flex items-center justify-center" dangerouslySetInnerHTML={{ __html: skill.icon }} />
                                        <p className="mt-2 font-semibold text-sm">{skill.name}</p>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => setSkillToDelete(skill)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">No skills found.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>

        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action will permanently delete the skill "{skillToDelete?.name}". This cannot be undone.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setSkillToDelete(null)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                    Delete
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
