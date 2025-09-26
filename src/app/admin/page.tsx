'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useFirestore } from '@/firebase';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMemo } from 'react';
import { useMemoFirebase } from '@/firebase/provider';

export default function AdminDashboard() {
  const firestore = useFirestore();
  const projectsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'projects');
  }, [firestore]);
  const { data: projects, isLoading } = useCollection(projectsQuery);

  return (
    <div className="container py-12">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <Button asChild>
          <Link href="/admin/projects/new">Add New Project</Link>
        </Button>
      </header>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Your Projects</h2>
        {isLoading && <p>Loading projects...</p>}
        {projects && projects.length === 0 && (
          <p>You haven't added any projects yet.</p>
        )}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects?.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{project.title}</span>
                   <Badge variant={project.published ? 'default' : 'secondary'}>
                      {project.published ? 'Published' : 'Draft'}
                    </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground line-clamp-3">
                  {project.shortSummary}
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/projects/edit/${project.id}`}>Edit</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
