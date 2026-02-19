import React from 'react';
import Cubie from './Cubie';

export default function Cube({ cube }) {
  const cubies = [];

  // 遍历3x3x3的三维数组，生成27个小方块 (Cubie)
  // 坐标系范围：x, y, z 均从 -1 到 1
  // x: 左(-1) -> 右(1)
  // y: 下(-1) -> 上(1)
  // z: 后(-1) -> 前(1)
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const cubie = cube[x + 1][y + 1][z + 1];
        cubies.push(
          <Cubie
            key={`${x}-${y}-${z}`} // 使用坐标作为唯一key
            position={{ x, y, z }} // 传递位置信息
            colors={cubie}         // 传递该小方块6个面的颜色信息
          />
        );
      }
    }
  }

  return (
    <div className="cube-container">
      {/* 渲染包含所有小方块的容器 */}
      <div className="cube">{cubies}</div>
    </div>
  );
}
