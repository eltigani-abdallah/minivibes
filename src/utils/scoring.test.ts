import { describe, it, expect } from 'vitest';
import { calculateScore } from 'src/utils/scoring';
import type { Grid } from 'src/types/game';

describe('Scoring System', () => {
  it('should calculate score for single grass tile (1 point)', () => {
    const grid: Grid = [[{ type: 'grass' }]];
    const result = calculateScore({
      tiles: [{ x: 0, y: 0 }],
      grid,
    });

    expect(result).toBe(1);
  });

  it('should calculate score for multiple grass tiles', () => {
    const grid: Grid = [
      [{ type: 'grass' }, { type: 'grass' }],
      [{ type: 'grass' }, { type: 'grass' }],
    ];
    const result = calculateScore({
      tiles: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      grid,
    });

    expect(result).toBe(4);
  });

  it('should award 10 point bonus for enclosed cherry', () => {
    const grid: Grid = [[{ type: 'cherry' }]];
    const result = calculateScore({
      tiles: [{ x: 0, y: 0 }],
      grid,
    });

    expect(result).toBe(11); // 1 base + 10 bonus
  });

  it('should calculate score with multiple cherries', () => {
    const grid: Grid = [
      [{ type: 'grass' }, { type: 'cherry' }],
      [{ type: 'cherry' }, { type: 'grass' }],
    ];
    const result = calculateScore({
      tiles: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      grid,
    });

    // 4 tiles (4 points) + 2 cherries (20 bonus) = 24
    expect(result).toBe(24);
  });

  it('should ignore non-enclosed tiles', () => {
    const grid: Grid = [
      [{ type: 'grass' }, { type: 'grass' }, { type: 'grass' }],
      [{ type: 'grass' }, { type: 'grass' }, { type: 'grass' }],
      [{ type: 'grass' }, { type: 'grass' }, { type: 'grass' }],
    ];
    // Only score the enclosed tiles (2 tiles in this case)
    const result = calculateScore({
      tiles: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
      ],
      grid,
    });

    expect(result).toBe(2);
  });

  it('should handle mixed grass and cherry enclosure', () => {
    const grid: Grid = [
      [{ type: 'grass' }, { type: 'cherry' }],
      [{ type: 'grass' }, { type: 'grass' }],
    ];
    const result = calculateScore({
      tiles: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      grid,
    });

    // 4 tiles (4 points) + 1 cherry (10 bonus) = 14
    expect(result).toBe(14);
  });

  it('should calculate zero score for empty enclosure', () => {
    const grid: Grid = [[]];
    const result = calculateScore({
      tiles: [],
      grid,
    });

    expect(result).toBe(0);
  });
});
