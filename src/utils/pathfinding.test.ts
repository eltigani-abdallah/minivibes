import { describe, it, expect } from 'vitest';
import { getAccessibleTiles } from 'src/utils/pathfinding';
import type { Grid } from 'src/types/game';

describe('Pathfinding - BFS Algorithm', () => {
  it('should return only the starting position when completely surrounded by walls', () => {
    const grid: Grid = [
      [{ type: 'water' }, { type: 'water' }, { type: 'water' }],
      [{ type: 'water' }, { type: 'grass' }, { type: 'water' }],
      [{ type: 'water' }, { type: 'water' }, { type: 'water' }],
    ];

    const result = getAccessibleTiles(grid, { x: 1, y: 1 }, true);

    expect(result.size).toBe(1);
    expect(result.has('1,1')).toBe(true);
  });

  it('should find all reachable grass tiles in a simple grid', () => {
    const grid: Grid = [
      [{ type: 'grass' }, { type: 'grass' }],
      [{ type: 'grass' }, { type: 'grass' }],
    ];

    const result = getAccessibleTiles(grid, { x: 0, y: 0 }, true);

    expect(result.size).toBe(4);
    expect(result.has('0,0')).toBe(true);
    expect(result.has('1,0')).toBe(true);
    expect(result.has('0,1')).toBe(true);
    expect(result.has('1,1')).toBe(true);
  });

  it('should not cross water tiles', () => {
    const grid: Grid = [
      [{ type: 'grass' }, { type: 'water' }, { type: 'grass' }],
      [{ type: 'grass' }, { type: 'water' }, { type: 'grass' }],
      [{ type: 'grass' }, { type: 'water' }, { type: 'grass' }],
    ];

    const result = getAccessibleTiles(grid, { x: 0, y: 0 }, true);

    expect(result.size).toBe(3);
    expect(result.has('0,0')).toBe(true);
    expect(result.has('0,1')).toBe(true);
    expect(result.has('0,2')).toBe(true);
    expect(result.has('2,0')).toBe(false);
  });

  it('should not cross gate tiles when excludeGates is true', () => {
    const grid: Grid = [
      [{ type: 'grass' }, { type: 'grass' }, { type: 'grass' }],
      [{ type: 'grass' }, { type: 'gate' }, { type: 'grass' }],
      [{ type: 'grass' }, { type: 'grass' }, { type: 'grass' }],
    ];

    const result = getAccessibleTiles(grid, { x: 0, y: 0 }, true);

    expect(result.has('1,1')).toBe(false);
    expect(result.size).toBeLessThan(9);
  });

  it('should handle cherry tiles as passable', () => {
    const grid: Grid = [
      [{ type: 'grass' }, { type: 'cherry' }],
      [{ type: 'grass' }, { type: 'grass' }],
    ];

    const result = getAccessibleTiles(grid, { x: 0, y: 0 }, true);

    expect(result.size).toBe(4);
    expect(result.has('1,0')).toBe(true);
  });

  it('should handle L-shaped movement pattern', () => {
    const grid: Grid = [
      [{ type: 'grass' }, { type: 'grass' }, { type: 'water' }],
      [{ type: 'water' }, { type: 'grass' }, { type: 'grass' }],
      [{ type: 'water' }, { type: 'grass' }, { type: 'grass' }],
    ];

    const result = getAccessibleTiles(grid, { x: 0, y: 0 }, true);

    expect(result.has('0,0')).toBe(true);
    expect(result.has('1,0')).toBe(true);
    expect(result.has('1,1')).toBe(true);
    expect(result.has('2,1')).toBe(true);
    expect(result.has('1,2')).toBe(true);
    expect(result.has('2,2')).toBe(true);
  });
});
