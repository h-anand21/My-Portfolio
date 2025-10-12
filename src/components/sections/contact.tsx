
import { TextHoverEffect } from "../ui/text-hover-effect";
import ContactForm from "../contact-form";

const ContactSection = () => {
    return (
        <section id="contact" className="py-8 md:py-12">
            <div className="text-center">
                 <div className="relative overflow-hidden group">
                    <div
                        className="absolute -inset-12 z-[-2] animate-spin-slow"
                        style={{
                            background: 'conic-gradient(from 45deg, transparent 75%, hsl(var(--primary)), transparent 100%)'
                        }}
                    />
                    <div className="bg-card/95 backdrop-blur-md text-card-foreground p-8 md:p-12 shadow-2xl z-10">
                        <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">
                            Get In Touch
                        </h2>
                        <div className="max-w-3xl mx-auto mb-12">
                            <TextHoverEffect>
                                Have a project in mind, a question, or just want to say hi? I'd love to hear from you.
                                Fill out the form below and I'll get back to you as soon as possible.
                            </TextHoverEffect>
                        </div>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
