import type { Position } from 'src/types/game';
import { CHERRY_BONUS_POINTS, GRASS_POINT_VALUE } from './constants';

interface EnclosureInfo {
  tiles: Position[];
  grid: any[][];
}

export const calculateScore = (enclosureInfo: EnclosureInfo): number => {
  let basePoints = 0;
  let cherryCount = 0;

  for (const pos of enclosureInfo.tiles) {
    const tile = enclosureInfo.grid[pos.y][pos.x];

    if (tile.type === 'grass') {
      basePoints += GRASS_POINT_VALUE;
    } else if (tile.type === 'cherry') {
      // Cherries count as grass tile + bonus
      basePoints += GRASS_POINT_VALUE;
      cherryCount += 1;
    }
  }

  const bonusPoints = cherryCount * CHERRY_BONUS_POINTS;
  return basePoints + bonusPoints;
};
