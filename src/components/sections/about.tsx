import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const AboutSection = () => {
    return (
        <section id="about" className="py-20 md:py-28">
            <div className="container max-w-4xl">
                <div className="max-w-2xl mx-auto text-center mb-12">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold">
                        About Me
                    </h2>
                </div>
                <div className="text-center text-lg text-muted-foreground space-y-6">
                    <p>
                        I'm a passionate and results-oriented software developer with a knack for building beautiful,
                        functional, and user-centric web applications. With a strong foundation in modern JavaScript frameworks
                        like React and Next.js, I thrive on turning complex problems into elegant solutions.
                    </p>
                    <p>
                        My journey in tech has been driven by a curiosity for how things work and a desire to create
                        impactful digital experiences. From architecting scalable backends to crafting pixel-perfect
                        UIs, I enjoy every aspect of the development process.
                    </p>
                    <p>
                        When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                        or enjoying a good cup of coffee.
                    </p>
                </div>
                <div className="text-center mt-12">
                    <Button asChild size="lg" variant="outline">
                        <a href="https://drive.google.com/uc?export=download&id=1MbT8wtl8vq_2B0XrGYpDgHmEQ8BHPj8V" target="_blank" rel="noopener noreferrer">
                            <Download className="mr-2 h-4 w-4" />
                            Download My Resume
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
