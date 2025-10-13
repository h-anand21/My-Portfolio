'use client';

import React from 'react';
import { Download } from 'lucide-react';

interface ModernButtonProps {
  text: string;
  href: string;
}

const ModernButton = React.forwardRef<HTMLAnchorElement, ModernButtonProps>(
  ({ text, href }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="animated-modern-button group"
      >
        <Download className="arr-2 h-6 w-6" />
        <span className="text">{text}</span>
        <span className="circle"></span>
        <Download className="arr-1 h-6 w-6" />
      </a>
    );
  }
);

ModernButton.displayName = 'ModernButton';

export default ModernButton;
