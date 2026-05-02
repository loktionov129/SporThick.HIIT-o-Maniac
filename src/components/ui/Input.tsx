import React, { forwardRef } from 'react';

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative w-full group">
        <input
          ref={ref}
          className={`peer
            flex h-12 w-full rounded-xl 
            bg-surface-accent/20 border border-text-primary/5 
            px-4 py-2 text-text-primary 
            placeholder:text-text-muted/30 
            focus:outline-hidden focus:ring-0
            transition-all duration-300
            ${className}
          `}
          {...props}
        />
        
        <div className="
  absolute bottom-0 left-0 right-0 h-[2px] 
  bg-brand-blue shadow-[0_0_10px_rgba(59,130,246,0.5)] 
  scale-x-0 peer-focus-within:scale-x-100 
  transition-transform duration-500 ease-out origin-center
  pointer-events-none
        " />
      </div>
    );
  }
);

Input.displayName = 'Input';
