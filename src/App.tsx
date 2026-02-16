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
    <div className="flex flex-col min-h-screen w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 shadow-2xl px-8 py-6 border-b-4 border-purple-400">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">
            🐴 Enclose.Horse
          </h1>
          <p className="text-purple-100 text-lg mt-2 font-semibold">
            Level {level.levelNumber} • Total Score: {totalScore}
          </p>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-8">
        <GameBoard
          level={level}
          onNextLevel={handleNextLevel}
          onResetLevel={handleResetLevel}
        />
      </main>

      <footer className="bg-black/50 text-center py-3 text-gray-400 text-sm border-t border-gray-700">
        <p>Place gates strategically to enclose the horse • Hover over 🐴 to see escape routes</p>
      </footer>
    </div>
  );
}

export default App;
