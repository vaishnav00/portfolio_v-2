import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { SnakeGame } from '@/components/games/snake-game';

export function HiddenSnakeTrigger() {
  const [isGameOpen, setIsGameOpen] = useState(false);

  return (
    <>
      {/* Hidden Snake Trigger - floating snake-like element */}
      <motion.div
        className="fixed bottom-8 right-8 z-30 cursor-pointer"
        initial={{ opacity: 0.3 }}
        whileHover={{ 
          opacity: 1,
          scale: 1.1,
          rotate: [0, 5, -5, 0]
        }}
        animate={{
          y: [0, -5, 0],
          rotate: [0, 2, -2, 0]
        }}
        transition={{
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        onClick={() => setIsGameOpen(true)}
        title="🐍 Mystery Game - Click to play!"
      >
        {/* Snake body made of connected dots */}
        <div className="relative">
          {/* Snake head */}
          <motion.div 
            className="w-4 h-4 bg-neon-green rounded-full neon-glow-green relative"
            animate={{
              boxShadow: [
                "0 0 10px #00FF88",
                "0 0 20px #00FF88, 0 0 30px #00FF88",
                "0 0 10px #00FF88"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Snake eyes */}
            <div className="absolute top-1 left-1 w-1 h-1 bg-black rounded-full" />
            <div className="absolute top-1 right-1 w-1 h-1 bg-black rounded-full" />
          </motion.div>
          
          {/* Snake body segments */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-neon-green rounded-full absolute"
              style={{
                top: `${(i + 1) * 8}px`,
                left: `2px`,
                opacity: 1 - (i * 0.2)
              }}
              animate={{
                scale: [0.8, 1, 0.8],
                opacity: [0.8 - (i * 0.15), 1 - (i * 0.1), 0.8 - (i * 0.15)]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </div>
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
                className="absolute -top-4 -right-4 z-10 w-8 h-8 bg-neon-green rounded-full flex items-center justify-center text-black hover:bg-white transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsGameOpen(false)}
              >
                <X size={16} />
              </motion.button>

              {/* Mystery revealed banner */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-4"
              >
                <h2 className="text-2xl font-bold text-neon-green animate-glow mb-2">
                  🎉 Mystery Unlocked! 🎉
                </h2>
                <p className="text-neon-blue">You found the hidden Snake game!</p>
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