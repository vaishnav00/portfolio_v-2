import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

export default function AnimatedBackground({ intensity = 'medium', className = '' }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // WebGL-inspired minimal animation system
  const gridPoints = 12;
  const floatingShapes = 6;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw subtle grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      
      const gridSize = 100;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw floating minimal shapes
      for (let i = 0; i < floatingShapes; i++) {
        const x = (canvas.width / 2) + Math.cos(time * 0.001 + i) * 200;
        const y = (canvas.height / 2) + Math.sin(time * 0.0015 + i) * 150;
        const size = 2 + Math.sin(time * 0.002 + i) * 1;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + Math.sin(time * 0.003 + i) * 0.05})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      time += 16;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Matte black base background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* WebGL-style canvas animation */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60"
        style={{ mixBlendMode: 'lighten' }}
      />
      
      {/* Subtle gradient overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.015) 0%, transparent 70%)',
            'radial-gradient(circle at 70% 60%, rgba(255, 255, 255, 0.01) 0%, transparent 70%)',
            'radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.015) 0%, transparent 70%)',
            'radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.01) 0%, transparent 70%)',
            'radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.015) 0%, transparent 70%)'
          ]
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Minimal geometric elements */}
      {Array.from({ length: gridPoints }).map((_, i) => (
        <motion.div
          key={`grid-point-${i}`}
          className="absolute w-px h-px bg-white opacity-20"
          style={{
            left: `${10 + (i % 4) * 25}%`,
            top: `${20 + Math.floor(i / 4) * 20}%`,
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [0.5, 1.2, 0.5]
          }}
          transition={{
            duration: 4 + Math.random() * 6,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Floating minimal rectangles */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`rect-${i}`}
          className="absolute border border-white opacity-10"
          style={{
            left: `${20 + i * 20}%`,
            top: `${30 + i * 15}%`,
            width: '60px',
            height: '40px',
          }}
          animate={{
            rotate: [0, 360],
            opacity: [0.05, 0.15, 0.05],
            scale: [0.8, 1.1, 0.8]
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear"
          }}
        />
      ))}

      {/* Subtle moving lines */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-10"
          style={{
            left: '0%',
            right: '0%',
            top: `${30 + i * 20}%`,
          }}
          animate={{
            x: ['-100%', '100%'],
            opacity: [0, 0.2, 0]
          }}
          transition={{
            duration: 15 + i * 5,
            repeat: Infinity,
            delay: i * 3,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}