import { cloneCube } from './cubeLogic';

// 旋转一个小方块的方向（90度顺时针，基于右手定则）
function rotateCubieColors(cubie, axis) {
  const newCubie = { ...cubie };
  
  // 顺时针旋转90度
  switch(axis) {
    case 'y': 
      // 绕Y轴顺时针 (Thumb Up): Front -> Left -> Back -> Right -> Front
      // 顶面(up)和底面(down)颜色不变
      // new.front = old.right
      // new.left = old.front
      // new.back = old.left
      // new.right = old.back
      [newCubie.front, newCubie.left, newCubie.back, newCubie.right] = 
      [cubie.right, cubie.front, cubie.left, cubie.back];
      break;
    case 'x': 
      // 绕X轴顺时针 (Thumb Right): Front -> Up -> Back -> Down -> Front
      // 左面(left)和右面(right)颜色不变
      // new.front = old.down
      // new.up = old.front
      // new.back = old.up
      // new.down = old.back
      [newCubie.front, newCubie.up, newCubie.back, newCubie.down] = 
      [cubie.down, cubie.front, cubie.up, cubie.back];
      break;
    case 'z': 
      // 绕Z轴顺时针 (Thumb Front): Up -> Right -> Down -> Left -> Up
      // 前面(front)和后面(back)颜色不变
      // new.up = old.left
      // new.right = old.up
      // new.down = old.right
      // new.left = old.down
      [newCubie.up, newCubie.right, newCubie.down, newCubie.left] = 
      [cubie.left, cubie.up, cubie.right, cubie.down];
      break;
  }
  
  return newCubie;
}

/**
 * 旋转魔方的某一层
 * @param {Array} cube - 当前魔方状态
 * @param {Array} positions - 该层所有小方块的坐标列表 [{x,y,z}, ...]
 * @param {string} axis - 旋转轴 ('x', 'y', 'z')
 * @param {number} direction - 旋转方向: 1 (顺时针), -1 (逆时针)
 */
function rotateLayer(cube, positions, axis, direction = 1) {
  const newCube = cloneCube(cube);
  
  // 计算旋转后的新坐标
  // 使用标准的右手定则旋转矩阵 (顺时针 90 度)
  const rotatePos = (x, y, z) => {
    if (direction === 1) { // 顺时针 90度
      switch(axis) {
        case 'y': return [-z, y, x]; // 绕Y轴: (x, z) -> (-z, x) [Front(0,0,1) -> Left(-1,0,0)]
        case 'x': return [x, z, -y]; // 绕X轴: (y, z) -> (z, -y) [Front(0,0,1) -> Up(0,1,0)]
        case 'z': return [y, -x, z]; // 绕Z轴: (x, y) -> (y, -x) [Up(0,1,0) -> Right(1,0,0)]
      }
    } else { // 逆时针 90度
      switch(axis) {
        case 'y': return [z, y, -x];
        case 'x': return [x, -z, y];
        case 'z': return [-y, x, z];
      }
    }
  };
  
  // 第一步：备份当前层的所有小方块数据
  const tempData = {};
  positions.forEach(pos => {
    const { x, y, z } = pos;
    tempData[`${x},${y},${z}`] = { ...cube[x + 1][y + 1][z + 1] };
  });
  
  // 第二步：将每个小方块移动到新位置，并旋转其颜色
  positions.forEach(pos => {
    const { x, y, z } = pos;
    // 计算当前位置(x,y,z)的小方块旋转后的新位置
    const [newX, newY, newZ] = rotatePos(x, y, z);
    
    // 注意：这里逻辑有点绕。
    // 我们遍历的是"源位置"，计算出"目标位置"。
    // 但是 rotateCubieColors 是基于"源小方块"的颜色进行旋转。
    // 所以我们将源位置(tempData)的小方块取出，旋转颜色后，放入新位置(newCube)。
    
    newCube[newX + 1][newY + 1][newZ + 1] = rotateCubieColors(
      tempData[`${x},${y},${z}`],
      axis
    );
    
    // 如果是逆时针旋转，需要旋转颜色3次（相当于逆时针转1次），或者专门写逆时针颜色旋转逻辑。
    // 当前 rotateCubieColors 只支持顺时针。
    // 为了支持逆时针，简单的做法是调用3次顺时针旋转。
    if (direction === -1) {
      newCube[newX + 1][newY + 1][newZ + 1] = rotateCubieColors(newCube[newX + 1][newY + 1][newZ + 1], axis);
      newCube[newX + 1][newY + 1][newZ + 1] = rotateCubieColors(newCube[newX + 1][newY + 1][newZ + 1], axis);
    }
  });
  
  return newCube;
}

// 各种转动操作

/**
 * 旋转顶层 (U - Up)
 * 涉及所有 y=1 的小方块
 */
