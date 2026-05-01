import React from 'react';
import { type LucideIcon } from 'lucide-react';
import { Card } from '../../../components/ui/Card';

interface DataCardProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  bgIcon: LucideIcon;
  iconColorClass?: string;
  iconBgClass?: string;
  bgIconColorClass?: string;
  children: React.ReactNode;
  className?: string;
}

export const DataCard: React.FC<DataCardProps> = ({
  title,
  subtitle,
  icon: Icon,
  bgIcon: BgIcon,
  iconColorClass = 'text-text-primary',
  iconBgClass = 'bg-surface-accent',
  bgIconColorClass = 'text-text-primary/5',
  children,
  className = ''
}) => {
  return (
    <Card className={`relative overflow-hidden border-none ${className}`}>
      {/* Картинка на фоне */}
      <BgIcon 
        size={160} 
        className={`absolute -right-8 -top-8 ${bgIconColorClass} -rotate-12 pointer-events-none`} 
      />
      
      {/* Шапка: Иконка + Название + Подзаголовок */}
      <header className="flex items-center gap-4 mb-8 relative z-10">
        <div className={`size-12 ${iconBgClass} rounded-2xl flex items-center justify-center ${iconColorClass}`}>
          <Icon size={24} strokeWidth={2.5} />
        </div>
        <div>
          <h3 className="text-xl font-black uppercase italic leading-none tracking-tight text-text-primary">
            {title}
          </h3>
          <p className="text-[9px] font-bold uppercase tracking-widest text-text-muted mt-1">
            {subtitle}
          </p>
        </div>
      </header>

      {/* Основной контент */}
      <div className="relative z-10">
        {children}
      </div>
    </Card>
  );
};
