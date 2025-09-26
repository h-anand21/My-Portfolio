import ContactForm from "../contact-form";

const ContactSection = () => {
    return (
        <section id="contact" className="pb-24 md:pb-32">
            <div className="container max-w-5xl text-center">
                <div className="bg-card/50 backdrop-blur-sm border border-border/20 text-card-foreground rounded-3xl p-10 md:p-16 shadow-2xl">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">
                        Get In Touch
                    </h2>
                    <p className="text-muted-foreground text-lg mb-12 max-w-3xl mx-auto">
                        Have a project in mind, a question, or just want to say hi? I'd love to hear from you.
                        Fill out the form below and I'll get back to you as soon as possible.
                    </p>
                    <ContactForm />
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
