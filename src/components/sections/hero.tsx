"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const HeroSection = () => {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-photo');

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

  return (
    <section className="py-20 md:py-32">
      <motion.div
        className="container grid grid-cols-1 items-center gap-12 text-center md:grid-cols-2 md:text-left"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="order-2 flex flex-col items-center md:items-start md:order-1">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-4">
            Your Name
          </h1>
          <p className="max-w-xl text-lg text-primary md:text-xl mb-8">
            A passionate developer creating modern, responsive, and accessible web experiences.
          </p>
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 md:justify-start">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
              <Link href="#contact">Contact Me</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/resume.pdf" download>
                <Download className="mr-2 h-4 w-4" />
                Resume
              </a>
            </Button>
          </motion.div>
           <motion.div variants={itemVariants} className="flex items-center gap-2 mt-8">
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
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
              width={320}
              height={320}
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
