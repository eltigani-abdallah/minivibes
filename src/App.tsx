import React, { useState } from 'react';
import { generateLevel } from 'src/utils/levelGenerator';
import GameBoard from 'src/components/GameBoard';
import type { GameLevel } from 'src/types/game';
import 'src/styles/globals.css';

function App() {
  const [level, setLevel] = useState<GameLevel>(() =>
    generateLevel(1)
  );
  const [totalScore, setTotalScore] = useState(0);

  const handleNextLevel = (levelScore: number) => {
    setTotalScore(totalScore + levelScore);
    setLevel(generateLevel(level.levelNumber + 1));
  };

  const handleResetLevel = () => {
    setLevel(generateLevel(level.levelNumber));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-[#90EE90] p-4">
      {/* Top Info Section */}
      <div className="text-center mb-8 bg-white/40 backdrop-blur-sm px-6 py-4 rounded-lg shadow-md">
        <h1 className="text-5xl font-bold text-green-800 drop-shadow-lg">
          🐴 Enclose.Horse
        </h1>
      </div>

      {/* Center Row: Left Info | Game Board | Right Info */}
      <div className="flex items-center justify-center gap-12">
        {/* Left Info Panel */}
        <div className="bg-white/40 backdrop-blur-sm px-6 py-4 rounded-lg shadow-md text-green-800 font-semibold w-48">
          <div className="text-center">
            <p className="text-lg">Level</p>
            <p className="text-3xl font-bold text-green-900">{level.levelNumber}</p>
          </div>
        </div>

        {/* Game Board */}
        <main className="flex items-center justify-center">
          <GameBoard
            level={level}
            onNextLevel={handleNextLevel}
            onResetLevel={handleResetLevel}
          />
        </main>

        {/* Right Info Panel */}
        <div className="bg-white/40 backdrop-blur-sm px-6 py-4 rounded-lg shadow-md text-green-800 font-semibold w-48">
          <div className="text-center">
            <p className="text-lg">Total Score</p>
            <p className="text-3xl font-bold text-green-900">{totalScore}</p>
          </div>
        </div>
      </div>

      {/* Bottom Info Section */}
      <div className="text-center mt-8 bg-white/40 backdrop-blur-sm px-6 py-4 rounded-lg shadow-md text-green-700 text-sm">
        <p>Place gates strategically to enclose the horse • Hover over 🐴 to see escape routes</p>
      </div>
    </div>
  );
}

export default App;
