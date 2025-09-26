
'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useDoc } from '@/firebase/firestore/use-doc';
import { doc } from 'firebase/firestore';
import { useFirestore, useUser, useMemoFirebase } from '@/firebase';

const HeroSection = () => {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-photo');
  const { user } = useUser();
  const firestore = useFirestore();

  // In a real app, this should fetch a public profile, not the logged-in user's.
  // For this portfolio, we'll fetch a specific admin doc.
  const adminUserRef = useMemoFirebase(() => {
    if (!firestore) return null;
    const adminUid = "P2GcGewB82MHZtxIfR4PFr8eI323"; // This should be managed in a better way
    return doc(firestore, 'users', adminUid);
  }, [firestore]);

  const { data: userProfile } = useDoc<{resumeUrl: string}>(adminUserRef);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const resumeUrl = userProfile?.resumeUrl || 'https://drive.google.com/uc?export=download&id=1MbT8wtl8vq_2B0XrGYpDgHmEQ8BHPj8V';


  return (
    <section className="pt-16 md:pt-24 pb-16 md:pb-24">
      <motion.div
        className="container grid md:grid-cols-2 gap-12 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="font-headline text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl mb-4">
            Himanshu Anand
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground md:text-xl mb-8">
            A passionate developer creating modern, responsive, and accessible web experiences.
          </p>

          <div className="flex items-center gap-2 mb-8">
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com/h-anand21" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-6 w-6 text-muted-foreground hover:text-foreground" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://x.com/hanand_21" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-6 w-6 text-muted-foreground hover:text-foreground" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://www.linkedin.com/in/himanshu-anand21/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6 text-muted-foreground hover:text-foreground" />
              </Link>
            </Button>
          </div>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center md:justify-start gap-4">
            <Button asChild size="lg">
              <Link href="#contact">Contact Me</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Resume
              </a>
            </Button>
          </motion.div>
        </motion.div>
        <motion.div variants={itemVariants} className="relative justify-self-center">
            <div className="absolute -inset-2 rounded-full border-4 border-dashed border-primary/50 animate-spin-slow"></div>
            {heroImage && (
                <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                data-ai-hint={heroImage.imageHint}
                width={200}
                height={200}
                className="rounded-full object-cover aspect-square shadow-2xl z-10"
                priority
                />
            )}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;


