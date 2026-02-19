// 魔方颜色定义
export const COLORS = {
  UP: '#FFFFFF',    // 白色 - 上
  DOWN: '#FFFF00',  // 黄色 - 下
  FRONT: '#00FF00', // 绿色 - 前
  BACK: '#0000FF',  // 蓝色 - 后
  LEFT: '#FFA500',  // 橙色 - 左
  RIGHT: '#FF0000'  // 红色 - 右
};

/**
 * 初始化魔方状态
 * 创建一个 3x3x3 的三维数组，每个元素包含该小方块6个面的颜色信息
 * 坐标系定义：
 * x: -1(左), 0(中), 1(右)
 * y: -1(下), 0(中), 1(上)
 * z: -1(后), 0(中), 1(前)
 */
export function initializeCube() {
  const cube = [];
  
  // 遍历所有可能的 x, y, z 坐标
  for (let x = -1; x <= 1; x++) {
    cube[x] = [];
    for (let y = -1; y <= 1; y++) {
      cube[x][y] = [];
      for (let z = -1; z <= 1; z++) {
        // 对于每个小方块，判断其是否处于魔方的表面
        // 如果处于表面，则给对应的面赋予初始颜色
        // 内部面的颜色设为 null
        cube[x][y][z] = {
          up: y === 1 ? COLORS.UP : null,       // 顶层 (y=1)
          down: y === -1 ? COLORS.DOWN : null,  // 底层 (y=-1)
          front: z === 1 ? COLORS.FRONT : null, // 前层 (z=1)
          back: z === -1 ? COLORS.BACK : null,  // 后层 (z=-1)
          left: x === -1 ? COLORS.LEFT : null,  // 左层 (x=-1)
          right: x === 1 ? COLORS.RIGHT : null  // 右层 (x=1)
        };
      }
    }
  }
  
  return cube;
}

// 深拷贝魔方状态
// 为什么需要深拷贝？
// 魔方是一个三维数组，里面存放的是对象。如果只是简单的赋值（如 newCube = cube）或浅拷贝（如 [...cube]），
// 复制的只是内存地址。修改 newCube 会直接影响原来的 cube，导致状态混乱，React 也无法正确检测更新。
// 深拷贝会创建一个完全独立的新副本，修改新副本不会影响原数据。
export function cloneCube(cube) {
  // JSON.parse(JSON.stringify()) 是一种简单粗暴的深拷贝方法
  // 它适用于纯数据对象（没有函数、undefined、Symbol 等）
  // 虽然性能不是最优，但在当前魔方数据结构下完全够用
  return JSON.parse(JSON.stringify(cube));
}

// 获取某个面上的所有小方块
export function getFaceLayer(cube, face) {
  const layer = [];
  
  switch(face) {
    case 'UP':
      for (let x = -1; x <= 1; x++) {
        for (let z = -1; z <= 1; z++) {
          layer.push({ x, y: 1, z });
        }
      }
      break;
    case 'DOWN':
      for (let x = -1; x <= 1; x++) {
        for (let z = -1; z <= 1; z++) {
          layer.push({ x, y: -1, z });
        }
      }
      break;
    case 'FRONT':
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          layer.push({ x, y, z: 1 });
        }
      }
      break;
    case 'BACK':
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          layer.push({ x, y, z: -1 });
        }
      }
      break;
    case 'LEFT':
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          layer.push({ x: -1, y, z });
        }
      }
      break;
    case 'RIGHT':
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          layer.push({ x: 1, y, z });
        }
      }
      break;
  }
  
  return layer;
}
