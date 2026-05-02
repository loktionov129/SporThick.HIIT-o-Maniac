import React from 'react';
import { Dumbbell, Plus, Zap } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { NavLink } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';

export const EmptyWorkouts: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-brand-blue blur-[80px] opacity-10 rounded-full" />
        
        <Card className="size-32 rounded-[2.5rem] flex items-center justify-center border-none bg-surface-card shadow-2xl relative z-10 rotate-3">
          <Dumbbell size={56} className="text-text-muted/20 -rotate-12" />
          <Zap size={24} className="absolute top-6 right-6 text-brand-blue animate-pulse" fill="currentColor" />
        </Card>
        
        <div className="absolute inset-0 bg-surface-accent/40 rounded-[2.5rem] -rotate-6 -z-10 border border-text-primary/5" />
      </div>

      <div className="space-y-4 mb-12 max-w-[280px]">
        <h3 className="text-4xl font-black uppercase italic tracking-tighter text-text-primary leading-none">
          Зал пуст, <br /> 
          <span className="text-brand-blue">Маньяк</span>
        </h3>
        <p className="text-sm font-medium text-text-muted leading-relaxed opacity-80 italic">
          Твой путь к железной дисциплине начинается здесь. Создай свою первую программу.
        </p>
      </div>

      <div className="w-full max-w-[280px]">
        <NavLink to="/workout/create" className="block">
          <Button 
            variant="primary" 
            fullWidth 
            className="h-16 flex items-center justify-center gap-4 shadow-xl shadow-brand-blue/20"
          >
            <Plus size={24} strokeWidth={3} className="shrink-0" />
            <span className="text-sm font-black uppercase italic tracking-[0.2em] leading-none whitespace-nowrap">
              Создать программу
            </span>
          </Button>
        </NavLink>
      </div>
    </div>
  );
};
