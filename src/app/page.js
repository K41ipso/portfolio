'use client';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ChatModal from '../components/ChatModal';


// Глобальное состояние
let isNavigating = false;
let targetSection = null;
let initialAnimationsComplete = false;

// Вспомогательная функция для получения viewport с учётом навигации
const getViewport = (sectionId, amount = 0.6) => {
  const isNavigating = typeof window !== 'undefined' && window.isNavigating;
  const targetSection = typeof window !== 'undefined' ? window.targetSection : null;
  
  // Если идёт навигация и это НЕ целевая секция — делаем rootMargin огромным,
  // чтобы анимация не срабатывала
  if (isNavigating && targetSection && targetSection !== sectionId) {
    return { amount, once: true, margin: '-10000px' };
  }
  
  return { amount, once: true };
};

function Hero({ onOpenChat }) {
  const [showContactModal, setShowContactModal] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowContactModal(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('karandawwik@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText('+79326123312');
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  return (
    <section className="h-screen flex items-center justify-center relative z-10">
      <ParticleField />
      <div className="z-10 text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-8xl font-bold text-white mb-4"
        >
          Попов Георгий
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-2xl md:text-3xl text-purple-300 mb-8"
        >
          AI Generalist / Python Backend Developer
        </motion.p>
        
        {/* AI Assistant кнопка — светится сразу */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          <motion.button
            onClick={onOpenChat}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-lg font-semibold transition flex items-center gap-3 cursor-pointer relative mx-auto"
            animate={{
              boxShadow: [
                '0 0 20px rgba(147, 51, 234, 0.5), 0 0 40px rgba(147, 51, 234, 0.3)',
                '0 0 35px rgba(147, 51, 234, 0.8), 0 0 70px rgba(147, 51, 234, 0.5)',
                '0 0 20px rgba(147, 51, 234, 0.5), 0 0 40px rgba(147, 51, 234, 0.3)',
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
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Спросить AI-ассистента
          </motion.button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex gap-4 justify-center"
        >
          <button 
            onClick={() => setShowContactModal(!showContactModal)}
            className="px-8 py-3 border-2 border-purple-400 text-purple-300 hover:bg-purple-900/30 rounded-lg font-semibold transition cursor-pointer"
          >
            Связаться со мной
          </button>
        </motion.div>
      </div>
      
      {/* Модалка контактов (оставляем как была) */}
      <AnimatePresence>
        {showContactModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowContactModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="fixed top-32 left-1/2 -translate-x-1/2 bg-slate-800/95 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30 shadow-2xl z-50 w-[400px]"
            >
              <button
                onClick={() => setShowContactModal(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white transition cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <h3 className="text-xl font-bold text-white mb-4">Контакты</h3>
              
              <div className="space-y-2">
                <a 
                  href="https://t.me/gpopovdev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition p-3 rounded-lg hover:bg-purple-900/20"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295l.213-3.053 5.56-5.023c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.94z"/>
                  </svg>
                  <span>@gpopovdev</span>
                </a>
                
                <button 
                  onClick={handleCopyEmail}
                  className="flex items-center justify-between gap-3 text-gray-300 hover:text-purple-400 transition p-3 rounded-lg hover:bg-purple-900/20 w-full text-left relative cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>karandawwik@gmail.com</span>
                  </div>
                  <AnimatePresence>
                    {copiedEmail && (
                      <motion.span
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="text-xs text-purple-400 font-semibold whitespace-nowrap"
                      >
                        Скопировано!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                
                <button 
                  onClick={handleCopyPhone}
                  className="flex items-center justify-between gap-3 text-gray-300 hover:text-purple-400 transition p-3 rounded-lg hover:bg-purple-900/20 w-full text-left relative cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>+7 (932) 612-33-12</span>
                  </div>
                  <AnimatePresence>
                    {copiedPhone && (
                      <motion.span
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="text-xs text-purple-400 font-semibold whitespace-nowrap"
                      >
                        Скопировано!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

// 3D частицы на фоне
function ParticleField() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <Stars 
          radius={100} 
          depth={100} 
          count={8000} 
          factor={6} 
          saturation={0.5} 
          fade 
          speed={0.5}
        />
      </Canvas>
    </div>
  );
}

// About Section
function About() {
  return (
    <section id="about" className="py-20 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={getViewport('about', 0.6)}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
        >
          Обо мне
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={getViewport('about', 0.6)}
          transition={{ duration: 0.8 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30"
        >
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Python Backend Developer с <span className="text-purple-400 font-semibold">4 годами опыта</span> разработки 
            асинхронных backend-сервисов и интеграционных API.
          </p>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Сейчас работаю <span className="text-purple-400">middle+ backend разработчиком</span> в компании 
            "ДАТА-ЦЕНТР Автоматика", участвую в масштабной цифровизации производственных процессов.
          </p>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Специализируюсь на <span className="text-purple-400">интеграции AI/LLM</span> в бизнес-процессы. 
            Интегрировал LLM (включая Qwen) в систему управления предприятием — создал AI-помощника с распознаванием 
            голосовых сообщений для мониторинга проблемных зон в реальном времени.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Experience Section
function Experience() {
  const experiences = [
    {
      company: "ДАТА-ЦЕНТР Автоматика",
      position: "Middle+ Backend Developer",
      period: "Июнь 2024 — настоящее время",
      duration: "2 года",
      description: "Участвую в масштабной цифровизации производственных процессов завода. Разрабатываю backend-сервисы на FastAPI, проектирую БД, настраиваю CI/CD и мониторинг.",
      achievements: [
        "Разработал и внедрил единый REST API стандарт для интеграции внутренних систем",
        "Оптимизировал производительность backend сервисов в несколько раз",
        "Реализовал асинхронные пайплайны для обработки массивных данных",
        "Интегрировал LLM (Qwen) в систему управления предприятием"
      ],
      tech: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "Redis", "RabbitMQ", "Docker", "Grafana"]
    },
    {
      company: "Курсы ЕГЭ и ОГЭ Континуум",
      position: "Middle Backend Developer",
      period: "Октябрь 2022 — Июнь 2024",
      duration: "1 год 9 месяцев",
      description: "Разрабатывал асинхронные backend сервисы и интеграции для образовательной платформы с очными и онлайн занятиями.",
      achievements: [
        "Реализовал Telegram бота с интеграцией БД и внешних API (заменил мобильное приложение)",
        "Увеличил конверсию онлайн пользователей через интеграцию ML-функционала",
        "Разработал асинхронные обработчики фоновых задач и очередей сообщений",
        "Оптимизировал SQL-запросы (анализ EXPLAIN/EXPLAIN ANALYZE)"
      ],
      tech: ["Python", "FastAPI", "Aiogram", "PostgreSQL", "asyncio", "ML Integration"]
    },
    {
      company: "Уральский банк реконструкции и развития",
      position: "Junior Backend Developer",
      period: "Июнь 2022 — Сентябрь 2022",
      duration: "4 месяца",
      description: "Автоматизация отчетности внутренних и внешних процессов для центра розничных рисков.",
      achievements: [
        "Разработал инструмент обработки данных, сокративший время отчетности в несколько раз",
        "Оптимизировал SQL-запросы за счет индексации (ускорение в 17 раз)",
        "Вел техническую документацию в Jira и Confluence"
      ],
      tech: ["Python", "FastAPI", "Pandas", "PostgreSQL", "MongoDB", "SQL Optimization"]
    }
  ];

  return (
    <section id="experience" className="py-20 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={getViewport('experience', 0.6)}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
        >
          Опыт работы
        </motion.h2>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} delay={index * 0.3} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ exp, index, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const [typedCompany, setTypedCompany] = useState('');
  const [typedPosition, setTypedPosition] = useState('');
  const [typedDescription, setTypedDescription] = useState('');
  const [showAchievements, setShowAchievements] = useState(false);
  const [showTech, setShowTech] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timers = [];
      
      // Печатаем компанию
      let i = 0;
      const typeCompany = () => {
        if (i < exp.company.length) {
          setTypedCompany(exp.company.slice(0, i + 1));
          i++;
          setTimeout(typeCompany, 30);
        }
      };
      
      // Печатаем позицию
      let j = 0;
      const typePosition = () => {
        if (j < exp.position.length) {
          setTypedPosition(exp.position.slice(0, j + 1));
          j++;
          setTimeout(typePosition, 25);
        }
      };
      
      // Печатаем описание
      let k = 0;
      const typeDescription = () => {
        if (k < exp.description.length) {
          setTypedDescription(exp.description.slice(0, k + 1));
          k++;
          setTimeout(typeDescription, 15);
        } else {
          setTimeout(() => setShowAchievements(true), 300);
          setTimeout(() => setShowTech(true), 600);
        }
      };
      
      timers.push(setTimeout(typeCompany, 200));
      timers.push(setTimeout(typePosition, 400));
      timers.push(setTimeout(typeDescription, 600));
      
      return () => timers.forEach(clearTimeout);
    }
  }, [isVisible, exp]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.6, once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 0.6, delay }}
      onViewportEnter={() => setTimeout(() => setIsVisible(true), 200)}
      layout
      className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 hover:border-purple-500/60 transition-all duration-500"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-white min-h-[2rem]">
            {typedCompany}
            {typedCompany.length < exp.company.length && (
              <span className="animate-pulse text-purple-400">|</span>
            )}
          </h3>
          <p className="text-purple-400 font-semibold min-h-[1.5rem]">
            {typedPosition}
            {typedPosition.length < exp.position.length && (
              <span className="animate-pulse text-purple-400">|</span>
            )}
          </p>
        </div>
        <div className="text-right mt-2 md:mt-0">
          <p className="text-gray-400 text-sm">{exp.period}</p>
          <p className="text-purple-300 font-semibold">{exp.duration}</p>
        </div>
      </div>

      <p className="text-gray-300 mb-4 min-h-[3rem]">
        {typedDescription}
        {typedDescription.length < exp.description.length && (
          <span className="animate-pulse text-purple-400">|</span>
        )}
      </p>

      <AnimatePresence>
        {showAchievements && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="overflow-hidden mb-4"
          >
            <h4 className="text-white font-semibold mb-2">Достижения:</h4>
            <ul className="space-y-2">
              {exp.achievements.map((achievement, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: Math.random() * 0.3, 
                    duration: 0.3 + Math.random() * 0.2 
                  }}
                  className="text-gray-300 flex items-start"
                >
                  <span className="text-purple-400 mr-2">▹</span>
                  <span>{achievement}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTech && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative"
          >
            <div className="flex flex-wrap gap-2 py-2">
              {exp.tech.map((tech, i) => (
                <motion.span 
                  key={i}
                  initial={{ opacity: 0, scale: 0, rotate: Math.random() * 360 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: Math.random() * 0.4, 
                    duration: 0.2 + Math.random() * 0.2,
                    type: "spring",
                    stiffness: 300
                  }}
                  style={{ transformOrigin: 'center center' }}
                  className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-sm border border-purple-500/30 relative z-10"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Skills Section
function Skills() {
  const skillCategories = [
    {
      title: "Backend & API",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      skills: [
        { name: "Python", level: 95 },
        { name: "FastAPI", level: 90 },
        { name: "SQLAlchemy", level: 85 },
        { name: "REST API", level: 90 },
        { name: "Asynchronous Programming", level: 88 },
        { name: "asyncio", level: 85 }
      ]
    },
    {
      title: "Databases & Brokers",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      skills: [
        { name: "PostgreSQL", level: 90 },
        { name: "Redis", level: 80 },
        { name: "RabbitMQ", level: 75 },
        { name: "MongoDB", level: 70 },
        { name: "Clickhouse", level: 60 },
        { name: "Elasticsearch", level: 55 }
      ]
    },
    {
      title: "AI/ML & Data",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      skills: [
        { name: "LLM Integration", level: 85 },
        { name: "Qwen", level: 90 },
        { name: "Prompt Engineering", level: 88 },
        { name: "Fine-tuning", level: 70 },
        { name: "ML Integration", level: 75 },
        { name: "Pandas", level: 80 }
      ]
    },
    {
      title: "DevOps & Tools",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      skills: [
        { name: "Docker", level: 85 },
        { name: "Git", level: 90 },
        { name: "Gitlab", level: 80 },
        { name: "Grafana", level: 75 },
        { name: "Kubernetes", level: 50 },
        { name: "Bash", level: 70 }
      ]
    },
    {
      title: "Other",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      skills: [
        { name: "Agile", level: 85 },
        { name: "Pytest", level: 80 },
        { name: "Swagger", level: 85 },
        { name: "Наставничество", level: 75 },
        { name: "Оптимизация кода", level: 90 },
        { name: "Алгоритмы и структуры данных", level: 80 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={getViewport('skills', 0.6)}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4 text-center"
        >
          Навыки
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={getViewport('skills', 0.6)}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-purple-300 mb-12 text-center"
        >
          Технологии и инструменты которыми я владею
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard key={index} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Карточка категории навыков
function SkillCard({ category, index }) {
  const [isVisible, setIsVisible] = useState(false);
  const [showSkills, setShowSkills] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setShowSkills(true), 300);
    }
  }, [isVisible]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={getViewport('skills', 0.6)}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onViewportEnter={() => setTimeout(() => setIsVisible(true), 200)}
      className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 hover:border-purple-500/60 transition-all duration-500"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-shrink-0 w-10 h-10 bg-purple-900/40 rounded-lg flex items-center justify-center text-purple-400 border border-purple-500/30">
          {category.icon}
        </div>
        <h3 className="text-xl font-bold text-white">{category.title}</h3>
      </div>

      <AnimatePresence>
        {showSkills && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="space-y-3">
              {category.skills.map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + Math.random() * 0.2, duration: 0.3 }}
                  className="relative"
                >
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300 text-sm">{skill.name}</span>
                    <span className="text-purple-400 text-sm font-semibold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: i * 0.05 + 0.3, duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-purple-500 to-purple-700 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// AI Projects Section
function AIProjects() {
  const projects = [
    {
      title: "Enterprise AI Assistant",
      subtitle: "Интеграция LLM в систему управления предприятием",
      period: "2024 — настоящее время",
      description: "Разработал AI-помощника для мониторинга производственных процессов и автоматизации отчетности на заводе.",
      features: [
        "Интеграция LLM (Qwen, GPT) для анализа производственных данных",
        "Распознавание голосовых сообщений через Whisper API",
        "Мониторинг проблемных зон и критических секций в реальном времени",
        "Автоматическое оповещение руководства о критических ситуациях",
        "Fine-tuning моделей под специфику предприятия",
        "Prompt engineering для точных ответов"
      ],
      tech: ["Python", "FastAPI", "LLM Integration", "Qwen", "Whisper", "PostgreSQL", "Redis", "RabbitMQ"],
      result: "Сокращение времени реакции на проблемы в 5 раз, автоматизация 80% рутинных отчетов"
    },
    {
      title: "AI Automation Pipeline",
      subtitle: "Автоматизация бизнес-процессов с помощью AI",
      period: "2024",
      description: "Создал асинхронные пайплайны для автоматической обработки и анализа больших объемов данных.",
      features: [
        "Асинхронная обработка данных по cron расписанию",
        "Автоматическая агрегация данных из различных источников",
        "AI-анализ для выявления аномалий и трендов",
        "Интеграция с внешними API и базами данных",
        "Обработка очередей сообщений через RabbitMQ"
      ],
      tech: ["Python", "FastAPI", "asyncio", "AI/ML", "RabbitMQ", "PostgreSQL", "Docker"],
      result: "Обработка миллионов записей ежедневно, сокращение времени обработки в 10 раз"
    },
    {
      title: "ML Integration",
      subtitle: "Интеграция машинного обучения в продакшн",
      period: "2023",
      description: "Внедрил самописный ML-функционал в production среду образовательной платформы.",
      features: [
        "Разработка и интеграция ML-моделей для повышения конверсии",
        "Анализ поведения пользователей",
        "A/B тестирование и оптимизация моделей",
        "Мониторинг качества предсказаний",
        "Автоматическое переобучение моделей"
      ],
      tech: ["Python", "FastAPI", "ML Integration", "PostgreSQL", "asyncio"],
      result: "Увеличение конверсии онлайн пользователей на 35%, рост продаж"
    }
  ];

  return (
    <section id="ai-projects" className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={getViewport('ai-projects', 0.6)}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4 text-center"
        >
          AI Проекты
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={getViewport('ai-projects', 0.6)}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-purple-300 mb-12 text-center"
        >
          Интеграция искусственного интеллекта в бизнес-процессы
        </motion.p>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <AIProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Карточка AI проекта
function AIProjectCard({ project, index }) {
  const [isVisible, setIsVisible] = useState(false);
  const [typedTitle, setTypedTitle] = useState('');
  const [typedSubtitle, setTypedSubtitle] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timers = [];
      
      // Печатаем заголовок
      let i = 0;
      const typeTitle = () => {
        if (i < project.title.length) {
          setTypedTitle(project.title.slice(0, i + 1));
          i++;
          setTimeout(typeTitle, 30);
        }
      };
      
      // Печатаем подзаголовок
      let j = 0;
      const typeSubtitle = () => {
        if (j < project.subtitle.length) {
          setTypedSubtitle(project.subtitle.slice(0, j + 1));
          j++;
          setTimeout(typeSubtitle, 20);
        } else {
          setTimeout(() => setShowDetails(true), 300);
        }
      };
      
      timers.push(setTimeout(typeTitle, 200));
      timers.push(setTimeout(typeSubtitle, 400));
      
      return () => timers.forEach(clearTimeout);
    }
  }, [isVisible, project]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.6, once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 0.6 }}
      onViewportEnter={() => setTimeout(() => setIsVisible(true), 200)}
      className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 hover:border-purple-500/60 transition-all duration-500"
    >
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
          <h3 className="text-3xl font-bold text-white min-h-[3rem]">
            {typedTitle}
            {typedTitle.length < project.title.length && (
              <span className="animate-pulse text-purple-400">|</span>
            )}
          </h3>
          <span className="text-purple-300 text-sm mt-2 md:mt-0">{project.period}</span>
        </div>
        <p className="text-purple-400 font-semibold text-lg min-h-[2rem]">
          {typedSubtitle}
          {typedSubtitle.length < project.subtitle.length && (
            <span className="animate-pulse text-purple-400">|</span>
          )}
        </p>
      </div>

      <p className="text-gray-300 mb-6 text-lg">{project.description}</p>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-3 text-lg">Ключевые функции:</h4>
              <ul className="space-y-2">
                {project.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="text-gray-300 flex items-start"
                  >
                    <span className="text-purple-400 mr-3 text-lg">▹</span>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.3, type: "spring" }}
                  className="px-4 py-2 bg-purple-900/40 text-purple-300 rounded-full text-sm border border-purple-500/40"
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-4 p-4 bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-lg border-l-4 border-purple-500"
            >
              <p className="text-purple-200 font-semibold">
                Результат: {project.result}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Pet Projects Section
function PetProjects() {
  const projects = [
    {
      title: "3D Editor",
      subtitle: "Python + PyQt + OpenGL",
      description: "Полноценное десктопное приложение для работы с 3D-пространствами. Создано полностью с помощью AI-ассистента Qwen.",
      features: [
        "Создание и редактирование 3D-сцен в реальном времени",
        "Построение плоскостей по трем координатам, точке и отрезку",
        "Создание многогранников (включая кастомный 'ежик')",
        "Адаптивный интерфейс с системой уведомлений",
        "Фоновая музыка и звуковые эффекты",
        "Сохранение и загрузка проектов"
      ],
      tech: ["Python", "PyQt5", "OpenGL", "Pygame", "3D Graphics"],
      link: "https://github.com/K41ipso/editor_3d",
      images: ["/3d-editor-1.png", "/3d-editor-2.png", "/3d-editor-3.png"]
    },
    {
      title: "Custom Database",
      subtitle: "C++ с нуля",
      description: "Собственная реализация базы данных на C++ с поддержкой таблиц, фильтрации и merge операций.",
      features: [
        "Ручная реализация структур данных и алгоритмов",
        "Поддержка множественных таблиц с отношениями",
        "Система фильтрации по множественным критериям",
        "Merge операции между таблицами",
        "Консольный интерфейс с интерактивным выбором",
        "Чтение/запись данных из файлов"
      ],
      tech: ["C++", "Data Structures", "Algorithms", "File I/O"],
      link: "https://github.com/K41ipso/My_database"
    },
    {
      title: "Messenger",
      subtitle: "В разработке",
      description: "Собственный мессенджер с клиент-серверной архитектурой. Проект в активной разработке.",
      features: [
        "Real-time обмен сообщениями",
        "Асинхронная архитектура",
        "Аутентификация и авторизация",
        "История сообщений"
      ],
      tech: ["Python", "FastAPI", "WebSockets", "PostgreSQL"],
      link: null,
      status: "WIP"
    }
  ];

  return (
    <section id="pet-projects" className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={getViewport('pet-projects', 0.6)}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4 text-center"
        >
          Pet Projects
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={getViewport('pet-projects', 0.6)}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-purple-300 mb-12 text-center"
        >
          Личные проекты для изучения новых технологий
        </motion.p>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <PetProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Карточка Pet Project
function PetProjectCard({ project, index }) {
  const [isVisible, setIsVisible] = useState(false);
  const [typedTitle, setTypedTitle] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const techContainerRef = useRef(null);
  const [techWidth, setTechWidth] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timers = [];
      
      // Печатаем заголовок
      let i = 0;
      const typeTitle = () => {
        if (i < project.title.length) {
          setTypedTitle(project.title.slice(0, i + 1));
          i++;
          setTimeout(typeTitle, 40);
        } else {
          setTimeout(() => setShowDetails(true), 400);
        }
      };
      
      timers.push(setTimeout(typeTitle, 300));
      
      return () => timers.forEach(clearTimeout);
    }
  }, [isVisible, project]);

  // Автопереключение изображений
  useEffect(() => {
    if (project.images && project.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % project.images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [project.images]);

  // Измеряем ширину навыков после рендера
  useEffect(() => {
    if (showDetails && techContainerRef.current) {
      const timer = setTimeout(() => {
        if (techContainerRef.current) {
          setTechWidth(techContainerRef.current.offsetWidth);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showDetails]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.6, once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 0.6 }}
      onViewportEnter={() => setTimeout(() => setIsVisible(true), 200)}
      className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 hover:border-purple-500/60 transition-all duration-500"
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* ЛЕВАЯ КОЛОНКА: название, описание, возможности */}
        <div className="lg:w-1/2">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-3xl font-bold text-white min-h-[3rem]">
                {typedTitle}
                {typedTitle.length < project.title.length && (
                  <span className="animate-pulse text-purple-400">|</span>
                )}
              </h3>
              {project.status === 'WIP' && (
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm border border-yellow-500/50">
                  В разработке
                </span>
              )}
            </div>
            <p className="text-purple-400 font-semibold text-lg">{project.subtitle}</p>
          </div>

          <p className="text-gray-300 mb-6 text-lg">{project.description}</p>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden"
              >
                <div>
                  <h4 className="text-white font-semibold mb-3 text-lg">Возможности:</h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        className="text-gray-300 flex items-start"
                      >
                        <span className="text-purple-400 mr-3 text-lg">▹</span>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ПРАВАЯ КОЛОНКА: картинка сверху + навыки и кнопка прижаты к низу */}
        <div className="lg:w-1/2 flex flex-col justify-between min-h-full">
          {/* Изображения - СВЕРХУ */}
          {project.images && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={showDetails ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="relative rounded-xl overflow-hidden border-2 border-purple-500/30 bg-slate-900">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="aspect-video"
                  >
                    <img
                      src={project.images[currentImage]}
                      alt={`${project.title} screenshot`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Индикаторы */}
                {project.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {project.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImage(i)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i === currentImage ? 'bg-purple-500 w-4' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Навыки + кнопка GitHub - ПРИЖАТЫ К НИЗУ */}
          <div className="mt-auto pt-6">
            {/* Навыки - прижаты к правому краю */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="flex justify-end"
                >
                  <div 
                    ref={techContainerRef}
                    className="flex flex-wrap gap-2"
                  >
                    {project.tech.map((tech, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0, rotate: Math.random() * 360 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ 
                          delay: i * 0.05 + 0.4 + Math.random() * 0.2, 
                          duration: 0.3,
                          type: "spring",
                          stiffness: 300
                        }}
                        className="px-3 py-1.5 bg-purple-900/40 text-purple-300 rounded-full text-sm border border-purple-500/40"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Кнопка GitHub - под навыками, той же ширины, прижата вправо */}
            {project.link && showDetails && techWidth > 0 && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex justify-end mt-3"
              >
                <div
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition text-sm"
                  style={{ width: `${techWidth}px` }}
                >
                  <span>GitHub</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

let allAnimationsComplete = false;

// Contact Section
function Contact() {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedCardEmail, setCopiedCardEmail] = useState(false);
  const [copiedCtaEmail, setCtaCtaEmail] = useState(false);

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'phone') {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
      if (type === 'cardEmail') {
        setCopiedCardEmail(true);
        setTimeout(() => setCopiedCardEmail(false), 2000);
      }
      if (type === 'ctaEmail') {
        setCtaCtaEmail(true);
        setTimeout(() => setCtaCtaEmail(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const contacts = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295l.213-3.053 5.56-5.023c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.94z"/>
        </svg>
      ),
      label: "Telegram",
      value: "@gpopovdev",
      link: "https://t.me/gpopovdev",
      external: true
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: "Email",
      value: "karandawwik@gmail.com",
      action: () => copyToClipboard('karandawwik@gmail.com', 'cardEmail'),
      copied: copiedCardEmail
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: "Телефон",
      value: "+7 (932) 612-33-12",
      action: () => copyToClipboard('+79326123312', 'phone'),
      copied: copiedPhone
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: "Локация",
      value: "Екатеринбург, Россия",
      info: "Готов к удаленке и командировкам"
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ amount: 0.6, once: true }}
          transition={{ duration: 0.6 }}
          onViewportEnter={() => {
            // Когда Contact секция появилась - все анимации завершены
            setTimeout(() => {
              window.allAnimationsComplete = true;
              // Триггерим обновление Navbar
              window.dispatchEvent(new CustomEvent('animationsComplete'));
            }, 1000);
          }}
          className="text-4xl md:text-5xl font-bold text-white mb-4 text-center"
        >
          Контакты
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={getViewport('contact', 0.6)}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-purple-300 mb-12 text-center"
        >
          Свяжитесь со мной удобным способом
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contacts.map((contact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={getViewport('contact', 0.6)}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 hover:border-purple-500/60 transition-all duration-500"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-900/40 rounded-xl flex items-center justify-center text-purple-400 border border-purple-500/30">
                  {contact.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-gray-400 text-sm mb-1">{contact.label}</p>
                  
                  {contact.external ? (
                    <a
                      href={contact.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-semibold text-lg hover:text-purple-400 transition break-all"
                    >
                      {contact.value}
                    </a>
                  ) : contact.action ? (
                    <button
                      onClick={contact.action}
                      className="text-white font-semibold text-lg hover:text-purple-400 transition break-all text-left relative"
                    >
                      {contact.value}
                      <AnimatePresence>
                        {contact.copied && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute -top-8 left-0 px-3 py-1 bg-purple-900/90 backdrop-blur-sm rounded-lg border border-purple-500/50 text-xs text-purple-300 whitespace-nowrap"
                          >
                            Скопировано!
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  ) : (
                    <div>
                      <p className="text-white font-semibold text-lg">{contact.value}</p>
                      {contact.info && (
                        <p className="text-purple-400 text-sm mt-1">{contact.info}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA блок */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={getViewport('contact', 0.6)}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 p-8 bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-2xl border border-purple-500/30 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-3">
            Открыт к предложениям
          </h3>
          <p className="text-gray-300 text-lg mb-6">
            Готов обсудить интересные проекты и новые возможности
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://t.me/gpopovdev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition"
            >
              Написать в Telegram
            </a>
            <button
              onClick={() => copyToClipboard('karandawwik@gmail.com', 'ctaEmail')}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-purple-400 text-purple-300 hover:bg-purple-900/30 rounded-lg font-semibold transition relative"
            >
              Скопировать Email
              <AnimatePresence>
                {copiedCtaEmail && (
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-900/90 backdrop-blur-sm rounded-lg border border-purple-500/50 text-xs text-purple-300 whitespace-nowrap"
                  >
                    Скопировано!
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Footer с пасхалкой
function Footer() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText('karandawwik@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <>
      <footer className="py-8 px-4 border-t border-purple-500/30 bg-slate-900/50 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gray-400 mb-4">
            © 2026 Попов Георгий. Все права защищены.
          </p>
          <div className="flex justify-center gap-6 text-sm items-center">
            <a href="https://t.me/gpopovdev" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition">
              Telegram
            </a>
            <div className="relative">
              <button 
                onClick={handleEmailClick}
                className="text-purple-400 hover:text-purple-300 transition"
              >
                Email
              </button>
              <AnimatePresence>
                {copiedEmail && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-2 bg-purple-900/90 backdrop-blur-sm rounded-lg border border-purple-500/50 whitespace-nowrap"
                  >
                    <p className="text-purple-300 text-xs">
                      Email скопирован!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="relative group">
              <span className="text-purple-400/50 hover:text-purple-400 cursor-pointer transition">
                ?
              </span>
              <div className="absolute top-1/2 -translate-y-1/2 left-full ml-2 px-3 py-2 bg-purple-900/90 backdrop-blur-sm rounded-lg border border-purple-500/50 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <p className="text-purple-300 text-xs">
                  Создано за 30 минут с Qwen
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function Home() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
      <Navbar scrollToTop={scrollToTop} onOpenChat={() => setIsChatOpen(true)} />
      <ParticleField />
      <Hero onOpenChat={() => setIsChatOpen(true)} />
      <About />
      <Experience />
      <Skills />
      <AIProjects />
      <PetProjects />
      <Contact />
      <Footer />

      {/* AI Chat Modal */}
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Кнопка "Наверх" */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-2xl flex items-center justify-center cursor-pointer z-[9999]"
            style={{ pointerEvents: 'auto' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}
