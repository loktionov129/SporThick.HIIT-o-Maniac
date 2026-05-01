interface StatProps {
  label: string;
  value: string | number;
  color: string;
}

export const Stat = ({ label, value, color }: StatProps) => (
  <div className="">
    <span className="">
      {value}
    </span>
    
    <span className="">
      {label}
    </span>
  </div>
);
