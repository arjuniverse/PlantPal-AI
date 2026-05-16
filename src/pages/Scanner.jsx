import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Image as ImageIcon, X, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Scanner = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => navigate('/result'), 500);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isScanning, navigate]);

  const pageVariants = {
    initial: { opacity: 0, scale: 0.95 },
    in: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    out: { opacity: 0, scale: 1.05, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="fixed inset-0 z-50 bg-black text-white flex flex-col"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-6 pt-safe">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
          <X size={20} />
        </button>
        <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium">
          <Zap size={16} className="text-yellow-400" /> AI Scanner
        </div>
        <div className="w-10"></div> {/* Spacer */}
      </div>

      {/* Camera View Area */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {/* Placeholder for actual camera feed */}
        <div className="absolute inset-0 bg-slate-900">
          <img 
            src="https://images.unsplash.com/photo-1597055905081-8b15e4f2b968?auto=format&fit=crop&w=800&q=80" 
            alt="Camera Feed" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        {/* Scanner Frame */}
        <div className="relative z-10 w-72 h-72">
          {/* Frame Corners */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-nature-400 rounded-tl-3xl transition-all duration-300"></div>
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-nature-400 rounded-tr-3xl transition-all duration-300"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-nature-400 rounded-bl-3xl transition-all duration-300"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-nature-400 rounded-br-3xl transition-all duration-300"></div>

          {/* Scanning Animation */}
          {isScanning && (
            <motion.div 
              initial={{ top: 0, opacity: 0 }}
              animate={{ top: ['0%', '100%', '0%'], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-1 bg-nature-400 shadow-[0_0_15px_rgba(74,222,128,0.8)] z-20"
            ></motion.div>
          )}

          {/* Focus target */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-nature-400/50"></div>
          </div>
        </div>

        {/* Scan Progress Overlay */}
        {isScanning && (
          <div className="absolute inset-0 z-30 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center">
            <div className="w-24 h-24 rounded-full border-4 border-white/20 flex items-center justify-center relative">
              <svg className="absolute inset-0 w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none" stroke="#4ade80" strokeWidth="2" strokeDasharray={`${scanProgress}, 100`}
                />
              </svg>
              <span className="text-xl font-bold">{scanProgress}%</span>
            </div>
            <p className="mt-4 text-white/90 font-medium">Analyzing plant health...</p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-8 pb-safe flex justify-around items-center bg-black/80 backdrop-blur-xl rounded-t-[40px]">
        <button className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
          <ImageIcon size={24} />
        </button>
        
        <button 
          onClick={() => setIsScanning(true)}
          disabled={isScanning}
          className="w-20 h-20 rounded-full border-4 border-white/30 p-1 relative flex items-center justify-center"
        >
          <div className={`w-full h-full rounded-full bg-white transition-all duration-300 flex items-center justify-center ${isScanning ? 'scale-75 bg-nature-400' : 'hover:scale-95'}`}>
             {!isScanning && <Camera size={28} className="text-slate-800" />}
          </div>
        </button>
        
        <button className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
          <Zap size={24} />
        </button>
      </div>
    </motion.div>
  );
};

export default Scanner;
