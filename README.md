# 三阶魔方模拟器

基于 React + Vite 构建的三阶魔方模拟器，使用 3×3×3 三维数组数据结构表示魔方状态。

## 功能特性

- 3×3×3 三维数组数据结构
- CSS 3D Transform 渲染
- 按钮控制面板
- 支持标准魔方记号（U/D/F/B/L/R）
- 支持顺时针和逆时针转动
- 转动历史记录

## 转动指令

- **U / U'**: 上层顺时针/逆时针
- **D / D'**: 下层顺时针/逆时针
- **F / F'**: 前层顺时针/逆时针
- **B / B'**: 后层顺时针/逆时针
- **L / L'**: 左层顺时针/逆时针
- **R / R'**: 右层顺时针/逆时针

## 运行项目

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 项目结构

```
src/
├── components/
│   ├── Cube.jsx          # 魔方容器组件
│   ├── Cubie.jsx         # 单个小方块组件
│   └── ControlPanel.jsx  # 按钮控制面板
├── utils/
│   ├── cubeLogic.js      # 魔方数据结构和初始化
│   └── rotations.js      # 转动逻辑实现
├── App.jsx               # 主应用组件
├── App.css               # 应用样式
└── cube.css              # 魔方3D样式
```

## 技术栈

- React 18
- Vite 5
- CSS 3D Transform
