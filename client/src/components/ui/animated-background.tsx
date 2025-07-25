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