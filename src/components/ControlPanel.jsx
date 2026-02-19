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
  { label: "R'", desc: '右层逆时针' }
];

export default function ControlPanel({ onMove }) {
  return (
    <div className="control-panel">
      <h3>魔方控制</h3>
      <div className="button-grid">
        {MOVES.map(move => (
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
      <div className="instructions">
        <p>点击按钮执行转动操作</p>
      </div>
    </div>
  );
}
