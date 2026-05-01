export const StatBox = ({ icon, value, label }: { icon: React.ReactNode, value: string | number, label: string }) => (
  <div className="">
    <div className="">{icon}</div>
    <span className="">
      {value}
    </span>
    <span className="">
      {label}
    </span>
  </div>
);
