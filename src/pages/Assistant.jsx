import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { mockChatHistory } from '../assets/mockData';

const Assistant = () => {
  const [messages, setMessages] = useState(mockChatHistory);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Mock AI response
    setTimeout(() => {
      const aiMsg = { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: 'That is a great question! Make sure to keep it away from direct harsh sunlight and check the soil moisture regularly.' 
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    out: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="h-full flex flex-col p-6 pb-0"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pt-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-nature-400 to-teal-500 flex items-center justify-center text-white shadow-lg">
          <Bot size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">PlantPal AI <Sparkles size={16} className="text-amber-400" /></h1>
          <p className="text-xs text-nature-600 font-medium">Always here to help</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-auto ${
                  msg.sender === 'user' ? 'bg-slate-200 text-slate-500' : 'bg-nature-100 text-nature-600'
                }`}>
                  {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                
                <div className={`p-4 rounded-3xl ${
                  msg.sender === 'user' 
                    ? 'bg-slate-800 text-white rounded-br-sm' 
                    : 'glass-card border border-white/50 rounded-bl-sm shadow-sm'
                }`}>
                  <p className={`text-sm leading-relaxed ${msg.sender === 'user' ? 'text-white' : 'text-slate-700'}`}>
                    {msg.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-[100px] left-0 right-0 px-6 max-w-md mx-auto z-40 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent pt-4">
        <form onSubmit={handleSend} className="glass-card rounded-full p-2 flex items-center gap-2 border border-slate-200 shadow-lg">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your plants..." 
            className="flex-1 bg-transparent px-4 py-2 focus:outline-none text-sm text-slate-700 placeholder-slate-400"
          />
          <button 
            type="submit"
            disabled={!input.trim()}
            className="w-10 h-10 rounded-full bg-nature-500 text-white flex items-center justify-center flex-shrink-0 transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
          >
            <Send size={18} className="ml-1" />
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Assistant;
