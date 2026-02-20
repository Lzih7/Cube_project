import React from 'react';

const MOVES = [
  { label: 'U', desc: '上层顺时针' },
  { label: "U'", desc: '上层逆时针' },
  { label: 'D', desc: '下层顺时针' },
  { label: "D'", desc: '下层逆时针' },
  { label: 'F', desc: '前层顺时针' },
  { label: "F'", desc: '前层逆时针' },
  { label: 'B', desc: '后层顺时针' },
  { label: "B'", desc: '后层逆时针' },
  { label: 'L', desc: '左层顺时针' },
  { label: "L'", desc: '左层逆时针' },
  { label: 'R', desc: '右层顺时针' },
  { label: "R'", desc: '右层逆时针' },
  { label: 'X', desc: '整体绕X轴顺时针' },
  { label: "X'", desc: '整体绕X轴逆时针' },
  { label: 'Y', desc: '整体绕Y轴顺时针' },
  { label: "Y'", desc: '整体绕Y轴逆时针' },
  { label: 'Z', desc: '整体绕Z轴顺时针' },
  { label: "Z'", desc: '整体绕Z轴逆时针' }
];

export default function ControlPanel({ onMove }) {
  const layerMoves = MOVES.slice(0, 12);
  const wholeCubeMoves = MOVES.slice(12);

  return (
    <div className="control-panel">
      <h3>魔方控制</h3>
      
      <div className="move-section">
        <h4>层转动</h4>
        <div className="button-grid">
          {layerMoves.map(move => (
            <button
              key={move.label}
              className="move-button"
              onClick={() => onMove(move.label)}
              title={move.desc}
            >
              {move.label}
            </button>
          ))}
        </div>
      </div>

      <div className="move-section">
        <h4>整体转动</h4>
        <div className="button-grid">
          {wholeCubeMoves.map(move => (
            <button
              key={move.label}
              className="move-button whole-cube-button"
              onClick={() => onMove(move.label)}
              title={move.desc}
            >
              {move.label}
            </button>
          ))}
        </div>
      </div>

      <div className="instructions">
        <p>点击按钮执行转动操作</p>
        <p className="note">X/Y/Z: 整个魔方绕对应轴旋转</p>
      </div>
    </div>
  );
}
