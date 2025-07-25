import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

export default function AnimatedBackground({ intensity = 'medium', className = '' }: AnimatedBackgroundProps) {
  const particleCount = intensity === 'low' ? 20 : intensity === 'medium' ? 35 : 50;
  const orbCount = intensity === 'low' ? 3 : intensity === 'medium' ? 5 : 8;
  
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(0, 255, 136, 0.1) 0%, transparent 60%)',
            'radial-gradient(circle at 80% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 60%)',
            'radial-gradient(circle at 50% 20%, rgba(139, 69, 255, 0.1) 0%, transparent 60%)',
            'radial-gradient(circle at 20% 80%, rgba(0, 255, 136, 0.1) 0%, transparent 60%)',
            'radial-gradient(circle at 20% 50%, rgba(0, 255, 136, 0.1) 0%, transparent 60%)'
          ]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Matrix-style digital rain effect */}
      {Array.from({ length: particleCount }).map((_, i) => (
        <motion.div
          key={`rain-${i}`}
          className="absolute w-px h-16 bg-gradient-to-b from-neon-green to-transparent opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-64px',
          }}
          animate={{
            y: ['0vh', '120vh'],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "linear"
          }}
        />
      ))}
      
      {/* Floating energy orbs */}
      {Array.from({ length: orbCount }).map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute w-2 h-2 rounded-full bg-neon-blue opacity-60"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            filter: 'blur(0.5px)',
            boxShadow: '0 0 15px currentColor'
          }}
          animate={{
            x: [0, 80, -80, 0],
            y: [0, -40, 40, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 10 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Geometric wireframes - only for high intensity */}
      {intensity === 'high' && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-30"
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        >
          <div className="relative">
            {/* Outer hexagon */}
            <motion.div
              className="w-80 h-80 border border-neon-purple opacity-15"
              style={{
                clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)'
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            />
            {/* Inner hexagon */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-neon-blue opacity-20"
              style={{
                clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)'
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}