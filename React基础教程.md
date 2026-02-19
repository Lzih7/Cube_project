# React 框架完整教程

## 📦 一、React 框架基本内容

### 1. React 是什么？
- React 是一个用于构建用户界面的 JavaScript 库
- 采用组件化开发思想，提高代码复用性
- 使用虚拟 DOM 提高性能
- 支持声明式编程

### 2. 核心概念
- **组件**: UI 的构建块，分为函数组件和类组件
- **JSX**: JavaScript 的语法扩展，允许在 JS 中写 HTML
- **Props**: 组件间传递数据的方式
- **State**: 组件内部状态管理
- **Hooks**: React 18+ 的函数组件特性（如 useState, useEffect, useContext 等）

### 3. React 18 新特性
- 并发渲染（Concurrent Rendering）
- 自动批处理（Automatic Batching）
- Suspense 改进
- 新的 Hooks（useId, useTransition, useDeferredValue）

### 4. 你的项目使用的技术栈
```json
React 18.2.0      // 最新稳定版本
Vite 5.0.0        // 现代化构建工具
```

---

## 🛠️ 二、环境构建

### 1. 当前环境检查
✅ Node.js v18.19.1（推荐 >= 16.x）
✅ npm 9.2.0
✅ 已安装 React 和 Vite

### 2. 系统要求
- Node.js 16.x 或更高版本
- npm 7.x 或更高版本（或使用 yarn/pnpm）
- 现代浏览器（Chrome、Firefox、Safari、Edge）

### 3. 创建新 React 项目的三种方式

#### 方式 1: Vite（推荐，速度快）
```bash
# 创建项目
npm create vite@latest my-app -- --template react

# 进入项目目录
cd my-app

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

#### 方式 2: Create React App（官方脚手架）
```bash
# 创建项目
npx create-react-app my-app

# 进入项目目录
cd my-app

# 启动开发服务器
npm start
```

#### 方式 3: Next.js（全栈框架，支持 SSR）
```bash
# 创建项目
npx create-next-app@latest my-app

# 进入项目目录
cd my-app

# 启动开发服务器
npm run dev
```

### 4. 其他包管理器
```bash
# 使用 Yarn
yarn create vite my-app --template react

# 使用 pnpm（最快，节省磁盘空间）
pnpm create vite my-app --template react
```

### 5. 你的项目已配置好，无需重新构建

---

## 💻 三、命令行操作详解

### 1. package.json 中的脚本命令

| 命令 | 作用 | 端口 |
|------|------|------|
| `npm run dev` | 启动开发服务器（热重载） | 5173 |
| `npm run build` | 构建生产版本 | - |
| `npm run preview` | 预览构建结果 | 4173 |
| `npm run lint` | 代码检查 | - |

### 2. 开发流程完整命令

```bash
# 1️⃣ 初次安装依赖
npm install

# 2️⃣ 启动开发服务器
npm run dev
# 浏览器访问: http://localhost:5173
# 支持 Hot Module Replacement (HMR)

# 3️⃣ 安装新依赖
npm install 包名
# 例如: npm install lodash
# 开发依赖: npm install -D @types/react

# 4️⃣ 卸载依赖
npm uninstall 包名

# 5️⃣ 代码检查
npm run lint
# 自动修复: npm run lint -- --fix

# 6️⃣ 构建生产版本
npm run build
# 输出到 dist/ 目录

# 7️⃣ 预览生产版本
npm run preview
# 测试构建后的应用
```

### 3. 常用 npm 命令

```bash
# 查看信息
npm list                          # 查看已安装依赖树
npm list --depth=0                # 仅查看顶层依赖
npm outdated                      # 查看过期的包

# 更新依赖
npm update                        # 更新所有依赖
npm update 包名                   # 更新指定包

# 清理和修复
npm cache clean --force           # 清除 npm 缓存
npm ci                            # 清净安装（用于 CI/CD）

# 运行脚本
npm run                           # 列出所有可用脚本
npm test                          # 运行测试（如果配置了）

# 全局操作
npm install -g 包名               # 全局安装包
npm update -g                     # 更新全局包
```

### 4. 开发技巧

```bash
# 启动时指定端口
npm run dev -- --port 3000

# 以 HTTPS 模式启动
npm run dev -- --https

