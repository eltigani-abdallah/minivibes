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
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-[#90EE90]">
      <header className="text-center mb-6">
        <h1 className="text-5xl font-bold text-green-800 drop-shadow-lg">
          🐴 Enclose.Horse
        </h1>
        <p className="text-green-700 text-lg mt-2 font-semibold">
          Level {level.levelNumber} • Total Score: {totalScore}
        </p>
      </header>

      <main className="flex items-center justify-center">
        <GameBoard
          level={level}
          onNextLevel={handleNextLevel}
          onResetLevel={handleResetLevel}
        />
      </main>

      <footer className="text-center mt-6 text-green-700 text-sm">
        <p>Place gates strategically to enclose the horse • Hover over 🐴 to see escape routes</p>
      </footer>
    </div>
  );
}

export default App;
