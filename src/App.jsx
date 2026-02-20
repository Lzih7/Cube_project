import React, { useState } from 'react';
import Cube from './components/Cube';
import ControlPanel from './components/ControlPanel';
import { initializeCube } from './utils/cubeLogic';
import { executeMove, scrambleCube } from './utils/rotations';
import './App.css';
import './cube.css';

function App() {
  const [cube, setCube] = useState(initializeCube());
  const [moveHistory, setMoveHistory] = useState([]);

  const handleMove = (move) => {
    setCube(prevCube => executeMove(prevCube, move));
    setMoveHistory(prev => [...prev, move]);
  };

  const handleReset = () => {
    setCube(initializeCube());
    setMoveHistory([]);
  };

  const handleShuffle = () => {
    // 随机打乱20步
    const { cube: newCube, moves } = scrambleCube(cube, 20);
    setCube(newCube);
    // 将打乱步骤添加到历史记录中，或者清空历史记录并显示"已打乱"
    // 这里选择追加记录，方便用户回溯（虽然步数较多）
    setMoveHistory(prev => [...prev, ...moves]);
  };

  return (
    <div className="app">
      <h1>三阶魔方模拟器</h1>
      <div className="main-content">
        <Cube cube={cube} />
        <ControlPanel onMove={handleMove} />
      </div>
      <div className="info-panel">
        {/*<p>历史操作: {moveHistory.join(' ') || '(无)'}</p>*/}
        <div className="button-group">
          <button className="action-button shuffle-button" onClick={handleShuffle}>
            随机打乱
          </button>
          <button className="action-button reset-button" onClick={handleReset}>
            重置魔方
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
