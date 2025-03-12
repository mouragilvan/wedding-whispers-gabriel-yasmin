
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTitleProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  staggerChildren?: boolean;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ 
  children, 
  className, 
  delay = 0,
  as: Component = 'h2',
  staggerChildren = false
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-fade-in');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    if (titleRef.current) {
      observer.observe(titleRef.current);
    }
    
    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, [delay]);

  if (staggerChildren && typeof children === 'string') {
    const letters = children.split('');
    
    return (
      <Component 
        ref={titleRef} 
        className={cn('opacity-0', className)} 
        aria-label={children as string}
      >
        {letters.map((letter, index) => (
          <span 
            key={index} 
            className="inline-block opacity-0" 
            style={{ 
              animationDelay: `${delay + (index * 0.05)}s`,
              animationFillMode: 'forwards'
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </Component>
    );
  }
  
  return (
    <Component ref={titleRef} className={cn('opacity-0', className)}>
      {children}
    </Component>
  );
};

export default AnimatedTitle;
