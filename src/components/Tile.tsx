import React, { useMemo } from 'react';
import type { Position, TileType } from 'src/types/game';
import { getTextureDataURL } from 'src/utils/textureGenerator';
import { TILE_SIZE_PX } from 'src/utils/constants';

interface TileProps {
  type: TileType;
  position: Position;
  isHorse: boolean;
  isGate: boolean;
  isAccessible: boolean;
  isEscapePath: boolean;
  isEnclosed: boolean;
  onClick: () => void;
  onHover: (hovering: boolean) => void;
}

const getTileStyle = (
  type: TileType,
  isGate: boolean,
  isAccessible: boolean,
  isEscapePath: boolean,
  isEnclosed: boolean,
  textureDataURL: string
): React.CSSProperties => {
  let bgColor = '#90EE90';
  let bgImage = `url('${textureDataURL}')`;
  let boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
  let backgroundSize = '64px 64px';

  if (isEscapePath) {
    bgColor = '#90EE90';
    bgImage = `linear-gradient(135deg, rgba(144, 238, 144, 0.9) 0%, rgba(124, 205, 124, 0.9) 100%)`;
    boxShadow = 'inset 0 1px 3px rgba(255,255,255,0.5), 0 0 12px rgba(144,238,144,0.8)';
  } else if (isGate) {
    bgColor = '#654321';
    bgImage = `url('${textureDataURL}')`;
    boxShadow = 'inset 0 2px 4px rgba(255,255,255,0.3), 0 3px 6px rgba(0,0,0,0.4)';
  } else if (isAccessible) {
    bgColor = '#d4f4dd';
    bgImage = `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5) 0%, transparent 70%)`;
    boxShadow = 'inset 0 1px 2px rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.05)';
  } else if (isEnclosed && type === 'grass') {
    // Grass that's inside enclosure becomes wheat
    bgColor = '#D4AF37';
    bgImage = `url('${textureDataURL}')`;
    boxShadow = 'inset 0 1px 2px rgba(255,255,255,0.4), 0 1px 3px rgba(0,0,0,0.1)';
  }

  return {
    width: TILE_SIZE_PX,
    height: TILE_SIZE_PX,
    backgroundColor: bgColor,
    backgroundImage: bgImage,
    backgroundSize,
    backgroundRepeat: 'repeat',
    border: '1px solid rgba(0,0,0,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: type === 'grass' && !isGate ? 'pointer' : 'default',
    fontSize: '24px',
    fontWeight: 'bold',
    transition: 'all 0.12s cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: isAccessible || isEscapePath ? 0.9 : 1,
    boxShadow,
    position: 'relative',
  };
};

const Tile: React.FC<TileProps> = ({
  type,
  position,
  isHorse,
  isGate,
  isAccessible,
  isEscapePath,
  isEnclosed,
  onClick,
  onHover,
}) => {
  const textureDataURL = useMemo(() => {
    if (isEscapePath || isAccessible) return '';
    
    if (isGate) {
      return getTextureDataURL('gate');
    }
    
    // If enclosed and grass, show wheat texture
    if (isEnclosed && type === 'grass') {
      return getTextureDataURL('wheat');
    }
    
    // Otherwise use normal tile texture
    return getTextureDataURL(type);
  }, [type, isGate, isEscapePath, isAccessible, isEnclosed]);

  const style = getTileStyle(type, isGate, isAccessible, isEscapePath, isEnclosed, textureDataURL);

  return (
    <div
      style={style}
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      title={`(${position.x}, ${position.y}) - ${type}`}
    >
      {isHorse && (
        <span
          style={{
            filter: isEscapePath ? 'drop-shadow(0 0 3px rgba(0,0,0,0.5))' : 'none',
            textShadow: '0 1px 2px rgba(0,0,0,0.2)',
            fontSize: '32px',
            zIndex: 10,
          }}
        >
          🐴
        </span>
      )}
    </div>
  );
};

export default Tile;
