import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  return (
    <div className="container py-12">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <Button asChild>
          <Link href="/admin/projects/new">Add New Project</Link>
        </Button>
      </header>
      <p>Welcome to the admin dashboard. Here you can manage your projects.</p>
      {/* Project list will go here */}
    </div>
  );
}
