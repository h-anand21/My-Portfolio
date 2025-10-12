
'use client';

import { GlassCard } from '../ui/glass-card';
import { TextHoverEffect } from '../ui/text-hover-effect';

const SkillsSection = () => {
    return (
        <section id="skills" className="py-8 md:py-12 bg-background">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold">
                        My Skills
                    </h2>
                    <TextHoverEffect className="mt-4 max-w-2xl mx-auto justify-center">
                        I specialize in modern web technologies, bringing ideas to life with clean, efficient code and a focus on user experience.
                    </TextHoverEffect>
                </div>
                <div className="flex justify-center">
                    <GlassCard />
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
