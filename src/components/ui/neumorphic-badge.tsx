
'use client';

import { cn } from '@/lib/utils';
import React from 'react';

type NeumorphicBadgeProps = {
  text: string;
  className?: string;
  hue?: number;
};

export const NeumorphicBadge = ({ text, className, hue = 220 }: NeumorphicBadgeProps) => {
  return (
    <div
      className={cn('neumorphic-badge', className)}
      style={{ '--hue': hue } as React.CSSProperties}
    >
      <span className="neumorphic-badge-text">{text}</span>
    </div>
  );
};
