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
      // Get the PNG file path
      const pngPath = getTeacherCardPath(teacherName);
      
      // Create a temporary link to download the PNG file
      const link = document.createElement('a');
      link.href = pngPath;
      link.download = `teachers-day-${teacherName.replace(/\s+/g, '-').toLowerCase()}.png`;
      
      // Trigger the download
      link.click();
      
      setIsGenerating(false);
      
      // Stop celebration effect after 1 minute
      setTimeout(() => {
        setShowCelebration(false);
      }, 60000);
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
        
        {/* Floating Orbs */}
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 md:mb-6 leading-tight">
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
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-300 mb-2 md:mb-3 px-4">
                COMPUTER SCIENCE AND ENGINEERING
              </h2>
              <div className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto"></div>
            </div>
            
            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed font-light px-4">
              Celebrating excellence in education at <span className="text-blue-400 font-semibold">JIS College of Engineering</span>. 
              Honoring our dedicated <span className="text-blue-400 font-semibold">Computer Science and Engineering</span> faculty who shape the future of technology and innovation.
            </p>

            {/* Optimized Feature Cards with Off-White Bluish Purple */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16 px-4">
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
                  
                  <CardContent className="relative z-10 p-4 md:p-6 text-center">
                    <div className={`w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center group-hover:rotate-6 group-hover:scale-105 transition-all duration-300 shadow-lg shadow-black/20`}>
                      <item.icon className="w-6 h-6 md:w-7 md:h-7 text-slate-700" />
                    </div>
                    <h3 className="text-base md:text-lg font-black text-slate-800 mb-2 tracking-wider group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">{item.title}</h3>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">{item.desc}</p>
                    
                    {/* Hover Effect Line */}
                    <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-3 transition-all duration-300"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Video Showcase Section */}
        <section className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 md:mb-4 px-4">
                <span className="bg-gradient-to-r from-slate-700 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  VIDEO SHOWCASE
                </span>
              </h2>
              <p className="text-base md:text-lg text-slate-300 font-light px-4">
                Experience the celebration through our <span className="text-blue-400 font-semibold">Special Tribute Video</span> 
              </p>
            </div>
            
            <Card className="relative overflow-hidden bg-gradient-to-br from-slate-100/40 via-blue-100/30 to-purple-100/40 backdrop-blur-xl border border-slate-300/25 shadow-xl shadow-black/20">
              {/* Glass Effect Overlay */}
              <div className="absolute inset-0 bg-white/8 backdrop-blur-sm"></div>
              
              <CardContent className="relative z-10 p-4 md:p-8">
                <div className="text-center mb-6 md:mb-8">
                  <div className="inline-flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                      </svg>
                    </div>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-black text-transparent bg-gradient-to-r from-slate-700 to-blue-600 bg-clip-text">
                      TEACHERS DAY TRIBUTE 2025
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-slate-600 font-medium px-4">
                    A heartfelt celebration of our dedicated educators at JIS College of Engineering
                  </p>
                </div>
                
                {/* Enhanced Video Player */}
                <div className="relative group">
                  <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-slate-200 to-blue-100 border-2 border-slate-300/30 shadow-2xl shadow-black/20">
                    <video 
                      id="teachersDayVideo"
                      className="w-full h-full object-cover"
                      preload="metadata"
                      crossOrigin="anonymous"
                      onError={(e) => {
                        console.error('Video error:', e);
                        const target = e.target as HTMLVideoElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    >
                      <source src="/teachers-day-video.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Fallback if video fails to load */}
                    <div className="hidden absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-200 to-blue-100">
                      <div className="text-center p-8">
                        <div className="text-6xl mb-4">🎬</div>
                        <h3 className="text-xl font-bold text-slate-700 mb-2">Video Unavailable</h3>
                        <p className="text-slate-600">The video file could not be loaded.</p>
                        <p className="text-sm text-slate-500 mt-2">Please check the file path: /teachers-day-video.mp4</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Availability Overlay */}
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-20">
                    <div className="text-center p-6 md:p-8 max-w-md mx-auto">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-2xl shadow-blue-500/30">
                        <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-xl md:text-2xl font-black text-white mb-3 md:mb-4">
                        🎬 VIDEO COMING SOON
                      </h3>
                      <p className="text-lg md:text-xl text-blue-200 font-bold mb-2 md:mb-3">
                        This Surprise will be Available
                      </p>
                      <p className="text-2xl md:text-3xl text-yellow-300 font-black tracking-wider">
                        on 5 Sept onwards
                      </p>
                      <div className="mt-4 md:mt-6 p-3 md:p-4 bg-white/10 rounded-xl border border-white/20">
                        <p className="text-sm md:text-base text-white/90 font-medium">
                          Stay tuned for our special Teachers Day tribute video!
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Custom Play Button Overlay */}
                  <div 
                    id="playButtonOverlay"
                    className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-black/50 z-10"
                    onClick={() => {
                      const video = document.getElementById('teachersDayVideo') as HTMLVideoElement;
                      const overlay = document.getElementById('playButtonOverlay');
                      if (video && overlay) {
                        video.play().then(() => {
                          overlay.style.display = 'none';
                        }).catch((error) => {
                          console.error('Video play error:', error);
                        });
                      }
                    }}
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-black/40 transform hover:scale-110 transition-all duration-300">
                      <svg className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    
                    {/* Play Button Text */}
                    <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 text-center px-4">
                      <p className="text-white font-bold text-base md:text-xl mb-1 md:mb-2">Click to Play</p>
                      <p className="text-white/90 text-sm md:text-base">Teachers Day Tribute Video</p>
                    </div>
                  </div>
                  
                  {/* Video Controls Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-3">
                        <button 
                          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                          onClick={() => {
                            const video = document.getElementById('teachersDayVideo') as HTMLVideoElement;
                            const overlay = document.getElementById('playButtonOverlay');
                            if (video) {
                              video.pause();
                              if (overlay) overlay.style.display = 'flex';
                            }
                          }}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <span className="text-sm font-medium">Teachers Day Video</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs opacity-75">3:45</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="mt-4 md:mt-6 p-3 md:p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-slate-300/20">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <h4 className="text-base md:text-lg font-bold text-slate-800">Teachers Day Celebration</h4>
                      <span className="text-xs md:text-sm text-slate-600 bg-slate-200/50 px-2 md:px-3 py-1 rounded-full self-start sm:self-auto">HD Quality</span>
                    </div>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                      Watch our special tribute video showcasing the dedication, passion, and excellence of our Computer Science faculty. 
                      This video captures the spirit of teaching and learning at JIS College of Engineering.
                    </p>
                    
                    {/* Video Stats */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-6 mt-3 md:mt-4 pt-3 md:pt-4 border-t border-slate-300/20">
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3 md:w-4 md:h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs md:text-sm text-slate-600">Duration: 3:45</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3 md:w-4 md:h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs md:text-sm text-slate-600">CSE Faculty Featured</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Call to Action */}
                <div className="mt-6 md:mt-8 text-center">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2 md:py-3 px-6 md:px-8 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 text-sm md:text-base">
                    <svg className="w-4 h-4 md:w-5 md:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                    </svg>
                    Watch Full Video
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Optimized Event Invitation with Off-White Bluish Purple */}
        <section className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-5xl mx-auto">
            <Card className="relative overflow-hidden bg-gradient-to-br from-slate-100/40 via-blue-100/30 to-purple-100/40 backdrop-blur-xl border border-slate-300/25 shadow-xl shadow-black/20">
              {/* Glass Effect Overlay */}
              <div className="absolute inset-0 bg-white/8 backdrop-blur-sm"></div>
              
              <CardContent className="relative z-10 p-4 md:p-8">
                                  <div className="text-center mb-6 md:mb-10">
                    <div className="inline-flex items-center gap-2 md:gap-4 mb-4 md:mb-6">
                      <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r from-slate-200 to-blue-200 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-blue-300/30">
                        <Users className="w-4 h-4 md:w-6 md:h-6 text-slate-700" />
                      </div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-slate-700 via-blue-600 to-purple-600 bg-clip-text">
                        TEACHERS DAY INVITATION
                      </h2>
                      <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r from-blue-200 to-purple-200 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-purple-300/30">
                        <Users className="w-4 h-4 md:w-6 md:h-6 text-slate-700" />
                      </div>
                    </div>
                    <p className="text-base md:text-xl text-slate-500 font-light tracking-wide px-4">Get Ready to Celebrate The Auspicious Event on <span className="text-blue-400 font-semibold">Teachers Day 2025</span></p>
                  </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
                  <div className="space-y-6 md:space-y-8">
                                          {[
                        { icon: Calendar, label: "DATE STAMP", value: "SEPTEMBER 5, 2025", color: "from-slate-200 to-blue-200" },
                        { icon: Clock, label: "TIME SYNC", value: "2:00 - 4:00 PM", color: "from-blue-200 to-purple-200" }
                      ].map((item, i) => (
                        <div key={i} className="group flex items-center gap-3 md:gap-4 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-slate-300/20 hover:border-slate-400/30 transition-all duration-300 hover:scale-102">
                          <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center group-hover:rotate-6 group-hover:scale-105 transition-all duration-300 shadow-lg shadow-black/20`}>
                            <item.icon className="w-5 h-5 md:w-6 md:h-6 text-slate-700" />
                          </div>
                          <div>
                            <h3 className="text-xs font-bold text-slate-600 tracking-widest mb-1">{item.label}</h3>
                            <p className="text-base md:text-lg font-bold text-slate-800">{item.value}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                  
                  <div className="space-y-6 md:space-y-8">
                                          {[
                        { icon: MapPin, label: "LOCATION ", value: "MB 306", color: "from-purple-200 to-indigo-200" },
                        { icon: Heart, label: "ORGANIZERS", value: "CSE FAMILY", color: "from-indigo-200 to-blue-200" }
                      ].map((item, i) => (
                        <div key={i} className="group flex items-center gap-3 md:gap-4 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-slate-300/20 hover:border-slate-400/30 transition-all duration-300 hover:scale-102">
                          <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center group-hover:rotate-6 group-hover:scale-105 transition-all duration-300 shadow-lg shadow-black/20`}>
                            <item.icon className="w-5 h-5 md:w-6 md:h-6 text-slate-700" />
                          </div>
                          <div>
                            <h3 className="text-xs font-bold text-slate-600 tracking-widest mb-1">{item.label}</h3>
                            <p className="text-base md:text-lg font-bold text-slate-800">{item.value}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <div className="inline-block p-4 rounded-xl bg-white/15 backdrop-blur-sm border border-slate-300/25">
                    <p className="text-base text-slate-700 leading-relaxed font-medium">
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
        <section className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 md:mb-4 px-4">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                  INVITATION 
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
                  GENERATOR
                </span>
              </h2>
              <p className="text-base md:text-lg text-slate-400 font-light px-4">
                Generate your personalized <span className="text-blue-400 font-semibold">Teachers Day Invitation</span>
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Optimized Generator Interface with Off-White Bluish Purple */}
              <div className="space-y-6">
                <Card className="relative overflow-hidden bg-gradient-to-br from-slate-100/40 via-blue-100/30 to-purple-100/40 backdrop-blur-xl border border-slate-300/25 shadow-xl shadow-black/20">
                  {/* Glass Effect Overlay */}
                  <div className="absolute inset-0 bg-white/8 backdrop-blur-sm"></div>
                  
                  <CardContent className="relative z-10 p-4 md:p-6">
                    <div className="space-y-6 md:space-y-8">
                      <div className="relative">
                        <label className="block text-lg md:text-xl font-black text-slate-800 mb-4 md:mb-6 tracking-wider">
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
                          } text-slate-800 placeholder-slate-500 text-base md:text-lg py-3 md:py-4 px-4 md:px-6 rounded-xl md:rounded-2xl transition-all duration-500 focus:ring-2 focus:ring-blue-400/20`}
                        />
                        
                        {/* Verification Status */}
                        {verificationMessage && (
                          <div className={`mt-3 md:mt-4 text-sm md:text-base font-bold tracking-wider p-2 md:p-3 rounded-lg md:rounded-xl backdrop-blur-sm ${
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
                        className={`w-full font-black py-4 md:py-6 rounded-xl md:rounded-2xl text-base md:text-lg transition-all duration-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-2xl ${
                          isVerified 
                            ? 'bg-gradient-to-r from-green-600 via-blue-600 to-cyan-600 hover:from-green-700 hover:via-blue-700 hover:to-cyan-700 shadow-green-500/30 hover:shadow-green-500/50' 
                            : 'bg-gradient-to-r from-slate-600 to-slate-700 shadow-slate-500/30'
                        }`}
                      >
                        {isGenerating ? (
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-5 h-5 md:w-6 md:h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-sm md:text-base">PREPARING YOUR CARD...</span>
                          </div>
                        ) : !isVerified ? (
                          <div className="flex items-center gap-2 md:gap-3">
                            <Shield className="w-5 h-5 md:w-6 md:h-6" />
                            <span className="text-sm md:text-base">VERIFICATION REQUIRED</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3 md:gap-4">
                            <Download className="w-6 h-6 md:w-7 md:h-7" />
                            <span className="text-sm md:text-base">DOWNLOAD YOUR CARD</span>
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
                      
                                              <div className="space-y-6 relative z-10">
                          <div className="text-center">
                            <div className="text-6xl mb-6 animate-bounce">🎁</div>
                            <h3 className="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-slate-700 to-blue-600 bg-clip-text mb-4">
                              WELCOME
                            </h3>
                            <p className="text-lg md:text-xl font-bold text-slate-600 tracking-widest mb-2">
                              🎯 CSE TEACHER'S DAY
                            </p>
                          </div>
                          
                          <div className="space-y-3">
                            <p className="text-lg md:text-xl text-slate-600 font-medium tracking-wide animate-pulse">
                              ✨ Fill the form above
                            </p>
                            <p className="text-xl md:text-2xl text-blue-600 font-bold tracking-wide animate-bounce">
                              to get a SURPRISE! 🎉✨
                            </p>
                          </div>
                          
                          <div className="flex justify-center items-center gap-4 text-slate-600 pt-4">
                            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-blue-400"></div>
                            <span className="text-sm md:text-base font-bold tracking-widest">🎓 JIS CSE TEACHER'S DAY 2025</span>
                            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-blue-400"></div>
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
        <footer className="relative bg-gradient-to-r from-slate-900 via-blue-950 to-black backdrop-blur-xl py-12 md:py-16 mt-16 md:mt-20 overflow-hidden">
          {/* Glass Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/3 to-transparent backdrop-blur-sm"></div>
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 via-blue-400 to-transparent opacity-80"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 via-cyan-500 to-transparent opacity-80"></div>
            <div className="absolute top-1/2 left-0 w-1 h-32 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-60 transform -translate-y-1/2"></div>
            <div className="absolute top-1/2 right-0 w-1 h-32 bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-60 transform -translate-y-1/2"></div>
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            {/* Main Logo and Title */}
            <div className="flex justify-center items-center gap-3 md:gap-6 mb-6 md:mb-8">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-r from-cyan-500 via-blue-600 to-blue-700 rounded-2xl md:rounded-3xl flex items-center justify-center shadow-2xl shadow-cyan-500/50 transform hover:scale-110 transition-all duration-300">
                <BookOpen className="w-5 h-5 md:w-7 md:h-7 text-white" />
              </div>
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-blue-400 bg-clip-text">
                JIS COLLEGE OF ENGINEERING 2025
              </span>
            </div>
            
            {/* Enhanced Description */}
            <div className="inline-block p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-r from-cyan-500/10 via-blue-500/15 to-blue-600/10 backdrop-blur-sm border border-cyan-400/50 mb-8 md:mb-10 shadow-xl shadow-cyan-500/30">
              <p className="text-cyan-100 text-base md:text-xl font-medium mb-2">
                🎓 Celebrating excellence in Computer Science education
              </p>
              <p className="text-blue-200 text-sm md:text-base font-light">
                Shaping the future of technology and innovation
              </p>
            </div>
                        <div className="flex justify-center items-center gap-4 md:gap-8 mb-6 md:mb-8">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/60"></div>
              <span className="text-base md:text-xl text-cyan-200 tracking-wider font-medium">SYSTEM ONLINE</span>
              <div className="w-3 h-3 md:w-4 md:h-4 bg-blue-400 rounded-full animate-pulse delay-300 shadow-lg shadow-blue-400/60"></div>
            </div>
            
            {/* Copyright and Links */}
            <div className="pt-6 md:pt-8 border-t border-cyan-400/30">
              <p className="text-sm md:text-base text-cyan-200 font-light mb-2">
                © 2025 JIS College of Engineering. All rights reserved.
              </p>
              <p className="text-xs md:text-sm text-blue-300/70 font-light">
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
