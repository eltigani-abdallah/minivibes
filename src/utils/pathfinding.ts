import type { Grid, Position } from 'src/types/game';

export const getAccessibleTiles = (
  grid: Grid,
  startPos: Position,
  excludeGates: boolean = true
): Set<string> => {
  const width = grid[0].length;
  const height = grid.length;
  const visited = new Set<string>();
  const queue: Position[] = [startPos];
  const posKey = (p: Position) => `${p.x},${p.y}`;

  visited.add(posKey(startPos));

  while (queue.length > 0) {
    const current = queue.shift()!;
    const directions = [
      { x: 0, y: -1 }, // up
      { x: 0, y: 1 }, // down
      { x: -1, y: 0 }, // left
      { x: 1, y: 0 }, // right
    ];

    for (const dir of directions) {
      const nextX = current.x + dir.x;
      const nextY = current.y + dir.y;

      if (
        nextX < 0 ||
        nextX >= width ||
        nextY < 0 ||
        nextY >= height
      ) {
        continue;
      }

      const key = `${nextX},${nextY}`;
      if (visited.has(key)) continue;

      const tile = grid[nextY][nextX];

      if (tile.type === 'water') continue;
      if (excludeGates && tile.type === 'gate') continue;

      visited.add(key);
      queue.push({ x: nextX, y: nextY });

      // Handle portal teleportation
      if (tile.type === 'portal' && tile.portal) {
        const portalColor = tile.portal.color;
        // Find the paired portal
        for (let py = 0; py < height; py++) {
          for (let px = 0; px < width; px++) {
            const checkTile = grid[py][px];
            if (
              checkTile.type === 'portal' &&
              checkTile.portal?.color === portalColor &&
              (px !== nextX || py !== nextY)
            ) {
              const portalKey = `${px},${py}`;
              if (!visited.has(portalKey)) {
                visited.add(portalKey);
                queue.push({ x: px, y: py });
              }
            }
          }
        }
      }
    }
  }

  return visited;
};

export const positionToKey = (pos: Position): string =>
  `${pos.x},${pos.y}`;

export const keyToPosition = (key: string): Position => {
  const [x, y] = key.split(',').map(Number);
  return { x, y };
};
