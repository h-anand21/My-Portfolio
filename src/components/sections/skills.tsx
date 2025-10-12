
'use client';

import { GlassCard } from '../ui/glass-card';

const SkillsSection = () => {
    return (
        <section id="skills" className="py-16 md:py-24 bg-background">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold">
                        My Skills
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        I specialize in modern web technologies, bringing ideas to life with clean, efficient code and a focus on user experience.
                    </p>
                </div>
                <div className="flex justify-center">
                    <GlassCard />
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
