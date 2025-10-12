
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
import AnimatedButton from '../ui/animated-button';
import { TextHoverEffect } from '../ui/text-hover-effect';
import { HoverBorderGradient } from '../ui/hover-border-gradient';

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

  const name = "Himanshu Anand";
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.08,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
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
          <motion.h1 
            className="font-headline text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl mb-4"
            variants={sentence}
            initial="hidden"
            animate="visible"
          >
             {name.split("").map((char, index) => {
              return (
                <motion.span key={char + "-" + index} variants={letter}>
                  {char}
                </motion.span>
              )
            })}
          </motion.h1>
           <motion.h2
            variants={itemVariants}
            className="font-headline text-2xl md:text-3xl text-primary mb-6"
          >
            Full-Stack Developer
          </motion.h2>
          <motion.div
            variants={itemVariants}
          >
            <TextHoverEffect className="max-w-2xl text-lg text-muted-foreground md:text-xl mb-8">
              Passionate about crafting responsive, accessible interfaces that delight users and solve real problems. Let’s build something meaningful.
            </TextHoverEffect>
          </motion.div>

          <div className="mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl" />
              <div className="relative flex items-end gap-x-2 p-2">
                <Link href="https://github.com/h-anand21" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center shadow-lg border border-gray-600/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </div>
                  </div>
                </Link>
                <Link href="https://www.linkedin.com/in/himanshu-anand21/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg border border-blue-500/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </div>
                  </div>
                </Link>
                <Link href="https://x.com/hanand_21" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <div className="relative">
                     <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center shadow-lg border border-gray-600/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" >
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <Link href="#contact" passHref>
              <AnimatedButton />
            </Link>
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
              <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="bg-card text-foreground flex items-center space-x-2"
                >
                  <Download className="mr-2 h-4 w-4" />
                  <span>Resume</span>
              </HoverBorderGradient>
            </a>
          </motion.div>
        </motion.div>
        <motion.div variants={itemVariants} className="relative justify-self-center order-first md:order-last">
            <div className="absolute -inset-2 rounded-full border-4 border-dashed border-primary/50 animate-spin-slow"></div>
            {heroImage && (
                <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                data-ai-hint={heroImage.imageHint}
                width={450}
                height={450}
                className="rounded-full object-contain aspect-square shadow-2xl z-10"
                priority
                />
            )}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

    

    

    