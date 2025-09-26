"use client";

import { useState, useRef, FormEvent } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

export default function ContactForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!name || !email || !message) {
      toast({
        title: "Incomplete Form",
        description: "Please fill out all fields before sending.",
        variant: "destructive",
      });
      return;
    }
    
    const subject = encodeURIComponent(`Contact Form Submission from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoLink = `mailto:work.himu2006@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;

    toast({
      title: "Success!",
      description: "Your email client has been opened to send the message.",
    });

    // Reset form fields
    setName('');
    setEmail('');
    setMessage('');
    formRef.current?.reset();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Your Name" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="your@email.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" placeholder="Your message..." rows={5} required value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
       <div className="flex justify-center">
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          type="submit"
          className="bg-card text-foreground flex items-center space-x-2"
        >
          <span>Send Message</span>
        </HoverBorderGradient>
      </div>
    </form>
  );
}
