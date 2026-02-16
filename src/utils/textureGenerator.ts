export const generateGrassTexture = (): string => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  // Base color
  ctx.fillStyle = '#7CCD7C';
  ctx.fillRect(0, 0, 64, 64);

  // Add grass blades
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * 64;
    const y = Math.random() * 64;
    const height = Math.random() * 8 + 4;

    ctx.strokeStyle = `rgba(${Math.random() > 0.5 ? '76, 169, 68' : '102, 194, 92'}, ${Math.random() * 0.4 + 0.3})`;
    ctx.lineWidth = Math.random() * 1.5 + 0.5;
    ctx.beginPath();
    ctx.moveTo(x, y + height);
    ctx.lineTo(x + (Math.random() - 0.5) * 4, y);
    ctx.stroke();
  }

  // Add some darker spots for shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  for (let i = 0; i < 10; i++) {
    ctx.fillRect(Math.random() * 60, Math.random() * 60, Math.random() * 8 + 2, Math.random() * 8 + 2);
  }

  return canvas.toDataURL();
};

export const generateWheatTexture = (): string => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  // Base color - golden
  ctx.fillStyle = '#D4AF37';
  ctx.fillRect(0, 0, 64, 64);

  // Add wheat stalks
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * 64;
    const y = Math.random() * 64;
    const height = Math.random() * 12 + 8;

    ctx.strokeStyle = `rgba(${Math.random() > 0.5 ? '184, 153, 43' : '212, 175, 55'}, ${Math.random() * 0.5 + 0.4})`;
    ctx.lineWidth = Math.random() * 2 + 1;
    ctx.beginPath();
    ctx.moveTo(x, y + height);
    ctx.quadraticCurveTo(x + (Math.random() - 0.5) * 3, y + height * 0.6, x + (Math.random() - 0.5) * 6, y);
    ctx.stroke();

    // Add wheat heads
    if (Math.random() > 0.4) {
      ctx.strokeStyle = `rgba(184, 153, 43, 0.6)`;
      ctx.lineWidth = 1.5;
      for (let j = 0; j < 3; j++) {
        const offsetX = (j - 1) * 2;
        ctx.beginPath();
        ctx.moveTo(x + offsetX, y - 2);
        ctx.lineTo(x + offsetX - 1, y - 6);
        ctx.stroke();
      }
    }
  }

  // Add shadow spots
  ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
  for (let i = 0; i < 8; i++) {
    ctx.fillRect(Math.random() * 60, Math.random() * 60, Math.random() * 10 + 2, Math.random() * 10 + 2);
  }

  return canvas.toDataURL();
};

export const generateWaterTexture = (): string => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  // Base color
  ctx.fillStyle = '#3A7BC8';
  ctx.fillRect(0, 0, 64, 64);

  // Add wave patterns
  for (let i = 0; i < 64; i += 8) {
    ctx.strokeStyle = `rgba(107, 163, 255, ${0.3 + Math.sin(i / 20) * 0.2})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.quadraticCurveTo(16, i - 4, 32, i);
    ctx.quadraticCurveTo(48, i + 4, 64, i);
    ctx.stroke();
  }

  // Add highlights
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  for (let i = 0; i < 8; i++) {
    const x = Math.random() * 64;
    const y = Math.random() * 64;
    ctx.beginPath();
    ctx.arc(x, y, Math.random() * 3 + 2, 0, Math.PI * 2);
    ctx.fill();
  }

  return canvas.toDataURL();
};

export const generateGateTexture = (): string => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  // Base wood color
  ctx.fillStyle = '#654321';
  ctx.fillRect(0, 0, 64, 64);

  // Wood grain
  for (let i = 0; i < 64; i += 2) {
    ctx.fillStyle = `rgba(${139 + Math.random() * 20}, ${67 + Math.random() * 20}, ${33 + Math.random() * 20}, 0.3)`;
    ctx.fillRect(0, i, 64, 1);
  }

  // Vertical planks
  for (let i = 0; i < 64; i += 16) {
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 64);
    ctx.stroke();
  }

  // Horizontal bands
  for (let i = 0; i < 64; i += 20) {
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(64, i);
    ctx.stroke();
  }

  return canvas.toDataURL();
};

export const generateCherryTexture = (): string => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  // Base grass
  ctx.fillStyle = '#7CCD7C';
  ctx.fillRect(0, 0, 64, 64);

  // Draw cherry (simple circle)
  ctx.fillStyle = '#E63946';
  ctx.beginPath();
  ctx.arc(32, 24, 12, 0, Math.PI * 2);
  ctx.fill();

  // Cherry highlight
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.beginPath();
  ctx.arc(28, 20, 4, 0, Math.PI * 2);
  ctx.fill();

  // Stem
  ctx.strokeStyle = '#2D5016';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(32, 24);
  ctx.lineTo(32, 10);
  ctx.stroke();

  // Leaf
  ctx.fillStyle = '#4CAF50';
  ctx.beginPath();
  ctx.ellipse(42, 12, 8, 5, Math.PI / 4, 0, Math.PI * 2);
  ctx.fill();

  return canvas.toDataURL();
};

export const generatePortalTexture = (): string => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  // Base color
  ctx.fillStyle = '#C847FF';
  ctx.fillRect(0, 0, 64, 64);

  // Circular rings
  for (let i = 3; i > 0; i--) {
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.5 / i})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(32, 32, 20 - i * 5, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Center glow
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.beginPath();
  ctx.arc(32, 32, 8, 0, Math.PI * 2);
  ctx.fill();

  // Sparkles
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const x = 32 + Math.cos(angle) * 18;
    const y = 32 + Math.sin(angle) * 18;
    ctx.fillStyle = 'rgba(255, 200, 255, 0.7)';
    ctx.fillRect(x - 2, y - 2, 4, 4);
  }

  return canvas.toDataURL();
};

// Cache for generated textures
const textureCache: { [key: string]: string } = {};

export const getTextureDataURL = (type: string): string => {
  if (!textureCache[type]) {
    switch (type) {
      case 'grass':
        textureCache[type] = generateGrassTexture();
        break;
      case 'wheat':
        textureCache[type] = generateWheatTexture();
        break;
      case 'water':
        textureCache[type] = generateWaterTexture();
        break;
      case 'gate':
        textureCache[type] = generateGateTexture();
        break;
      case 'cherry':
        textureCache[type] = generateCherryTexture();
        break;
      case 'portal':
        textureCache[type] = generatePortalTexture();
        break;
    }
  }
  return textureCache[type];
};
