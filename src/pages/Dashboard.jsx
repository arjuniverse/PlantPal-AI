import { motion } from 'framer-motion';
import { Plus, Search, Droplets, ArrowRight } from 'lucide-react';
import { mockPlants } from '../assets/mockData';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    in: { opacity: 1, x: 0, transition: { duration: 0.4, staggerChildren: 0.1 } },
    out: { opacity: 0, x: 20, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="p-6 min-h-screen"
    >
      <motion.div variants={itemVariants} className="flex justify-between items-center mb-6 pt-4">
        <h1 className="text-2xl font-bold text-slate-800">My Plants</h1>
        <button className="w-10 h-10 rounded-full bg-nature-100 text-nature-600 flex items-center justify-center hover:bg-nature-200 transition-colors">
          <Plus size={20} />
        </button>
      </motion.div>

      {/* Search Bar */}
      <motion.div variants={itemVariants} className="mb-6 relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search size={18} className="text-slate-400" />
        </div>
        <input 
          type="text" 
          placeholder="Search your plants..." 
          className="w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-nature-400 placeholder-slate-400 text-slate-700"
        />
      </motion.div>

      {/* Categories */}
      <motion.div variants={itemVariants} className="flex gap-3 mb-6 overflow-x-auto pb-2 no-scrollbar">
        {['All', 'Indoor', 'Outdoor', 'Succulents'].map((cat, i) => (
          <button 
            key={cat} 
            className={`whitespace-nowrap px-5 py-2 rounded-xl text-sm font-medium transition-colors ${
              i === 0 ? 'bg-slate-800 text-white shadow-md' : 'glass-card text-slate-600 hover:bg-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Plant Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
        {mockPlants.map((plant) => (
          <div 
            key={plant.id} 
            onClick={() => navigate('/result')}
            className="glass-card rounded-3xl p-3 flex flex-col cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-3">
              <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold text-slate-700 flex items-center gap-1 shadow-sm">
                <Droplets size={10} className={plant.waterLevel < 30 ? 'text-red-500' : 'text-blue-500'} />
                {plant.waterLevel}%
              </div>
            </div>
            <div className="px-1">
              <h3 className="font-semibold text-slate-800 text-sm truncate">{plant.name}</h3>
              <p className="text-xs text-slate-500 truncate mb-2">{plant.species}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className={`px-2 py-1 rounded-md text-[10px] font-semibold ${
                  plant.health > 80 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {plant.status}
                </div>
                <button className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
