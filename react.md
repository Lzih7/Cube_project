## HTML 基础 (超文本标记语言)
HTML (HyperText Markup Language) 是网页的骨架。它不是编程语言，而是一种标记语言。

### 1. 标签结构
HTML 使用标签来定义内容：
- `<tagname>`：开始标签
- `</tagname>`：结束标签
- 示例：`<h1>标题</h1>`，`<p>这是一段文本</p>`

### 2. 常用标签
- **容器标签**：`div` (最常用的块级容器), `span` (行内容器)
- **文本标签**：`h1`~`h6` (标题), `p` (段落)
- **表单标签**：`input` (输入框), `button` (按钮), `form` (表单)
- **列表标签**：`ul` (无序列表), `ol` (有序列表), `li` (列表项)

### 3. 属性 (Attributes)
标签可以拥有属性，提供更多信息：
- `id`：唯一标识符
- `class`：类名 (在 React 中写作 `className`)，用于 CSS 样式
- `src`：资源路径 (如图片 `<img src="..." />`)
- `href`：链接地址 (如 `<a href="...">`)

### 4. DOM 树结构
HTML 文档是一个树形结构 (DOM Tree)：
```html
<html>
  <body>
    <div>
      <p>父子关系</p>
    </div>
  </body>
</html>
```
- `div` 是 `p` 的**父元素** (Parent)
- `p` 是 `div` 的**子元素** (Child)

## react的核心逻辑
1. 组件化，组件名称首字母要大写，与html区分
- export default function App() {...}: 导出默认组件
  1.  **`export default`**:
    *   表示这个函数是该文件的**默认导出**。
    *   其他文件引用时，可以直接用 `import ControlPanel from './ControlPanel'`，名字可以随便起（虽然通常保持一致），而且不需要加花括号 `{}`。

  2.  **`function ControlPanel`**:
    *   定义了一个名为 `ControlPanel` 的 JavaScript 函数。
    *   在 React 中，首字母大写的函数被视为**组件 (Component)**。

  3.  **`({ onMove })`**:
    *   这是**对象解构 (Object Destructuring)**。
    *   React 组件接收一个名为 `props` 的对象作为参数。
    *   完整的写法是 `function ControlPanel(props)`，然后用 `props.onMove` 访问。
    *   这里直接把 `props` 对象里的 `onMove` 属性提取出来，赋值给同名变量 `onMove`。
    *   `onMove` 是父组件（`App.jsx`）传下来的一个**回调函数**，当用户点击按钮时，`ControlPanel` 会调用它来通知父组件更新魔方状态。
2. 与css结合，用`className`来指定css里的`class`
3. {}会让代码"回到"js中
## 箭头函数 (=>)
- => 是箭头函数（Arrow Function）的语法，是 ES6（ECMAScript 2015）引入的一种简洁的函数定义方式。

例如：
```js
const handleChange = (e) => { // e是函数的参数
  // 函数体
};
```
箭头函数与传统的 function 声明相比，语法更简洁，并且不会绑定自己的 this，常用于 React 组件和回调函数中。
## useState
useState是 React 提供的一个 Hook，用于在函数组件中声明和管理状态变量。它的作用是让你可以在组件内部保存和更新数据（比如表单内容、计数器等），并在数据变化时自动重新渲染组件。

用法示例：

`const [count, setCount] = useState(0);`

- count 是当前的状态值（初始值为 0）
- setCount 是用来更新 count 的函数。
- 在代码里，useState 用于管理表单数据、错误信息、提交状态等。

### 为什么必须使用 useState？
如果你只是用普通变量（如 `let count = 0`），会有两个问题：
1. **无法触发渲染**：当你修改普通变量时，React 不知道数据变了，界面不会更新。
2. **数据丢失**：当组件因为其他原因重新渲染时，函数会重新执行，普通变量会被重置为初始值。

`useState` 解决了这两个问题：它能让 React **记住**数据，并且在数据变化时**通知** React 更新界面。

## React 变量机制详解
在 React 组件中，我们主要使用三种类型的"变量"，它们的作用域和生命周期各不相同：

### 1. 普通变量 (Local Variables)
- **定义**：在组件函数内部定义的变量。
- **特点**：
  - **不持久**：每次组件渲染（函数重新执行）时，都会被重置。
  - **无副作用**：修改它们**不会**触发组件重新渲染。
- **用途**：用于临时计算、格式化数据或作为循环的中间变量。
```javascript
function Component() {
  const result = 1 + 1; // 每次渲染都会重新计算
  // ...
}
```

### 2. 状态变量 (State Variables - useState)
- **定义**：使用 `useState` Hook 定义的变量。
- **特点**：
  - **持久化**：在组件的整个生命周期内保持存在，跨渲染保留值。
  - **触发渲染**：调用 `setXxx` 更新函数会通知 React 重新渲染组件。
  - **异步更新**：React 可能会批量处理状态更新，不是立即生效。
- **用途**：用户输入、API 数据、UI 状态（展开/折叠）、计数器等。
```javascript
const [count, setCount] = useState(0);
// 调用 setCount(1) 后，React 会再次调用 Component()，此时 count 为 1
```

### 3. 引用变量 (Ref Variables - useRef)
- **定义**：使用 `useRef` Hook 定义的变量。
- **特点**：
  - **持久化**：像 state 一样，跨渲染保留值。
  - **不触发渲染**：修改 `.current` 属性**不会**触发组件重新渲染。
- **用途**：保存定时器 ID、访问 DOM 元素、存储不需要显示在界面上的可变数据。
```javascript
const timerRef = useRef(null);
// timerRef.current = 123; // 即使修改了，界面也不会因为这行代码而刷新
```

### 总结对比
| 类型 | 跨渲染保持值? | 修改触发渲染? | 适用场景 |
| :--- | :---: | :---: | :--- |
| **普通变量** | ❌ 否 | ❌ 否 | 临时计算、渲染逻辑中的中间值 |
| **State (useState)** | ✅ 是 | ✅ 是 | **界面显示的数据**、交互状态 |
| **Ref (useRef)** | ✅ 是 | ❌ 否 | 计时器、DOM 操作、幕后数据 |