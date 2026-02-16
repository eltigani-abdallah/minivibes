import type { GameLevel, Grid, Position, Tile } from 'src/types/game';
import { LEVEL_CONFIGS, PORTAL_COLORS } from './constants';

const createEmptyGrid = (width: number, height: number): Grid => {
  const grid: Grid = [];
  for (let y = 0; y < height; y++) {
    const row: Tile[] = [];
    for (let x = 0; x < width; x++) {
      row.push({ type: 'grass' });
    }
    grid.push(row);
  }
  return grid;
};

const placeWater = (grid: Grid, numWater: number): void => {
  const width = grid[0].length;
  const height = grid.length;

  for (let i = 0; i < numWater; i++) {
    let placed = false;
    while (!placed) {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);

      if (grid[y][x].type === 'grass') {
        grid[y][x] = { type: 'water' };
        placed = true;
      }
    }
  }
};

const placeCherries = (grid: Grid, numCherries: number): void => {
  const width = grid[0].length;
  const height = grid.length;

  for (let i = 0; i < numCherries; i++) {
    let placed = false;
    while (!placed) {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);

      if (grid[y][x].type === 'grass') {
        grid[y][x] = { type: 'cherry' };
        placed = true;
      }
    }
  }
};

const placePortals = (
  grid: Grid,
  numPortalPairs: number
): void => {
  const width = grid[0].length;
  const height = grid.length;

  for (let i = 0; i < numPortalPairs; i++) {
    const color = PORTAL_COLORS[i % PORTAL_COLORS.length];

    // Place first portal
    let placed1 = false;
    while (!placed1) {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);

      if (grid[y][x].type === 'grass') {
        grid[y][x] = {
          type: 'portal',
          portal: { color, position: { x, y } },
        };
        placed1 = true;
      }
    }

    // Place second portal
    let placed2 = false;
    while (!placed2) {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);

      if (grid[y][x].type === 'grass') {
        grid[y][x] = {
          type: 'portal',
          portal: { color, position: { x, y } },
        };
        placed2 = true;
      }
    }
  }
};

const placeHorse = (grid: Grid): Position => {
  const width = grid[0].length;
  const height = grid.length;

  let placed = false;
  while (!placed) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);

    if (grid[y][x].type === 'grass') {
      return { x, y };
    }
  }

  // Fallback
  return { x: Math.floor(width / 2), y: Math.floor(height / 2) };
};

export const generateLevel = (levelNumber: number): GameLevel => {
  const config = LEVEL_CONFIGS[levelNumber - 1] || LEVEL_CONFIGS[0];

  const grid = createEmptyGrid(config.width, config.height);
  const numWater = Math.floor(config.width * config.height * 0.1);
  const numCherries = Math.min(levelNumber + 1, 4);
  const numPortalPairs = levelNumber > 3 ? Math.floor(levelNumber / 2) : 0;

  placeWater(grid, numWater);
  placeCherries(grid, numCherries);
  placePortals(grid, numPortalPairs);

  const horsePosition = placeHorse(grid);

  return {
    width: config.width,
    height: config.height,
    maxGates: config.maxGates,
    tiles: grid,
    horsePosition,
    levelNumber,
  };
};
