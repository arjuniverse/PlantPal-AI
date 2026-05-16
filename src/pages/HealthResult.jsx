import { motion } from 'framer-motion';
import { ArrowLeft, Droplets, Sun, Activity, AlertCircle, Share2, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockPlants } from '../assets/mockData';

const HealthResult = () => {
  const navigate = useNavigate();
  const plant = mockPlants[0]; // Monstera

  const pageVariants = {
    initial: { opacity: 0, y: '100%' },
    in: { opacity: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } },
    out: { opacity: 0, y: '100%', transition: { duration: 0.3 } }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="min-h-screen bg-slate-50 absolute inset-0 z-40 overflow-y-auto pb-safe"
    >
      {/* Header Image */}
      <div className="relative h-80 w-full rounded-b-[40px] overflow-hidden shadow-lg">
        <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Top Nav */}
        <div className="absolute top-0 left-0 right-0 p-6 pt-safe flex justify-between items-center z-10">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
            <ArrowLeft size={20} />
          </button>
          <div className="flex gap-3">
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
              <Share2 size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Title Area */}
        <div className="absolute bottom-8 left-6 right-6 text-white">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-1 rounded-md bg-nature-500 text-[10px] font-bold uppercase tracking-wider">AI Scanned</span>
            <span className="px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-md text-[10px] font-bold">98% Match</span>
          </div>
          <h1 className="text-3xl font-bold mb-1">{plant.name}</h1>
          <p className="text-white/80 text-sm italic">{plant.species}</p>
        </div>
      </div>

      <div className="p-6">
        {/* AI Health Alert */}
        <motion.div variants={itemVariants} className="mb-6 p-4 rounded-3xl bg-blue-50 border border-blue-100 flex gap-4 items-start shadow-sm relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-blue-100 rounded-full blur-xl"></div>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-500">
            <AlertCircle size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm mb-1">Care Suggestion</h3>
            <p className="text-slate-600 text-xs leading-relaxed">Your Monstera is slightly dehydrated. Water within 5 hours for optimal health. Leaves look healthy otherwise.</p>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mb-6">
          <div className="glass-card rounded-3xl p-5 flex flex-col items-center relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-[-20px] right-[-20px] w-20 h-20 bg-nature-100 rounded-full blur-xl group-hover:bg-nature-200 transition-colors"></div>
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-3 text-nature-500 shadow-sm relative z-10">
              <Activity size={24} />
            </div>
            <h4 className="text-3xl font-bold text-slate-800 relative z-10">{plant.health}%</h4>
            <span className="text-xs text-slate-500 font-medium relative z-10 mt-1">Overall Health</span>
          </div>
          
          <div className="glass-card rounded-3xl p-5 flex flex-col items-center relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-[-20px] left-[-20px] w-20 h-20 bg-blue-100 rounded-full blur-xl group-hover:bg-blue-200 transition-colors"></div>
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-3 text-blue-500 shadow-sm relative z-10">
              <Droplets size={24} />
            </div>
            <h4 className="text-3xl font-bold text-slate-800 relative z-10">{plant.waterLevel}%</h4>
            <span className="text-xs text-slate-500 font-medium relative z-10 mt-1">Moisture</span>
          </div>
        </motion.div>

        {/* Details List */}
        <motion.div variants={itemVariants} className="glass-card rounded-3xl p-2 mb-8">
          <div className="p-4 border-b border-slate-100/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center"><Sun size={18} /></div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Sunlight</p>
                <p className="text-xs text-slate-500">Current condition</p>
              </div>
            </div>
            <span className="font-bold text-sm text-slate-700 bg-slate-50 px-3 py-1 rounded-lg shadow-inner">{plant.sunlight}</span>
          </div>
          
          <div className="p-4 border-b border-slate-100/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 text-green-500 flex items-center justify-center"><Activity size={18} /></div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Diseases</p>
                <p className="text-xs text-slate-500">AI detection</p>
              </div>
            </div>
            <span className="font-bold text-sm text-green-600 bg-green-50 px-3 py-1 rounded-lg">None Detected</span>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center"><Droplets size={18} /></div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Next Water</p>
                <p className="text-xs text-slate-500">Based on moisture</p>
              </div>
            </div>
            <span className="font-bold text-sm text-slate-700 bg-slate-50 px-3 py-1 rounded-lg shadow-inner">Today, 5 PM</span>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div variants={itemVariants} className="flex gap-4">
          <button className="flex-1 bg-slate-100 text-slate-700 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-colors">
            Ask AI Assistant
          </button>
          <button className="flex-1 bg-nature-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-nature-500/30 hover:bg-nature-600 transition-colors">
            Mark Watered
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HealthResult;
