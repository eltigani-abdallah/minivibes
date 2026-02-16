import type { Grid, Position } from './game';

export interface GameState {
  grid: Grid;
  horsePosition: Position;
  placedGates: Position[];
  maxGates: number;
  isEnclosed: boolean;
  score: number;
  levelNumber: number;
}

export interface UIState {
  showPathOverlay: boolean;
  hoveredPosition: Position | null;
  escapePath: Position[];
}
