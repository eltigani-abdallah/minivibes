import type { Position, Grid } from 'src/types/game';

interface QueueItem {
  pos: Position;
  path: Position[];
}

export const getPathToEdge = (
  grid: Grid,
  startPos: Position
): Position[] => {
  const width = grid[0].length;
  const height = grid.length;
  const visited = new Set<string>();
  const queue: QueueItem[] = [{ pos: startPos, path: [startPos] }];
  visited.add(`${startPos.x},${startPos.y}`);

  const canWalk = (tile: { type: string }): boolean => {
    return tile.type === 'grass' || tile.type === 'cherry' || tile.type === 'portal';
  };

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) break;

    const { pos, path } = current;

    // Check if reached edge
    if (
      pos.x === 0 ||
      pos.x === width - 1 ||
      pos.y === 0 ||
      pos.y === height - 1
    ) {
      return path;
    }

    // Explore neighbors
    const neighbors = [
      { x: pos.x + 1, y: pos.y },
      { x: pos.x - 1, y: pos.y },
      { x: pos.x, y: pos.y + 1 },
      { x: pos.x, y: pos.y - 1 },
    ];

    for (const neighbor of neighbors) {
      if (
        neighbor.x < 0 ||
        neighbor.x >= width ||
        neighbor.y < 0 ||
        neighbor.y >= height
      ) {
        continue;
      }

      const key = `${neighbor.x},${neighbor.y}`;
      if (visited.has(key)) {
        continue;
      }

      const tile = grid[neighbor.y][neighbor.x];
      if (!canWalk(tile)) {
        continue;
      }

      visited.add(key);
      queue.push({
        pos: neighbor,
        path: [...path, neighbor],
      });
    }
  }

  return [];
};
