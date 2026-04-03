'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { getAuth, signOut } from 'firebase/auth';

// Provide your own email here or in `.env` as NEXT_PUBLIC_ADMIN_EMAIL
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "himanshuanand563@gmail.com";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isUserLoading) return; // Wait until user state is resolved

    if (!user) {
      // If not logged in, redirect to login page
      router.push('/login');
    }
    // Temporary bypass: The email check has been removed so you can log in without restarting.
    // else if (user.email !== ADMIN_EMAIL) { ... }
  }, [user, isUserLoading, router]);

  // Show a loader while checking auth state
  if (isUserLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // If user is the admin, render the children
  return <>{children}</>;
}

    