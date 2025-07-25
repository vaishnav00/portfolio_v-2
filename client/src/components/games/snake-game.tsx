import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface Position {
  x: number;
  y: number;
}

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Position>({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const gridSize = 16;
  const tileCount = 20;

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
    setFood(newFood);
  }, [tileCount]);

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = '#00D4FF';
    ctx.shadowColor = '#00D4FF';
    ctx.shadowBlur = 10;
    snake.forEach(segment => {
      ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });

    // Draw food
    ctx.fillStyle = '#00FF88';
    ctx.shadowColor = '#00FF88';
    ctx.shadowBlur = 15;
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
    
    ctx.shadowBlur = 0;

    // Draw game over text
    if (gameOver) {
      ctx.fillStyle = '#FF0000';
      ctx.font = '24px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
    }
  }, [snake, food, gameOver, gridSize]);

  const updateGame = useCallback(() => {
    if (!gameRunning || gameOver) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

      // Check wall collision
      if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        setGameOver(true);
        setGameRunning(false);
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        setGameRunning(false);
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        generateFood();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [gameRunning, gameOver, direction, food, tileCount, generateFood]);

  useEffect(() => {
    drawGame();
  }, [drawGame]);

  useEffect(() => {
    if (!gameRunning) return;

    const gameInterval = setInterval(updateGame, 150);
    return () => clearInterval(gameInterval);
  }, [updateGame, gameRunning]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameRunning) return;

      const key = e.key.toLowerCase();
      
      if ((key === 'w' || key === 'arrowup') && direction.y !== 1) {
        setDirection({ x: 0, y: -1 });
      } else if ((key === 's' || key === 'arrowdown') && direction.y !== -1) {
        setDirection({ x: 0, y: 1 });
      } else if ((key === 'a' || key === 'arrowleft') && direction.x !== 1) {
        setDirection({ x: -1, y: 0 });
      } else if ((key === 'd' || key === 'arrowright') && direction.x !== -1) {
        setDirection({ x: 1, y: 0 });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameRunning, direction]);

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 0, y: 0 });
    setScore(0);
    setGameOver(false);
    setGameRunning(true);
    generateFood();
  };

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 0, y: 0 });
    setScore(0);
    setGameOver(false);
    setGameRunning(false);
    generateFood();
  };

  return (
    <div className="glass-effect rounded-xl p-8 neon-border">
      <h3 className="text-3xl font-bold mb-6 text-neon-purple text-center">Snake Game</h3>
      
      <div className="flex flex-col items-center">
        <canvas
          ref={canvasRef}
          className="game-canvas mb-4"
          width={320}
          height={320}
        />
        
        <div className="flex space-x-4 mb-4">
          <Button
            onClick={startGame}
            className="magnetic-hover glass-effect px-6 py-3 rounded-full border border-neon-green text-neon-green hover:bg-neon-green hover:text-black transition-all duration-300"
            variant="outline"
          >
            Start Game
          </Button>
          <Button
            onClick={resetGame}
            className="magnetic-hover glass-effect px-6 py-3 rounded-full border border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-black transition-all duration-300"
            variant="outline"
          >
            Reset
          </Button>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-semibold text-neon-blue">
            Score: <span>{score}</span>
          </div>
          <div className="text-sm text-gray-400 mt-2">
            Use WASD or Arrow Keys to move
          </div>
        </div>
      </div>
    </div>
  );
}
