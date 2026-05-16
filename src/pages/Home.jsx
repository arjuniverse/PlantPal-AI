import { motion } from 'framer-motion';
import { Bell, Droplets, Sun, Wind, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockPlants } from '../assets/mockData';

const Home = () => {
  const navigate = useNavigate();
  const topPlant = mockPlants[0];

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0, transition: { duration: 0.4, staggerChildren: 0.1 } },
    out: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 15 },
    in: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="p-6"
    >
      {/* Header */}
      <motion.header variants={itemVariants} className="flex justify-between items-center mb-8 pt-4">
        <div>
          <p className="text-slate-500 font-medium text-sm">Good morning,</p>
          <h1 className="text-2xl font-bold text-slate-800">Plant Lover 🌿</h1>
        </div>
        <button className="relative p-3 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <Bell size={22} className="text-slate-600" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-400 rounded-full border-2 border-white"></span>
        </button>
      </motion.header>

      {/* Hero Card */}
      <motion.section variants={itemVariants} className="mb-8 relative">
        <div className="bg-gradient-to-br from-nature-400 to-emerald-600 rounded-3xl p-6 text-white shadow-xl shadow-nature-500/30 overflow-hidden relative">
          {/* Decorative circles */}
          <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-[-20px] left-[-20px] w-24 h-24 bg-black/10 rounded-full blur-xl"></div>
          
          <div className="relative z-10 w-2/3">
            <h2 className="text-2xl font-bold mb-2 leading-tight">Your plants deserve smarter care</h2>
            <p className="text-white/80 text-sm mb-4">Discover the best way to care for your green friends.</p>
            <button 
              onClick={() => navigate('/scanner')}
              className="bg-white text-nature-600 px-5 py-2.5 rounded-full font-semibold text-sm shadow-md hover:scale-105 active:scale-95 transition-transform"
            >
              Scan Plant
            </button>
          </div>
          
          <img 
            src="https://images.unsplash.com/photo-1597055905081-8b15e4f2b968?auto=format&fit=crop&w=300&q=80" 
            alt="Plant" 
            className="absolute right-[-20px] bottom-[-20px] w-48 h-48 object-cover rounded-tl-[100px] rounded-br-3xl opacity-90 border-4 border-white/20 shadow-2xl"
          />
        </div>
      </motion.section>

      {/* Weather / Environment Widget */}
      <motion.section variants={itemVariants} className="mb-8 flex gap-4">
        <div className="glass-card rounded-2xl p-4 flex-1 flex flex-col items-center justify-center gap-2">
          <div className="p-2 bg-blue-50 text-blue-500 rounded-xl"><Droplets size={20} /></div>
          <span className="text-xs text-slate-500 font-medium">Humidity</span>
          <span className="font-bold text-slate-800">65%</span>
        </div>
        <div className="glass-card rounded-2xl p-4 flex-1 flex flex-col items-center justify-center gap-2">
          <div className="p-2 bg-amber-50 text-amber-500 rounded-xl"><Sun size={20} /></div>
          <span className="text-xs text-slate-500 font-medium">Sunlight</span>
          <span className="font-bold text-slate-800">Good</span>
        </div>
        <div className="glass-card rounded-2xl p-4 flex-1 flex flex-col items-center justify-center gap-2">
          <div className="p-2 bg-slate-100 text-slate-500 rounded-xl"><Wind size={20} /></div>
          <span className="text-xs text-slate-500 font-medium">Temp</span>
          <span className="font-bold text-slate-800">24°C</span>
        </div>
      </motion.section>

      {/* Daily Overview */}
      <motion.section variants={itemVariants}>
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-lg font-bold text-slate-800">Needs Attention</h3>
          <button onClick={() => navigate('/dashboard')} className="text-nature-600 text-sm font-medium flex items-center">
            View All <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="glass-card rounded-3xl p-4 flex items-center gap-4 cursor-pointer hover:bg-white/90 transition-colors" onClick={() => navigate('/result')}>
          <div className="relative">
            <img src={topPlant.image} alt={topPlant.name} className="w-16 h-16 rounded-2xl object-cover shadow-md" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              <Droplets size={12} className="text-red-500" />
            </div>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-slate-800">{topPlant.name}</h4>
            <p className="text-xs text-slate-500 mb-2">{topPlant.status}</p>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div className="bg-nature-500 h-1.5 rounded-full" style={{ width: `${topPlant.health}%` }}></div>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-slate-100 flex items-center justify-center relative">
            <span className="text-xs font-bold text-slate-700">{topPlant.health}%</span>
            <svg className="absolute inset-0 w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray={`${topPlant.health}, 100`}
              />
            </svg>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Home;
