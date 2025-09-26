
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
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useFirestore, useUser } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import slugify from 'slugify';
import { useState } from 'react';

const projectSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters.'),
  shortSummary: z
    .string()
    .min(10, 'Summary must be at least 10 characters.')
    .max(160, 'Summary must be less than 160 characters.'),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
  tech: z.string().min(1, 'Please add at least one technology.'),
  thumbnailUrl: z.string().url({ message: 'Please enter a valid URL.' }),
  tags: z.string().optional(),
  githubUrl: z.string().url().optional().or(z.literal('')),
  demoUrl: z.string().url().optional().or(z.literal('')),
  published: z.boolean().default(false),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function NewProjectPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      shortSummary: '',
      description: '',
      tech: '',
      thumbnailUrl: '',
      tags: '',
      githubUrl: '',
      demoUrl: '',
      published: false,
    },
  });

  const onSubmit = async (data: ProjectFormValues) => {
    if (!firestore || !user) return;
    
    setIsSubmitting(true);

    const slug = slugify(data.title, { lower: true, strict: true });
    
    const projectData = {
      ...data,
      slug,
      tech: data.tech.split(',').map(t => t.trim()),
      tags: data.tags?.split(',').map(t => t.trim()) || [],
      authorId: user.uid,
      createdAt: new Date(),
      updatedAt: new Date(),
      screenshots: [], // Placeholder
    };

    try {
        const projectsCollection = collection(firestore, 'projects');
        await addDocumentNonBlocking(projectsCollection, projectData);
        
        toast({
            title: 'Project created!',
            description: 'Your new project has been saved as a draft.',
        });
        router.push('/admin');
    } catch (error) {
        console.error('Error creating project:', error);
        toast({
            title: 'Error',
            description: 'Something went wrong. Please try again.',
            variant: 'destructive',
        });
        setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Add New Project</h1>
        <p className="text-muted-foreground">Fill out the details below to create a new project.</p>
      </header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Title</FormLabel>
                <FormControl>
                  <Input placeholder="My Awesome Project" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shortSummary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Summary</FormLabel>
                <FormControl>
                  <Input placeholder="A brief, catchy summary for the project card." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Description (Markdown supported)</FormLabel>
                <FormControl>
                  <Textarea rows={8} placeholder="Describe your project in detail..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="thumbnailUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/image.png" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tech"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technologies Used</FormLabel>
                <FormControl>
                  <Input placeholder="Next.js, Firebase, Tailwind CSS" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input placeholder="AI, SaaS, B2B" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
             <FormField
                control={form.control}
                name="githubUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="demoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live Demo URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
           </div>
          <FormField
            control={form.control}
            name="published"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Publish Project</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Make this project visible on your public portfolio.
                  </p>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex items-center gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Saving...' : 'Save Project'}
            </Button>
             <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
