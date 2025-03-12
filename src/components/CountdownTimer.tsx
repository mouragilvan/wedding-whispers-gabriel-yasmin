
import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    };

    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeBlock: React.FC<{ value: number; label: string; delay: number }> = ({ value, label, delay }) => (
    <div 
      className="flex flex-col items-center opacity-0 animate-fade-in" 
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="w-20 md:w-24 h-20 md:h-24 bg-white border border-wedding-beige/50 rounded-md shadow-md flex items-center justify-center mb-2">
        <span className="font-serif text-3xl md:text-4xl text-wedding-brown">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-sm uppercase tracking-wider text-wedding-brown/70 font-sans">
        {label}
      </span>
    </div>
  );

  return (
    <div className="text-center">
      <h3 className="font-serif text-2xl mb-8 text-wedding-brown opacity-0 animate-fade-in">
        Contagem Regressiva
      </h3>
      
      <div className="flex flex-row justify-center items-center space-x-4 md:space-x-8">
        <TimeBlock value={timeLeft.days} label="Dias" delay={0.3} />
        <TimeBlock value={timeLeft.hours} label="Horas" delay={0.4} />
        <TimeBlock value={timeLeft.minutes} label="Minutos" delay={0.5} />
        <TimeBlock value={timeLeft.seconds} label="Segundos" delay={0.6} />
      </div>
    </div>
  );
};

export default CountdownTimer;
