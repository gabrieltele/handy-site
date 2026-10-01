import type { HTMLAttributes } from 'react';

/** Card com glassmorphism discreto: blur, borda fina e luz superior. */
export function GlassCard({ className = '', children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`glass relative overflow-hidden rounded-[28px] ${className}`} {...rest}>
      {children}
    </div>
  );
}
