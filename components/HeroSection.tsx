"use client"

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Button } from "./ui/button";
import {
  ArrowRight,
  Play,
  Award,
  TrendingUp,
  Clock,
  Users,
  Shield,
  CheckCircle,
  Building,
  Calculator,
  FileText,
  BarChart3,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Star,
  Zap,
  Target,
  Globe,
  Linkedin,
  Twitter,
  Facebook,
  ArrowUpRight,
  Ruler,
  HardHat,
} from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

function AnimatedCounter({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

function MouseTracker3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientY - centerY) / 20;
    const y = (centerX - e.clientX) / 20;
    
    setRotation({ x, y });
    setMousePos({ 
      x: ((e.clientX - rect.left) / rect.width) * 100, 
      y: ((e.clientY - rect.top) / rect.height) * 100 
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full perspective-1000"
    >
      {/* 3D Building Construction */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ 
          transformStyle: "preserve-3d",
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
      >
        {/* Main Building Container */}
        <div className="relative" style={{ transformStyle: "preserve-3d", transform: "translateZ(0)" }}>
          {/* Building Layer 1 - Base */}
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2 w-48 h-20 bg-gradient-to-r from-gold/20 to-gold/10 border-2 border-gold/40 rounded-lg"
            style={{ 
              transform: "translateZ(20px) translateY(80px)",
              boxShadow: `0 0 30px ${mousePos.x > 50 ? 'rgba(250, 226, 81, 0.3)' : 'rgba(250, 226, 81, 0.1)'}`,
              transition: "box-shadow 0.3s ease"
            }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          {/* Building Layer 2 */}
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2 w-40 h-24 bg-gradient-to-r from-gold/25 to-gold/15 border-2 border-gold/50 rounded-lg"
            style={{ 
              transform: "translateZ(40px) translateY(50px)",
              boxShadow: `0 0 25px ${mousePos.y > 50 ? 'rgba(250, 226, 81, 0.35)' : 'rgba(250, 226, 81, 0.15)'}`,
              transition: "box-shadow 0.3s ease"
            }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 0.2 }}
          />
          
          {/* Building Layer 3 */}
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2 w-32 h-28 bg-gradient-to-r from-gold/30 to-gold/20 border-2 border-gold/60 rounded-lg"
            style={{ 
              transform: "translateZ(60px) translateY(15px)",
              boxShadow: `0 0 20px ${mousePos.x < 50 ? 'rgba(250, 226, 81, 0.4)' : 'rgba(250, 226, 81, 0.2)'}`,
              transition: "box-shadow 0.3s ease"
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.4 }}
          />
          
          {/* Building Layer 4 - Top */}
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2 w-24 h-32 bg-gradient-to-r from-gold/40 to-gold/30 border-2 border-gold/70 rounded-lg"
            style={{ 
              transform: "translateZ(80px) translateY(-30px)",
              boxShadow: "0 0 40px rgba(250, 226, 81, 0.5)",
            }}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.6 }}
          />
          
          {/* Roof/Spire */}
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2 w-4 h-20 bg-gradient-to-t from-gold to-gold/50"
            style={{ 
              transform: "translateZ(110px) translateY(-80px)",
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              boxShadow: "0 0 50px rgba(250, 226, 81, 0.6)",
            }}
            animate={{ y: [0, -5, 0], scaleY: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Wireframe Lines - Horizontal */}
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={`h-line-${i}`}
              className="absolute left-1/2 -translate-x-1/2 h-px bg-gold/60"
              style={{ 
                width: i % 2 === 0 ? "280px" : "200px",
                transform: `translateZ(${40 + i * 20}px) translateY(${60 - i * 20}px)`,
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
            />
          ))}
          
          {/* Wireframe Lines - Vertical */}
          {[-1, 0, 1].map((i) => (
            <motion.div
              key={`v-line-${i}`}
              className="absolute top-1/2 w-px bg-gold/40"
              style={{ 
                height: "200px",
                left: `calc(50% + ${i * 60}px)`,
                transform: `translateZ(50px) translateY(-40px)`,
              }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ delay: 0.8 + Math.abs(i) * 0.1, duration: 0.5 }}
            />
          ))}
          
          {/* Window Grids on Buildings */}
          <div className="absolute left-1/2 -translate-x-1/2" style={{ transform: "translateZ(85px) translateY(-20px)" }}>
            <div className="grid grid-cols-3 gap-2">
              {[
                { shadow: "0 0 8px", opacity: 0.3, duration: 2.5, delay: 0 },
                { shadow: "0 0 12px", opacity: 0.4, duration: 3, delay: 0.5 },
                { shadow: "0 0 6px", opacity: 0.35, duration: 2.8, delay: 1 },
                { shadow: "0 0 10px", opacity: 0.45, duration: 3.2, delay: 0.3 },
                { shadow: "0 0 14px", opacity: 0.5, duration: 2.6, delay: 0.8 },
                { shadow: "0 0 7px", opacity: 0.32, duration: 3.5, delay: 1.2 },
                { shadow: "0 0 9px", opacity: 0.4, duration: 2.9, delay: 0.6 },
                { shadow: "0 0 11px", opacity: 0.38, duration: 3.1, delay: 0.9 },
                { shadow: "0 0 8px", opacity: 0.42, duration: 2.7, delay: 1.5 },
              ].map((win, i) => (
                <motion.div
                  key={`window-${i}`}
                  className="w-6 h-8 bg-gold/20 border border-gold/50 rounded-sm"
                  style={{
                    boxShadow: `rgba(250, 226, 81, 0.3) ${win.shadow}`,
                  }}
                  animate={{ opacity: [win.opacity, 0.8, win.opacity] }}
                  transition={{ duration: win.duration, repeat: Infinity, delay: win.delay }}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Floating Construction Elements */}
        <motion.div 
          className="absolute top-10 right-10 text-gold/60"
          style={{ transform: `translateZ(100px)` }}
          animate={{ 
            y: [0, -15, 0], 
            rotate: [0, 5, 0],
            x: mousePos.x > 60 ? 10 : 0
          }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <HardHat className="w-12 h-12" />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-20 left-10 text-gold/60"
          style={{ transform: `translateZ(80px)` }}
          animate={{ 
            y: [0, 10, 0], 
            rotate: [0, -5, 0],
            x: mousePos.x < 40 ? -10 : 0
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        >
          <Ruler className="w-10 h-10" />
        </motion.div>
        
        <motion.div 
          className="absolute top-1/3 left-5 text-gold/40"
          style={{ transform: `translateZ(120px)` }}
          animate={{ 
            y: [0, -8, 0],
            x: mousePos.y > 50 ? -5 : 5
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
          <Calculator className="w-8 h-8" />
        </motion.div>
      </motion.div>
      
      {/* Glow Effect Following Mouse */}
      <div 
        className="absolute w-64 h-64 rounded-full pointer-events-none transition-all duration-300"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(250, 226, 81, 0.15) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

export default function HeroSection() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  const y1 = useTransform(scrollY, [0, 800], [0, 200]);
  const y2 = useTransform(scrollY, [0, 800], [0, -200]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const heroStats = [
    { value: "500+", label: "Projects Completed" },
    { value: "25+", label: "Years Experience" },
    { value: "50+", label: "Team Professionals" },
    { value: "98%", label: "Client Satisfaction" },
  ];

  const services = [
    {
      icon: Calculator,
      title: "Quantity Surveying",
      description: "Comprehensive measurement and cost management for construction projects of all sizes.",
      features: ["BOQ Preparation", "Cost Planning", "Site Measurements"]
    },
    {
      icon: BarChart3,
      title: "Cost Management",
      description: "Strategic financial control to keep your project on budget and on track.",
      features: ["Budget Forecasting", "Cost Control", "Value Engineering"]
    },
    {
      icon: FileText,
      title: "Contract Administration",
      description: "Expert management of construction contracts to protect your interests.",
      features: ["Contract Review", "Claims Management", "Dispute Resolution"]
    },
    {
      icon: Target,
      title: "Project Planning",
      description: "Detailed project scheduling and resource allocation for successful delivery.",
      features: ["Program Planning", "Resource Planning", "Risk Assessment"]
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Proactive identification and mitigation of project risks.",
      features: ["Risk Analysis", "Insurance Advisory", "Contingency Planning"]
    },
    {
      icon: TrendingUp,
      title: "Financial Advisory",
      description: "Expert financial consulting to maximize your investment returns.",
      features: ["Feasibility Studies", "Investment Appraisal", "Life Cycle Costing"]
    },
  ];

  const portfolio = [
    {
      title: "Riverside Tower",
      category: "Commercial Development",
      value: "$45M",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
      description: "A 32-story commercial tower featuring premium office spaces and retail outlets."
    },
    {
      title: "Metro Station Extension",
      category: "Infrastructure",
      value: "$120M",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=400&fit=crop",
      description: "Major infrastructure project extending the city's transit network."
    },
    {
      title: "Oakwood Residences",
      category: "Residential",
      value: "$28M",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
      description: "Luxury residential complex with 200+ premium apartments."
    },
  ];

  const testimonials = [
    {
      name: "John Smith",
      role: "CEO, ABC Construction",
      content: "JBLM QS transformed our cost management process. Their expertise saved us over 15% on our last three projects.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
    },
    {
      name: "Sarah Johnson",
      role: "Project Director, City Transit",
      content: "Professional, thorough, and always available. JBLM QS is our trusted partner for all major infrastructure projects.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    {
      name: "Michael Chen",
      role: "MD, Oakwood Properties",
      content: "Their attention to detail and financial acumen helped us maximize value on every project. Highly recommended!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
  ];

  const clients = [
    "ABC Construction", "City Transit Authority", "Oakwood Properties",
    "Metro Developments", "Skyline Corp", "Urban Projects Inc"
  ];

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-black">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            style={{ y: y1 }}
            className="absolute top-20 left-10 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px]"
          />
          <motion.div
            style={{ y: y2 }}
            className="absolute bottom-20 right-10 w-[800px] h-[800px] bg-gold/10 rounded-full blur-[200px]"
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gold/5 rounded-full blur-[250px]"
          />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 pattern-grid opacity-30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left Content - Text */}
            <motion.div variants={fadeInUp} className="text-center lg:text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-8"
              >
                <Zap className="w-4 h-4 text-gold" />
                <span className="text-sm text-gold font-medium">
                  Precision in Every Measurement
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
              >
                Building
                <br />
                <span className="gradient-gold-text">Success</span>
                <br />
                Through Precision
              </motion.h1>

              {/* Subheading */}
              <motion.p
                variants={fadeInUp}
                className="mt-6 text-lg sm:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0"
              >
                JBLM Quantity Surveyors delivers expert cost management, 
                strategic planning, and comprehensive construction consulting 
                to transform your vision into reality.
              </motion.p>

              {/* Stats Grid */}
              <motion.div 
                variants={fadeInUp}
                className="mt-10 grid grid-cols-2 gap-6"
              >
                {heroStats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="text-center lg:text-left"
                  >
                    <p className="text-4xl lg:text-5xl font-bold text-gold">{stat.value}</p>
                    <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Success Rate Bar */}
              <motion.div 
                variants={fadeInUp}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Project Success Rate</span>
                  <span className="text-gold font-bold">98.5%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "98.5%" }}
                    transition={{ duration: 2, delay: 1 }}
                    className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
                  />
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeInUp}
                className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link href="#contact">
                  <Button size="lg" className="btn-gold w-full sm:w-auto text-lg px-8 py-6">
                    Get Free Consultation
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button variant="outline" size="lg" className="btn-outline-gold w-full sm:w-auto text-lg px-8 py-6 bg-transparent">
                    <Play className="mr-2 w-5 h-5" />
                    View Our Work
                  </Button>
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                variants={fadeInUp}
                className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-8"
              >
                {[
                  { icon: Shield, text: "Fully Insured" },
                  { icon: Award, text: "RICS Certified" },
                  { icon: Clock, text: "25+ Years" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-gold" />
                    </div>
                    <span className="text-sm text-gray-300">{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - 3D Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="hidden lg:block relative h-[500px]"
            >
              <MouseTracker3D />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <span className="text-xs text-gray-500 mb-2">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-gold/50 flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-gold"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-30" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Image & Visual */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src="/image/cover1.jpg"
                  alt="JBLM Team"
                  className="rounded-2xl shadow-2xl w-full h-full object-cover"
                />
                <div className="absolute -bottom-6 -right-6 glass-dark rounded-2xl p-6 shadow-gold">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gold flex items-center justify-center">
                      <span className="text-3xl font-bold text-black">25+</span>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-white">Years</p>
                      <p className="text-sm text-gray-400">of Excellence</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-gold/30 rounded-full" />
              <div className="absolute -bottom-8 left-1/4 w-16 h-16 bg-gold/10 rounded-full blur-xl" />
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
                <span className="text-sm text-gold font-medium">About JBLM QS</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Your Trusted Partner in
                <span className="gradient-gold-text"> Construction Excellence</span>
              </h2>
              
              <p className="mt-6 text-lg text-muted-foreground">
                Since 1999, JBLM Quantity Surveyors has been at the forefront of construction 
                cost management and project delivery across the nation. Our commitment to 
                precision, transparency, and client success has made us the preferred choice 
                for developers, contractors, and government agencies.
              </p>
              
              <p className="mt-4 text-lg text-muted-foreground">
                We combine traditional expertise with cutting-edge technology to deliver 
                accurate, reliable, and actionable insights that drive project success.
              </p>

              {/* Key Points */}
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {[
                  "RIBA & RICS Certified Professionals",
                  "Nationwide Project Experience",
                  "Advanced Technology Integration",
                  "Dedicated Client Support"
                ].map((point, i) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                    <span className="text-foreground font-medium">{point}</span>
                  </motion.div>
                ))}
              </div>

              <Link href="/about" className="mt-8 inline-block">
                <Button size="lg" className="btn-gold text-lg px-8 py-6">
                  Learn More About Us
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
              <span className="text-sm text-gold font-medium">Our Services</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Comprehensive <span className="gradient-gold-text">Solutions</span>
            </h2>
            <p className="mt-6 text-lg text-gray-400">
              From initial feasibility to final completion, we provide end-to-end 
              quantity surveying and cost management services tailored to your needs.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group card-premium bg-white/5 border-white/10 hover:border-gold/30 hover:bg-white/10"
              >
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                  <service.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                  <Link
                    href="/services"
                    className="mt-6 inline-flex items-center text-gold font-medium group-hover:underline"
                  >
                    Learn More
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
              <span className="text-sm text-gold font-medium">Our Portfolio</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              Featured <span className="gradient-gold-text">Projects</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Explore our diverse portfolio of successfully delivered projects 
              across commercial, residential, and infrastructure sectors.
            </p>
          </motion.div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl overflow-hidden card-premium bg-card p-0"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-gold/90 text-black text-xs font-semibold">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                    <span className="text-gold font-bold">{project.value}</span>
                  </div>
                  <p className="text-muted-foreground">{project.description}</p>
                  
                  <Link
                    href="/portfolio"
                    className="mt-4 inline-flex items-center text-gold font-medium hover:underline"
                  >
                    View Project Details
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="btn-outline-gold text-lg px-8 py-6">
                View All Projects
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[200px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
              <span className="text-sm text-gold font-medium">Testimonials</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              What Our <span className="gradient-gold-text">Clients Say</span>
            </h2>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-premium bg-white/5 border-white/10"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, starIdx) => (
                    <Star key={`star-${starIdx}`} className="w-5 h-5 text-gold fill-gold" />
                  ))}
                </div>
                
                <p className="text-gray-300 text-lg mb-6">"{testimonial.content}"</p>
                
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gold"
                  />
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Client Logos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <p className="text-center text-gray-500 mb-8">Trusted by leading organizations</p>
            <div className="flex flex-wrap justify-center items-center gap-12">
              {clients.map((client) => (
                <div key={client} className="text-2xl font-bold text-gray-600 hover:text-gold transition-colors">
                  {client}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-24 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
              <span className="text-sm text-gold font-medium">Latest News</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              Industry <span className="gradient-gold-text">Insights</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Stay updated with the latest trends, regulations, and insights 
              in the quantity surveying and construction industry.
            </p>
          </motion.div>

          {/* News Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "2024 Construction Cost Index Report",
                date: "March 15, 2024",
                category: "Industry Report",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
                excerpt: "Our annual analysis of construction costs reveals key trends..."
              },
              {
                title: "New Building Regulations: What You Need to Know",
                date: "March 10, 2024",
                category: "Regulations",
                image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop",
                excerpt: "Understanding the latest changes in building regulations..."
              },
              {
                title: "JBLM QS Wins Construction Excellence Award",
                date: "March 5, 2024",
                category: "Company News",
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
                excerpt: "We're proud to announce our recognition for excellence..."
              },
            ].map((article, i) => (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group card-premium bg-card p-0 overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-gold text-black text-xs font-semibold">
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">{article.date}</p>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-gold transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                  <Link
                    href="/news"
                    className="inline-flex items-center text-gold font-medium hover:underline"
                  >
                    Read More
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
                <span className="text-sm text-gold font-medium">Contact Us</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                Let&apos;s Build
                <span className="gradient-gold-text"> Something Great</span>
              </h2>
              
              <p className="mt-6 text-lg text-gray-400">
                Ready to take your project to the next level? Get in touch with our 
                team of experts and discover how we can help you achieve your goals.
              </p>

              {/* Contact Details */}
              <div className="mt-10 space-y-6">
                {[
                  { icon: Phone, label: "Call Us", value: "013 010 4060" },
                  { icon: Mail, label: "Email Us", value: "admin@jblmqs.com" },
                  { icon: MapPin, label: "Visit Us", value: "3 Lourens Street, Sonheuwel, Mbombela 1200" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{item.label}</p>
                      <p className="text-lg font-semibold text-white">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-10 flex gap-4">
                {[
                  { name: "linkedin", icon: Linkedin, href: "#" },
                  { name: "twitter", icon: Twitter, href: "#" },
                  { name: "facebook", icon: Facebook, href: "#" },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold/10 hover:border-gold/30 transition-all"
                  >
                    <social.icon className="w-5 h-5 text-white hover:text-gold" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card-premium bg-white/5 border-white/10 p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Get a Free Quote</h3>
              
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all"
                    placeholder="013 010 4060"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Project Type</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all">
                    <option value="" className="bg-black">Select a service</option>
                    <option value="quantity-surveying" className="bg-black">Quantity Surveying</option>
                    <option value="cost-management" className="bg-black">Cost Management</option>
                    <option value="contract-admin" className="bg-black">Contract Administration</option>
                    <option value="project-planning" className="bg-black">Project Planning</option>
                    <option value="other" className="bg-black">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                
                <Button type="submit" size="lg" className="btn-gold w-full text-lg py-6">
                  Send Message
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

    </>
  );
}
