import React, { useState } from 'react';
import type { GameLevel, Position } from 'src/types/game';
import { isHorseEnclosed, getEnclosedTiles } from 'src/utils/validation';
import { calculateScore } from 'src/utils/scoring';
import { TILE_SIZE_PX } from 'src/utils/constants';

interface GameBoardProps {
  level: GameLevel;
  onNextLevel: (score: number) => void;
  onResetLevel: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({
  level,
  onNextLevel,
  onResetLevel,
}) => {
  const [placedGates, setPlacedGates] = useState<Set<string>>(
    new Set()
  );
  const [hoveredPos, setHoveredPos] = useState<Position | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const gridWithGates = level.tiles.map((row, y) =>
    row.map((tile, x) => {
      const key = `${x},${y}`;
      if (placedGates.has(key)) {
        return { ...tile, type: 'gate' as const };
      }
      return tile;
    })
  );

  const enclosed = isHorseEnclosed(gridWithGates, level.horsePosition);
  const enclosedTiles = getEnclosedTiles(
    gridWithGates,
    level.horsePosition
  );

  const handleTileClick = (x: number, y: number) => {
    const key = `${x},${y}`;
    const tile = level.tiles[y][x];

    if (tile.type !== 'grass') return;

    const newGates = new Set(placedGates);
    if (newGates.has(key)) {
      newGates.delete(key);
    } else if (newGates.size < level.maxGates) {
      newGates.add(key);
    }
    setPlacedGates(newGates);
  };

  const handleSubmit = () => {
    if (!enclosed) return;

    const enclosureInfo = {
      tiles: enclosedTiles,
      grid: gridWithGates,
    };
    const points = calculateScore(enclosureInfo);
    setScore(points);
    setSubmitted(true);
  };

  const gridWidth = level.width * TILE_SIZE_PX;
  const gridHeight = level.height * TILE_SIZE_PX;

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-6">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          <h2 className="text-4xl font-bold text-green-600 mb-4">
            Level Complete! ✓
          </h2>
          <p className="text-2xl text-gray-800 mb-6">
            Score: {score} points
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => onNextLevel(score)}
              className="button-primary"
            >
              Next Level →
            </button>
            <button
              onClick={onResetLevel}
              className="button-secondary"
            >
              Retry Level
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-8">
      <div
        style={{
          width: gridWidth + 2,
          height: gridHeight + 2,
          border: '2px solid #333',
          backgroundColor: '#f0f0f0',
        }}
      >
        {/* Placeholder for grid rendering */}
        <p className="text-center text-gray-600 pt-4">
          Grid: {level.width}x{level.height}
        </p>
      </div>

      <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md">
        <h3 className="font-semibold text-lg">Controls</h3>
        <div>
          <p className="text-sm text-gray-600">
            Gates Available: {level.maxGates - placedGates.size}
          </p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!enclosed}
          className={`button ${
            enclosed
              ? 'button-primary'
              : 'bg-gray-400 text-white cursor-not-allowed'
          }`}
        >
          {enclosed ? '✓ Submit Solution' : '⊗ Horse Not Enclosed'}
        </button>
        <button
          onClick={onResetLevel}
          className="button-secondary"
        >
          Reset Level
        </button>
      </div>
    </div>
  );
};

export default GameBoard;
