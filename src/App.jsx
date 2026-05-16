import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import BottomNav from './components/layout/BottomNav';
import Home from './pages/Home';
import Scanner from './pages/Scanner';
import HealthResult from './pages/HealthResult';
import Dashboard from './pages/Dashboard';
import Assistant from './pages/Assistant';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto relative shadow-2xl overflow-hidden bg-[url('https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-[100px] z-0"></div>
      
      {/* Animated blob background for a dynamic feel */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-nature-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-20%] left-[20%] w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      <main className="flex-1 relative z-10 overflow-y-auto pb-24 pt-safe no-scrollbar">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/result" element={<HealthResult />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assistant" element={<Assistant />} />
          </Routes>
        </AnimatePresence>
      </main>

      <div className="z-50 pb-safe">
        <BottomNav />
      </div>
    </div>
  );
}

export default App;
