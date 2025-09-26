'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/firebase';
import { initiateGoogleSignIn } from '@/firebase/non-blocking-login';
import { FirebaseError } from 'firebase/app';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useUser } from '@/firebase';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();
  const router = useRouter();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/admin');
    }
  }, [user, isUserLoading, router]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await initiateGoogleSignIn(auth);
      // The onAuthStateChanged listener in the provider will handle the redirect on success.
    } catch (err: any) {
        if (err instanceof FirebaseError) {
            switch (err.code) {
                case 'auth/popup-closed-by-user':
                    setError('Sign-in process was cancelled.');
                    break;
                case 'auth/account-exists-with-different-credential':
                    setError('An account already exists with the same email address but different sign-in credentials.');
                    break;
                default:
                    setError('An authentication error occurred. Please try again.');
                    break;
            }
        } else {
             setError('An unexpected error occurred. Please try again.');
        }
        setIsLoading(false);
    }
  };

  if (isUserLoading || user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Sign in with Google to access the admin dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
            {error && (
              <p className="text-sm font-medium text-destructive text-center">{error}</p>
            )}
            <Button onClick={handleGoogleSignIn} disabled={isLoading} className="w-full">
            {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                    <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512S0 403.3 0 261.8 106.5 11.8 244 11.8c67.7 0 121.2 22.5 163.7 60.3l-66.5 65.4C312.7 114.6 282.6 100 244 100c-82.3 0-149.3 67-149.3 149.3s67 149.3 149.3 149.3c96.5 0 130.3-72.2 134-109.3H244v-85.3h236.1c2.3 12.7 3.9 26.1 3.9 40.8z"></path>
                </svg>
            )}
            Sign in with Google
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
