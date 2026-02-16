import React from 'react';
import type { Position, TileType } from 'src/types/game';
import { TILE_SIZE_PX } from 'src/utils/constants';

interface TileProps {
  type: TileType;
  position: Position;
  isHorse: boolean;
  isGate: boolean;
  isAccessible: boolean;
  isEscapePath: boolean;
  onClick: () => void;
  onHover: (hovering: boolean) => void;
}

const getTileBackgroundColor = (
  type: TileType,
  isGate: boolean,
  isAccessible: boolean,
  isEscapePath: boolean
): string => {
  if (isEscapePath) return '#90EE90'; // bright green for escape path
  if (isGate) return '#654321'; // gate color
  if (isAccessible) return '#d4f4dd'; // light green overlay

  switch (type) {
    case 'grass':
      return '#90EE90';
    case 'water':
      return '#4A90E2';
    case 'cherry':
      return '#90EE90';
    case 'portal':
      return '#E994FF';
    default:
      return '#ffffff';
  }
};

const getTileContent = (
  type: TileType,
  isHorse: boolean
): React.ReactNode => {
  if (isHorse) return '🐴';

  switch (type) {
    case 'water':
      return '💧';
    case 'cherry':
      return '🍒';
    case 'portal':
      return '⭕';
    default:
      return '';
  }
};

const Tile: React.FC<TileProps> = ({
  type,
  position,
  isHorse,
  isGate,
  isAccessible,
  isEscapePath,
  onClick,
  onHover,
}) => {
  const bgColor = getTileBackgroundColor(
    type,
    isGate,
    isAccessible,
    isEscapePath
  );
  const content = getTileContent(type, isHorse);

  return (
    <div
      style={{
        width: TILE_SIZE_PX,
        height: TILE_SIZE_PX,
        backgroundColor: bgColor,
        border: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: type === 'grass' && !isGate ? 'pointer' : 'default',
        fontSize: '24px',
        fontWeight: 'bold',
        transition: 'all 0.15s ease',
        opacity: isAccessible || isEscapePath ? 0.85 : 1,
        boxShadow:
          isHorse && isEscapePath
            ? '0 0 8px rgba(144, 238, 144, 0.8)'
            : isHorse
              ? '0 0 8px rgba(0,0,0,0.3)'
              : 'none',
      }}
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      title={`(${position.x}, ${position.y}) - ${type}`}
    >
      {content}
    </div>
  );
};

export default Tile;
