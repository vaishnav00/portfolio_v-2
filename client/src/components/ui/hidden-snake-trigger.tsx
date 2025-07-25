import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { DinoGame } from '@/components/games/dino-game';

export function HiddenGameTrigger() {
  const [isGameOpen, setIsGameOpen] = useState(false);

  return (
    <>
      {/* Simple Dino Icon Trigger */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 cursor-pointer"
        initial={{ opacity: 1 }}
        whileHover={{ 
          opacity: 1,
          scale: 1.2,
        }}
        animate={{
          y: [0, -4, 0],
          rotate: [0, 2, -2, 0]
        }}
        transition={{
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        onClick={() => setIsGameOpen(true)}
        title="🦕 Click me!"
      >
        {/* Simple dino icon */}
        <div className="relative">
          {/* Dino body */}
          <motion.div 
            className="w-5 h-8 bg-white relative"
            style={{ borderRadius: '20% 20% 40% 40%' }}
            animate={{
              boxShadow: [
                "0 0 5px rgba(255, 255, 255, 0.5)",
                "0 0 15px rgba(255, 255, 255, 0.8)",
                "0 0 5px rgba(255, 255, 255, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Dino eye */}
            <div className="absolute top-1 right-1 w-1 h-1 bg-black rounded-full" />
            
            {/* Dino legs */}
            <div className="absolute bottom-0 left-0 w-1 h-2 bg-white" />
            <div className="absolute bottom-0 right-0 w-1 h-2 bg-white" />
          </motion.div>
          
          {/* Dino tail */}
          <motion.div
            className="w-2 h-4 bg-white absolute top-2 -left-1"
            style={{ borderRadius: '50% 0 0 50%' }}
            animate={{
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
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
                <p className="text-gray-300">You found the hidden Dino game!</p>
              </motion.div>

              {/* Dino Game Component */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <DinoGame />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}