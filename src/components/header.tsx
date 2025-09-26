
'use client';

import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { useUser } from '@/firebase';
import { Button } from './ui/button';
import { getAuth, signOut } from 'firebase/auth';

const Header = () => {
  const { user } = useUser();

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth);
  };

  const navItems = [
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold font-headline text-lg">Portfolio Pro</span>
          </Link>
        </div>

        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-primary text-foreground/80"
              >
                {item.label}
              </Link>
            ))}
            {user && (
               <Link href="/admin" className="transition-colors hover:text-primary text-foreground/80">Admin</Link>
            )}
        </nav>
        
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
