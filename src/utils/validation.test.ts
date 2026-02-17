import { describe, it, expect } from 'vitest';
import { isHorseEnclosed, getEnclosedTiles } from 'src/utils/validation';
import type { Grid } from 'src/types/game';

describe('Validation - Enclosure Detection', () => {
  it('should detect horse is enclosed when completely surrounded by gates', () => {
    const grid: Grid = [
      [{ type: 'water' }, { type: 'water' }, { type: 'water' }],
      [{ type: 'water' }, { type: 'grass' }, { type: 'water' }],
      [{ type: 'water' }, { type: 'water' }, { type: 'water' }],
    ];

    const result = isHorseEnclosed(grid, { x: 1, y: 1 });
    expect(result).toBe(true);
  });

  it('should detect horse is not enclosed when it can reach border', () => {
    const grid: Grid = [
      [{ type: 'grass' }, { type: 'grass' }, { type: 'grass' }],
      [{ type: 'grass' }, { type: 'grass' }, { type: 'grass' }],
      [{ type: 'grass' }, { type: 'grass' }, { type: 'grass' }],
    ];

    const result = isHorseEnclosed(grid, { x: 1, y: 1 });
    expect(result).toBe(false);
  });

  it('should detect enclosure with mixed obstacles (water + gates)', () => {
    const grid: Grid = [
      [{ type: 'water' }, { type: 'water' }, { type: 'water' }, { type: 'water' }],
      [{ type: 'water' }, { type: 'grass' }, { type: 'grass' }, { type: 'gate' }],
      [{ type: 'water' }, { type: 'grass' }, { type: 'grass' }, { type: 'gate' }],
      [{ type: 'water' }, { type: 'gate' }, { type: 'gate' }, { type: 'gate' }],
    ];

    const result = isHorseEnclosed(grid, { x: 1, y: 1 });
    expect(result).toBe(true);
  });

  it('should not consider horse enclosed if one border is accessible', () => {
    const grid: Grid = [
      [{ type: 'water' }, { type: 'water' }, { type: 'water' }],
      [{ type: 'water' }, { type: 'grass' }, { type: 'grass' }],
      [{ type: 'water' }, { type: 'water' }, { type: 'water' }],
    ];

    const result = isHorseEnclosed(grid, { x: 1, y: 1 });
    expect(result).toBe(false);
  });

  it('should return correct list of enclosed tiles', () => {
    const grid: Grid = [
      [{ type: 'water' }, { type: 'water' }, { type: 'water' }],
      [{ type: 'water' }, { type: 'grass' }, { type: 'water' }],
      [{ type: 'water' }, { type: 'water' }, { type: 'water' }],
    ];

    const result = getEnclosedTiles(grid, { x: 1, y: 1 });
    expect(result.length).toBe(1);
    expect(result[0]).toEqual({ x: 1, y: 1 });
  });

  it('should return multiple enclosed tiles', () => {
    const grid: Grid = [
      [{ type: 'water' }, { type: 'water' }, { type: 'water' }, { type: 'water' }],
      [{ type: 'water' }, { type: 'grass' }, { type: 'grass' }, { type: 'water' }],
      [{ type: 'water' }, { type: 'grass' }, { type: 'grass' }, { type: 'water' }],
      [{ type: 'water' }, { type: 'water' }, { type: 'water' }, { type: 'water' }],
    ];

    const result = getEnclosedTiles(grid, { x: 1, y: 1 });
    expect(result.length).toBe(4);
  });

  it('should handle horse at edge position', () => {
    const grid: Grid = [
      [{ type: 'grass' }, { type: 'grass' }],
      [{ type: 'grass' }, { type: 'grass' }],
    ];

    const result = isHorseEnclosed(grid, { x: 0, y: 0 });
    expect(result).toBe(false);
  });

  it('should handle cherry tiles as impassable obstacles', () => {
    const grid: Grid = [
      [{ type: 'water' }, { type: 'water' }, { type: 'water' }],
      [{ type: 'water' }, { type: 'grass' }, { type: 'water' }],
      [{ type: 'water' }, { type: 'cherry' }, { type: 'water' }],
    ];

    const result = getEnclosedTiles(grid, { x: 1, y: 1 });
    // Horse at (1,1) can only reach (1,1) since cherry blocks the path
    expect(result.length).toBe(1);
    expect(result).toContainEqual({ x: 1, y: 1 });
  });
});