# 打包分析
npm run build -- --mode analyz
```

---

## 📁 四、项目结构解析

### 典型 Vite + React 项目结构

```
Cube_project/
├── src/                          # 源代码目录
│   ├── components/               # React 组件
│   │   ├── Cube.jsx             # 魔方容器组件
│   │   ├── Cubie.jsx            # 单个小方块组件
│   │   └── ControlPanel.jsx     # 按钮控制面板
│   ├── utils/                   # 工具函数
│   │   ├── cubeLogic.js         # 魔方数据结构和初始化
│   │   └── rotations.js         # 转动逻辑实现
│   ├── App.jsx                   # 主应用组件
│   ├── App.css                   # 应用样式
│   ├── cube.css                  # 魔方 3D 样式
│   ├── main.jsx                  # 应用入口文件
│   └── index.css                 # 全局样式
├── public/                       # 静态资源（不会被打包）
│   └── vite.svg
├── node_modules/                 # 依赖包目录
├── index.html                    # HTML 入口文件
├── package.json                  # 项目配置和依赖
├── package-lock.json             # 依赖版本锁定文件
├── vite.config.js                # Vite 配置文件
├── eslint.config.js              # ESLint 代码规范配置
├── .gitignore                    # Git 忽略文件
└── README.md                     # 项目说明文档
```

### 关键文件说明

#### 1. package.json
```json
{
  "name": "cube-project",           // 项目名称
  "private": true,                  // 私有项目，防止意外发布
  "version": "0.0.0",               // 版本号
  "type": "module",                 // 使用 ES 模块
  "scripts": {                      // 脚本命令
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {                 // 生产依赖
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {              // 开发依赖
    "@types/react": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0"
  }
}
```

#### 2. vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,          // 开发服务器端口
    open: true           // 自动打开浏览器
  },
  build: {
    outDir: 'dist',      // 输出目录
    sourcemap: true      // 生成 sourcemap
  }
})
```

#### 3. index.html
```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>三阶魔方模拟器</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## 🎯 五、快速开始你的项目

### 启动步骤

```bash
# 1. 进入项目目录
cd /mnt/d/github/Cube_project

# 2. 安装依赖（首次运行或依赖更新时）
npm install

# 3. 启动开发服务器
npm run dev

# 4. 浏览器访问
# http://localhost:5173
```

### 开发工作流

```bash
# 开发阶段
npm run dev          # 启动开发服务器
# 修改代码后自动热重载

# 代码检查
npm run lint         # 检查代码规范

# 构建生产版本
npm run build        # 打包到 dist/ 目录

# 预览构建结果
npm run preview      # 在本地预览生产版本
```

---

## 📚 六、React 核心概念速查

### 1. 函数组件
```jsx
function MyComponent({ props }) {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // 副作用
    return () => {
      // 清理函数
    };
  }, [dependencies]);

  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### 2. 常用 Hooks

| Hook | 用途 |
|------|------|
| `useState` | 状态管理 |
| `useEffect` | 副作用处理 |
| `useContext` | 上下文消费 |
| `useRef` | 引用 DOM |
| `useMemo` | 缓存计算结果 |
| `useCallback` | 缓存函数 |
| `useReducer` | 复杂状态管理 |

### 3. Props 传递
```jsx
// 父组件
<ChildComponent data={data} onAction={handleAction} />

// 子组件
function ChildComponent({ data, onAction }) {
  return <div>{data}</div>;
}
```

---

## 🔧 七、常用扩展库

### 路由
```bash
npm install react-router-dom
```

### 状态管理
```bash
npm install zustand    # 轻量级
npm install redux      # 复杂应用
npm install jota       # 简单状态
```

### UI 组件库
```bash
npm install antd          # Ant Design
npm install @mui/material # Material UI
npm install chakra-ui     # Chakra UI
```

### 工具库
```bash
npm install axios         # HTTP 请求
npm install dayjs         # 日期处理
npm install lodash        # 工具函数
```

---

## 📖 八、学习资源

### 官方文档
- [React 官方文档](https://react.dev/)
- [Vite 官方文档](https://vitejs.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)

### 推荐教程
- React 基础教程
- React Hooks 详解
- React 性能优化
- React 设计模式

---

## 💡 九、最佳实践

1. **组件命名**: 使用 PascalCase（如 `MyComponent`）
2. **文件组织**: 按功能或类型组织组件
3. **状态管理**: 就近原则，避免过度提升状态
4. **性能优化**: 使用 useMemo、useCallback 避免不必要渲染
5. **代码规范**: 使用 ESLint + Prettier
6. **类型检查**: 使用 TypeScript
7. **测试**: 编写单元测试和集成测试

---

## 🚀 十、下一步学习建议

- **基础**: 深入学习 React Hooks
- **进阶**: React 性能优化技巧
- **生态**: React Router、状态管理方案
- **工程化**: TypeScript、Webpack/Vite 配置
- **全栈**: Next.js、SSR/SSG
- **测试**: Jest、React Testing Library

---

*文档更新时间: 2026-02-19*
*项目路径: /mnt/d/github/Cube_project*
