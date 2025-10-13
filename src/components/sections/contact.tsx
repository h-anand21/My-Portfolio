
import { TextHoverEffect } from "../ui/text-hover-effect";
import ContactForm from "../contact-form";
import { Meteors } from "../ui/meteors";

const ContactSection = () => {
    return (
        <section id="contact" className="py-8 md:py-12">
            <div className="container">
                <div className="bg-card text-card-foreground rounded-3xl shadow-2xl border border-border overflow-hidden relative">
                    <div className="absolute inset-0 w-full h-full">
                        <Meteors number={30} />
                    </div>
                    <div className="text-center p-8 md:p-12 relative z-10">
                        <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">
                            Get In Touch
                        </h2>
                        <div className="max-w-3xl mx-auto mb-12">
                            <TextHoverEffect className="justify-center">
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
