interface StatBoxProps {
  count: number;
  label: string;
  color: string;
}

export const StatBox = ({ count, label, color }: StatBoxProps) => (
  <div className="">
    <span className="">
      {count}
    </span>
    
    <span className="">
      {label}
    </span>
  </div>
);
