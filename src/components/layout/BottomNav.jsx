import { NavLink, useLocation } from 'react-router-dom';
import { Home, ScanLine, LayoutDashboard, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: LayoutDashboard, label: 'My Plants', path: '/dashboard' },
    { icon: ScanLine, label: 'Scan', path: '/scanner', isFloating: true },
    { icon: MessageCircle, label: 'Assistant', path: '/assistant' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto w-full z-50 px-6 pb-8 pt-4 pointer-events-none">
      <nav className="glass-card rounded-3xl flex justify-around items-center p-2 relative pointer-events-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          if (item.isFloating) {
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="relative -top-6 flex items-center justify-center w-16 h-16 rounded-full bg-nature-500 text-white shadow-lg shadow-nature-500/40 border-4 border-white transform transition-transform hover:scale-105 active:scale-95"
              >
                <Icon size={28} />
              </NavLink>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-16 h-12 relative rounded-2xl transition-colors duration-300 ${
                isActive ? 'text-nature-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-nature-100 rounded-2xl -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon size={22} className={`mb-1 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNav;
