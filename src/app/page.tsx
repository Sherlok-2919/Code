'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Heart, Star, BookOpen, Users, Award, Sparkles, Cpu, Code, Database, Network, Zap, Globe } from 'lucide-react';

export default function TeachersDayPage() {
  const [teacherName, setTeacherName] = useState('');
  const [showCard, setShowCard] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const departments = [
    { 
      name: 'Computer Science & Engineering', 
      icon: <Cpu className="w-8 h-8" />, 
      color: 'from-blue-500 to-cyan-500',
      gradient: 'from-blue-600/20 to-cyan-600/20',
      description: 'Pioneering the future of computing and digital innovation'
    },
    { 
      name: 'Electrical Engineering', 
      icon: <Zap className="w-8 h-8" />, 
      color: 'from-blue-600 to-indigo-600',
      gradient: 'from-blue-700/20 to-indigo-700/20',
      description: 'Powering the world with electrical excellence'
    },
    { 
      name: 'Mechanical Engineering', 
      icon: <Code className="w-8 h-8" />, 
      color: 'from-indigo-500 to-purple-500',
      gradient: 'from-indigo-600/20 to-purple-600/20',
      description: 'Engineering precision and mechanical mastery'
    },
    { 
      name: 'Civil Engineering', 
      icon: <Database className="w-8 h-8" />, 
      color: 'from-purple-500 to-blue-600',
      gradient: 'from-purple-600/20 to-blue-700/20',
      description: 'Building the infrastructure of tomorrow'
    },
    { 
      name: 'Information Technology', 
      icon: <Network className="w-8 h-8" />, 
      color: 'from-cyan-500 to-blue-500',
      gradient: 'from-cyan-600/20 to-blue-600/20',
      description: 'Connecting the digital world seamlessly'
    },
    { 
      name: 'Electronics & Communication', 
      icon: <Globe className="w-8 h-8" />, 
      color: 'from-blue-400 to-indigo-500',
      gradient: 'from-blue-500/20 to-indigo-600/20',
      description: 'Advancing communication technology frontiers'
    },
  ];

  const generateCard = async () => {
    if (!teacherName.trim()) return;
    
    setIsGenerating(true);
    setTimeout(() => {
      setShowCard(true);
      setIsGenerating(false);
    }, 1500);
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;
    
    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;
      
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: '#0f172a',
        useCORS: true,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const imgWidth = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`teachers-day-${teacherName}.pdf`);
    } catch (error) {
      console.error('Error downloading card:', error);
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-300 font-mono">INITIALIZING...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-x-hidden relative">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-40"
            animate={{
              x: [0, Math.random() * windowSize.width],
              y: [0, Math.random() * windowSize.height],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header 
        className="relative z-10 text-center py-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-flex items-center gap-4 mb-6"
          animate={{ rotate: [0, 2, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent font-mono tracking-wider">
            TEACHERS DAY 2024
          </h1>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
        </motion.div>
        <p className="text-xl text-blue-200 max-w-3xl mx-auto font-mono">
          CELEBRATING THE DIGITAL PIONEERS WHO SHAPE TOMORROW'S INNOVATORS
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <motion.section 
          className="text-center mb-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center gap-6 mb-8 p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-blue-500/30 shadow-2xl"
            whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)" }}
          >
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-lg font-semibold text-blue-100 font-mono">
              THANK YOU FOR SHAPING THE DIGITAL FUTURE
            </span>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              className="group bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 shadow-xl hover:border-blue-400/50 transition-all duration-300"
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)" }}
            >
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-blue-500/20 rounded-full">
                  <BookOpen className="w-12 h-12 text-blue-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-blue-100 mb-4 font-mono">KNOWLEDGE ARCHITECTS</h3>
              <p className="text-blue-200 leading-relaxed">
                Your expertise in digital technologies and computational thinking lights the path for future innovators, 
                guiding them towards technological excellence and breakthrough discoveries.
              </p>
            </motion.div>
            
            <motion.div
              className="group bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 shadow-xl hover:border-blue-400/50 transition-all duration-300"
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)" }}
            >
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-cyan-500/20 rounded-full">
                  <Users className="w-12 h-12 text-cyan-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-cyan-100 mb-4 font-mono">MENTORS & GUIDES</h3>
              <p className="text-cyan-200 leading-relaxed">
                Beyond algorithms and code, you teach critical thinking, problem-solving, and the importance of 
                ethical technology development in an interconnected digital world.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Department Greetings */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-100 font-mono tracking-wide">
            FACULTY DEPARTMENTS
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.name}
                className="group relative overflow-hidden rounded-2xl bg-slate-800/60 backdrop-blur-sm border border-blue-500/30 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${dept.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative p-8">
                  <div className="flex items-center justify-center mb-6">
                    <div className={`p-4 bg-gradient-to-r ${dept.color} rounded-full shadow-lg`}>
                      <div className="text-blue-100">
                        {dept.icon}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-blue-100 mb-3 font-mono text-center">{dept.name}</h3>
                  <p className="text-blue-200 text-sm text-center leading-relaxed">
                    {dept.description}
                  </p>
                  <div className="mt-6 flex justify-center">
                    <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Greeting Card Generator */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-blue-100 font-mono tracking-wide">
              DIGITAL GREETING CARD GENERATOR
            </h2>
            
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-3xl p-10 border border-blue-500/30 shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Input Section */}
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-blue-100 font-mono">PERSONALIZE YOUR CARD</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-3 font-mono">
                        ENTER YOUR NAME
                      </label>
                      <input
                        type="text"
                        value={teacherName}
                        onChange={(e) => setTeacherName(e.target.value)}
                        placeholder="Type your name here..."
                        className="w-full px-6 py-4 bg-slate-700/50 border border-blue-500/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-blue-100 font-mono placeholder-blue-300/50"
                      />
                    </div>
                    
                    <motion.button
                      onClick={generateCard}
                      disabled={!teacherName.trim() || isGenerating}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 font-mono text-lg shadow-lg hover:shadow-blue-500/25"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isGenerating ? (
                        <>
                          <motion.div
                            className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span>GENERATING...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-6 h-6" />
                          <span>GENERATE CARD</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* Preview Section */}
                <div className="flex items-center justify-center">
                  <AnimatePresence>
                    {showCard ? (
                      <motion.div
                        ref={cardRef}
                        className="relative w-full max-w-md aspect-[4/3] bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 shadow-2xl border-2 border-blue-500/50"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        {/* Card Design */}
                        <div className="absolute top-4 right-4">
                          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        </div>
                        
                        <div className="text-center h-full flex flex-col justify-center">
                          <div className="text-6xl mb-6">🎓</div>
                          <h3 className="text-3xl font-bold text-blue-100 mb-4 font-mono">
                            HAPPY TEACHERS DAY
                          </h3>
                          <p className="text-blue-200 mb-6 font-mono">
                            DEAR <span className="font-bold text-cyan-400">{teacherName.toUpperCase()}</span>
                          </p>
                          <p className="text-sm text-blue-300 leading-relaxed font-mono">
                            Thank you for your dedication, wisdom, and passion in shaping the minds of tomorrow's 
                            digital innovators. Your impact transcends the classroom and reaches countless lives.
                          </p>
                          <div className="mt-6 flex justify-center gap-3">
                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                        
                        <div className="absolute bottom-4 left-4">
                          <Award className="w-6 h-6 text-blue-400" />
                        </div>
                      </motion.div>
                    ) : (
                      <div className="w-full max-w-md aspect-[4/3] bg-slate-700/30 rounded-2xl flex items-center justify-center border-2 border-dashed border-blue-500/30">
                        <div className="text-center">
                          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                          <p className="text-blue-300 font-mono">CARD PREVIEW</p>
                        </div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Download Button */}
              <AnimatePresence>
                {showCard && (
                  <motion.div
                    className="mt-10 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <motion.button
                      onClick={downloadCard}
                      className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-4 px-10 rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 flex items-center gap-3 mx-auto font-mono text-lg shadow-lg hover:shadow-cyan-500/25"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download className="w-6 h-6" />
                      <span>DOWNLOAD CARD</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 shadow-xl">
            <p className="text-blue-200 mb-3 font-mono">
              MADE WITH ❤️ FOR OUR AMAZING EDUCATORS
            </p>
            <p className="text-sm text-blue-300 font-mono">
              CELEBRATING TEACHERS DAY 2024 | DIGITAL ERA
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </motion.footer>
      </main>
    </div>
  );
}
