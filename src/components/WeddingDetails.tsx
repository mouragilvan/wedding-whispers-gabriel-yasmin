
import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import AnimatedTitle from './AnimatedTitle';
import CountdownTimer from './CountdownTimer';

const DetailCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}> = ({ title, description, icon, delay = 0 }) => {
  return (
    <div 
      className="elegant-card flex flex-col items-center text-center p-8 opacity-0 animate-fade-in" 
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="mb-4 p-3 bg-wedding-beige/30 rounded-full">
        {icon}
      </div>
      <h3 className="font-serif text-xl mb-3 text-wedding-brown">{title}</h3>
      <p className="text-wedding-brown/80">{description}</p>
    </div>
  );
};

const WeddingDetails: React.FC = () => {
  return (
    <section id="details" className="elegant-section bg-wedding-beige/20">
      <div className="max-w-5xl mx-auto">
        <AnimatedTitle className="text-center font-serif text-4xl md:text-5xl mb-4 text-wedding-brown">
          Detalhes do Casamento
        </AnimatedTitle>
        
        <div className="elegant-divider">
          <span className="font-cursive text-2xl text-wedding-brown">15.06.2024</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <DetailCard 
            title="Data" 
            description="Sábado, 15 de Junho de 2024"
            icon={<Calendar className="h-6 w-6 text-wedding-brown" />}
            delay={0.3}
          />
          
          <DetailCard 
            title="Local" 
            description="Espaço Villa Garden, Av. das Flores, 123 - São Paulo, SP"
            icon={<MapPin className="h-6 w-6 text-wedding-brown" />}
            delay={0.6}
          />
          
          <DetailCard 
            title="Horário" 
            description="Cerimônia às 16h, Recepção às 18h"
            icon={<Clock className="h-6 w-6 text-wedding-brown" />}
            delay={0.9}
          />
        </div>
        
        <div className="mt-20 opacity-0 animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <CountdownTimer targetDate={new Date('2024-06-15T16:00:00')} />
        </div>
        
        <div className="mt-20 max-w-3xl mx-auto">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0965565076!2d-46.6325371!3d-23.5613545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59bacf452321%3A0xf69a4d4b7f174d13!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1708274246554!5m2!1spt-BR!2sbr" 
            width="100%" 
            height="450" 
            style={{ border: 0, borderRadius: '0.25rem' }}
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Wedding Location"
            className="shadow-lg border border-wedding-beige/30 opacity-0 animate-fade-in"
            style={{ animationDelay: '1.5s' }}
          />
        </div>
      </div>
    </section>
  );
};

export default WeddingDetails;
