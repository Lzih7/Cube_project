import React from 'react';

// 小方块的尺寸（像素）
const CUBIE_SIZE = 50;

/**
 * 单个小方块组件 (Cubie)
 * @param {Object} props
 * @param {Object} props.position - {x, y, z} 坐标
 * @param {Object} props.colors - {up, down, front, back, left, right} 6个面的颜色
 */
export default function Cubie({ position, colors }) {
  const { x, y, z } = position;
  
  // 根据坐标计算 CSS transform: translate3d 的值
  // x轴: 左右方向
  // y轴: 上下方向 (CSS中y轴向下为正，但我们逻辑上向上为正，所以取反)
  // z轴: 前后方向
  const translateX = x * CUBIE_SIZE;
  const translateY = -y * CUBIE_SIZE; 
  const translateZ = z * CUBIE_SIZE;

  return (
    <div
      className="cubie"
      style={{
        // 使用 translate3d 定位该小方块在 3D 空间中的位置
        transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px)`
      }}
    >
      {/* 
        每个小方块由6个面组成，只有外露的面会有颜色
        colors 对象中如果某个面的颜色为 null/undefined，则设为透明且不显示
      */}
      
      {/* 上面 (Y=1) */}
      <div
        className="face face-up"
        style={{
          backgroundColor: colors.up || 'transparent',
          opacity: colors.up ? 1 : 0
        }}
      />
      
      {/* 下面 (Y=-1) */}
      <div
        className="face face-down"
        style={{
          backgroundColor: colors.down || 'transparent',
          opacity: colors.down ? 1 : 0
        }}
      />
      
      {/* 前面 (Z=1) */}
      <div
        className="face face-front"
        style={{
          backgroundColor: colors.front || 'transparent',
          opacity: colors.front ? 1 : 0
        }}
      />
      
      {/* 后面 (Z=-1) */}
      <div
        className="face face-back"
        style={{
          backgroundColor: colors.back || 'transparent',
          opacity: colors.back ? 1 : 0
        }}
      />
      
      {/* 左面 (X=-1) */}
      <div
        className="face face-left"
        style={{
          backgroundColor: colors.left || 'transparent',
          opacity: colors.left ? 1 : 0
        }}
      />
      
      {/* 右面 (X=1) */}
      <div
        className="face face-right"
        style={{
          backgroundColor: colors.right || 'transparent',
          opacity: colors.right ? 1 : 0
        }}
      />
    </div>
  );
}
