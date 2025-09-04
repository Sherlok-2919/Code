"use client";

import { useState, useRef, useEffect } from 'react';
import { Download, Heart, BookOpen, Award, Users, Calendar, MapPin, Clock, Zap, Star, Cpu, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { approvedTeachers, isTeacherApproved } from '@/data/teachers';
import confetti from 'canvas-confetti';

const getTeacherCardPath = (teacherName: string): string => {
  return `/data/cards/${teacherName}.png`;
};

// Enhanced confetti celebration
const triggerConfettiCelebration = () => {
  // Multiple confetti bursts
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: NodeJS.Timeout = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // Left side burst
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#00d4ff', '#0099cc', '#66e0ff', '#33ccff', '#0066ff']
    });

    // Right side burst
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#00d4ff', '#0099cc', '#66e0ff', '#33ccff', '#0066ff']
    });

    // Center burst
    confetti({
      ...defaults,
      particleCount: particleCount * 2,
      origin: { x: 0.5, y: 0.3 },
      colors: ['#00d4ff', '#0099cc', '#66e0ff', '#33ccff', '#0066ff', '#ffffff']
    });
  }, 250);
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
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    setIsMobile(window.innerWidth <= 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      // Mobile-friendly alert
      alert('Please enter a valid teacher name from the approved list!');
      return;
    }

    setIsGenerating(true);
    setShowCelebration(true); // Show celebration effect when generating
    
    try {
      // Get the PNG file path
      const pngPath = getTeacherCardPath(teacherName);
      
      // Use the state-based mobile detection
      
      if (isMobile) {
        // For mobile devices, try to open in new tab first, then fallback to download
        try {
          // First attempt: Try to open in new tab (works on most mobile browsers)
          const newWindow = window.open(pngPath, '_blank');
          
          if (newWindow) {
            // If new tab opened successfully, show success message
            setTimeout(() => {
              alert('Card opened in new tab! You can save it by long-pressing the image.');
              setIsGenerating(false);
            }, 2000);
          } else {
            // Fallback to download method
            triggerDownload(pngPath);
          }
        } catch (error) {
          // Fallback to download method if new tab fails
          triggerDownload(pngPath);
        }
      } else {
        // For desktop, use direct download
        triggerDownload(pngPath);
      }
      
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download the card. Please try again.');
      setIsGenerating(false);
    }
  };

  const triggerDownload = (pngPath: string) => {
    setTimeout(() => {
      try {
        // Create a temporary link to download the PNG file
        const link = document.createElement('a');
        link.href = pngPath;
        link.download = `teachers-day-${teacherName.replace(/\s+/g, '-').toLowerCase()}.png`;
        link.target = '_blank'; // Open in new tab as fallback
        
        // Add to DOM, click, then remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setIsGenerating(false);
        
        // Show success message
        setTimeout(() => {
          alert('Card downloaded successfully! 🎉');
        }, 500);
        
        // Stop celebration effect after 1 minute
        setTimeout(() => {
          setShowCelebration(false);
        }, 60000);
        
      } catch (error) {
        console.error('Download trigger error:', error);
        alert('Download failed. Please try right-clicking and "Save image as..."');
        setIsGenerating(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Enhanced Background with Moving Elements */}
      <div className="fixed inset-0 opacity-20">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900"></div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }}></div>
        </div>
        
        {/* Floating Orbs - Client Side Only */}
        {isMounted && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full blur-2xl opacity-25"
                style={{
                  width: `${100 + Math.random() * 200}px`,
                  height: `${100 + Math.random() * 200}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: `radial-gradient(circle, ${i % 2 === 0 ? '#00d4ff' : '#3b82f6'} 0%, transparent 70%)`,
                  animation: `float-orb ${12 + Math.random() * 8}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 4}s`,
                  filter: `drop-shadow(0 0 20px ${i % 2 === 0 ? '#00d4ff' : '#3b82f6'}) drop-shadow(0 0 40px ${i % 2 === 0 ? '#00d4ff' : '#3b82f6'})`,
                  boxShadow: `0 0 30px ${i % 2 === 0 ? '#00d4ff' : '#3b82f6'}, 0 0 60px ${i % 2 === 0 ? '#00d4ff' : '#3b82f6'}`
                }}
              />
            ))}
          </div>
        )}
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

      {/* Enhanced Floating Particles - Client Side Only */}
      {isMounted && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-8 md:py-12 text-center">
          <div className="max-w-5xl mx-auto">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-1 md:gap-2 bg-gradient-to-r from-slate-900/80 to-blue-900/80 backdrop-blur-xl border border-blue-500/30 text-blue-300 px-4 md:px-6 py-2 rounded-full text-xs font-bold mb-6 md:mb-8 hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/20">
              <Zap className="w-3 h-3 md:w-4 md:h-4 animate-pulse" />
              <span className="text-xs md:text-xs">JIS COLLEGE OF ENGINEERING</span>
              <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-blue-400 rounded-full animate-ping"></div>
            </div>
            
            {/* Main Title */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 md:mb-6 leading-tight px-2">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-600 bg-clip-text text-transparent animate-pulse">
                HAPPY TEACHERS'
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
                DAY 2K25
              </span>
            </h1>
            
            {/* Subtitle */}
            <div className="relative mb-6 md:mb-10">
              <h2 className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-slate-300 mb-2 md:mb-3 px-2">
                COMPUTER SCIENCE AND ENGINEERING
              </h2>
              <div className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto"></div>
            </div>
            
            {/* Description */}
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-slate-400 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed font-light px-2">
              Celebrating excellence in education at <span className="text-blue-400 font-semibold">JIS College of Engineering</span>. 
              Honoring our dedicated <span className="text-blue-400 font-semibold">Computer Science and Engineering</span> faculty who shape the future of technology and innovation.
            </p>

            {/* Optimized Feature Cards with Off-White Bluish Purple */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-12 md:mb-16 px-2">
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
                  
                  <CardContent className="relative z-10 p-3 sm:p-4 md:p-6 text-center">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center group-hover:rotate-6 group-hover:scale-105 transition-all duration-300 shadow-lg shadow-black/20`}>
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-slate-700" />
                    </div>
                    <h3 className="text-sm sm:text-base md:text-lg font-black text-slate-800 mb-1 sm:mb-2 tracking-wider group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">{item.title}</h3>
                    <p className="text-xs sm:text-xs md:text-sm text-slate-600 leading-relaxed font-medium">{item.desc}</p>
                    
                    {/* Hover Effect Line */}
                    <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-3 transition-all duration-300"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>


        {/* Optimized Event Invitation with Off-White Bluish Purple */}
        <section className="container mx-auto px-2 sm:px-4 py-6 sm:py-8 md:py-12">
          <div className="max-w-5xl mx-auto">
            <Card className="relative overflow-hidden bg-gradient-to-br from-slate-100/40 via-blue-100/30 to-purple-100/40 backdrop-blur-xl border border-slate-300/25 shadow-xl shadow-black/20">
              {/* Glass Effect Overlay */}
              <div className="absolute inset-0 bg-white/8 backdrop-blur-sm"></div>
              
              <CardContent className="relative z-10 p-3 sm:p-4 md:p-8">
                                  <div className="text-center mb-4 sm:mb-6 md:mb-10">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2 md:gap-4 mb-3 sm:mb-4 md:mb-6">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 bg-gradient-to-r from-slate-200 to-blue-200 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-blue-300/30">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-slate-700" />
                      </div>
                      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-transparent bg-gradient-to-r from-slate-700 via-blue-600 to-purple-600 bg-clip-text text-center">
                        TEACHERS DAY INVITATION
                      </h2>
                      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 bg-gradient-to-r from-blue-200 to-purple-200 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-purple-300/30">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-slate-700" />
                      </div>
                    </div>
                    <p className="text-sm sm:text-base md:text-xl text-slate-500 font-light tracking-wide px-2">Get Ready to Celebrate The Auspicious Event on <span className="text-blue-400 font-semibold">Teachers Day 2025</span></p>
                  </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-10">
                  <div className="space-y-4 sm:space-y-6 md:space-y-8">
                                          {[
                        { icon: Calendar, label: "DATE STAMP", value: "SEPTEMBER 5, 2025", color: "from-slate-200 to-blue-200" },
                        { icon: Clock, label: "TIME SYNC", value: "2:00 - 4:00 PM", color: "from-blue-200 to-purple-200" }
                      ].map((item, i) => (
                        <div key={i} className="group flex items-center gap-2 sm:gap-3 md:gap-4 p-2 sm:p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-slate-300/20 hover:border-slate-400/30 transition-all duration-300 hover:scale-102">
                          <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center group-hover:rotate-6 group-hover:scale-105 transition-all duration-300 shadow-lg shadow-black/20`}>
                            <item.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-slate-700" />
                          </div>
                          <div>
                            <h3 className="text-xs font-bold text-slate-600 tracking-widest mb-1">{item.label}</h3>
                            <p className="text-sm sm:text-base md:text-lg font-bold text-slate-800">{item.value}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                  
                  <div className="space-y-4 sm:space-y-6 md:space-y-8">
                                          {[
                        { icon: MapPin, label: "LOCATION ", value: "MB 306", color: "from-purple-200 to-indigo-200" },
                        { icon: Heart, label: "ORGANIZERS", value: "CSE FAMILY", color: "from-indigo-200 to-blue-200" }
                      ].map((item, i) => (
                        <div key={i} className="group flex items-center gap-2 sm:gap-3 md:gap-4 p-2 sm:p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-slate-300/20 hover:border-slate-400/30 transition-all duration-300 hover:scale-102">
                          <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center group-hover:rotate-6 group-hover:scale-105 transition-all duration-300 shadow-lg shadow-black/20`}>
                            <item.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-slate-700" />
                          </div>
                          <div>
                            <h3 className="text-xs font-bold text-slate-600 tracking-widest mb-1">{item.label}</h3>
                            <p className="text-sm sm:text-base md:text-lg font-bold text-slate-800">{item.value}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                
                <div className="mt-6 sm:mt-8 text-center">
                  <div className="inline-block p-3 sm:p-4 rounded-xl bg-white/15 backdrop-blur-sm border border-slate-300/25">
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                      Join us for an immersive celebration of educational excellence at <span className="text-blue-400 font-semibold">CSE Department, JIS College of Engineering</span>. 
                      Honoring our dedicated faculty and celebrating the spirit of teaching and learning.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Holographic Card Generator */}
        <section className="container mx-auto px-2 sm:px-4 py-6 sm:py-8 md:py-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-6 sm:mb-8 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black mb-3 md:mb-4 px-2">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                  INVITATION 
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
                  GENERATOR
                </span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-slate-400 font-light px-2">
                Generate your personalized <span className="text-blue-400 font-semibold">Teachers Day Invitation</span>
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
              {/* Optimized Generator Interface with Off-White Bluish Purple */}
              <div className="space-y-6">
                <Card className="relative overflow-hidden bg-gradient-to-br from-slate-100/40 via-blue-100/30 to-purple-100/40 backdrop-blur-xl border border-slate-300/25 shadow-xl shadow-black/20">
                  {/* Glass Effect Overlay */}
                  <div className="absolute inset-0 bg-white/8 backdrop-blur-sm"></div>
                  
                  <CardContent className="relative z-10 p-3 sm:p-4 md:p-6">
                    <div className="space-y-4 sm:space-y-6 md:space-y-8">
                      <div className="relative">
                        <label className="block text-base sm:text-lg md:text-xl font-black text-slate-800 mb-3 sm:mb-4 md:mb-6 tracking-wider">
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
                          } text-slate-800 placeholder-slate-500 text-sm sm:text-base md:text-lg py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 rounded-xl md:rounded-2xl transition-all duration-500 focus:ring-2 focus:ring-blue-400/20`}
                        />
                        
                        {/* Verification Status */}
                        {verificationMessage && (
                          <div className={`mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base font-bold tracking-wider p-2 sm:p-2 md:p-3 rounded-lg md:rounded-xl backdrop-blur-sm ${
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
                                className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-slate-700 hover:bg-slate-100/50 transition-all duration-200 first:rounded-t-xl last:rounded-b-xl border-b border-slate-200/50 last:border-b-0 font-medium"
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
                        className={`w-full font-black py-3 sm:py-4 md:py-6 rounded-xl md:rounded-2xl text-sm sm:text-base md:text-lg transition-all duration-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-2xl ${
                          isVerified 
                            ? 'bg-gradient-to-r from-green-600 via-blue-600 to-cyan-600 hover:from-green-700 hover:via-blue-700 hover:to-cyan-700 shadow-green-500/30 hover:shadow-green-500/50' 
                            : 'bg-gradient-to-r from-slate-600 to-slate-700 shadow-slate-500/30'
                        }`}
                      >
                        {isGenerating ? (
                          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                            <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-xs sm:text-sm md:text-base">PREPARING YOUR CARD...</span>
                          </div>
                        ) : !isVerified ? (
                          <div className="flex items-center gap-2 sm:gap-2 md:gap-3">
                            <Shield className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                            <span className="text-xs sm:text-sm md:text-base">VERIFICATION REQUIRED</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                            <Download className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                            <span className="text-xs sm:text-sm md:text-base">
                              {isMobile ? 'GET YOUR CARD' : 'DOWNLOAD YOUR CARD'}
                            </span>
                          </div>
                        )}
                      </Button>
                      
                      {/* Mobile Download Instructions */}
                      {isMobile && isVerified && (
                        <div className="text-center p-2 sm:p-3 rounded-lg bg-blue-50/20 backdrop-blur-sm border border-blue-200/30">
                          <p className="text-xs text-blue-700 font-medium">
                            📱 <strong>Mobile Tip:</strong> Tap "GET YOUR CARD" to open the image, then long-press to save it to your device!
                          </p>
                        </div>
                      )}
                      
                      {/* Optimized Teacher Count Info */}
                      <div className="text-center p-2 sm:p-3 rounded-xl bg-white/15 backdrop-blur-sm border border-slate-300/25">
                        <p className="text-xs sm:text-sm text-slate-600 font-medium">
                          <span className="text-blue-600 font-bold text-sm sm:text-base">{approvedTeachers.length}</span> CSE faculty members in database
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
                        <div className="hidden h-full flex flex-col justify-center items-center text-center p-4 sm:p-6 md:p-8 relative z-10">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 via-transparent to-purple-200/30 rounded-2xl"></div>
                          <div className="space-y-3 sm:space-y-4 md:space-y-6 relative z-10">
                            <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-3 sm:mb-4 md:mb-6 animate-bounce">🎉</div>
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                              CONGRATULATIONS!
                            </h3>
                            <p className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800">
                              {teacherName}
                            </p>
                            <p className="text-base sm:text-lg md:text-xl text-blue-600 font-semibold">
                              🎁 Your surprise card is ready!
                            </p>
                          </div>
                        </div>
                    </div>
                  ) : (
                    <CardContent className="h-full flex flex-col justify-center items-center text-center p-4 sm:p-6 md:p-8 relative z-10">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 via-transparent to-purple-200/20 animate-pulse rounded-2xl"></div>
                      <div className="absolute inset-2 sm:inset-3 md:inset-4 border border-slate-300/30 rounded-2xl animate-pulse"></div>
                      
                                              <div className="space-y-3 sm:space-y-4 md:space-y-6 relative z-10">
                          <div className="text-center">
                            <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 md:mb-6 animate-bounce">🎁</div>
                            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-gradient-to-r from-slate-700 to-blue-600 bg-clip-text mb-2 sm:mb-3 md:mb-4">
                              WELCOME
                            </h3>
                            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-slate-600 tracking-widest mb-1 sm:mb-2">
                              🎯 CSE TEACHER'S DAY
                            </p>
                          </div>
                          
                          <div className="space-y-2 sm:space-y-3">
                            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 font-medium tracking-wide animate-pulse">
                              ✨ Fill the form above
                            </p>
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-600 font-bold tracking-wide animate-bounce">
                              to get a SURPRISE! 🎉✨
                            </p>
                          </div>
                          
                          <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 text-slate-600 pt-2 sm:pt-3 md:pt-4">
                            <div className="w-4 sm:w-6 md:w-8 h-0.5 bg-gradient-to-r from-transparent to-blue-400"></div>
                            <span className="text-xs sm:text-sm md:text-base font-bold tracking-widest">🎓 JIS CSE TEACHER'S DAY 2025</span>
                            <div className="w-4 sm:w-6 md:w-8 h-0.5 bg-gradient-to-l from-transparent to-blue-400"></div>
                          </div>
                        </div>
                    </CardContent>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Footer with Crispy Blue-Black Theme */}
        <footer className="relative bg-gradient-to-r from-slate-900 via-blue-950 to-black backdrop-blur-xl py-8 sm:py-10 md:py-12 lg:py-16 mt-12 sm:mt-16 md:mt-20 overflow-hidden">
          {/* Glass Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/3 to-transparent backdrop-blur-sm"></div>
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 via-blue-400 to-transparent opacity-80"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 via-cyan-500 to-transparent opacity-80"></div>
            <div className="absolute top-1/2 left-0 w-1 h-32 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-60 transform -translate-y-1/2"></div>
            <div className="absolute top-1/2 right-0 w-1 h-32 bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-60 transform -translate-y-1/2"></div>
          </div>
          
          <div className="container mx-auto px-2 sm:px-4 text-center relative z-10">
            {/* Main Logo and Title */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-3 md:gap-6 mb-6 sm:mb-6 md:mb-8">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 bg-gradient-to-r from-cyan-500 via-blue-600 to-blue-700 rounded-2xl md:rounded-3xl flex items-center justify-center shadow-2xl shadow-cyan-500/50 transform hover:scale-110 transition-all duration-300">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-white" />
              </div>
              <span className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-black text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-blue-400 bg-clip-text text-center leading-tight">
                JIS COLLEGE OF ENGINEERING 2025
              </span>
            </div>
            
            {/* Enhanced Description */}
            <div className="inline-block p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl bg-gradient-to-r from-cyan-500/10 via-blue-500/15 to-blue-600/10 backdrop-blur-sm border border-cyan-400/50 mb-4 sm:mb-6 md:mb-8 lg:mb-10 shadow-xl shadow-cyan-500/30">
              <p className="text-cyan-100 text-xs sm:text-sm md:text-base lg:text-xl font-medium mb-1 sm:mb-2">
                🎓 Celebrating excellence in Computer Science education
              </p>
              <p className="text-blue-200 text-xs sm:text-xs md:text-sm lg:text-base font-light">
                Shaping the future of technology and innovation
              </p>
            </div>
                        <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 lg:gap-8 mb-3 sm:mb-4 md:mb-6 lg:mb-8">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 lg:w-4 lg:h-4 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/60"></div>
              <span className="text-xs sm:text-sm md:text-base lg:text-xl text-cyan-200 tracking-wider font-medium">SYSTEM ONLINE</span>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 lg:w-4 lg:h-4 bg-blue-400 rounded-full animate-pulse delay-300 shadow-lg shadow-blue-400/60"></div>
            </div>
            
            {/* Copyright and Links */}
            <div className="pt-3 sm:pt-4 md:pt-6 lg:pt-8 border-t border-cyan-400/30">
              <p className="text-xs sm:text-xs md:text-sm lg:text-base text-cyan-200 font-light mb-1 sm:mb-2">
                © 2025 JIS College of Engineering. All rights reserved.
              </p>
              <p className="text-xs sm:text-xs md:text-xs lg:text-sm text-blue-300/70 font-light">
                Computer Science & Engineering Department
              </p>
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
