# 🐴 Enclose.Horse

A browser-based puzzle game where you strategically place gates to enclose a horse within a grid.

## 🎮 Game Objective

Prevent the horse from escaping by strategically placing gates around it. Once enclosed, the grass inside your enclosure becomes wheat, allowing you to submit your solution for points.

### Scoring System
- **1 point** per grass tile enclosed
- **10 bonus points** per cherry enclosed
- More enclosed tiles = higher score

## 🎯 Game Mechanics

### Tile Types

| Tile | Symbol | Description |
|------|--------|-------------|
| **Grass** | 🌱 | Horse can walk. Place gates here. |
| **Water** | 💧 | Horse cannot walk. Natural barrier. |
| **Cherry** | 🍒 | Horse can walk. +10 bonus points if enclosed. |
| **Portal** | ⭕ | Horse teleports to paired portal of same color. |
| **Gate** | 🚪 | Blocks horse movement. Limited quantity per level. |

### Horse Movement
- Moves on a **4-adjacent grid** (up, down, left, right)
- **NO diagonal movement**
- Can walk on: grass, cherry, portal
- Cannot walk on: water, gates

### Enclosure Rules
The horse is enclosed when:
- It **cannot reach the grid border** (all escape routes blocked)
- Blocked by: water, gates, or the grid edge
- Portal pairs must not provide escape routes

## 🎮 How to Play

1. **Observe** the current grid layout
2. **Hover over the horse** 🐴 to see all tiles it can reach (green highlight)
3. **Click on grass tiles** to place gates (limited quantity per level)
4. **Click on placed gates** to remove them and get the gate back
5. **Monitor status** - "Horse Enclosed" will show when you've succeeded
6. **Click "Submit Solution"** to confirm and receive your score

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Lint code
npm run lint

# Format code
npm run format
```

The game will be available at `http://localhost:5173`

## 🧪 Testing

```bash
npm run test         # Run all tests (21 passing)
npm run test -- --watch  # Watch mode
npm run test:ui      # UI dashboard
```

## 🔧 Features

✅ **Fully playable game** in the browser  
✅ **5 progressive levels** with increasing difficulty  
✅ **Real-time path visualization** - hover to see escape routes  
✅ **Proper enclosure detection** with portal handling  
✅ **Responsive UI** with Tailwind CSS  
✅ **21 comprehensive unit tests** - all passing  
✅ **Clean, typed codebase** with TypeScript  

## 📁 Project Structure

```
src/
├── components/  # React UI components
├── hooks/       # Custom React hooks
├── types/       # TypeScript type definitions
├── utils/       # Game logic (pathfinding, validation, scoring)
└── styles/      # Tailwind CSS
```

## 🛠️ Tech Stack

- **React 19** + TypeScript
- **Vite** for fast builds
- **Tailwind CSS** for styling
- **Vitest** for unit tests

---

**Enjoy the puzzle! 🎮**
