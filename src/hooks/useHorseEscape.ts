import { useState, useCallback, useEffect } from 'react';
import type { Position, Grid } from 'src/types/game';
import { getPathToEdge } from 'src/utils/pathToEdge';

interface UseHorseEscapeProps {
  grid: Grid;
  horsePosition: Position;
}

export const useHorseEscape = ({
  grid,
  horsePosition,
}: UseHorseEscapeProps) => {
  const [escapePath, setEscapePath] = useState<Set<string>>(
    new Set()
  );
  const [isHoveredOnHorse, setIsHoveredOnHorse] = useState(false);

  useEffect(() => {
    if (isHoveredOnHorse) {
      const path = getPathToEdge(
        grid,
        horsePosition
      );
      const pathSet = new Set(path.map(p => `${p.x},${p.y}`));
      setEscapePath(pathSet);
    } else {
      setEscapePath(new Set());
    }
  }, [isHoveredOnHorse, grid, horsePosition]);

  const handleHorseHover = useCallback(
    (hovering: boolean) => {
      setIsHoveredOnHorse(hovering);
    },
    []
  );

  return {
    escapePath,
    isHoveredOnHorse,
    handleHorseHover,
  };
};
