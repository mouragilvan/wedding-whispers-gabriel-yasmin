
import React, { useState, useEffect, useRef } from 'react';
import AnimatedTitle from './AnimatedTitle';

interface GalleryImage {
  src: string;
  alt: string;
}

const Gallery: React.FC = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Sample gallery images
  const images: GalleryImage[] = [
    { src: 'img1.jpg', alt: 'Couple by the lake' },
    { src: 'img2.jpg', alt: 'Engagement photo' },
    { src: 'img3.jpg', alt: 'Wedding flowers' },
    { src: 'img4.jpg', alt: 'Sunset at the beach' },
    { src: 'img5.jpg', alt: 'Couple portrait' },
    { src: 'casal.png', alt: 'Romantic dinner' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => {
      if (galleryRef.current) {
        observer.unobserve(galleryRef.current);
      }
    };
  }, []);

  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <section id="gallery" className="elegant-section bg-white">
      <div className="max-w-6xl mx-auto" ref={galleryRef}>
        <AnimatedTitle className="text-center font-serif text-4xl md:text-5xl mb-4 text-wedding-brown">
          Nossa Galeria
        </AnimatedTitle>

        <div className="elegant-divider">
          <span className="font-cursive text-2xl text-wedding-brown">Memórias</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-16">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`
                aspect-[4/3] rounded-md overflow-hidden cursor-pointer 
                shadow-md hover:shadow-lg border border-wedding-beige/30 
                transform transition-all duration-500 hover:scale-[1.02]
                opacity-0 ${isVisible ? 'animate-fade-in' : ''}
              `}
              style={{
                backgroundImage: `url(${image.src}?auto=format&fit=crop&w=800&q=80)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                animationDelay: `${0.2 + index * 0.1}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in-slow"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] animate-zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`${selectedImage.src}?auto=format&fit=crop&w=1600&q=90`}
              alt={selectedImage.alt}
              className="w-full h-full object-contain rounded-md"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/40 transition-colors"
              aria-label="Close lightbox"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
