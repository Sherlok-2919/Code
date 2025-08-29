"use client";

import { useState, useRef, useEffect } from 'react';
import { Download, Heart, BookOpen, Award, Users, Calendar, MapPin, Clock, Zap, Star, Cpu, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { approvedTeachers, isTeacherApproved } from '@/data/teachers';

const getTeacherCardPath = (teacherName: string): string => {
  return `/data/cards/${teacherName}.png`;
};

export default function FuturisticTeachersDay() {
  const [teacherName, setTeacherName] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false); // Add this line
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
    setShowCelebration(true); // Show celebration effect when generating
    
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
      {/* Enhanced Background with Moving Elements */}
      <div className="fixed inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900"></div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }}></div>
        </div>
        
        {/* Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full blur-2xl opacity-15"
              style={{
                width: `${100 + Math.random() * 150}px`,
                height: `${100 + Math.random() * 150}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, ${i % 2 === 0 ? '#00d4ff' : '#3b82f6'} 0%, transparent 70%)`,
                animation: `float-orb ${12 + Math.random() * 8}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 4}s`
              }}
            />
          ))}
        </div>
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

      {/* Enhanced Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-50"
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
        <section className="container mx-auto px-4 py-12 text-center">
          <div className="max-w-5xl mx-auto">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-900/80 to-blue-900/80 backdrop-blur-xl border border-blue-500/30 text-blue-300 px-6 py-2 rounded-full text-xs font-bold mb-8 hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/20">
              <Zap className="w-4 h-4 animate-pulse" />
              JIS COLLEGE OF ENGINEERING
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping"></div>
            </div>
            
            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-none">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-600 bg-clip-text text-transparent animate-pulse">
                HAPPY TEACHER'S
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
                DAY
              </span>
            </h1>
            
            {/* Subtitle */}
            <div className="relative mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-300 mb-3">
                COMPUTER SCIENCE OF ENGINEERING
              </h2>
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto"></div>
            </div>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Celebrating excellence in education at <span className="text-blue-400 font-semibold">JIS College of Engineering</span>. 
              Honoring our dedicated Computer Science faculty who shape the future of technology and innovation.
            </p>

            {/* Optimized Feature Cards with Off-White Bluish Purple */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {[
                { 
                  icon: Cpu, 
                  title: "COMPUTER SCIENCE", 
                  desc: "Advanced programming & algorithms", 
                  color: "from-slate-200 to-blue-200",
                  gradient: "from-slate-100/20 to-blue-100/20",
                  border: "border-slate-300/30"
                },
                { 
                  icon: Shield, 
                  title: "ENGINEERING EXCELLENCE", 
                  desc: "Building future innovators", 
                  color: "from-blue-200 to-purple-200",
                  gradient: "from-blue-100/20 to-purple-100/20",
                  border: "border-blue-300/30"
                },
                { 
                  icon: Star, 
                  title: "TECHNOLOGY LEADERSHIP", 
                  desc: "Shaping digital transformation", 
                  color: "from-purple-200 to-indigo-200",
                  gradient: "from-purple-100/20 to-indigo-100/20",
                  border: "border-purple-300/30"
                }
              ].map((item, i) => (
                <Card key={i} className={`group relative overflow-hidden bg-gradient-to-br ${item.gradient} backdrop-blur-xl border ${item.border} hover:border-white/50 transition-all duration-300 hover:scale-102 hover:-translate-y-1 shadow-xl shadow-black/30`}>
                  {/* Glass Effect Overlay */}
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
                  
                  <CardContent className="relative z-10 p-6 text-center">
                    <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center group-hover:rotate-6 group-hover:scale-105 transition-all duration-300 shadow-lg shadow-black/20`}>
                      <item.icon className="w-7 h-7 text-slate-700" />
                    </div>
                    <h3 className="text-lg font-black text-slate-800 mb-2 tracking-wider group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{item.desc}</p>
                    
                    {/* Hover Effect Line */}
                    <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-3 transition-all duration-300"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Optimized Event Invitation with Off-White Bluish Purple */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <Card className="relative overflow-hidden bg-gradient-to-br from-slate-100/40 via-blue-100/30 to-purple-100/40 backdrop-blur-xl border border-slate-300/25 shadow-xl shadow-black/20">
              {/* Glass Effect Overlay */}
              <div className="absolute inset-0 bg-white/8 backdrop-blur-sm"></div>
              
              <CardContent className="relative z-10 p-8">
                                  <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-slate-200 to-blue-200 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-300/30">
                        <Users className="w-6 h-6 text-slate-700" />
                      </div>
                      <h2 className="text-4xl font-black text-transparent bg-gradient-to-r from-slate-700 via-blue-600 to-purple-600 bg-clip-text">
                        SYSTEM INVITATION
                      </h2>
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-200 to-purple-200 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-300/30">
                        <Users className="w-6 h-6 text-slate-700" />
                      </div>
                    </div>
                    <p className="text-xl text-slate-600 font-light tracking-wide">JIS College of Engineering celebration protocol activated</p>
                  </div>
                
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-8">
                                          {[
                        { icon: Calendar, label: "DATE STAMP", value: "SEPTEMBER 5, 2025", color: "from-slate-200 to-blue-200" },
                        { icon: Clock, label: "TIME SYNC", value: "2:00 - 5:00 PM", color: "from-blue-200 to-purple-200" }
                      ].map((item, i) => (
                        <div key={i} className="group flex items-center gap-4 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-slate-300/20 hover:border-slate-400/30 transition-all duration-300 hover:scale-102">
                          <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center group-hover:rotate-6 group-hover:scale-105 transition-all duration-300 shadow-lg shadow-black/20`}>
                            <item.icon className="w-6 h-6 text-slate-700" />
                          </div>
                          <div>
                            <h3 className="text-xs font-bold text-slate-600 tracking-widest mb-1">{item.label}</h3>
                            <p className="text-lg font-bold text-slate-800">{item.value}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                  
                  <div className="space-y-8">
                                          {[
                        { icon: MapPin, label: "LOCATION NODE", value: "MB 306", color: "from-purple-200 to-indigo-200" },
                        { icon: Heart, label: "DRESS PROTOCOL", value: "SMART CASUAL MODE", color: "from-indigo-200 to-blue-200" }
                      ].map((item, i) => (
                        <div key={i} className="group flex items-center gap-4 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-slate-300/20 hover:border-slate-400/30 transition-all duration-300 hover:scale-102">
                          <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center group-hover:rotate-6 group-hover:scale-105 transition-all duration-300 shadow-lg shadow-black/20`}>
                            <item.icon className="w-6 h-6 text-slate-700" />
                          </div>
                          <div>
                            <h3 className="text-xs font-bold text-slate-600 tracking-widest mb-1">{item.label}</h3>
                            <p className="text-lg font-bold text-slate-800">{item.value}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <div className="inline-block p-4 rounded-xl bg-white/15 backdrop-blur-sm border border-slate-300/25">
                    <p className="text-base text-slate-700 leading-relaxed font-medium">
                      Join us for an immersive celebration of educational excellence at JIS College of Engineering. 
                      Honoring our dedicated faculty and celebrating the spirit of teaching and learning.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Holographic Card Generator */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                  HOLOGRAPHIC
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
                  GENERATOR
                </span>
              </h2>
              <p className="text-lg text-slate-400 font-light">
                Generate your personalized quantum appreciation certificate
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Optimized Generator Interface with Off-White Bluish Purple */}
              <div className="space-y-6">
                <Card className="relative overflow-hidden bg-gradient-to-br from-slate-100/40 via-blue-100/30 to-purple-100/40 backdrop-blur-xl border border-slate-300/25 shadow-xl shadow-black/20">
                  {/* Glass Effect Overlay */}
                  <div className="absolute inset-0 bg-white/8 backdrop-blur-sm"></div>
                  
                  <CardContent className="relative z-10 p-6">
                    <div className="space-y-8">
                      <div className="relative">
                        <label className="block text-xl font-black text-slate-800 mb-6 tracking-wider">
                          TEACHER NAME INPUT
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter teacher's name..."
                          value={teacherName}
                          onChange={(e) => handleNameChange(e.target.value)}
                          className={`bg-white/20 backdrop-blur-sm border-2 ${
                            isVerified 
                              ? 'border-green-400/50 focus:border-green-300/70' 
                              : verificationMessage && !isVerified 
                                ? 'border-red-400/50 focus:border-red-300/70'
                                : 'border-slate-300/50 focus:border-blue-400/50'
                          } text-slate-800 placeholder-slate-500 text-lg py-4 px-6 rounded-2xl transition-all duration-500 focus:ring-2 focus:ring-blue-400/20`}
                        />
                        
                        {/* Verification Status */}
                        {verificationMessage && (
                          <div className={`mt-4 text-base font-bold tracking-wider p-3 rounded-xl backdrop-blur-sm ${
                            isVerified 
                              ? 'text-green-400 bg-green-400/10 border border-green-400/20' 
                              : 'text-red-400 bg-red-400/10 border border-red-400/20'
                          }`}>
                            {verificationMessage}
                          </div>
                        )}
                        
                        {/* Optimized Suggestions Dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                          <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border border-slate-300/25 rounded-xl shadow-xl shadow-black/20 z-50 max-h-60 overflow-y-auto">
                            {suggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => selectSuggestion(suggestion)}
                                className="w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-100/50 transition-all duration-200 first:rounded-t-xl last:rounded-b-xl border-b border-slate-200/50 last:border-b-0 font-medium"
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
                        className={`w-full font-black py-6 rounded-2xl text-lg transition-all duration-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-2xl ${
                          isVerified 
                            ? 'bg-gradient-to-r from-green-600 via-blue-600 to-cyan-600 hover:from-green-700 hover:via-blue-700 hover:to-cyan-700 shadow-green-500/30 hover:shadow-green-500/50' 
                            : 'bg-gradient-to-r from-slate-600 to-slate-700 shadow-slate-500/30'
                        }`}
                      >
                        {isGenerating ? (
                          <div className="flex items-center gap-4">
                            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                            PREPARING YOUR CARD...
                          </div>
                        ) : !isVerified ? (
                          <div className="flex items-center gap-3">
                            <Shield className="w-6 h-6" />
                            VERIFICATION REQUIRED
                          </div>
                        ) : (
                          <div className="flex items-center gap-4">
                            <Download className="w-7 h-7" />
                            DOWNLOAD YOUR CARD
                          </div>
                        )}
                      </Button>
                      
                      {/* Optimized Teacher Count Info */}
                      <div className="text-center p-3 rounded-xl bg-white/15 backdrop-blur-sm border border-slate-300/25">
                        <p className="text-sm text-slate-600 font-medium">
                          <span className="text-blue-600 font-bold text-base">{approvedTeachers.length}</span> CSE faculty members in database
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Optimized Holographic Preview with Off-White Bluish Purple */}
              <div className="relative">
                <Card 
                  ref={cardRef}
                  className={`relative overflow-hidden aspect-[4/3] bg-gradient-to-br from-slate-100/40 via-blue-100/30 to-purple-100/40 backdrop-blur-xl border ${
                    isVerified ? 'border-green-400/30 shadow-green-400/20' : 'border-slate-300/25 shadow-blue-300/15'
                  } shadow-xl transform hover:scale-102 transition-all duration-300 overflow-hidden ${
                    showCelebration ? 'animate-pulse scale-102' : ''
                  }`}
                >
                  {/* Glass Effect Overlay */}
                  <div className="absolute inset-0 bg-white/8 backdrop-blur-sm"></div>
                  
                  {teacherName && isVerified ? (
                    <div className="h-full w-full relative z-10">
                      {/* Success overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-transparent to-cyan-400/10 z-10 pointer-events-none"></div>
                      
                      <img 
                        src={getTeacherCardPath(teacherName)}
                        alt={`${teacherName} Teachers Day Card`}
                        className="w-full h-full object-cover rounded-2xl transition-all duration-500"
                        onError={(e) => {
                          // Fallback if image doesn't exist
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      
                                              {/* Enhanced Fallback content */}
                        <div className="hidden h-full flex flex-col justify-center items-center text-center p-8 relative z-10">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 via-transparent to-purple-200/30 rounded-2xl"></div>
                          <div className="space-y-6 relative z-10">
                            <div className="text-8xl mb-6 animate-bounce">🎉</div>
                            <h3 className="text-4xl font-black text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                              CONGRATULATIONS!
                            </h3>
                            <p className="text-2xl font-bold text-slate-800">
                              {teacherName}
                            </p>
                            <p className="text-xl text-blue-600 font-semibold">
                              🎁 Your surprise card is ready!
                            </p>
                          </div>
                        </div>
                    </div>
                  ) : (
                    <CardContent className="h-full flex flex-col justify-center items-center text-center p-8 relative z-10">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 via-transparent to-purple-200/20 animate-pulse rounded-2xl"></div>
                      <div className="absolute inset-4 border border-slate-300/30 rounded-2xl animate-pulse"></div>
                      
                      <div className="space-y-8 relative z-10">
                        <div className="text-center">
                          <div className="text-8xl mb-8 animate-bounce">🎁</div>
                          <h3 className="text-5xl md:text-6xl font-black text-transparent bg-gradient-to-r from-slate-700 to-blue-600 bg-clip-text mb-6">
                            WELCOME
                          </h3>
                          <p className="text-xl font-bold text-slate-600 tracking-widest">
                            🎯 CSE TEACHER'S DAY
                          </p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-2xl text-slate-600 font-medium tracking-wide animate-pulse">
                            ✨ Fill the form above
                          </p>
                          <p className="text-3xl text-blue-600 font-bold tracking-wide animate-bounce">
                            to get a SURPRISE! 🎉✨
                          </p>
                        </div>
                        
                        <div className="flex justify-center items-center gap-6 text-slate-600 pt-6">
                          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-blue-400"></div>
                          <span className="text-xl font-bold tracking-widest">🎓 JIS CSE TEACHER'S DAY 2025</span>
                          <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-blue-400"></div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Footer with Purple-Blue Theme */}
        <footer className="relative bg-gradient-to-r from-purple-900/80 via-blue-900/60 to-purple-900/80 backdrop-blur-xl border-t border-blue-400/30 py-12 mt-16">
          {/* Glass Effect Overlay */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-black text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300 bg-clip-text">
                JIS COLLEGE OF ENGINEERING 2025
              </span>
            </div>
            <div className="inline-block p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-blue-300/30 mb-8">
              <p className="text-blue-200 text-lg font-medium">
                Celebrating excellence in Computer Science education
              </p>
            </div>
            <div className="flex justify-center items-center gap-8">
              <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50"></div>
              <span className="text-xl text-blue-200 tracking-wider font-medium">SYSTEM ONLINE</span>
              <div className="w-4 h-4 bg-purple-400 rounded-full animate-pulse delay-300 shadow-lg shadow-purple-400/50"></div>
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
        
        @keyframes float-orb {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1); 
            opacity: 0.15;
          }
          25% { 
            transform: translateY(-25px) translateX(15px) scale(1.05); 
            opacity: 0.2;
          }
          50% { 
            transform: translateY(-40px) translateX(-8px) scale(0.95); 
            opacity: 0.25;
          }
          75% { 
            transform: translateY(-15px) translateX(-20px) scale(1.02); 
            opacity: 0.18;
          }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.4); }
          50% { box-shadow: 0 0 35px rgba(0, 212, 255, 0.6); }
        }
      `}</style>
    </div>
  );
}
