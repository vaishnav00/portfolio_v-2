import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

export default function AnimatedBackground({ intensity = 'medium', className = '' }: AnimatedBackgroundProps) {
  // Keep consistent particle count for seamless experience
  const particleCount = 40;
  const orbCount = 6;
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Base gradient background for consistency */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      
      {/* Animated gradient background - same for all sections */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(0, 255, 136, 0.12) 0%, transparent 60%)',
            'radial-gradient(circle at 80% 50%, rgba(0, 212, 255, 0.12) 0%, transparent 60%)',
            'radial-gradient(circle at 50% 20%, rgba(139, 69, 255, 0.12) 0%, transparent 60%)',
            'radial-gradient(circle at 20% 80%, rgba(0, 255, 136, 0.12) 0%, transparent 60%)',
            'radial-gradient(circle at 20% 50%, rgba(0, 255, 136, 0.12) 0%, transparent 60%)'
          ]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Matrix-style digital rain effect - consistent across all sections */}
      {Array.from({ length: particleCount }).map((_, i) => (
        <motion.div
          key={`rain-${i}`}
          className="absolute w-px h-20 bg-gradient-to-b from-neon-green to-transparent opacity-50"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-80px',
          }}
          animate={{
            y: ['0vh', '120vh'],
            opacity: [0, 0.7, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        />
      ))}
      
      {/* Floating energy orbs - consistent across all sections */}
      {Array.from({ length: orbCount }).map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute w-2 h-2 rounded-full bg-neon-blue opacity-70"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            filter: 'blur(0.5px)',
            boxShadow: '0 0 15px currentColor'
          }}
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -50, 50, 0],
            opacity: [0.3, 0.9, 0.3],
            scale: [0.7, 1.2, 0.7]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Geometric wireframes - always present for consistency */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center opacity-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <div className="relative">
          {/* Outer hexagon */}
          <motion.div
            className="w-96 h-96 border border-neon-purple opacity-15"
            style={{
              clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)'
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          {/* Inner hexagon */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-neon-blue opacity-25"
            style={{
              clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)'
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          {/* Center dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-neon-green rounded-full"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
}