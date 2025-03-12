
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import AnimatedTitle from './AnimatedTitle';
import { useToast } from "@/hooks/use-toast";

interface FormState {
  name: string;
  email: string;
  guests: number;
  attending: boolean | null;
  dietary: string;
  message: string;
}

const RSVPForm: React.FC = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    guests: 1,
    attending: null,
    dietary: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAttendanceChange = (value: boolean) => {
    setFormState((prev) => ({
      ...prev,
      attending: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formState.name || !formState.email || formState.attending === null) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        title: "RSVP Enviado!",
        description: "Obrigado por confirmar sua presença.",
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormState({
          name: '',
          email: '',
          guests: 1,
          attending: null,
          dietary: '',
          message: ''
        });
      }, 3000);
    }, 1500);
  };
  
  return (
    <section id="rsvp" className="elegant-section bg-wedding-sage/10">
      <div className="max-w-3xl mx-auto">
        <AnimatedTitle className="text-center font-serif text-4xl md:text-5xl mb-4 text-wedding-brown">
          Confirme sua Presença
        </AnimatedTitle>
        
        <div className="elegant-divider">
          <span className="font-cursive text-2xl text-wedding-brown">RSVP</span>
        </div>
        
        <p className="text-center text-wedding-brown/80 mt-6 mb-10 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Nós ficaríamos muito felizes com a sua presença neste dia especial. 
          Por favor, confirme até o dia 15 de Maio de 2024.
        </p>
        
        <div className="elegant-card opacity-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          {submitted ? (
            <div className="text-center py-8">
              <h3 className="font-serif text-2xl mb-4 text-wedding-brown">Obrigado!</h3>
              <p className="text-wedding-brown/80">
                Sua confirmação foi recebida. Mal podemos esperar para celebrar com você!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2 font-serif text-wedding-brown">
                    Nome Completo <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="elegant-input w-full"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 font-serif text-wedding-brown">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="elegant-input w-full"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block mb-2 font-serif text-wedding-brown">
                  Você irá comparecer? <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => handleAttendanceChange(true)}
                    className={cn(
                      "px-4 py-2 rounded-sm border transition-all",
                      formState.attending === true 
                        ? "bg-wedding-taupe text-white border-wedding-taupe" 
                        : "bg-white border-wedding-beige hover:border-wedding-taupe"
                    )}
                  >
                    Sim, irei comparecer
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleAttendanceChange(false)}
                    className={cn(
                      "px-4 py-2 rounded-sm border transition-all",
                      formState.attending === false 
                        ? "bg-wedding-taupe text-white border-wedding-taupe" 
                        : "bg-white border-wedding-beige hover:border-wedding-taupe"
                    )}
                  >
                    Infelizmente não poderei ir
                  </button>
                </div>
              </div>
              
              {formState.attending && (
                <>
                  <div>
                    <label htmlFor="guests" className="block mb-2 font-serif text-wedding-brown">
                      Número de convidados (incluindo você)
                    </label>
                    <select 
                      id="guests"
                      name="guests"
                      value={formState.guests}
                      onChange={handleChange}
                      className="elegant-input w-full"
                    >
                      <option value={1}>1 pessoa</option>
                      <option value={2}>2 pessoas</option>
                      <option value={3}>3 pessoas</option>
                      <option value={4}>4 pessoas</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="dietary" className="block mb-2 font-serif text-wedding-brown">
                      Restrições alimentares
                    </label>
                    <input 
                      type="text"
                      id="dietary"
                      name="dietary"
                      value={formState.dietary}
                      onChange={handleChange}
                      placeholder="Vegetariano, alergia a nozes, etc."
                      className="elegant-input w-full"
                    />
                  </div>
                </>
              )}
              
              <div>
                <label htmlFor="message" className="block mb-2 font-serif text-wedding-brown">
                  Mensagem para os noivos (opcional)
                </label>
                <textarea 
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={4}
                  className="elegant-input w-full"
                  placeholder="Sua mensagem de carinho..."
                />
              </div>
              
              <div className="text-center">
                <button 
                  type="submit" 
                  className="elegant-button px-8"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar RSVP'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default RSVPForm;
