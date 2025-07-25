import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

export default function AnimatedBackground({ intensity = 'medium', className = '' }: AnimatedBackgroundProps) {
  // Enhanced particle system for immersive space experience
  const particleCount = 80;
  const orbCount = 10;
  const cometCount = 6;
  const shootingStarCount = 5;
  const nebulaClouds = 7;
  const meteorCount = 4;
  const galaxyCount = 2;
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Pure black base background for seamless sections */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Seamless animated gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(0, 255, 136, 0.08) 0%, transparent 70%)',
            'radial-gradient(circle at 80% 50%, rgba(0, 212, 255, 0.08) 0%, transparent 70%)',
            'radial-gradient(circle at 50% 20%, rgba(139, 69, 255, 0.08) 0%, transparent 70%)',
            'radial-gradient(circle at 20% 80%, rgba(0, 255, 136, 0.08) 0%, transparent 70%)',
            'radial-gradient(circle at 20% 50%, rgba(0, 255, 136, 0.08) 0%, transparent 70%)'
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Subtle matrix-style digital rain effect */}
      {Array.from({ length: particleCount }).map((_, i) => (
        <motion.div
          key={`rain-${i}`}
          className="absolute w-px h-16 bg-gradient-to-b from-neon-green to-transparent opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-64px',
          }}
          animate={{
            y: ['0vh', '120vh'],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "linear"
          }}
        />
      ))}
      
      {/* Shooting Stars */}
      {Array.from({ length: shootingStarCount }).map((_, i) => (
        <motion.div
          key={`shooting-star-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 50}%`,
            filter: 'blur(0.5px)',
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.4)'
          }}
          animate={{
            x: [0, 400],
            y: [0, 200],
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1.5, 1, 0.5]
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Comet Trails */}
      {Array.from({ length: cometCount }).map((_, i) => (
        <motion.div
          key={`comet-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 60}%`,
          }}
          animate={{
            x: [0, 300],
            y: [0, 150],
            rotate: [0, 45]
          }}
          transition={{
            duration: 4 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "easeInOut"
          }}
        >
          <div className="relative">
            {/* Comet head */}
            <div className="w-2 h-2 bg-neon-blue rounded-full blur-sm" 
                 style={{ boxShadow: '0 0 15px currentColor' }} />
            {/* Comet tail */}
            <div className="absolute -left-8 top-1 w-8 h-0.5 bg-gradient-to-r from-neon-blue to-transparent opacity-60" />
            <div className="absolute -left-12 top-0.5 w-12 h-px bg-gradient-to-r from-neon-blue to-transparent opacity-40" />
          </div>
        </motion.div>
      ))}

      {/* Nebula Clouds */}
      {Array.from({ length: nebulaClouds }).map((_, i) => (
        <motion.div
          key={`nebula-${i}`}
          className="absolute rounded-full opacity-20"
          style={{
            left: `${Math.random() * 80}%`,
            top: `${Math.random() * 80}%`,
            width: `${100 + Math.random() * 200}px`,
            height: `${100 + Math.random() * 200}px`,
            background: `radial-gradient(circle, ${
              ['rgba(139, 69, 255, 0.3)', 'rgba(0, 255, 136, 0.3)', 'rgba(0, 212, 255, 0.3)'][i % 3]
            } 0%, transparent 70%)`,
            filter: 'blur(2px)'
          }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Twinkling Stars */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-px h-px bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(0.3px)'
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.5, 1.5, 0.5]
          }}
          transition={{
            duration: 2 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Subtle floating energy orbs */}
      {Array.from({ length: orbCount }).map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute w-1 h-1 rounded-full bg-neon-blue opacity-40"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            filter: 'blur(0.3px)',
            boxShadow: '0 0 10px currentColor'
          }}
          animate={{
            x: [0, 60, -60, 0],
            y: [0, -30, 30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 12 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Asteroid Belt */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`asteroid-${i}`}
          className="absolute bg-gray-700 opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${3 + Math.random() * 8}px`,
            height: `${3 + Math.random() * 8}px`,
            borderRadius: `${Math.random() * 50}%`,
            filter: 'blur(0.5px)'
          }}
          animate={{
            x: [0, 200 + Math.random() * 300],
            y: [0, 100 + Math.random() * 200],
            rotate: [0, 360],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: 20 + Math.random() * 30,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear"
          }}
        />
      ))}

      {/* Solar Flares */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`flare-${i}`}
          className="absolute origin-left"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: '2px',
            height: `${20 + Math.random() * 40}px`,
            background: 'linear-gradient(to top, rgba(255, 165, 0, 0.8), rgba(255, 69, 0, 0.4), transparent)',
            filter: 'blur(1px)',
            transformOrigin: 'bottom'
          }}
          animate={{
            scaleY: [0.5, 2, 0.5],
            opacity: [0.3, 0.8, 0.3],
            rotate: [0, 15, -15, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 6,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Energy Waves */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute border border-neon-cyan opacity-20 rounded-full"
          style={{
            left: '50%',
            top: '50%',
            width: '100px',
            height: '100px',
            transform: 'translate(-50%, -50%)'
          }}
          animate={{
            scale: [0, 3, 0],
            opacity: [0.4, 0.1, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Floating Debris */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`debris-${i}`}
          className="absolute bg-gray-500 opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${1 + Math.random() * 3}px`,
            height: `${1 + Math.random() * 3}px`,
            borderRadius: Math.random() > 0.5 ? '50%' : '0%'
          }}
          animate={{
            x: [0, 50 + Math.random() * 100],
            y: [0, 30 + Math.random() * 60],
            rotate: [0, 360],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{
            duration: 8 + Math.random() * 12,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        />
      ))}

      {/* Plasma Bursts */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`plasma-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${10 + Math.random() * 20}px`,
            height: `${10 + Math.random() * 20}px`,
            background: `radial-gradient(circle, ${
              ['rgba(255, 0, 255, 0.6)', 'rgba(0, 255, 255, 0.6)', 'rgba(255, 255, 0, 0.6)'][i % 3]
            }, transparent)`,
            filter: 'blur(3px)'
          }}
          animate={{
            scale: [0.5, 2, 0.5],
            opacity: [0, 0.7, 0],
            rotate: [0, 180]
          }}
          transition={{
            duration: 4 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Meteor Shower */}
      {Array.from({ length: meteorCount }).map((_, i) => (
        <motion.div
          key={`meteor-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 120}%`,
            top: `${Math.random() * 80}%`,
          }}
          animate={{
            x: [0, -400],
            y: [0, 300],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 1.5 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 15,
            ease: "easeIn"
          }}
        >
          <div className="relative">
            {/* Meteor body */}
            <div className="w-3 h-1 bg-white rounded-full opacity-90"
                 style={{ 
                   filter: 'blur(0.5px)',
                   boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)' 
                 }} />
            {/* Meteor trail */}
            <div className="absolute -right-16 top-0 w-16 h-px bg-gradient-to-l from-white to-transparent opacity-70" />
            <div className="absolute -right-24 top-0.5 w-24 h-0.5 bg-gradient-to-l from-white via-blue-200 to-transparent opacity-50" />
            <div className="absolute -right-32 top-0 w-32 h-px bg-gradient-to-l from-blue-300 to-transparent opacity-30" />
          </div>
        </motion.div>
      ))}

      {/* Mini Galaxy Spirals */}
      {Array.from({ length: galaxyCount }).map((_, i) => (
        <motion.div
          key={`galaxy-${i}`}
          className="absolute opacity-30"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            width: '120px',
            height: '120px'
          }}
          animate={{
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 40 + Math.random() * 20,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear"
          }}
        >
          <div className="relative w-full h-full">
            {/* Galaxy core */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-neon-purple rounded-full opacity-80"
                 style={{ filter: 'blur(2px)' }} />
            {/* Spiral arms */}
            <div className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-purple to-transparent transform -translate-y-1/2 origin-left rotate-0" />
            <div className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-blue to-transparent transform -translate-y-1/2 origin-left rotate-45" />
            <div className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-green to-transparent transform -translate-y-1/2 origin-left rotate-90" />
            <div className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-cyan to-transparent transform -translate-y-1/2 origin-left rotate-135" />
          </div>
        </motion.div>
      ))}

      {/* Cosmic Dust Clouds */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${50 + Math.random() * 150}px`,
            height: `${30 + Math.random() * 80}px`,
            background: `linear-gradient(45deg, 
              rgba(139, 69, 255, 0.2), 
              rgba(0, 255, 136, 0.1), 
              rgba(0, 212, 255, 0.2), 
              transparent)`,
            filter: 'blur(4px)',
            borderRadius: '50%'
          }}
          animate={{
            x: [0, 30],
            y: [0, -20],
            scale: [0.9, 1.1, 0.9],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 25 + Math.random() * 15,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Pulsating Black Holes */}
      {Array.from({ length: 2 }).map((_, i) => (
        <motion.div
          key={`blackhole-${i}`}
          className="absolute"
          style={{
            left: `${30 + Math.random() * 40}%`,
            top: `${30 + Math.random() * 40}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 0.3, 0.8]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 4,
            ease: "easeInOut"
          }}
        >
          {/* Event horizon */}
          <div className="w-8 h-8 bg-black rounded-full border-2 border-neon-purple opacity-60"
               style={{ filter: 'blur(1px)' }} />
          {/* Accretion disk */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-orange-400 rounded-full opacity-40"
               style={{ filter: 'blur(0.5px)' }} />
        </motion.div>
      ))}
      
      {/* Subtle geometric wireframes */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center opacity-8"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        <div className="relative">
          {/* Outer hexagon */}
          <motion.div
            className="w-80 h-80 border border-neon-purple opacity-8"
            style={{
              clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)'
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          />
          {/* Inner hexagon */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-neon-blue opacity-12"
            style={{
              clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)'
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          {/* Center dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-neon-green rounded-full opacity-30"
            animate={{
              scale: [0.8, 1.5, 0.8],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
}