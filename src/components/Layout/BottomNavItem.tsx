import { NavLink } from "react-router-dom";

export const BottomNavItem = ({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `${isActive ? 'text-brand-blue' : 'text-text-muted'}`}
  >
    {({ isActive }) => (
      <>
        {isActive && (
          <div className="" />
        )}
        <div className="">
          {icon}
        </div>
        <span className="">
          {label}
        </span>
      </>
    )}
  </NavLink>
);
