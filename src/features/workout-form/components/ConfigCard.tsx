import { Card } from '@ui/Card';

interface ConfigCardProps {
  label: string;
  subLabel: string;
  children: React.ReactNode;
}

export const ConfigCard = ({ label, subLabel, children }: ConfigCardProps) => (
  <Card className="flex-1 !p-5 bg-surface-card border border-text-primary/5 shadow-xl transition-colors">
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-[9px] font-black uppercase tracking-widest text-brand-blue italic leading-none">
          {label}
        </label>
        <p className="text-xs font-bold text-text-primary uppercase italic leading-none">
          {subLabel}
        </p>
      </div>
      <div className="flex justify-center">{children}</div>
    </div>
  </Card>
);
