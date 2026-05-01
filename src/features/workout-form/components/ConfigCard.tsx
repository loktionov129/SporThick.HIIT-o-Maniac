interface ConfigCardProps {
  label: string;
  subLabel: string;
  children: React.ReactNode;
}

export const ConfigCard = ({ label, subLabel, children }: ConfigCardProps) => (
  <div className="">
    <div className="">
      <label className="">
        {label}
      </label>
      <p className="">
        {subLabel}
      </p>
    </div>
    
    <div className="">
      {children}
    </div>
  </div>
);
