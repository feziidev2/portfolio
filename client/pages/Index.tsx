import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  Code,
  Star,
  ArrowRight,
  Phone,
  MapPin
} from "lucide-react";
import {
  FaReact,
  FaNodeJs,
  FaJs,
  FaMobile,
  FaDatabase
} from "react-icons/fa";
import {
  SiMongodb,
  SiExpress,
  SiTypescript,
  SiReact,
  SiNextdotjs
} from "react-icons/si";

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok || data?.success !== true) {
        throw new Error(data?.message ?? "Failed to send message. Please try again later.");
      }

      setSubmitStatus({ type: "success", message: data.message ?? "Message sent successfully!" });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact form submission failed", error);
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error && error.message
            ? error.message
            : "Failed to send message. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const skillCategories = {
    "Frontend Development": [
      { name: "React", icon: <FaReact className="w-5 h-5 text-[#61DAFB]" />, level: 95 },
      { name: "Next.js", icon: <SiNextdotjs className="w-5 h-5 text-[#000000] dark:text-white" />, level: 88 },
      { name: "JavaScript", icon: <FaJs className="w-5 h-5 text-[#F7DF1E]" />, level: 96 },
      { name: "TypeScript", icon: <SiTypescript className="w-5 h-5 text-[#3178C6]" />, level: 85 },
    ],
    "Backend Development": [
      { name: "Node.js", icon: <FaNodeJs className="w-5 h-5 text-[#339933]" />, level: 90 },
      { name: "Express.js", icon: <SiExpress className="w-5 h-5 text-[#000000] dark:text-white" />, level: 92 },
      { name: "MongoDB", icon: <SiMongodb className="w-5 h-5 text-[#47A248]" />, level: 88 },
    ],
    "AI & Prompt Engineering": [
      { name: "ChatGPT", icon: <FaReact className="w-5 h-5 text-[#10a37f]" />, level: 93 },
      { name: "Claude", icon: <SiReact className="w-5 h-5 text-[#ff6b35]" />, level: 90 },
      { name: "Prompt Design", icon: <FaJs className="w-5 h-5 text-[#7c3aed]" />, level: 95 },
    ],
    "Mobile & Cross-Platform": [
      { name: "React Native", icon: <SiReact className="w-5 h-5 text-[#61DAFB]" />, level: 80 },
    ]
  };

  const projects = [
    {
      title: "Video Calling App",
      description: "Full-stack MERN application with payment integration, admin dashboard, and real-time inventory management.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com/feziidev2/video-calling-app",
      live: "#",
      image: "/placeholder.svg"
    },
    {
      title: "Mern-Ecommerce2",
      description: "Real-time collaborative task management with drag-and-drop functionality and team collaboration features.",
      tech: ["React", "Express", "Socket.io", "MongoDB"],
      github: "https://github.com/feziidev2/Mern-Ecommerce2",
      live: "#",
      image: "/placeholder.svg"
    },
    {
      title: "ai-reume",
      description: "Analytics dashboard for social media management with data visualization and scheduled posting features.",
      tech: ["React", "Node.js", "Chart.js", "REST APIs"],
      github: "https://github.com/feziidev2/ai-resume",
      live: "#",
      image: "/placeholder.svg"
    }
  ];

  const experiences = [
    {
      role: "MERN Stack Developer",
      company: "Tech Solutions Ltd",
      period: "2022 - Present",
      description: "Developing full-stack web applications using MERN stack, implementing responsive designs and optimizing performance."
    },
    {
      role: "Frontend Developer",
      company: "Digital Agency Co",
      period: "2021 - 2022",
      description: "Created interactive user interfaces and implemented modern React applications with focus on user experience."
    },
    {
      role: "Junior Developer",
      company: "StartUp Inc",
      period: "2020 - 2021",
      description: "Built dynamic web applications and collaborated with cross-functional teams to deliver high-quality solutions."
    }
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "experience", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Floating Tech Icons with Scroll Animation */}
      <motion.div
        className="fixed top-20 left-10 z-10 pointer-events-none"
        style={{
          y: scrollY * 0.3,
          x: Math.sin(scrollY * 0.01) * 20
        }}
      >
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity }
          }}
        >
          <FaReact className="w-12 h-12 text-[#61DAFB] opacity-60" />
        </motion.div>
      </motion.div>

      <motion.div
        className="fixed top-1/3 right-16 z-10 pointer-events-none"
        style={{
          y: scrollY * -0.2,
          x: Math.cos(scrollY * 0.008) * 30
        }}
      >
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FaNodeJs className="w-10 h-10 text-[#339933] opacity-70" />
        </motion.div>
      </motion.div>

      <motion.div
        className="fixed bottom-1/4 left-20 z-10 pointer-events-none"
        style={{
          y: scrollY * 0.4,
          x: Math.sin(scrollY * 0.012) * 40
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -360]
          }}
          transition={{
            scale: { duration: 2.5, repeat: Infinity },
            rotate: { duration: 6, repeat: Infinity, ease: "linear" }
          }}
        >
          <FaJs className="w-8 h-8 text-[#F7DF1E] opacity-80" />
        </motion.div>
      </motion.div>

      <motion.div
        className="fixed top-1/2 left-5 z-10 pointer-events-none"
        style={{
          y: scrollY * -0.35,
          x: Math.cos(scrollY * 0.015) * 25
        }}
      >
        <motion.div
          animate={{
            rotate: [0, 180, 360],
            scale: [0.8, 1.1, 0.8]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <SiMongodb className="w-9 h-9 text-[#47A248] opacity-65" />
        </motion.div>
      </motion.div>

      <motion.div
        className="fixed bottom-32 right-10 z-10 pointer-events-none"
        style={{
          y: scrollY * 0.25,
          x: Math.sin(scrollY * 0.01) * -35
        }}
      >
        <motion.div
          animate={{
            y: [0, -25, 0],
            rotateY: [0, 180, 360]
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity
          }}
        >
          <SiNextdotjs className="w-10 h-10 text-white opacity-75" />
        </motion.div>
      </motion.div>

      <motion.div
        className="fixed top-2/3 right-5 z-10 pointer-events-none"
        style={{
          y: scrollY * -0.45,
          x: Math.cos(scrollY * 0.02) * 20
        }}
      >
        <motion.div
          animate={{
            rotate: [0, -180, -360],
            scale: [1, 0.8, 1.2, 1]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <SiTypescript className="w-8 h-8 text-[#3178C6] opacity-70" />
        </motion.div>
      </motion.div>
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-sea-green-500/20"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold bg-gradient-to-r from-sea-green-400 to-sea-green-600 bg-clip-text text-transparent"
            >
              faizan.dev
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {["Home", "About", "Skills", "Projects", "Experience", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors hover:text-sea-green-400 cursor-code hover:scale-110 transition-transform duration-200 ${
                    activeSection === item.toLowerCase()
                      ? "text-sea-green-400"
                      : "text-gray-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sea-green-500/10 to-transparent"></div>

        {/* Animated Background Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-sea-green-400 rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-6xl md:text-8xl font-black mb-6 text-sea-green-400 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                fontWeight: '900',
                letterSpacing: '2px'
              }}
            >
              <span className="relative inline-block">
                {"faizan".split("").map((letter, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.1,
                      delay: index * 0.3 + 1,
                      ease: "easeOut"
                    }}
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}

                {/* Typing Cursor */}
                <motion.span
                  className="inline-block text-sea-green-400 ml-1"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: 2.8,
                    times: [0, 0.1, 0.9, 1]
                  }}
                >
                  |
                </motion.span>
              </span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              MERN Stack Developer & Prompt Engineer
            </motion.p>
            <motion.p
              className="text-lg text-gray-400 mb-6 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Son of Muhammad Fazal • Crafting exceptional web experiences with modern technologies
            </motion.p>
            <motion.p
              className="text-base md:text-lg text-sea-green-300 mb-8 max-w-2xl mx-auto font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              🤖 I am a Prompt Engineer who builds amazing designs and applications with AI • Transforming ideas into intelligent solutions
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                onClick={() => scrollToSection("projects")}
                className="bg-gradient-to-r from-sea-green-500 to-sea-green-600 hover:from-sea-green-600 hover:to-sea-green-700 text-white font-medium px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 cursor-react"
              >
                View My Work <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                className="border-sea-green-500 text-sea-green-400 hover:bg-sea-green-500 hover:text-black font-medium px-8 py-3 rounded-full transition-all duration-300 cursor-code"
              >
                <Download className="mr-2 w-4 h-4" />
                Download CV
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating Tech Icons */}
        <motion.div
          className="absolute top-20 left-10 md:left-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <FaReact className="w-8 h-8 text-[#61DAFB] opacity-60" />
        </motion.div>

        <motion.div
          className="absolute top-32 right-10 md:right-20"
          animate={{
            y: [0, 15, 0],
            x: [0, 10, 0]
          }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
        >
          <FaNodeJs className="w-6 h-6 text-[#339933] opacity-50" />
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-16 md:left-32"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          <SiMongodb className="w-7 h-7 text-[#47A248] opacity-40" />
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-16 md:right-32"
          animate={{
            y: [0, -25, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >
          <SiNextdotjs className="w-6 h-6 text-white opacity-50" />
        </motion.div>

        <motion.div
          className="absolute top-1/2 left-5"
          animate={{
            rotate: [0, -360],
            scale: [0.8, 1.1, 0.8]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <FaJs className="w-5 h-5 text-[#F7DF1E] opacity-45" />
        </motion.div>

        <motion.div
          className="absolute top-1/3 right-5"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 7, repeat: Infinity, delay: 1.5 }}
        >
          <SiTypescript className="w-5 h-5 text-[#3178C6] opacity-50" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-sea-green-400 to-white bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                I'm Faizan, a passionate MERN Stack Developer with a drive for creating innovative web solutions. 
                As the son of Muhammad Fazal, I've inherited values of hard work and dedication that reflect in my code. 
                I specialize in building scalable, user-friendly applications that solve real-world problems.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  className="text-center p-6 rounded-lg bg-gradient-to-br from-sea-green-500/10 to-transparent border border-sea-green-500/20 cursor-react"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaReact className="w-12 h-12 text-[#61DAFB] mx-auto mb-4 animate-spin" style={{animationDuration: '3s'}} />
                  <h3 className="text-xl font-semibold mb-2">Frontend Expert</h3>
                  <p className="text-gray-400">Creating stunning user interfaces with React and modern CSS frameworks</p>
                </motion.div>
                <motion.div
                  className="text-center p-6 rounded-lg bg-gradient-to-br from-sea-green-500/10 to-transparent border border-sea-green-500/20 cursor-node"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaNodeJs className="w-12 h-12 text-[#339933] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Backend Developer</h3>
                  <p className="text-gray-400">Building robust APIs and server-side applications with Node.js and Express</p>
                </motion.div>
                <motion.div
                  className="text-center p-6 rounded-lg bg-gradient-to-br from-sea-green-500/10 to-transparent border border-sea-green-500/20 cursor-database"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <SiMongodb className="w-12 h-12 text-[#47A248] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Database Management</h3>
                  <p className="text-gray-400">Designing efficient database schemas and optimizing MongoDB performance</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-sea-green-400 to-white bg-clip-text text-transparent">
              Technical Expertise
            </h2>
            <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
              Comprehensive skill set spanning modern web development, AI integration, and cutting-edge technologies
            </p>

            <div className="space-y-12">
              {Object.entries(skillCategories).map(([category, skills], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                  viewport={{ once: true }}
                  className="max-w-6xl mx-auto"
                >
                  <h3 className="text-2xl font-bold text-sea-green-400 mb-8 text-left">{category}</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {skills.map((skill, skillIndex) => {
                      const getCursorClass = (skillName: string) => {
                        switch (skillName.toLowerCase()) {
                          case 'react':
                          case 'next.js':
                            return 'cursor-react';
                          case 'node.js':
                            return 'cursor-node';
                          case 'mongodb':
                            return 'cursor-database';
                          case 'express.js':
                            return 'cursor-zap';
                          case 'javascript':
                            return 'cursor-globe';
                          case 'typescript':
                            return 'cursor-cpu';
                          case 'react native':
                            return 'cursor-smartphone';
                          default:
                            return 'cursor-code';
                        }
                      };

                      return (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.8, rotateY: -45 }}
                          whileInView={{
                            opacity: 1,
                            scale: 1,
                            rotateY: 0,
                          }}
                          whileHover={{
                            scale: 1.05,
                            y: -5,
                            boxShadow: "0 20px 40px rgba(16, 185, 129, 0.4)",
                          }}
                          transition={{
                            duration: 0.5,
                            delay: skillIndex * 0.1,
                            type: "spring",
                            stiffness: 120
                          }}
                          viewport={{ once: true }}
                          className={`bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 p-6 rounded-xl border border-sea-green-500/20 hover:border-sea-green-500/60 transition-all duration-300 transform-gpu group ${getCursorClass(skill.name)}`}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-sea-green-500/10 rounded-lg group-hover:bg-sea-green-500/20 transition-colors">
                                {skill.icon}
                              </div>
                              <h4 className="text-lg font-semibold text-white">{skill.name}</h4>
                            </div>
                            <span className="text-sm font-bold text-sea-green-400">{skill.level}%</span>
                          </div>

                          <div className="relative">
                            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                              <motion.div
                                className="bg-gradient-to-r from-sea-green-500 to-sea-green-400 h-2 rounded-full relative"
                                initial={{ width: 0, opacity: 0 }}
                                whileInView={{
                                  width: `${skill.level}%`,
                                  opacity: 1
                                }}
                                transition={{
                                  duration: 1.2,
                                  delay: skillIndex * 0.1 + 0.3,
                                  ease: "easeOut"
                                }}
                                viewport={{ once: true }}
                              >
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                  animate={{ x: ['-100%', '100%'] }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 4,
                                    ease: "linear"
                                  }}
                                />
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gradient-to-b from-gray-900/50 to-transparent">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-sea-green-400 to-white bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50, rotateX: 45 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  whileHover={{
                    y: -10,
                    rotateX: 5,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group"
                  style={{ perspective: '1000px' }}
                >
                  <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-sea-green-500/20 hover:border-sea-green-500/60 transition-all duration-500 overflow-hidden relative group-hover:shadow-2xl group-hover:shadow-sea-green-500/25 transform-gpu">
                    <div className="aspect-video bg-gradient-to-br from-sea-green-500/20 to-sea-green-600/20 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Code className="w-16 h-16 text-sea-green-400 opacity-50" />
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-sea-green-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech) => {
                          const getTechCursorClass = (techName: string) => {
                            switch (techName.toLowerCase()) {
                              case 'react':
                                return 'cursor-react';
                              case 'node.js':
                                return 'cursor-node';
                              case 'mongodb':
                                return 'cursor-database';
                              case 'express':
                              case 'express.js':
                                return 'cursor-zap';
                              case 'javascript':
                                return 'cursor-globe';
                              case 'typescript':
                                return 'cursor-cpu';
                              case 'stripe':
                              case 'socket.io':
                              case 'chart.js':
                              case 'rest apis':
                                return 'cursor-code';
                              default:
                                return 'cursor-code';
                            }
                          };

                          return (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className={`bg-sea-green-500/20 text-sea-green-400 border-sea-green-500/30 hover:scale-110 transition-transform duration-200 ${getTechCursorClass(tech)}`}
                            >
                              {tech}
                            </Badge>
                          );
                        })}
                      </div>
                      <div className="flex gap-3">
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="border-sea-green-500/50 text-sea-green-400 hover:bg-sea-green-500/20"
                        >
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </a>
                        </Button>
                        <Button size="sm" className="bg-sea-green-500 hover:bg-sea-green-600 text-white">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-sea-green-400 to-white bg-clip-text text-transparent">
              Experience
            </h2>
            <div className="max-w-3xl mx-auto">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative pl-8 pb-12 last:pb-0"
                >
                  {/* Timeline Line */}
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-sea-green-500 to-transparent"></div>
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-2 w-2 h-2 bg-sea-green-500 rounded-full transform -translate-x-0.5"></div>
                  
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg border border-sea-green-500/20">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      <span className="text-sea-green-400 font-medium">{exp.period}</span>
                    </div>
                    <h4 className="text-lg text-sea-green-300 mb-3">{exp.company}</h4>
                    <p className="text-gray-400 leading-relaxed">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-sea-green-400 to-white bg-clip-text text-transparent">
              Services I Offer
            </h2>
            <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
              Comprehensive development solutions powered by cutting-edge technology and AI
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "Full-Stack Web Development",
                  description: "Complete MERN stack applications with modern UI/UX design and robust backend architecture.",
                  icon: <FaReact className="w-8 h-8 text-[#61DAFB]" />,
                  features: ["React & Next.js", "Node.js & Express", "MongoDB Database", "Responsive Design"]
                },
                {
                  title: "AI-Powered Applications",
                  description: "Integrate cutting-edge AI capabilities into your applications using advanced prompt engineering.",
                  icon: <FaJs className="w-8 h-8 text-[#7c3aed]" />,
                  features: ["ChatGPT Integration", "Custom AI Solutions", "Prompt Optimization", "Smart Automation"]
                },
                {
                  title: "Mobile App Development",
                  description: "Cross-platform mobile applications using React Native for iOS and Android.",
                  icon: <SiReact className="w-8 h-8 text-[#61DAFB]" />,
                  features: ["React Native", "Cross-Platform", "Native Performance", "App Store Ready"]
                }
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-sea-green-500/20 hover:border-sea-green-500/40 transition-all duration-300"
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-sea-green-500/10 rounded-lg mr-4">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  </div>
                  <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-gray-300">
                        <div className="w-2 h-2 bg-sea-green-400 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-sea-green-400 to-white bg-clip-text text-transparent">
              Achievements & Stats
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { number: "50+", label: "Projects Completed", icon: <Star className="w-6 h-6" /> },
                { number: "100%", label: "Client Satisfaction", icon: <Star className="w-6 h-6" /> },
                { number: "3+", label: "Years Experience", icon: <Star className="w-6 h-6" /> },
                { number: "24/7", label: "Support Available", icon: <Star className="w-6 h-6" /> }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-sea-green-500/20 hover:border-sea-green-500/40 transition-all duration-300 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-sea-green-500/10 rounded-full text-sea-green-400">
                      {stat.icon}
                    </div>
                  </div>
                  <motion.h3
                    className="text-3xl font-bold text-sea-green-400 mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    viewport={{ once: true }}
                  >
                    {stat.number}
                  </motion.h3>
                  <p className="text-gray-400 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-t from-gray-900 to-transparent">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-sea-green-400 to-white bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
              Ready to bring your ideas to life? I'm always open to discussing new opportunities and exciting projects.
            </p>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold mb-6 text-sea-green-400">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sea-green-500/20 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-sea-green-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white font-medium">faizanfezii7@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sea-green-500/20 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-sea-green-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                      <p className="text-white font-medium">+92 3317644884</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sea-green-500/20 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-sea-green-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Location</p>
                      <p className="text-white font-medium">Pakistan</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="border-sea-green-500/50 text-sea-green-400 hover:bg-sea-green-500/20 cursor-code hover:scale-110 transition-transform duration-200"
                  >
                    <a href="https://github.com/feziidev2" target="_blank" rel="noreferrer" aria-label="GitHub">
                      <Github className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" className="border-sea-green-500/50 text-sea-green-400 hover:bg-sea-green-500/20 cursor-code hover:scale-110 transition-transform duration-200">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-sea-green-500/50 text-sea-green-400 hover:bg-sea-green-500/20 cursor-code hover:scale-110 transition-transform duration-200">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-lg border border-sea-green-500/20 space-y-6">
                  <h3 className="text-2xl font-bold mb-6 text-sea-green-400">Send Message</h3>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        required
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-sea-green-500 focus:ring-sea-green-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-sea-green-500 focus:ring-sea-green-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell me about your project..."
                        required
                        rows={5}
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-sea-green-500 focus:ring-sea-green-500 resize-none"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-sea-green-500 to-sea-green-600 hover:from-sea-green-600 hover:to-sea-green-700 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                  {submitStatus ? (
                    <p
                      className={cn(
                        "text-sm font-medium",
                        submitStatus.type === "success" ? "text-sea-green-400" : "text-red-400"
                      )}
                    >
                      {submitStatus.message}
                    </p>
                  ) : null}
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-sea-green-500/20 bg-black">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 Faizan • MERN Stack Developer • Built with ❤️ and React
          </p>
        </div>
      </footer>
    </div>
  );
}
