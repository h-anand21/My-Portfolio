
'use client';

import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { useUser } from '@/firebase';
import { Button } from './ui/button';
import { getAuth, signOut } from 'firebase/auth';
import { FloatingDock } from './ui/floating-dock';
import { Home, FolderKanban, User, MessageSquare, KeySquare, Star } from 'lucide-react';

const Header = () => {
  const { user } = useUser();

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth);
  };

  const navItems = [
    { title: 'Home', href: '#', icon: <Home className="h-full w-full" /> },
    { title: 'Projects', href: '#projects', icon: <FolderKanban className="h-full w-full" /> },
    { title: 'About', href: '#about', icon: <User className="h-full w-full" /> },
    { title: 'Testimonials', href: '#testimonials', icon: <Star className="h-full w-full" /> },
    { title: 'Contact', href: '#contact', icon: <MessageSquare className="h-full w-full" /> },
  ];

  if (user) {
    navItems.push({
        title: 'Admin',
        href: '/admin',
        icon: <KeySquare className="h-full w-full" />,
    });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold font-headline text-lg">Portfolio Pro</span>
          </Link>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <FloatingDock items={navItems} />
        </div>
        
        <div className="flex items-center justify-end space-x-2">
          {user ? (
            <Button onClick={handleSignOut} variant="ghost">Sign Out</Button>
          ) : (
            <Button asChild variant="ghost">
              <Link href="/login">Login</Link>
            </Button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
