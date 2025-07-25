import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

type Player = 'X' | 'O' | null;

export function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<Player | 'draw' | null>(null);

  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  const checkWinner = (newBoard: Player[]) => {
    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a];
      }
    }
    
    if (newBoard.every(cell => cell !== null)) {
      return 'draw';
    }
    
    return null;
  };

  const makeMove = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameResult = checkWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  const getStatusText = () => {
    if (winner === 'draw') return "It's a Draw!";
    if (winner) return `Player ${winner} Wins!`;
    return `Player ${currentPlayer}'s Turn`;
  };

  return (
    <div className="glass-effect rounded-xl p-8 neon-border">
      <h3 className="text-3xl font-bold mb-6 text-neon-green text-center">Tic-Tac-Toe</h3>
      
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-3 gap-2 mb-6">
          {board.map((cell, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => makeMove(index)}
              className="w-20 h-20 glass-effect border border-neon-blue rounded-lg flex items-center justify-center text-2xl font-bold cursor-pointer hover:bg-neon-blue hover:bg-opacity-20 transition-all duration-300 magnetic-hover"
            >
              <span className={cell === 'X' ? 'text-neon-blue' : 'text-neon-purple'}>
                {cell}
              </span>
            </motion.button>
          ))}
        </div>
        
        <div className="flex space-x-4 mb-4">
          <Button
            onClick={resetGame}
            className="magnetic-hover glass-effect px-6 py-3 rounded-full border border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black transition-all duration-300"
            variant="outline"
          >
            Reset Game
          </Button>
        </div>
        
        <div className="text-xl font-semibold text-neon-purple">
          {getStatusText()}
        </div>
      </div>
    </div>
  );
}
