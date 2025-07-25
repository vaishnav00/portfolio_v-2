import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Play, RotateCcw } from 'lucide-react';

interface DinoScore {
  id: string;
  playerName: string;
  score: number;
  createdAt: string;
}

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Obstacle extends GameObject {
  speed: number;
}

export function DinoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameOver' | 'leaderboard'>('menu');
  const [score, setScore] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [leaderboard, setLeaderboard] = useState<DinoScore[]>([]);
  const [isSubmittingScore, setIsSubmittingScore] = useState(false);
  
  // Game state refs
  const gameLoopRef = useRef<number>();
  const dinoRef = useRef({ x: 50, y: 150, width: 40, height: 40, velocityY: 0, isJumping: false });
  const obstaclesRef = useRef<Obstacle[]>([]);
  const scoreRef = useRef(0);
  const gameSpeedRef = useRef(3);

  const CANVAS_WIDTH = 600;
  const CANVAS_HEIGHT = 200;
  const GROUND_Y = 180;
  const GRAVITY = 0.8;
  const JUMP_FORCE = -15;

  // Fetch leaderboard
  const fetchLeaderboard = useCallback(async () => {
    try {
      const response = await fetch('/api/dino-scores');
      if (response.ok) {
        const scores = await response.json();
        setLeaderboard(scores);
      }
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    }
  }, []);

  // Submit score
  const submitScore = async () => {
    if (!playerName.trim() || isSubmittingScore) return;
    
    setIsSubmittingScore(true);
    try {
      const response = await fetch('/api/dino-scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerName: playerName.trim(), score: scoreRef.current }),
      });
      
      if (response.ok) {
        await fetchLeaderboard();
        setGameState('leaderboard');
      }
    } catch (error) {
      console.error('Failed to submit score:', error);
    } finally {
      setIsSubmittingScore(false);
    }
  };

  // Reset game
  const resetGame = () => {
    dinoRef.current = { x: 50, y: 150, width: 40, height: 40, velocityY: 0, isJumping: false };
    obstaclesRef.current = [];
    scoreRef.current = 0;
    gameSpeedRef.current = 3;
    setScore(0);
  };

  // Start game
  const startGame = () => {
    resetGame();
    setGameState('playing');
  };

  // Game loop
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || gameState !== 'playing') return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw ground
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, GROUND_Y, CANVAS_WIDTH, 20);

    // Update dino
    const dino = dinoRef.current;
    if (dino.isJumping) {
      dino.velocityY += GRAVITY;
      dino.y += dino.velocityY;
      
      if (dino.y >= 150) {
        dino.y = 150;
        dino.velocityY = 0;
        dino.isJumping = false;
      }
    }

    // Draw dino
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);

    // Update obstacles
    obstaclesRef.current = obstaclesRef.current.filter(obstacle => {
      obstacle.x -= obstacle.speed;
      return obstacle.x + obstacle.width > 0;
    });

    // Add new obstacles
    if (obstaclesRef.current.length === 0 || 
        obstaclesRef.current[obstaclesRef.current.length - 1].x < CANVAS_WIDTH - 200) {
      obstaclesRef.current.push({
        x: CANVAS_WIDTH,
        y: 160,
        width: 20,
        height: 40,
        speed: gameSpeedRef.current
      });
    }

    // Draw obstacles
    ctx.fillStyle = '#ffffff';
    obstaclesRef.current.forEach(obstacle => {
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });

    // Check collisions
    const collision = obstaclesRef.current.some(obstacle => 
      dino.x < obstacle.x + obstacle.width &&
      dino.x + dino.width > obstacle.x &&
      dino.y < obstacle.y + obstacle.height &&
      dino.y + dino.height > obstacle.y
    );

    if (collision) {
      setGameState('gameOver');
      return;
    }

    // Update score
    scoreRef.current += 1;
    setScore(scoreRef.current);

    // Increase speed
    if (scoreRef.current % 500 === 0) {
      gameSpeedRef.current += 0.5;
    }

    // Draw score
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${scoreRef.current}`, 10, 30);

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameState]);

  // Jump handler
  const jump = useCallback(() => {
    if (gameState === 'playing' && !dinoRef.current.isJumping) {
      dinoRef.current.velocityY = JUMP_FORCE;
      dinoRef.current.isJumping = true;
    }
  }, [gameState]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && gameState === 'playing') {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [jump, gameState]);

  // Start game loop
  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, gameLoop]);

  // Load leaderboard on mount
  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  return (
    <Card className="w-full max-w-2xl mx-auto bg-black border-white text-white">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-white">
          Google Dino Game
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-6"
            >
              <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                className="border border-white mx-auto block bg-black"
              />
              <p className="text-gray-300">
                Press <kbd className="bg-gray-800 px-2 py-1 rounded">Space</kbd> to jump over obstacles
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={startGame} className="bg-white text-black hover:bg-gray-200">
                  <Play className="mr-2 h-4 w-4" />
                  Start Game
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setGameState('leaderboard')}
                  className="border-white text-white hover:bg-white hover:text-black"
                >
                  <Trophy className="mr-2 h-4 w-4" />
                  Leaderboard
                </Button>
              </div>
            </motion.div>
          )}

          {gameState === 'playing' && (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-4"
            >
              <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                className="border border-white mx-auto block bg-black cursor-pointer"
                onClick={jump}
              />
              <p className="text-gray-300">
                Press <kbd className="bg-gray-800 px-2 py-1 rounded">Space</kbd> or click to jump
              </p>
            </motion.div>
          )}

          {gameState === 'gameOver' && (
            <motion.div
              key="gameOver"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center space-y-6"
            >
              <h3 className="text-xl font-bold text-white">Game Over!</h3>
              <p className="text-2xl font-bold text-white">Score: {score}</p>
              
              <div className="space-y-4 max-w-sm mx-auto">
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="bg-black border-white text-white placeholder-gray-400"
                  maxLength={20}
                />
                <div className="flex gap-2">
                  <Button 
                    onClick={submitScore}
                    disabled={!playerName.trim() || isSubmittingScore}
                    className="flex-1 bg-white text-black hover:bg-gray-200"
                  >
                    {isSubmittingScore ? 'Submitting...' : 'Submit Score'}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={startGame}
                    className="border-white text-white hover:bg-white hover:text-black"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button 
                variant="ghost"
                onClick={() => setGameState('menu')}
                className="text-gray-400 hover:text-white"
              >
                Back to Menu
              </Button>
            </motion.div>
          )}

          {gameState === 'leaderboard' && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-center text-white">Leaderboard</h3>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {leaderboard.length > 0 ? (
                  leaderboard.map((entry, index) => (
                    <div 
                      key={entry.id}
                      className="flex justify-between items-center p-3 rounded bg-gray-900 border border-gray-700"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-white">#{index + 1}</span>
                        <span className="text-white">{entry.playerName}</span>
                      </div>
                      <span className="text-xl font-bold text-white">{entry.score}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-400">No scores yet. Be the first!</p>
                )}
              </div>

              <div className="flex gap-2 justify-center">
                <Button 
                  onClick={startGame}
                  className="bg-white text-black hover:bg-gray-200"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Play Again
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setGameState('menu')}
                  className="border-white text-white hover:bg-white hover:text-black"
                >
                  Back to Menu
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}