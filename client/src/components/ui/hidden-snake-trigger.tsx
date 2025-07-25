import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { SnakeGame } from '@/components/games/snake-game';

export function HiddenSnakeTrigger() {
  const [isGameOpen, setIsGameOpen] = useState(false);

  return (
    <>
      {/* Hidden Snake Trigger - attractive floating game icon */}
      <motion.div
        className="fixed bottom-8 right-8 z-50 cursor-pointer group"
        initial={{ opacity: 0.9, scale: 1.0 }}
        whileHover={{ 
          opacity: 1,
          scale: 1.15,
        }}
        animate={{
          y: [0, -8, 0],
          rotate: [0, 3, -3, 0]
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
        onClick={() => setIsGameOpen(true)}
        title="🎮 Hidden Game - Click to unlock!"
      >
        {/* Attractive game container with glow effect */}
        <motion.div 
          className="relative bg-gradient-to-br from-white to-gray-200 rounded-2xl p-4 shadow-2xl border border-gray-300"
          animate={{
            boxShadow: [
              "0 4px 20px rgba(255, 255, 255, 0.2)",
              "0 8px 30px rgba(255, 255, 255, 0.4), 0 0 20px rgba(255, 255, 255, 0.2)",
              "0 4px 20px rgba(255, 255, 255, 0.2)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {/* Game icon - stylized snake made of squares */}
          <div className="relative w-8 h-8">
            {/* Snake head with gradient */}
            <motion.div 
              className="w-3 h-3 bg-gradient-to-br from-gray-800 to-black rounded-sm absolute top-0 left-2"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Snake eyes - tiny white dots */}
              <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 bg-white rounded-full" />
              <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 bg-white rounded-full" />
            </motion.div>
            
            {/* Snake body segments in a curved pattern */}
            {[
              { x: 2, y: 3, delay: 0.1 },
              { x: 2, y: 6, delay: 0.2 },
              { x: 5, y: 6, delay: 0.3 },
              { x: 5, y: 3, delay: 0.4 }
            ].map((segment, i) => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 bg-gradient-to-br from-gray-700 to-gray-900 rounded-sm absolute"
                style={{
                  left: `${segment.x * 2}px`,
                  top: `${segment.y * 2}px`,
                }}
                animate={{
                  scale: [0.9, 1.1, 0.9],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: segment.delay
                }}
              />
            ))}
          </div>

          {/* Subtle hint text that appears on hover */}
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ y: 5 }}
            whileHover={{ y: 0 }}
          >
            <div className="bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Secret Game!
            </div>
          </motion.div>

          {/* Pulsing indicator dot */}
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>

      {/* Game Modal */}
      <AnimatePresence>
        {isGameOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsGameOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                className="absolute -top-4 -right-4 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors shadow-lg"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsGameOpen(false)}
              >
                <X size={16} />
              </motion.button>

              {/* Game unlocked banner */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-4"
              >
                <h2 className="text-2xl font-black text-white mb-2">
                  Game Unlocked!
                </h2>
                <p className="text-gray-300">You found the hidden Snake game!</p>
              </motion.div>

              {/* Snake Game Component */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <SnakeGame />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}