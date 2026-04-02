'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth, useUser } from '@/firebase';
import { initiateGoogleSignIn } from '@/firebase/non-blocking-login';
import { FirebaseError } from 'firebase/app';
import { getRedirectResult } from 'firebase/auth';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function LoginPage() {
  const [isProcessingLogin, setIsProcessingLogin] = useState(true); // Unified loading state
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();
  const router = useRouter();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    if (!isUserLoading && user) {
      // User is already logged in, redirect them.
      router.push('/admin');
    } else if (!isUserLoading && !user && auth) {
      // No user is logged in, check for a redirect result.
      getRedirectResult(auth)
        .then((result) => {
          if (result) {
            // A sign-in just completed. The onAuthStateChanged listener will handle
            // the user object, and the above effect will redirect.
            // We keep the loader active until that happens.
          } else {
            // No redirect result, so the user is just visiting the login page.
            setIsProcessingLogin(false);
          }
        })
        .catch((err) => {
          console.error("Login redirect error:", err);
          if (err instanceof FirebaseError) {
              switch (err.code) {
                  case 'auth/account-exists-with-different-credential':
                      setError('An account already exists with the same email. Please use the original sign-in method.');
                      break;
                  case 'auth/operation-not-allowed':
                    setError('Login with this provider is not enabled. Please check your Firebase project settings.');
                    break;
                  default:
                      setError(`An authentication error occurred: ${err.message}`);
                      break;
              }
          } else {
             setError('An unexpected error occurred. Please try again.');
          }
          setIsProcessingLogin(false);
        });
    }
  }, [user, isUserLoading, auth, router]);

  const handleGoogleSignIn = async () => {
    if (!auth) {
        setError("Firebase Auth is not initialized. Please try again later.");
        return;
    }
    setIsProcessingLogin(true);
    setError(null);
    try {
      await initiateGoogleSignIn(auth);
      // The page will redirect, so we don't need to do anything else here.
    } catch (err: any) {
       console.error("Error initiating Google sign-in:", err);
       setError('Could not start the sign-in process. Please try again.');
       setIsProcessingLogin(false);
    }
  };

  if (isUserLoading || isProcessingLogin) {
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
            <Button onClick={handleGoogleSignIn} className="w-full">
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                    <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512S0 403.3 0 261.8 106.5 11.8 244 11.8c67.7 0 121.2 22.5 163.7 60.3l-66.5 65.4C312.7 114.6 282.6 100 244 100c-82.3 0-149.3 67-149.3 149.3s67 149.3 149.3 149.3c96.5 0 130.3-72.2 134-109.3H244v-85.3h236.1c2.3 12.7 3.9 26.1 3.9 40.8z"></path>
                </svg>
            Sign in with Google
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
