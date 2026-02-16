export type TileType = 'grass' | 'water' | 'cherry' | 'portal' | 'gate';

export interface Position {
  x: number;
  y: number;
}

export interface Portal {
  color: string;
  position: Position;
}

export interface Tile {
  type: TileType;
  portal?: Portal;
}

export type Grid = Tile[][];

export interface GameLevel {
  width: number;
  height: number;
  maxGates: number;
  tiles: Grid;
  horsePosition: Position;
  levelNumber: number;
}
