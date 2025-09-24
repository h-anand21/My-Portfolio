import ContactForm from "../contact-form";

const ContactSection = () => {
    return (
        <section id="contact" className="py-24 md:py-32">
            <div className="container max-w-2xl text-center">
                 <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">
                    Get In Touch
                </h2>
                <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
                    Have a project in mind, a question, or just want to say hi? I'd love to hear from you.
                    Fill out the form below and I'll get back to you as soon as possible.
                </p>
                <ContactForm />
            </div>
        </section>
    );
};

export default ContactSection;
