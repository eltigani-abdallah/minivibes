import React, { useState } from 'react';
import type { GameLevel, Position } from 'src/types/game';
import Tile from './Tile';
import { isHorseEnclosed, getEnclosedTiles } from 'src/utils/validation';
import { calculateScore } from 'src/utils/scoring';
import { getAccessibleTiles } from 'src/utils/pathfinding';
import { useHorseEscape } from 'src/hooks/useHorseEscape';
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

  const { escapePath, isHoveredOnHorse, handleHorseHover } =
    useHorseEscape({
      grid: gridWithGates,
      horsePosition: level.horsePosition,
    });

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

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="bg-white rounded-xl shadow-2xl p-12 text-center max-w-md">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-4xl font-bold text-green-600 mb-2">
            Level Complete!
          </h2>
          <p className="text-6xl font-bold text-yellow-500 mb-6">{score}</p>
          <p className="text-gray-600 mb-8">points earned</p>
          <div className="flex gap-4 flex-col">
            <button
              onClick={() => onNextLevel(score)}
              className="px-6 py-3 rounded-lg font-bold bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
            >
              Next Level →
            </button>
            <button
              onClick={onResetLevel}
              className="px-6 py-3 rounded-lg font-bold bg-gray-300 text-gray-800 hover:bg-gray-400 transition-all"
            >
              Retry Level
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex gap-12 items-center">
        {/* Grid Container - Centered and Large */}
        <div className="flex-shrink-0">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${level.width}, ${TILE_SIZE_PX}px)`,
              gap: 0,
              padding: '16px',
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              borderRadius: '12px',
              boxShadow: '0 20px 40px -5px rgba(0, 0, 0, 0.6), inset 0 2px 4px rgba(255,255,255,0.1)',
              border: '3px solid rgba(139, 92, 246, 0.3)',
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
                const isEscapePath = escapePath.has(key);

                return (
                  <Tile
                    key={key}
                    type={tile.type}
                    position={{ x, y }}
                    isHorse={isHorse}
                    isGate={isGate}
                    isAccessible={isAccessible && !isEscapePath}
                    isEscapePath={isEscapePath && isHoveredOnHorse}
                    isEnclosed={enclosed && enclosedTiles.some((t) => t.x === x && t.y === y)}
                    onClick={() => handleTileClick(x, y)}
                    onHover={(hovering) => {
                      if (isHorse) {
                        handleHorseHover(hovering);
                      }
                    }}
                  />
                );
              })
            )}
          </div>
        </div>

        {/* Control Panel */}
        <div className="flex flex-col gap-6 bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-2xl w-80 border border-gray-200">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Level {level.levelNumber}
            </h3>
            <p className="text-sm text-gray-600">
              {level.width}×{level.height} grid
            </p>
          </div>

          <div className="border-t-2 border-gray-200 pt-4">
            <p className="text-sm text-gray-600 font-semibold mb-2">
              GATES REMAINING
            </p>
            <div className="flex items-center gap-3">
              <div className="text-5xl font-bold text-blue-600">
                {level.maxGates - placedGates.size}
              </div>
              <div className="text-sm text-gray-600">
                / {level.maxGates}
              </div>
            </div>
          </div>

          <div className="border-t-2 border-gray-200 pt-4">
            <p className="text-sm text-gray-600 font-semibold mb-3">
              ENCLOSURE STATUS
            </p>
            <div
              className={`px-4 py-3 rounded-lg font-bold text-center transition-all ${
                enclosed
                  ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-2 border-green-400'
                  : 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border-2 border-orange-400'
              }`}
            >
              {enclosed ? '✓ ENCLOSED' : '⊗ NOT ENCLOSED'}
            </div>
          </div>

          <div className="border-t-2 border-gray-200 pt-4">
            <p className="text-sm text-gray-600 font-semibold mb-2">
              ENCLOSED TILES
            </p>
            <p className="text-4xl font-bold text-purple-600">
              {enclosedTiles.length}
            </p>
          </div>

          <div className="border-t-2 border-gray-200 pt-4 bg-blue-50 -mx-8 -mb-8 px-8 py-4 rounded-b-xl">
            <p className="font-semibold text-blue-900 mb-2">💡 TIP</p>
            <p className="text-sm text-blue-800">
              Hover over 🐴 to see where it can escape
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!enclosed}
            className={`px-6 py-4 rounded-lg font-bold transition-all mt-6 ${
              enclosed
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {enclosed ? '✓ SUBMIT SOLUTION' : '⊗ ENCLOSE THE HORSE'}
          </button>
          <button
            onClick={onResetLevel}
            className="px-6 py-3 rounded-lg font-bold bg-gray-200 text-gray-800 hover:bg-gray-300 transition-all"
          >
            Reset Level
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
