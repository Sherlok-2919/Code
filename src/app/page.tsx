"use client";

import { useState, useRef, useEffect } from 'react';
import { Download, Heart, BookOpen, Award, Users, Calendar, MapPin, Clock, Zap, Star, Cpu, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { approvedTeachers, isTeacherApproved } from '@/data/teachers';

export default function FuturisticTeachersDay() {
  const [teacherName, setTeacherName] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleNameChange = (value: string) => {
    setTeacherName(value);
    
    if (value.length > 0) {
      const filtered = approvedTeachers.filter(teacher =>
        teacher.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

    // Check verification
    if (isTeacherApproved(value)) {
      setIsVerified(true);
      setVerificationMessage('✓ TEACHER VERIFIED - ACCESS GRANTED');
      setShowSuggestions(false);
    } else {
      setIsVerified(false);
      setVerificationMessage(value.length > 0 ? '⚠ TEACHER NOT FOUND IN DATABASE' : '');
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setTeacherName(suggestion);
    setIsVerified(true);
    setVerificationMessage('✓ TEACHER VERIFIED - ACCESS GRANTED');
    setShowSuggestions(false);
  };
  const downloadCard = async () => {
    if (!isVerified) {
      alert('Please enter a valid teacher name from the approved list!');
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      const link = document.createElement('a');
      link.download = `futuristic-teachers-day-${teacherName.replace(/\s+/g, '-').toLowerCase()}.png`;
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        canvas.width = 1000;
        canvas.height = 700;
        
        // Futuristic gradient background
        const gradient = ctx.createLinearGradient(0, 0, 1000, 700);
        gradient.addColorStop(0, '#000000');
        gradient.addColorStop(0.3, '#0f172a');
        gradient.addColorStop(0.6, '#1e293b');
        gradient.addColorStop(1, '#0ea5e9');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1000, 700);
        
        // Neon border
        ctx.strokeStyle = '#00d4ff';
        ctx.lineWidth = 4;
        ctx.shadowColor = '#00d4ff';
        ctx.shadowBlur = 20;
        ctx.strokeRect(20, 20, 960, 660);
        
        // Inner glow border
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.strokeRect(40, 40, 920, 620);
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        
        // Title with glow effect
        ctx.fillStyle = '#00d4ff';
        ctx.textAlign = 'center';
        ctx.font = 'bold 56px Arial';
        ctx.shadowColor = '#00d4ff';
        ctx.shadowBlur = 30;
        ctx.fillText("TEACHER'S DAY 2025", 500, 150);
        
        // Subtitle
        ctx.font = 'bold 32px Arial';
        ctx.fillStyle = '#60a5fa';
        ctx.shadowBlur = 15;
        ctx.fillText("FUTURE EDUCATOR", 500, 200);
        
        // Name
        if (teacherName) {
          ctx.font = 'bold 42px Arial';
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#3b82f6';
          ctx.shadowBlur = 20;
          ctx.fillText(teacherName.toUpperCase(), 500, 300);
        }
        
        // Message
        ctx.font = '28px Arial';
        ctx.fillStyle = '#94a3b8';
        ctx.shadowBlur = 10;
        ctx.fillText('SHAPING MINDS • BUILDING FUTURES', 500, 400);
        ctx.fillText('INSPIRING INNOVATION', 500, 450);
        
        // Date with special styling
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = '#00d4ff';
        ctx.shadowColor = '#00d4ff';
        ctx.shadowBlur = 15;
        ctx.fillText('SEPTEMBER 5, 2025', 500, 550);
        
        // Decorative elements
        ctx.fillStyle = '#3b82f6';
        ctx.shadowColor = '#3b82f6';
        ctx.shadowBlur = 20;
        
        // Left decoration
        ctx.fillRect(100, 320, 4, 100);
        ctx.fillRect(80, 340, 44, 4);
        ctx.fillRect(80, 380, 44, 4);
        
        // Right decoration
        ctx.fillRect(896, 320, 4, 100);
        ctx.fillRect(876, 340, 44, 4);
        ctx.fillRect(876, 380, 44, 4);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
          }
        });
      }
      
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }}></div>
      </div>

      {/* Mouse Follower */}
      <div 
        className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(1px)',
          transition: 'all 0.1s ease-out'
        }}
      />

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-6xl mx-auto">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-slate-900/80 to-blue-900/80 backdrop-blur-xl border border-blue-500/30 text-blue-300 px-8 py-4 rounded-full text-sm font-bold mb-12 hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/20">
              <Zap className="w-5 h-5 animate-pulse" />
              JIS COLLEGE OF ENGINEERING
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
            </div>
            
            {/* Main Title */}
            <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-black mb-8 leading-none">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-600 bg-clip-text text-transparent animate-pulse">
                TEACHER'S
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
                DAY
              </span>
            </h1>
            
            {/* Subtitle */}
            <div className="relative mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-300 mb-4">
                COMPUTER SCIENCE OF ENGINEERING
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto"></div>
            </div>
            
            {/* Description */}
            <p className="text-xl md:text-2xl text-slate-400 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
              Celebrating excellence in education at <span className="text-blue-400 font-semibold">JIS College of Engineering</span>. 
              Honoring our dedicated Computer Science faculty who shape the future of technology and innovation.
            </p>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {[
                { icon: Cpu, title: "COMPUTER SCIENCE", desc: "Advanced programming & algorithms", color: "from-blue-500 to-cyan-500" },
                { icon: Shield, title: "ENGINEERING EXCELLENCE", desc: "Building future innovators", color: "from-cyan-500 to-blue-500" },
                { icon: Star, title: "TECHNOLOGY LEADERSHIP", desc: "Shaping digital transformation", color: "from-blue-600 to-indigo-500" }
              ].map((item, i) => (
                <Card key={i} className="group bg-gradient-to-br from-slate-900/50 to-blue-900/30 backdrop-blur-xl border border-blue-500/20 hover:border-blue-400/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-2xl shadow-blue-500/10">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center group-hover:rotate-12 transition-transform duration-300`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-300 mb-3 tracking-wider">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Event Invitation */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto">
            <Card className="bg-gradient-to-br from-slate-900/80 to-blue-900/60 backdrop-blur-2xl border-2 border-blue-500/30 shadow-2xl shadow-blue-500/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10"></div>
              <CardContent className="relative p-12">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-5xl font-black text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
                      SYSTEM INVITATION
                    </h2>
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-xl text-blue-300 font-light">JIS College of Engineering celebration protocol activated</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    {[
                      { icon: Calendar, label: "DATE STAMP", value: "SEPTEMBER 5, 2025" },
                      { icon: Clock, label: "TIME SYNC", value: "10:00 - 14:00 HOURS" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-6 group">
                        <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                          <item.icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-blue-400 tracking-widest mb-1">{item.label}</h3>
                          <p className="text-xl font-semibold text-white">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-8">
                    {[
                      { icon: MapPin, label: "LOCATION NODE", value: "MAIN AUDITORIUM SECTOR" },
                      { icon: Heart, label: "DRESS PROTOCOL", value: "SMART CASUAL MODE" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-6 group">
                        <div className="w-14 h-14 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                          <item.icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-cyan-400 tracking-widest mb-1">{item.label}</h3>
                          <p className="text-xl font-semibold text-white">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-12 text-center">
                  <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                    Join us for an immersive celebration of educational excellence at JIS College of Engineering. 
                    Honoring our dedicated faculty and celebrating the spirit of teaching and learning.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Holographic Card Generator */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-6xl md:text-7xl font-black mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                  HOLOGRAPHIC
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
                  GENERATOR
                </span>
              </h2>
              <p className="text-xl text-slate-400 font-light">
                Generate your personalized quantum appreciation certificate
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Generator Interface */}
              <div className="space-y-8">
                <Card className="bg-gradient-to-br from-slate-900/80 to-blue-900/40 backdrop-blur-xl border-2 border-blue-500/30 shadow-2xl shadow-blue-500/20">
                  <CardContent className="p-10">
                    <div className="space-y-8">
                      <div className="relative">
                        <label className="block text-lg font-bold text-blue-300 mb-4 tracking-wider">
                          TEACHER IDENTIFIER INPUT
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter your designation..."
                          value={teacherName}
                          onChange={(e) => handleNameChange(e.target.value)}
                          className={`bg-slate-900/50 border-2 ${
                            isVerified 
                              ? 'border-green-400 focus:border-green-300' 
                              : verificationMessage && !isVerified 
                                ? 'border-red-400 focus:border-red-300'
                                : 'border-blue-500/30 focus:border-cyan-400'
                          } text-white placeholder-slate-500 text-lg py-4 rounded-xl backdrop-blur-sm transition-all duration-300`}
                        />
                        
                        {/* Verification Status */}
                        {verificationMessage && (
                          <div className={`mt-3 text-sm font-bold tracking-wider ${
                            isVerified ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {verificationMessage}
                          </div>
                        )}
                        
                        {/* Suggestions Dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                          <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-xl border border-blue-500/30 rounded-xl shadow-2xl shadow-blue-500/20 z-50 max-h-60 overflow-y-auto">
                            {suggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => selectSuggestion(suggestion)}
                                className="w-full text-left px-4 py-3 text-white hover:bg-blue-600/20 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl border-b border-blue-500/10 last:border-b-0"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <Button
                        onClick={downloadCard}
                        disabled={!isVerified || isGenerating}
                        className={`w-full font-bold py-6 rounded-xl text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg ${
                          isVerified 
                            ? 'bg-gradient-to-r from-green-600 via-blue-600 to-cyan-600 hover:from-green-700 hover:via-blue-700 hover:to-cyan-700 shadow-green-500/30' 
                            : 'bg-gradient-to-r from-slate-600 to-slate-700 shadow-slate-500/30'
                        }`}
                      >
                        {isGenerating ? (
                          <div className="flex items-center gap-3">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            GENERATING CARD...
                          </div>
                        ) : !isVerified ? (
                          <div className="flex items-center gap-3">
                            <Shield className="w-6 h-6" />
                            VERIFICATION REQUIRED
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <Download className="w-6 h-6" />
                            GENERATE GREETING CARD
                          </div>
                        )}
                      </Button>
                      
                      {/* Teacher Count Info */}
                      <div className="text-center">
                        <p className="text-sm text-slate-400">
                          <span className="text-blue-400 font-bold">{approvedTeachers.length}</span> teachers registered in faculty database
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Holographic Preview */}
              <div className="relative">
                <Card 
                  ref={cardRef}
                  className="aspect-[4/3] bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-900 border-2 border-blue-500/50 shadow-2xl shadow-blue-500/30 transform hover:scale-105 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-600/10"></div>
                  <div className="absolute inset-4 border border-blue-400/30 rounded-lg"></div>
                  
                  <CardContent className="h-full flex flex-col justify-center items-center text-center p-8 relative z-10">
                    <div className="space-y-6">
                      <div className="text-center">
                        <h3 className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text mb-2">
                          TEACHER'S DAY 2025
                        </h3>
                        <p className="text-lg font-bold text-blue-300 tracking-widest">
                          FUTURE EDUCATOR
                        </p>
                      </div>
                      
                      {teacherName && isVerified && (
                        <div className="py-4">
                          <p className="text-2xl md:text-3xl font-bold text-white tracking-wider">
                            {teacherName.toUpperCase()}
                          </p>
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <p className="text-lg text-slate-300 font-medium tracking-wide">
                          SHAPING MINDS • BUILDING FUTURES
                        </p>
                        <p className="text-lg text-slate-300 font-medium tracking-wide">
                          INSPIRING INNOVATION
                        </p>
                      </div>
                      
                      <div className="flex justify-center items-center gap-4 text-blue-400 pt-4">
                        <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-blue-400"></div>
                        <span className="text-lg font-bold tracking-widest">SEPTEMBER 5, 2025</span>
                        <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-blue-400"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {(!teacherName || !isVerified) && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                        <Cpu className="w-8 h-8 text-white animate-pulse" />
                      </div>
                      <p className="text-blue-300 text-xl font-bold tracking-wider">
                        {!teacherName ? 'AWAITING INPUT' : 'VERIFICATION REQUIRED'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-slate-900 via-blue-900/50 to-slate-900 border-t border-blue-500/20 py-16 mt-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-black text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
                JIS COLLEGE OF ENGINEERING 2025
              </span>
            </div>
            <p className="text-blue-300 text-lg font-light mb-8">
              Celebrating excellence in Computer Science education
            </p>
            <div className="flex justify-center items-center gap-6">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-lg text-slate-400 tracking-wider">SYSTEM ONLINE</span>
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.5); }
          50% { box-shadow: 0 0 40px rgba(0, 212, 255, 0.8); }
        }
      `}</style>
    </div>
  );
}