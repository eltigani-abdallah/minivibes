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

const getTileStyle = (
  type: TileType,
  isGate: boolean,
  isAccessible: boolean,
  isEscapePath: boolean
): React.CSSProperties => {
  let bgColor = '#90EE90';
  let bgImage = 'none';
  let boxShadow = '0 1px 3px rgba(0,0,0,0.1)';

  if (isEscapePath) {
    bgColor = '#90EE90';
    bgImage = 'linear-gradient(135deg, #90EE90 0%, #7CCD7C 100%)';
    boxShadow = 'inset 0 1px 3px rgba(255,255,255,0.5), 0 0 8px rgba(144,238,144,0.6)';
  } else if (isGate) {
    bgColor = '#654321';
    bgImage = 'linear-gradient(135deg, #8B4513 0%, #654321 100%)';
    boxShadow = 'inset 0 2px 4px rgba(255,255,255,0.3), 0 3px 6px rgba(0,0,0,0.4)';
  } else if (isAccessible) {
    bgColor = '#d4f4dd';
    bgImage = 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5) 0%, transparent 70%)';
    boxShadow = 'inset 0 1px 2px rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.05)';
  } else {
    switch (type) {
      case 'grass':
        bgColor = '#90EE90';
        bgImage = 'linear-gradient(135deg, #98FB98 0%, #7CCD7C 100%), repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(124,205,124,0.1) 2px, rgba(124,205,124,0.1) 4px)';
        boxShadow = 'inset 0 1px 2px rgba(255,255,255,0.5), 0 1px 3px rgba(0,0,0,0.1)';
        break;
      case 'water':
        bgColor = '#4A90E2';
        bgImage = 'linear-gradient(135deg, #6BA3FF 0%, #3A7BC8 100%), repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,255,255,0.1) 4px, rgba(255,255,255,0.1) 8px)';
        boxShadow = 'inset 0 2px 4px rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.2)';
        break;
      case 'cherry':
        bgColor = '#90EE90';
        bgImage = 'linear-gradient(135deg, #98FB98 0%, #7CCD7C 100%)';
        boxShadow = 'inset 0 1px 2px rgba(255,255,255,0.5), 0 1px 3px rgba(0,0,0,0.1)';
        break;
      case 'portal':
        bgColor = '#E994FF';
        bgImage = 'conic-gradient(from 0deg, #E994FF, #D46EFF, #C847FF, #E994FF)';
        boxShadow = 'inset 0 1px 3px rgba(255,255,255,0.3), 0 0 6px rgba(201,94,255,0.6)';
        break;
    }
  }

  return {
    width: TILE_SIZE_PX,
    height: TILE_SIZE_PX,
    backgroundColor: bgColor,
    backgroundImage: bgImage,
    backgroundSize: type === 'grass' ? '100% 100%, 8px 8px' : '100% 100%',
    border: '1px solid rgba(0,0,0,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: type === 'grass' && !isGate ? 'pointer' : 'default',
    fontSize: '20px',
    fontWeight: 'bold',
    transition: 'all 0.12s cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: isAccessible || isEscapePath ? 0.9 : 1,
    boxShadow,
    position: 'relative',
  };
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
      return '✨';
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
  const style = getTileStyle(type, isGate, isAccessible, isEscapePath);
  const content = getTileContent(type, isHorse);

  return (
    <div
      style={style}
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      title={`(${position.x}, ${position.y}) - ${type}`}
    >
      {content && (
        <span
          style={{
            filter: isHorse && isEscapePath ? 'drop-shadow(0 0 3px rgba(0,0,0,0.5))' : 'none',
            textShadow: isHorse ? '0 1px 2px rgba(0,0,0,0.2)' : 'none',
          }}
        >
          {content}
        </span>
      )}
    </div>
  );
};

export default Tile;
