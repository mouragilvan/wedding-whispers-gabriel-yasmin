
import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import AnimatedTitle from './AnimatedTitle';

const HeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [parallaxPos, setParallaxPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Trigger animation after component mounts
    setIsLoaded(true);

    // Parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      setParallaxPos({ x: x - 0.5, y: y - 0.5 });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const overlayStyle = {
    transform: `translate(${parallaxPos.x * -20}px, ${parallaxPos.y * -20}px)`,
  };

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image with parallax effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 parallax"
        style={{
          backgroundImage: "url('casal.png')",
          transform: `translate(${parallaxPos.x * 20}px, ${parallaxPos.y * 100}px) scale(1.1)`,
        }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-wedding-cream/60 backdrop-blur-sm z-10 parallax"
        style={overlayStyle}
      />

      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0 transform translate-y-10'}`}>
          <p className="font-serif text-md md:text-lg uppercase tracking-[0.25em] text-wedding-brown mb-3 md:mb-5 animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
            Nós vamos nos casar
          </p>
        </div>

        <h1 className="font-cursive text-5xl md:text-7xl lg:text-8xl text-wedding-brown mb-6 md:mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          Yasmin & Gabriel
        </h1>

        <div className="elegant-divider">
          <div className="mx-4">
            <Heart size={20} className="divider-icon opacity-0 animate-fade-in" style={{ animationDelay: '1.2s' }} />
          </div>
        </div>

        <p className="font-serif text-lg md:text-xl text-wedding-brown mt-6 opacity-0 animate-fade-in" style={{ animationDelay: '1.5s' }}>
          09 de Agosto, 2025
        </p>

        {/* <button
          onClick={() => {
            const element = document.getElementById('rsvp');
            if (element) {
              const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }}
          className="elegant-button mt-10 opacity-0 animate-fade-in"
          style={{ animationDelay: '1.8s' }}
        >
          Confirme sua presença
        </button> */}
      </div>
    </section>
  );
};

export default HeroSection;
