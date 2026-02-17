import type { GameLevel, Grid, Position, Tile } from 'src/types/game';
import { LEVEL_CONFIGS, PORTAL_COLORS } from './constants';
import { getAccessibleTiles } from './pathfinding';

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

const canReachEdge = (grid: Grid, horsePos: Position): boolean => {
  const accessible = getAccessibleTiles(grid, horsePos, true);
  const width = grid[0].length;
  const height = grid.length;

  // Check if any edge position is reachable
  for (const key of accessible) {
    const [x, y] = key.split(',').map(Number);
    if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
      return true;
    }
  }
  return false;
};

const placeWater = (grid: Grid, numWater: number, horsePos: Position): void => {
  const width = grid[0].length;
  const height = grid.length;
  let placed = 0;
  let attempts = 0;
  const maxAttempts = numWater * 50;

  while (placed < numWater && attempts < maxAttempts) {
    attempts++;
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);

    if (grid[y][x].type === 'grass') {
      // Temporarily place water
      grid[y][x] = { type: 'water' };
      
      // Check if horse can still reach edge
      if (canReachEdge(grid, horsePos)) {
        placed++;
      } else {
        // Revert if it blocks horse
        grid[y][x] = { type: 'grass' };
      }
    }
  }
};

const placeCherries = (grid: Grid, numCherries: number): void => {
  const width = grid[0].length;
  const height = grid.length;
  const centerX = Math.floor(width / 2);
  const centerY = Math.floor(height / 2);
  let placed = 0;

  while (placed < numCherries) {
    // Never place on edges - only in interior (at least 1 tile away from edge)
    const x = Math.floor(Math.random() * (width - 2)) + 1;
    const y = Math.floor(Math.random() * (height - 2)) + 1;

    // Never place on center (where horse spawns)
    if (x === centerX && y === centerY) continue;

    if (grid[y][x].type === 'grass') {
      grid[y][x] = { type: 'cherry' };
      placed++;
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

  const centerX = Math.floor(width / 2);
  const centerY = Math.floor(height / 2);
  
  // Try to place in center area first (within 1-2 tiles of center)
  const searchRadius = Math.max(1, Math.floor(Math.min(width, height) / 4));
  
  for (let radius = 0; radius <= searchRadius; radius++) {
    for (let dx = -radius; dx <= radius; dx++) {
      for (let dy = -radius; dy <= radius; dy++) {
        if (Math.abs(dx) !== radius && Math.abs(dy) !== radius && radius > 0) continue;
        
        const x = centerX + dx;
        const y = centerY + dy;
        
        if (x >= 0 && x < width && y >= 0 && y < height && grid[y][x].type === 'grass') {
          return { x, y };
        }
      }
    }
  }

  return { x: centerX, y: centerY };
};

export const generateLevel = (levelNumber: number): GameLevel => {
  const config = LEVEL_CONFIGS[levelNumber - 1] || LEVEL_CONFIGS[0];

  const grid = createEmptyGrid(config.width, config.height);
  const horsePosition = placeHorse(grid);
  
  // Significantly increased water obstacles - more aggressive difficulty scaling
  const numWater = Math.ceil(config.width * config.height * (0.28 + levelNumber * 0.05));
  const numCherries = Math.min(levelNumber + 1, 5);
  const numPortalPairs = levelNumber > 3 ? Math.floor(levelNumber / 2) : 0;

  placeWater(grid, numWater, horsePosition);
  placeCherries(grid, numCherries);
  placePortals(grid, numPortalPairs);

  return {
    width: config.width,
    height: config.height,
    maxGates: config.maxGates,
    tiles: grid,
    horsePosition,
    levelNumber,
  };
};
