import React from 'react';
import type { Position, TileType } from 'src/types/game';
import { TILE_SIZE_PX } from 'src/utils/constants';

interface TileProps {
  type: TileType;
  position: Position;
  isHorse: boolean;
  isGate: boolean;
  isAccessible: boolean;
  onClick: () => void;
  onHover: (hovering: boolean) => void;
}

const getTileBackgroundColor = (
  type: TileType,
  isGate: boolean,
  isAccessible: boolean
): string => {
  if (isGate) return '#654321'; // gate color
  if (isAccessible) return '#d4f4dd'; // path overlay

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
  isHorse: boolean,
  portalColor?: string
): React.ReactNode => {
  if (isHorse) return '🐴';

  switch (type) {
    case 'water':
      return '💧';
    case 'cherry':
      return '🍒';
    case 'portal':
      return portalColor
        ? `⭕`
        : '🌀';
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
  onClick,
  onHover,
}) => {
  const bgColor = getTileBackgroundColor(
    type,
    isGate,
    isAccessible
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
        opacity: isAccessible && !isHorse ? 0.7 : 1,
        boxShadow: isHorse ? '0 0 8px rgba(0,0,0,0.3)' : 'none',
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