export function rotateUP(cube, clockwise = true) {
  const layer = [];
  for (let x = -1; x <= 1; x++) {
    for (let z = -1; z <= 1; z++) {
      layer.push({ x, y: 1, z });
    }
  }
  // 绕Y轴旋转
  return rotateLayer(cube, layer, 'y', clockwise ? 1 : -1);
}

/**
 * 旋转底层 (D - Down)
 * 涉及所有 y=-1 的小方块
 */
export function rotateDOWN(cube, clockwise = true) {
  const layer = [];
  for (let x = -1; x <= 1; x++) {
    for (let z = -1; z <= 1; z++) {
      layer.push({ x, y: -1, z });
    }
  }
  // 绕Y轴旋转
  // D 指令是"底面顺时针"。从底面看顺时针，相当于绕Y轴逆时针（因为Y轴向上）。
  // 所以 clockwise=true 时，direction 应为 -1。
  return rotateLayer(cube, layer, 'y', clockwise ? -1 : 1);
}

/**
 * 旋转前层 (F - Front)
 * 涉及所有 z=1 的小方块
 */
export function rotateFRONT(cube, clockwise = true) {
  const layer = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      layer.push({ x, y, z: 1 });
    }
  }
  // 绕Z轴旋转 (F 是绕Z轴顺时针)
  return rotateLayer(cube, layer, 'z', clockwise ? 1 : -1);
}

/**
 * 旋转后层 (B - Back)
 * 涉及所有 z=-1 的小方块
 */
export function rotateBACK(cube, clockwise = true) {
  const layer = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      layer.push({ x, y, z: -1 });
    }
  }
  // 绕Z轴旋转
  // B 指令是"后面顺时针"。从后面看顺时针，相当于绕Z轴逆时针（因为Z轴向前）。
  return rotateLayer(cube, layer, 'z', clockwise ? -1 : 1);
}

/**
 * 旋转左层 (L - Left)
 * 涉及所有 x=-1 的小方块
 */
export function rotateLEFT(cube, clockwise = true) {
  const layer = [];
  for (let y = -1; y <= 1; y++) {
    for (let z = -1; z <= 1; z++) {
      layer.push({ x: -1, y, z });
    }
  }
  // 绕X轴旋转
  // L 指令是"左面顺时针"。从左面看顺时针，相当于绕X轴逆时针（因为X轴向右）。
  return rotateLayer(cube, layer, 'x', clockwise ? -1 : 1);
}

/**
 * 旋转右层 (R - Right)
 * 涉及所有 x=1 的小方块
 */
export function rotateRIGHT(cube, clockwise = true) {
  const layer = [];
  for (let y = -1; y <= 1; y++) {
    for (let z = -1; z <= 1; z++) {
      layer.push({ x: 1, y, z });
    }
  }
  // 绕X轴旋转
  return rotateLayer(cube, layer, 'x', clockwise ? 1 : -1);
}

/**
 * 执行转动操作
 * @param {Array} cube - 当前魔方状态
 * @param {string} move - 转动指令，如 'U', "U'", 'R', "R'"
 * 带有 ' 的指令表示逆时针
 */
export function executeMove(cube, move) {
  const direction = !move.endsWith("'"); // 不带'为顺时针
  
  switch(move.replace("'", "")) {
    case 'U': return rotateUP(cube, direction);
    case 'D': return rotateDOWN(cube, direction);
    case 'F': return rotateFRONT(cube, direction);
    case 'B': return rotateBACK(cube, direction);
    case 'L': return rotateLEFT(cube, direction);
    case 'R': return rotateRIGHT(cube, direction);
    default: return cube;
  }
}

/**
 * 随机打乱魔方
 * @param {Array} cube - 当前魔方状态
 * @param {number} steps - 打乱步数，默认20步
 * @returns {Object} { cube: newCube, moves: [] } - 返回打乱后的魔方和打乱步骤
 */
export function scrambleCube(cube, steps = 20) {
  const moves = ['U', "U'", 'D', "D'", 'F', "F'", 'B', "B'", 'L', "L'", 'R', "R'"];
  let currentCube = cube;
  const scrambleMoves = [];
  
  let lastMoveBase = ''; // 记录上一次转动的基准（如 'U'）
  
  for (let i = 0; i < steps; i++) {
    let randomMove;
    let moveBase;
    
    // 简单的防撤销逻辑：不连续进行相同面的反向转动
    // 虽然不是完美的打乱算法，但够用了
    do {
      randomMove = moves[Math.floor(Math.random() * moves.length)];
      moveBase = randomMove.replace("'", "");
    } while (moveBase === lastMoveBase); // 避免连续转动同一个面（简单处理）
    
    currentCube = executeMove(currentCube, randomMove);
    scrambleMoves.push(randomMove);
    lastMoveBase = moveBase;
  }
  
  return { cube: currentCube, moves: scrambleMoves };
}
