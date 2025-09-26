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
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://github.com/h-anand21" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://x.com/hanand_21" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://www.linkedin.com/in/himanshu-anand21/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
