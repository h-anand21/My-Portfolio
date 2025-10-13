
import { Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-background border-t border-border/40">
      <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Portfolio Pro. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/h-anand21" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="neumorphic-icon-button h-12 w-12 !p-3">
              <Github className="h-5 w-5" />
          </a>
          <a href="https://x.com/hanand_21" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="neumorphic-icon-button h-12 w-12 !p-3">
              <Twitter className="h-5 w-5" />
          </a>
          <a href="https://www.linkedin.com/in/himanshu-anand21/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="neumorphic-icon-button h-12 w-12 !p-3">
              <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
