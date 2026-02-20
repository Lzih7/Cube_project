# Agent Guidelines for Cube Project

This document provides coding standards, build commands, and conventions for agentic coding assistants working on this 3D Rubik's Cube simulator built with React + Vite.

## Build & Development Commands

### Core Commands
```bash
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Build for production (outputs to dist/)
npm run preview      # Preview production build locally
npm run lint         # Run ESLint code quality checks
```

### Testing
**No test framework is currently configured.** When adding tests:
- Prefer Vitest: `npm install -D vitest @vitest/ui`
- For component tests: React Testing Library
- To run a single test: `npm test -- path/to/test.spec.js`

### Package Management
```bash
npm install          # Install dependencies
npm install <pkg>    # Add new dependency
npm install -D <pkg> # Add dev dependency
```

## Code Style Guidelines

### File & Project Structure
- **Components**: `src/components/ComponentName.jsx`
- **Utilities**: `src/utils/fileName.js`
- **Styles**: `src/fileName.css` (co-located or imported in components)
- **Entry point**: `src/main.jsx`
- **Root component**: `src/App.jsx`

### Component Conventions
- **Use functional components** with React Hooks (no class components)
- **Default exports** for components: `export default function ComponentName({ props }) {}`
- **Named exports** for utilities: `export function helperFunction() {}`
- **Props destructuring** in function parameters: `function Cubie({ position, colors }) {}`

### Naming Conventions
- **Components**: PascalCase (`Cube`, `Cubie`, `ControlPanel`)
- **Functions/variables**: camelCase (`initializeCube`, `moveHistory`)
- **Constants**: UPPER_SNAKE_CASE (`COLORS`, `CUBIE_SIZE`)
- **CSS classes**: kebab-case (`cube-container`, `move-button`)
- **Private/internal functions**: camelCase, optionally prefixed with underscore if needed

### Import Style
```javascript
// 1. React and core libraries first
import React, { useState } from 'react';

// 2. Third-party libraries
import { format } from 'date-fns';

// 3. Internal components (use relative paths)
import Cube from './components/Cube';
import ControlPanel from './components/ControlPanel';

// 4. Internal utilities
import { initializeCube } from './utils/cubeLogic';
import { executeMove } from './utils/rotations';

// 5. Styles (at the end)
import './App.css';
import './cube.css';
```

### React Patterns
```javascript
// State management with hooks
const [cube, setCube] = useState(initializeCube());
const [moveHistory, setMoveHistory] = useState([]);

// Event handlers - use callback pattern for state updates
const handleMove = (move) => {
  setCube(prevCube => executeMove(prevCube, move));
  setMoveHistory(prev => [...prev, move]);
};

// Component keys - use stable identifiers
key={`${x}-${y}-${z}`}  // ✓ Good: stable and unique
key={index}              // ✗ Avoid: can cause issues with reordering

// Conditional rendering
{colors.up && <div className="face face-up" style={{ backgroundColor: colors.up }} />}

// Array mapping with explicit returns
{items.map(item => (
  <Component key={item.id} prop={item.value} />
))}
```

### Error Handling
```javascript
// Default/fallback values for props
function Component({ data = [], count = 0 }) {
  // ...
}

// Guard clauses for edge cases
if (!cube || cube.length === 0) {
  return <div>No cube data</div>;
}

// Safe property access
const color = colors.up || 'transparent';
const opacity = colors.up ? 1 : 0;
```

### Data Structures
- **Deep cloning**: Use `JSON.parse(JSON.stringify(obj))` for simple deep copies (as seen in `cloneCube`)
- **Immutable state updates**: Always return new objects/arrays, never mutate directly
- **3D cube representation**: `cube[x][y][z]` where x,y,z range from -1 to 1

### CSS & Styling
- **Separate CSS files** for component styles (e.g., `cube.css`)
- **Inline styles** only for dynamic values: `style={{ transform: 'translate3d(...)' }}`
- **Class names** use kebab-case
- **BEM-like naming** for clarity: `.cube-container`, `.cubie__face`

### Linting & Code Quality
**Note**: ESLint is not currently installed. To set up:
```bash
npm install -D eslint @eslint/js globals eslint-plugin-react-hooks eslint-plugin-react-refresh
```
- **No unused variables** (except those starting with uppercase/underscore)
- **React Hooks rules** should be enforced
- **ES2020+ syntax** with modules
- **JSX support** enabled
- Run `npm run lint` after setup before committing

## Architecture Notes

### State Management
- **Local component state** with useState is preferred
- **Props drilling** is acceptable for this app size
- **No global state library** (Redux/Zustand) currently implemented

### Data Flow
- **Unidirectional flow**: Parent passes props to children
- **Event bubbling**: Child callbacks update parent state
- **Immutable updates**: All state changes create new objects

### Key Abstractions
- **Cube**: 3×3×3 array representing 27 cubies
- **Cubie**: Individual cube piece with 6 colored faces
- **Move notation**: Standard Rubik's notation (U/D/F/B/L/R with ' for counter-clockwise)

## Language & Localization
- **User-facing text**: Chinese (Simplified)
- **Code comments**: Mix of Chinese and English
- **Variable names**: English only
- **Function documentation**: Chinese JSDoc comments are acceptable

## Performance
- **React keys**: Use stable, unique identifiers (coordinate-based for cubies)
- **Re-renders**: Minimize by using proper keys and avoiding unnecessary state updates
- **CSS transforms**: Use `translate3d` for GPU-accelerated animations
- **Deep cloning**: Acceptable for this scale but consider structuredClone for better performance

## When Making Changes
1. **Run linter**: `npm run lint` and fix any issues
2. **Test manually**: Start dev server with `npm run dev` and verify functionality
3. **Check console**: Ensure no warnings or errors
4. **Preserve patterns**: Follow existing code structure and conventions
5. **Document changes**: Add comments for complex logic

## Prohibited Patterns
- ❌ Class components (use functional components with hooks)
- ❌ Direct state mutation (always create new objects/arrays)
- ❌ Index-based keys when stable IDs exist
- ❌ Inline CSS for static styles (use CSS classes)
- ❌ PropTypes (not configured - add TypeScript if type safety needed)
