import React, { useState } from 'react';
import type { GameLevel, Position } from 'src/types/game';
import Tile from './Tile';
import { isHorseEnclosed, getEnclosedTiles } from 'src/utils/validation';
import { calculateScore } from 'src/utils/scoring';
import { getAccessibleTiles } from 'src/utils/pathfinding';
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

  const accessibleTiles = getAccessibleTiles(
    gridWithGates,
    level.horsePosition,
    true
  );

  const enclosed = isHorseEnclosed(gridWithGates, level.horsePosition);
  const enclosedTiles = getEnclosedTiles(
    gridWithGates,
    level.horsePosition
  );

  const handleTileClick = (x: number, y: number) => {
    if (submitted) return;

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
              className="px-4 py-2 rounded font-semibold bg-blue-500 text-white hover:bg-blue-600"
            >
              Next Level →
            </button>
            <button
              onClick={onResetLevel}
              className="px-4 py-2 rounded font-semibold bg-gray-300 text-gray-800 hover:bg-gray-400"
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
          display: 'grid',
          gridTemplateColumns: `repeat(${level.width}, ${TILE_SIZE_PX}px)`,
          gap: 0,
          padding: '8px',
          backgroundColor: '#f9f9f9',
          borderRadius: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        {level.tiles.map((row, y) =>
          row.map((tile, x) => {
            const key = `${x},${y}`;
            const isHorse =
              x === level.horsePosition.x &&
              y === level.horsePosition.y;
            const isGate = placedGates.has(key);
            const isAccessible = accessibleTiles.has(key);

            return (
              <Tile
                key={key}
                type={tile.type}
                position={{ x, y }}
                isHorse={isHorse}
                isGate={isGate}
                isAccessible={isAccessible}
                onClick={() => handleTileClick(x, y)}
                onHover={(hovering) =>
                  hovering
                    ? setHoveredPos({ x, y })
                    : setHoveredPos(null)
                }
              />
            );
          })
        )}
      </div>

      <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md min-w-[280px]">
        <h3 className="font-semibold text-lg">Level Info</h3>

        <div className="border-t pt-3">
          <p className="text-sm text-gray-600 mb-1">Gates Available:</p>
          <p className="text-2xl font-bold text-blue-600">
            {level.maxGates - placedGates.size} / {level.maxGates}
          </p>
        </div>

        <div className="border-t pt-3">
          <p className="text-sm text-gray-600 mb-2">Status:</p>
          <div
            className={`px-3 py-2 rounded text-sm font-semibold ${
              enclosed
                ? 'bg-green-100 text-green-800'
                : 'bg-orange-100 text-orange-800'
            }`}
          >
            {enclosed ? '✓ Horse Enclosed' : '⊗ Not Enclosed Yet'}
          </div>
        </div>

        <div className="border-t pt-3">
          <p className="text-sm text-gray-600 mb-2">Enclosed Tiles:</p>
          <p className="text-lg font-semibold text-purple-600">
            {enclosedTiles.length}
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!enclosed}
          className={`px-4 py-3 rounded font-semibold transition-colors mt-auto ${
            enclosed
              ? 'bg-green-500 text-white hover:bg-green-600 cursor-pointer'
              : 'bg-gray-400 text-gray-100 cursor-not-allowed'
          }`}
        >
          {enclosed ? '✓ Submit Solution' : '⊗ Horse Not Enclosed'}
        </button>
        <button
          onClick={onResetLevel}
          className="px-4 py-2 rounded font-semibold bg-gray-300 text-gray-800 hover:bg-gray-400"
        >
          Reset Level
        </button>
      </div>
    </div>
  );
};

export default GameBoard;
