import React, { useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';
import AnimatedTitle from './AnimatedTitle';

const AboutCouple: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef1 = useRef<HTMLDivElement>(null);
  const imageRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !imageRef1.current || !imageRef2.current) return;

      const scrollPosition = window.scrollY;
      const sectionPosition = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const offset = scrollPosition - sectionPosition + window.innerHeight;

      if (offset > 0 && scrollPosition < sectionPosition + sectionHeight) {
        // Parallax effect based on scroll position
        const parallaxValue1 = offset * 0.1;
        const parallaxValue2 = offset * 0.1;

        imageRef1.current.style.transform = `translateY(${-parallaxValue1}px)`;
        imageRef2.current.style.transform = `translateY(${-parallaxValue2}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="couple"
      ref={sectionRef}
      className="elegant-section relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-40 -left-20 w-40 h-40 rounded-full bg-wedding-sage/10 blur-3xl z-0"></div>
      <div className="absolute bottom-20 -right-20 w-60 h-60 rounded-full bg-wedding-gold/10 blur-3xl z-0"></div>

      <div className="relative z-10">
        <AnimatedTitle className="text-center font-serif text-4xl md:text-5xl mb-4 text-wedding-brown">
          Nossa História
        </AnimatedTitle>

        <div className="elegant-divider mb-8" >
          <div className="mx-4">
            <Heart size={20} className="divider-icon" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12" style={{ marginTop: 100 }}>
          <div className="space-y-8" >
            <div
              ref={imageRef1}
              className="aspect-[3/4] rounded-md overflow-hidden shadow-lg border border-wedding-beige/20 transform transition-all duration-1000"
              style={{
                backgroundImage: "url('casal.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                animationDelay: '0.3s',
                opacity: 0.5
              }}
            ></div>

            <div className="elegant-card transform transition-all duration-500 opacity-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <h3 className="font-serif text-2xl mb-4 text-wedding-brown">Gabriel</h3>
              <p className="text-wedding-brown/80 leading-relaxed">
                Gabriel sempre foi um homem de determinação e sonhos. Amante de música e tecnologia,
                sua paixão por inovação é superada apenas pelo amor que sente pela Yasmin.
                Formado em Engenharia, ele traz equilíbrio e estrutura para a relação.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div
              ref={imageRef2}
              className="aspect-[3/4] rounded-md overflow-hidden shadow-lg border border-wedding-beige/20 transform transition-all duration-1000"
              style={{
                backgroundImage: "url('casal2.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                animationDelay: '0.9s',
                opacity: 0.5
              }}
            ></div>

            <div className="elegant-card transform transition-all duration-500 opacity-0 animate-fade-in" style={{ animationDelay: '1.2s' }}>
              <h3 className="font-serif text-2xl mb-4 text-wedding-brown">Yasmin</h3>
              <p className="text-wedding-brown/80 leading-relaxed">
                Yasmin, com seu espírito livre e alma criativa, traz cor e alegria para todos ao seu redor.
                Apaixonada por arte e natureza, ela encontrou em Gabriel o parceiro perfeito para
                compartilhar suas aventuras e construir novos sonhos juntos.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 elegant-card max-w-3xl mx-auto text-center opacity-0 animate-fade-in" style={{ animationDelay: '1.5s' }}>
          <h3 className="font-serif text-2xl mb-6 text-wedding-brown">Como Nos Conhecemos</h3>
          <p className="text-wedding-brown/80 leading-relaxed mb-6">
            Nossos caminhos se cruzaram em 2018 durante um evento de tecnologia em São Paulo.
            O que começou como uma conversa casual sobre inovação se transformou em um café,
            que se tornou um jantar, que evoluiu para inúmeras aventuras juntos.
          </p>
          <p className="text-wedding-brown/80 leading-relaxed">
            Após 5 anos construindo memórias, compartilhando sonhos e superando desafios juntos,
            decidimos que era hora de dar o próximo passo e celebrar nosso amor rodeados pelas pessoas
            que mais importam para nós. E é por isso que convidamos você para fazer parte deste momento especial.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutCouple;
