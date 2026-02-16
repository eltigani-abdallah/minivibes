import { useState, useCallback, useEffect } from 'react';
import type { Position, Grid } from 'src/types/game';
import { getAccessibleTiles } from 'src/utils/pathfinding';

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
      const accessible = getAccessibleTiles(
        grid,
        horsePosition,
        true
      );
      setEscapePath(accessible);
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
