
import React, { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import AboutCouple from '@/components/AboutCouple';
import WeddingDetails from '@/components/WeddingDetails';
import Gallery from '@/components/Gallery';
import RSVPForm from '@/components/RSVPForm';
import { Heart } from 'lucide-react';

const Index: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading of resources
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (!href) return;

        const target = document.querySelector(href);
        if (!target) return;

        const yOffset = -80; // Offset for fixed header
        const y = (target as HTMLElement).getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      });
    });
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-wedding-cream flex flex-col items-center justify-center">
        <div className="animate-gentle-pulse">
          <Heart className="h-12 w-12 text-wedding-taupe" />
        </div>
        <h2 className="font-cursive text-4xl mt-4 text-wedding-brown animate-fade-in-slow">
          Gabriel & Yasmin
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wedding-cream">
      <NavBar />
      <HeroSection />
      <AboutCouple />
      <WeddingDetails />
      <Gallery />
      <RSVPForm />

      <footer className="py-10 text-center bg-wedding-taupe/10">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-cursive text-3xl text-wedding-brown mb-4">
            Gabriel & Yasmin
          </h2>
          <p className="text-wedding-brown/70 mb-6">
            09 de Agosto, 2025
          </p>
          <div className="elegant-divider">
            <Heart size={16} className="divider-icon" />
          </div>
          <p className="mt-6 text-sm text-wedding-brown/60">
            &copy; {new Date().getFullYear()} Gabriel & Yasmin · Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
