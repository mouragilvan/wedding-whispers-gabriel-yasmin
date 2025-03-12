
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { X, Menu } from 'lucide-react';

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Offset for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const menuItems = [
    { id: 'home', label: 'Início' },
    { id: 'couple', label: 'O Casal' },
    { id: 'details', label: 'Detalhes' },
    { id: 'gallery', label: 'Galeria' },
    { id: 'rsvp', label: 'RSVP' }
  ];

  return (
    <header className={cn(
      'fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 px-6 md:px-10',
      isScrolled 
        ? 'elegant-blur shadow-sm border-b border-wedding-beige/20' 
        : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center space-x-10">
          {menuItems.slice(0, 3).map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                'font-serif text-sm uppercase tracking-wider hover:text-wedding-accent transition-colors duration-300',
                isScrolled ? 'text-wedding-brown' : 'text-wedding-brown'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        
        <a href="#home" className="font-cursive text-3xl text-wedding-brown">
          G & Y
        </a>
        
        <div className="hidden md:flex items-center space-x-10">
          {menuItems.slice(3).map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                'font-serif text-sm uppercase tracking-wider hover:text-wedding-accent transition-colors duration-300',
                isScrolled ? 'text-wedding-brown' : 'text-wedding-brown'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-wedding-brown" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        'md:hidden fixed inset-x-0 bg-white/95 backdrop-blur-md border-b border-wedding-beige/20 transition-all duration-300 ease-in-out shadow-md',
        isMenuOpen 
          ? 'top-[60px] opacity-100' 
          : '-top-full opacity-0'
      )}>
        <div className="p-5 space-y-5">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="block w-full text-left font-serif text-wedding-brown py-2 hover:text-wedding-accent transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
