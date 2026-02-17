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
      <div className="text-center mb-8 bg-white/40 backdrop-blur-sm px-6 py-4 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-5xl font-bold text-green-800 drop-shadow-lg mb-2">
          🐴 Enclose.Horse
        </h1>
        <p className="text-green-700 text-lg font-semibold">
          Level {level.levelNumber} • Total Score: {totalScore}
        </p>
      </div>

      {/* Instructions Above Game */}
      <div className="bg-white/40 backdrop-blur-sm px-6 py-4 rounded-lg shadow-md text-green-800 font-semibold mb-6 w-full max-w-2xl text-center">
        <p className="text-sm text-green-700 mb-1">INSTRUCTIONS</p>
        <p className="text-xs leading-relaxed text-green-700">
          Place gates strategically to enclose the horse. Hover over 🐴 to see escape routes.
        </p>
      </div>

      {/* Center: Game Board */}
      <main className="flex items-center justify-center mb-6">
        <GameBoard
          level={level}
          onNextLevel={handleNextLevel}
          onResetLevel={handleResetLevel}
        />
      </main>

      {/* Tips Below Game */}
      <div className="bg-white/40 backdrop-blur-sm px-6 py-4 rounded-lg shadow-md text-green-800 font-semibold w-full max-w-2xl text-center">
        <p className="text-sm text-green-700 mb-1">TIPS</p>
        <p className="text-xs leading-relaxed text-green-700">
          Cherries increase your score. Water blocks the horse. Watch for portal pairs!
        </p>
      </div>
    </div>
  );
}

export default App;
