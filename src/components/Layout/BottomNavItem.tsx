import { NavLink } from 'react-router-dom';

export const BottomNavItem = ({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) => 
      `relative flex flex-col items-center gap-1.5 cursor-pointer transition-colors duration-200 ${
        isActive ? 'text-brand-blue' : 'text-text-muted hover:text-text-primary'
      }`
    }
  >
    {({ isActive }) => (
      <>
        {isActive && (
          <div className="absolute -top-3 size-1 bg-brand-blue rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
        )}
        <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'scale-100'}`}>
          {icon}
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.15em] leading-none">
          {label}
        </span>
      </>
    )}
  </NavLink>
);