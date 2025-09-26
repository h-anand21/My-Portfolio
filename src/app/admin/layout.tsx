'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { getAuth, signOut } from 'firebase/auth';

const ADMIN_EMAIL = "himanshuanand563@gmail.com";

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
    } else if (user.email !== ADMIN_EMAIL) {
      // If logged in but not the admin, sign them out and redirect
      const auth = getAuth();
      signOut(auth).then(() => {
        router.push('/login');
        // Optionally, show a toast message here to inform the user
      });
    }
  }, [user, isUserLoading, router]);

  // Show a loader while checking auth state or if the user is not the admin yet
  if (isUserLoading || !user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // If user is the admin, render the children
  return <>{children}</>;
}

    