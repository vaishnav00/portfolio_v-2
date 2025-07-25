import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { SnakeGame } from '@/components/games/snake-game';

export function HiddenSnakeTrigger() {
  const [isGameOpen, setIsGameOpen] = useState(false);

  return (
    <>
      {/* Simple Snake Icon Trigger */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 cursor-pointer"
        initial={{ opacity: 1 }}
        whileHover={{ 
          opacity: 1,
          scale: 1.2,
        }}
        animate={{
          y: [0, -4, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        onClick={() => setIsGameOpen(true)}
        title="🐍 Click me!"
      >
        {/* Simple snake icon */}
        <div className="relative">
          {/* Snake head */}
          <motion.div 
            className="w-4 h-4 bg-white rounded-full relative"
            animate={{
              boxShadow: [
                "0 0 5px rgba(255, 255, 255, 0.5)",
                "0 0 15px rgba(255, 255, 255, 0.8)",
                "0 0 5px rgba(255, 255, 255, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Snake eyes */}
            <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 bg-black rounded-full" />
            <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 bg-black rounded-full" />
          </motion.div>
          
          {/* Snake body segments */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-white rounded-full absolute opacity-70"
              style={{
                top: `${(i + 1) * 6}px`,
                left: `2px`,
              }}
              animate={{
                scale: [0.8, 1.1, 0.8],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
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