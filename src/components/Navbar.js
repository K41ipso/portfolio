'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Navbar({ scrollToTop, onOpenChat }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleAnimationsComplete = () => {
      setIsVisible(true);
    };
    
    window.addEventListener('animationsComplete', handleAnimationsComplete);
    
    return () => {
      window.removeEventListener('animationsComplete', handleAnimationsComplete);
    };
  }, []);

  const navItems = [
    { name: 'Обо мне', href: '#about' },
    { name: 'Опыт', href: '#experience' },
    { name: 'AI Проекты', href: '#ai-projects' },
    { name: 'Pet Projects', href: '#pet-projects' },
    { name: 'Контакты', href: '#contact' },
  ];

  const scrollToSection = (id) => {
    window.isNavigating = true;
    window.targetSection = id;
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      setTimeout(() => {
        window.isNavigating = false;
        window.targetSection = null;
      }, 1500);
    }
    setIsOpen(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-purple-500/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={scrollToTop}
            className="text-xl font-bold text-purple-400 hover:text-purple-300 transition cursor-pointer"
          >
            GP
          </button>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href.replace('#', ''))}
                  className="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition bg-transparent border-none cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </div>
            
            {/* AI Assistant Button с пульсирующим свечением */}
            <motion.button
              onClick={onOpenChat}
              className="ml-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold transition flex items-center gap-2 cursor-pointer relative"
              animate={{
                boxShadow: [
                  '0 0 15px rgba(147, 51, 234, 0.4), 0 0 30px rgba(147, 51, 234, 0.2)',
                  '0 0 25px rgba(147, 51, 234, 0.7), 0 0 50px rgba(147, 51, 234, 0.4)',
                  '0 0 15px rgba(147, 51, 234, 0.4), 0 0 30px rgba(147, 51, 234, 0.2)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              AI Assistant
            </motion.button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            {/* Мобильная AI кнопка с свечением */}
            <motion.button
              onClick={onOpenChat}
              className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold transition cursor-pointer"
              animate={{
                boxShadow: [
                  '0 0 10px rgba(147, 51, 234, 0.4)',
                  '0 0 20px rgba(147, 51, 234, 0.7)',
                  '0 0 10px rgba(147, 51, 234, 0.4)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              AI
            </motion.button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-slate-900/95">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href.replace('#', ''))}
                className="text-gray-300 hover:text-purple-400 block px-3 py-2 rounded-md text-base font-medium w-full text-left bg-transparent border-none cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.nav>
  );
}
