import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

// Type declarations for UnicornStudio
declare global {
  interface Window {
    UnicornStudio: {
      isInitialized: boolean;
      init?: () => void;
    };
  }
}
import { ParticleBackground } from '@/components/ui/particle-background';
import { HiddenSnakeTrigger } from '@/components/ui/hidden-snake-trigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin,
  Code,
  Server,
  Cloud,
  Smartphone
} from 'lucide-react';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    // Load the exact Unicorn Studio script you provided
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      !function(){
        if(!window.UnicornStudio){
          window.UnicornStudio={isInitialized:!1};
          var i=document.createElement("script");
          i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";
          i.onload=function(){
            window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)
          };
          (document.head || document.body).appendChild(i)
        }
      }();
    `;
    
    // Only add script if it doesn't already exist
    if (!document.querySelector('script[data-us-init]')) {
      script.setAttribute('data-us-init', 'true');
      document.head.appendChild(script);
    }

    return () => {
      // Clean up on unmount
      const existingScript = document.querySelector('script[data-us-init]');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="scroll-indicator fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green origin-left z-50"
        style={{ scaleX }}
      />

      {/* Particle Background */}
      <ParticleBackground />

      {/* Hidden Snake Game Trigger */}
      <HiddenSnakeTrigger />

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-40 glass-effect"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              className="text-2xl font-bold text-neon-blue animate-glow"
              whileHover={{ scale: 1.05 }}
            >
              Portfolio
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-neon-blue transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Full-screen Unicorn Studio Background */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 1 }}
        >
          {/* Fallback animated background while Unicorn Studio loads */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 50% 20%, rgba(139, 69, 255, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)'
                ]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            
            {/* Floating particles */}
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-neon-blue rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -200, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0]
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 3
                }}
              />
            ))}
          </div>
          
          {/* Unicorn Studio Embed */}
          <div>
            <div 
              data-us-project="fcvCpXXYd1Gs62j0K6IQ" 
              style={{ 
                width: '1440px', 
                height: '900px',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 2
              }}
            />
            <script 
              type="text/javascript"
              dangerouslySetInnerHTML={{
                __html: `!function(){if(!window.UnicornStudio){window.UnicornStudio={isInitialized:!1};var i=document.createElement("script");i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js",i.onload=function(){window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)},(document.head || document.body).appendChild(i)}}();`
              }}
            />
          </div>
          
          {/* Gradient overlays to blend with dark theme */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" style={{ zIndex: 3 }} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none" style={{ zIndex: 3 }} />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 relative" style={{ zIndex: 10 }}>
          <div className="flex flex-col items-center text-center mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-6xl md:text-8xl font-black mb-4 text-glitch animate-glow drop-shadow-2xl"
              data-text="DEVELOPER"
              style={{ textShadow: '0 0 30px rgba(0, 255, 136, 0.8), 0 0 60px rgba(0, 255, 136, 0.4)' }}
            >
              DEVELOPER
            </motion.h1>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-2xl md:text-4xl font-light text-neon-blue mb-8 animate-glow drop-shadow-xl"
              style={{ textShadow: '0 0 20px rgba(0, 212, 255, 0.8)' }}
            >
              & Creative Technologist
            </motion.h2>
          </div>

          
          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button className="magnetic-hover glass-effect px-10 py-5 rounded-full border-2 border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black transition-all duration-300 text-lg font-semibold backdrop-blur-md shadow-2xl">
              View My Work
            </Button>
            <Button className="magnetic-hover glass-effect px-10 py-5 rounded-full border-2 border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-black transition-all duration-300 text-lg font-semibold backdrop-blur-md shadow-2xl">
              Download Resume
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-neon-blue rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-3 bg-neon-blue rounded-full mt-2"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-5xl font-bold mb-6 text-neon-green">About Me</h2>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                I'm a passionate full-stack developer and creative technologist with a love for pushing the boundaries of web experiences. I specialize in creating immersive digital solutions that blend cutting-edge technology with stunning visual design.
              </p>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                With expertise in React, Node.js, and modern web technologies, I bring ideas to life through clean code and innovative user experiences. When I'm not coding, you'll find me exploring new technologies and creating interactive experiments.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Github, color: 'text-neon-blue' },
                  { icon: Linkedin, color: 'text-neon-purple' },
                  { icon: Twitter, color: 'text-neon-green' }
                ].map(({ icon: Icon, color }, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className={`${color} hover:text-white transition-colors text-2xl`}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon />
                  </motion.a>
                ))}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <motion.img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=800"
                alt="Professional developer portrait"
                className="w-80 h-80 object-cover rounded-full glass-effect p-4 magnetic-hover"
                whileHover={{ scale: 1.05, rotate: 2 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-center mb-16 text-neon-purple animate-glow"
          >
            Featured Projects
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AI Dashboard",
                description: "A comprehensive analytics dashboard built with React and D3.js, featuring real-time data visualization and machine learning insights.",
                image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400",
                color: "text-neon-blue"
              },
              {
                title: "E-Commerce Platform",
                description: "Full-stack e-commerce solution with payment integration, inventory management, and advanced search capabilities.",
                image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400",
                color: "text-neon-green"
              },
              {
                title: "VR Experience",
                description: "Immersive virtual reality application built with Three.js and WebXR, offering interactive 3D environments.",
                image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400",
                color: "text-neon-purple"
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="glass-effect rounded-xl overflow-hidden neon-border group"
              >
                <div className="overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500"
                    whileHover={{ scale: 1.1 }}
                  />
                </div>
                <div className="p-6">
                  <h3 className={`text-2xl font-bold mb-3 ${project.color}`}>{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex space-x-4">
                    <motion.a
                      href="#"
                      className="text-neon-green hover:text-white transition-colors flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <ExternalLink size={16} /> Live Demo
                    </motion.a>
                    <motion.a
                      href="#"
                      className="text-neon-purple hover:text-white transition-colors flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Github size={16} /> Code
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Skills Section */}
      <section id="skills" className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-center mb-16 text-neon-green animate-glow"
          >
            Technical Skills
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Code,
                title: "Frontend",
                description: "React, Next.js, Vue.js, TypeScript",
                color: "text-neon-blue"
              },
              {
                icon: Server,
                title: "Backend",
                description: "Node.js, Python, MongoDB, PostgreSQL",
                color: "text-neon-purple"
              },
              {
                icon: Cloud,
                title: "Cloud & DevOps",
                description: "AWS, Docker, Kubernetes, CI/CD",
                color: "text-neon-green"
              },
              {
                icon: Smartphone,
                title: "Mobile",
                description: "React Native, Flutter, iOS, Android",
                color: "text-neon-blue"
              }
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-effect rounded-xl p-6 text-center magnetic-hover neon-border"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`${skill.color} mb-4 flex justify-center`}
                >
                  <skill.icon size={48} />
                </motion.div>
                <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
                <p className="text-gray-300">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-center mb-16 text-neon-purple animate-glow"
          >
            Get In Touch
          </motion.h2>
          
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-effect rounded-xl p-8 neon-border"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-transparent border-gray-600 focus:border-neon-blue focus:ring-neon-blue/20"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-transparent border-gray-600 focus:border-neon-green focus:ring-neon-green/20"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-transparent border-gray-600 focus:border-neon-purple focus:ring-neon-purple/20 resize-none"
                  />
                </div>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full magnetic-hover glass-effect px-8 py-4 rounded-full border border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black transition-all duration-300"
                  >
                    <Mail className="mr-2" size={20} />
                    Send Message
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-gray-400 mb-4"
          >
            &copy; 2024 Developer Portfolio. Built with passion and cutting-edge technology.
          </motion.p>
          <div className="flex justify-center space-x-6">
            {[
              { icon: Github, color: 'text-neon-blue' },
              { icon: Linkedin, color: 'text-neon-purple' },
              { icon: Twitter, color: 'text-neon-green' }
            ].map(({ icon: Icon, color }, index) => (
              <motion.a
                key={index}
                href="#"
                className={`${color} hover:text-white transition-colors text-2xl`}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
