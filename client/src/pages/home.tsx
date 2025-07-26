import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import profileImage from '@assets/7C70F1F1-606B-4AC4-8A52-DA8BCA33930A_1753459890067.jpeg';

// Type declarations for UnicornStudio
declare global {
  interface Window {
    UnicornStudio: {
      isInitialized: boolean;
      init?: () => void;
    };
  }
}

import { HiddenGameTrigger } from "@/components/ui/hidden-snake-trigger";
import AnimatedBackground from "@/components/ui/animated-background";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
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
  Smartphone,
  Brain,
  Cpu,
  Database,
  Shield,
  BarChart3,
} from "lucide-react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    // Load the exact Unicorn Studio script you provided
    const script = document.createElement("script");
    script.type = "text/javascript";
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
    if (!document.querySelector("script[data-us-init]")) {
      script.setAttribute("data-us-init", "true");
      document.head.appendChild(script);
    }

    return () => {
      // Clean up on unmount
      const existingScript = document.querySelector("script[data-us-init]");
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Thank you for your message! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="scroll-indicator fixed top-0 left-0 right-0 h-1 bg-white origin-left z-50"
        style={{ scaleX }}
      />

      {/* Hidden Dino Game Trigger */}
      <HiddenGameTrigger />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-40 glass-effect"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              className="text-2xl font-bold text-white"
              whileHover={{ scale: 1.05 }}
            >
              Portfolio
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {[
                "Home",
                "Developer",
                "About",
                "Projects",
                "Skills",
                "Contact",
              ].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-white transition-colors duration-300 text-gray-300 font-medium clickable"
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(item.toLowerCase());
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      >
        {/* Full-screen Unicorn Studio Background */}
        <div className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          {/* Consistent animated background */}
          <AnimatedBackground />

          {/* Unicorn Studio Embed - scaled and cropped */}
          <div
            data-us-project="o91Mszogrc6tA7SO1wXQ"
            style={{
              width: "100vw",
              height: "120vh",
              position: "absolute",
              top: "-10vh",
              left: "0",
              zIndex: 2,
              transform: "scale(1.1)",
              transformOrigin: "center top",
            }}
          />

          {/* Gradient overlays to blend with dark theme */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none"
            style={{ zIndex: 3 }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none"
            style={{ zIndex: 3 }}
          />
        </div>



        {/* Navigation helper text - minimal */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center" style={{ zIndex: 4 }}>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          style={{ zIndex: 5 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Developer Introduction Section */}
      <section
        id="developer"
        className="py-20 relative overflow-hidden bg-black"
      >
        <AnimatedBackground />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.h1 className="text-6xl md:text-8xl font-black mb-8 text-white">
              DEVELOPER
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-2xl md:text-4xl font-medium text-gray-300 mb-12"
            >
              & Creative Technologist
            </motion.h2>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Button
                  onClick={() =>
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-white text-black hover:bg-gray-200 px-10 py-5 rounded-lg text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 clickable"
                >
                  View My Work
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-black px-10 py-5 rounded-lg text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 clickable"
                >
                  Download Resume
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 relative overflow-hidden bg-black">
        <AnimatedBackground />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-5xl font-black mb-6 text-white">About Me</h2>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                I'm Vaishnav S Chandran, an engineer with a dual background in Computer
                  Science and Electrical Engineering. I thrive where code meets
                  conversation, architecting the dialogue between human ideas and
                  artificial intelligence. As a specialist in Machine Learning and
                  Generative AI, I'm driven by the conviction that any vision is
                  achievable—it's simply a matter of time and hard work. If you're ready to
                  build what's next, let's connect.
              </p>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Beyond my core skills, I'm also passionate about
                  finance and the limitless potential of Generative AI. I'm always
                  exploring new ideas where these fields intersect.
              </p>
              <div className="flex space-x-6">
                {[
                  { icon: Github, color: "text-white", label: "GitHub", href: "https://github.com/vaishnav00" },
                  { icon: Linkedin, color: "text-white", label: "LinkedIn", href: "https://www.linkedin.com/in/vaishnav-s-chandran-374b241bb/" },
                  { icon: Twitter, color: "text-white", label: "Twitter", href: "https://x.com/vaishnav_vsc" },
                ].map(({ icon: Icon, color, label, href }, index) => (
                  <motion.a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${color} hover:text-gray-300 transition-colors text-3xl p-3 rounded-full border border-transparent hover:border-white/20 bg-white/5 hover:bg-white/10 clickable`}
                    whileHover={{ scale: 1.15, y: -3, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    title={label}
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
                src={profileImage}
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
      <section
        id="projects"
        className="py-16 relative overflow-hidden bg-black"
      >
        <AnimatedBackground />
        <div className="container mx-auto px-6 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl font-black text-center mb-16 text-white"
          >
            Featured Projects
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AI Traffic Sign Recognition",
                description: "Built a robust traffic sign classifier using adversarial training (FGSM, PGD) and XAI. Improved model accuracy under attack scenarios and added transparency to model decisions.",
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
                color: "text-neon-blue",
                year: "2025"
              },
              {
                title: "Generative AI Reports & Articles",
                description: "Automated report and article creation from complex data using generative AI and LLMs to enhance clarity and communication.",
                image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
                color: "text-neon-green",
                year: "2024"
              },
              {
                title: "Decentralized File Sharing",
                description: "A decentralized file sharing web app that leverages blockchain technology to provide secure, peer-to-peer file sharing.",
                image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
                color: "text-neon-purple",
                year: "2024"
              },
              {
                title: "Anime Ratings Prediction",
                description: "Developed a novel machine learning model to predict anime scores using predictive analytics and explainable AI techniques.",
                image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
                color: "text-neon-blue",
                year: "2023"
              },
              {
                title: "AI-Driven Glaucoma Diagnosis",
                description: "Utilized GenAI for data-driven glaucoma dataset exploration, feature selection, and predictive modeling to enhance early glaucoma diagnosis.",
                image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
                color: "text-neon-green",
                year: "2023"
              },
              {
                title: "Bio-Signal Smoking Prediction",
                description: "Developed a machine learning model to predict smoking status from bio-signal data using ML and explainable AI techniques.",
                image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
                color: "text-neon-purple",
                year: "2023"
              },
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
                  <h3 className={`text-2xl font-bold mb-2 ${project.color}`}>
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3 font-semibold">{project.year}</p>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex space-x-4">
                    <motion.a
                      href="#"
                      className="text-white hover:text-gray-300 transition-colors flex items-center gap-2 font-semibold border-b border-transparent hover:border-white clickable"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      <ExternalLink size={16} /> Live Demo
                    </motion.a>
                    <motion.a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 font-semibold border-b border-transparent hover:border-white clickable"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
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
      <section id="skills" className="py-16 relative overflow-hidden bg-black">
        <AnimatedBackground />
        <div className="container mx-auto px-6 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-center mb-16 text-neon-green animate-glow"
          >
            Technical Skills
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Gen AI & LLMs",
                description: "Prompt Engineering, GPT, LLM Applications, AI Agents",
                color: "text-neon-purple",
              },
              {
                icon: BarChart3,
                title: "Machine Learning",
                description: "Python, TensorFlow, PyTorch, Scikit-learn, XAI",
                color: "text-neon-blue",
              },
              {
                icon: Code,
                title: "Programming",
                description: "Python, C++, MATLAB, JavaScript",
                color: "text-neon-green",
              },
              {
                icon: Database,
                title: "Data & Analytics",
                description: "Power BI, Data Visualization, Predictive Modeling",
                color: "text-neon-blue",
              },
              {
                icon: Cpu,
                title: "IoT & Hardware",
                description: "PCB Design, Embedded Systems, ",
                color: "text-neon-purple",
              },
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
      <section id="contact" className="py-16 relative overflow-hidden bg-black">
        <AnimatedBackground />
        <div className="container mx-auto px-6 relative z-10">
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
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
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
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
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
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
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

                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 clickable"
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
            &copy; 2024 Developer Portfolio. Built with passion and cutting-edge
            technology.
          </motion.p>
          <div className="flex justify-center space-x-6">
            {[
              { icon: Github, color: "text-white", label: "GitHub", href: "https://github.com/vaishnav00" },
              { icon: Linkedin, color: "text-white", label: "LinkedIn", href: "https://www.linkedin.com/in/vaishnav-s-chandran-374b241bb/" },
              { icon: Twitter, color: "text-white", label: "Twitter", href: "https://x.com/vaishnav_vsc" },
            ].map(({ icon: Icon, color, label, href }, index) => (
              <motion.a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${color} hover:text-gray-300 transition-colors text-2xl p-3 rounded-full border border-transparent hover:border-white/20 bg-white/5 hover:bg-white/10 clickable`}
                whileHover={{ scale: 1.15, y: -3, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                title={label}
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
