import type { Grid, Position } from 'src/types/game';
import { getAccessibleTiles } from './pathfinding';

export const isHorseEnclosed = (
  grid: Grid,
  horsePosition: Position
): boolean => {
  const width = grid[0].length;
  const height = grid.length;

  // Get all accessible tiles from horse position
  const accessibleTiles = getAccessibleTiles(grid, horsePosition, true);

  // Check if any accessible tile is on the border
  for (const posKey of accessibleTiles) {
    const [x, y] = posKey.split(',').map(Number);

    if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
      return false; // Horse can reach the border
    }
  }

  return true; // Horse cannot reach the border
};

export const getEnclosedTiles = (
  grid: Grid,
  horsePosition: Position
): Position[] => {
  const accessibleTiles = getAccessibleTiles(grid, horsePosition, true);
  const enclosed: Position[] = [];

  for (const posKey of accessibleTiles) {
    const [x, y] = posKey.split(',').map(Number);
    enclosed.push({ x, y });
  }

  return enclosed;
};

export const canPlaceGate = (
  grid: Grid,
  position: Position
): boolean => {
  const tile = grid[position.y][position.x];

  // Can only place gates on grass or wheat
  return tile.type === 'grass';
};
