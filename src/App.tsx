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
    <div className="flex flex-col h-screen w-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      <header className="bg-white shadow-md px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              🐴 Enclose.Horse
            </h1>
            <p className="text-gray-600 text-sm">
              Level {level.levelNumber} • Total Score: {totalScore}
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <GameBoard
          level={level}
          onNextLevel={handleNextLevel}
          onResetLevel={handleResetLevel}
        />
      </main>
    </div>
  );
}

export default App;
