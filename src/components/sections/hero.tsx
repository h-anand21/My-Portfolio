"use client";
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

  const userProfileRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userProfile } = useDoc<{resumeUrl: string}>(userProfileRef);

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
    <section className="pt-16 md:pt-24">
      <motion.div
        className="container grid grid-cols-1 items-center gap-16 text-center md:grid-cols-2 md:text-left"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="order-2 flex flex-col items-center md:items-start md:order-1">
          <h1 className="font-headline text-6xl font-bold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl mb-8">
            Your Name
          </h1>
          <p className="max-w-2xl text-2xl text-muted-foreground md:text-3xl mb-12">
            A passionate developer creating modern, responsive, and accessible web experiences.
          </p>
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 md:justify-start">
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
           <motion.div variants={itemVariants} className="flex items-center gap-2 mt-10">
            <Button variant="ghost" size="sm" asChild>
              <Link href="https://github.com/h-anand21" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="https://x.com/hanand_21" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
        <motion.div variants={itemVariants} className="order-1 flex justify-center md:order-2">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              data-ai-hint={heroImage.imageHint}
              width={250}
              height={250}
              className="rounded-full object-cover aspect-square shadow-2xl"
              priority
            />
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
