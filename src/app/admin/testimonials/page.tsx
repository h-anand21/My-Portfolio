
'use client';

import { useForm, useFieldArray } from 'react-hook-form';
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
import { addDocumentNonBlocking, deleteDocumentNonBlocking, setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection, doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Loader2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useCollection } from '@/firebase/firestore/use-collection';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Testimonial } from '@/lib/types';
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


const testimonialSchema = z.object({
  name: z.string().min(2, 'Name is required.'),
  designation: z.string().min(2, 'Designation is required.'),
  quote: z.string().min(10, 'Quote must be at least 10 characters.'),
  src: z.string().url('A valid image URL is required.'),
});

const testimonialsFormSchema = z.object({
  testimonials: z.array(testimonialSchema),
});

type TestimonialsFormValues = z.infer<typeof testimonialsFormSchema>;

export default function TestimonialsAdminPage() {
  const firestore = useFirestore();
  const { user } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState<Testimonial | null>(null);

  const testimonialsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'testimonials');
  }, [firestore]);

  const { data: testimonialsData, isLoading } = useCollection<Testimonial>(testimonialsQuery);

  const form = useForm<z.infer<typeof testimonialSchema>>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: '',
      designation: '',
      quote: '',
      src: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof testimonialSchema>) => {
    if (!firestore || !user) return;
    setIsSubmitting(true);
    
    const testimonialData = {
        ...data,
        authorId: user.uid,
        createdAt: new Date(),
    };

    try {
      const testimonialsCollection = collection(firestore, 'testimonials');
      await addDocumentNonBlocking(testimonialsCollection, testimonialData);
      toast({
        title: 'Testimonial Added!',
        description: 'The new testimonial has been saved.',
      });
      form.reset();
    } catch (error) {
      console.error('Error adding testimonial:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not save the testimonial. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = () => {
    if (!firestore || !testimonialToDelete) return;
    const docRef = doc(firestore, 'testimonials', testimonialToDelete.id);
    deleteDocumentNonBlocking(docRef);
    toast({
      title: 'Testimonial Deleted',
      description: `The testimonial from ${testimonialToDelete.name} has been removed.`,
    });
    setTestimonialToDelete(null);
  };

  return (
    <div className="container py-12">
      <AlertDialog>
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Manage Testimonials</h1>
            <p className="text-muted-foreground">Add, edit, or remove testimonials from your homepage.</p>
          </div>
          <Button variant="outline" onClick={() => router.push('/admin')}>Back to Dashboard</Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Add New Testimonial</CardTitle>
                        <CardDescription>Fill out the form to add a new entry.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField control={form.control} name="name" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl><Input placeholder="Jane Doe" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="designation" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Designation</FormLabel>
                                        <FormControl><Input placeholder="CEO, Example Inc." {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="quote" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quote</FormLabel>
                                        <FormControl><Textarea placeholder="This is the best portfolio ever!" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="src" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image URL</FormLabel>
                                        <FormControl><Input placeholder="https://images.unsplash.com/..." {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <Button type="submit" disabled={isSubmitting} className="w-full">
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Add Testimonial
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Current Testimonials</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {isLoading && <p>Loading testimonials...</p>}
                        {testimonialsData && testimonialsData.length > 0 ? (
                            testimonialsData.map((testimonial) => (
                                <div key={testimonial.id} className="flex items-start justify-between rounded-lg border p-4">
                                    <div className="flex items-start gap-4">
                                        <img src={testimonial.src} alt={testimonial.name} className="h-16 w-16 rounded-full object-cover"/>
                                        <div>
                                            <p className="font-semibold">{testimonial.name}</p>
                                            <p className="text-sm text-muted-foreground">{testimonial.designation}</p>
                                            <blockquote className="mt-2 text-sm italic">"{testimonial.quote}"</blockquote>
                                        </div>
                                    </div>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="ghost" size="icon" onClick={() => setTestimonialToDelete(testimonial)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </AlertDialogTrigger>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted-foreground">No testimonials found.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>

        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action will permanently delete the testimonial from "{testimonialToDelete?.name}". This cannot be undone.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setTestimonialToDelete(null)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                    Delete
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
