# `React Hooks`

> 一些好用且常用的自定义 hooks

## Usage

### `useMergeState`

自定义合并依赖项，使用它的好处是在页面上不用写 N 个 useeState 来设置更新组件所需的状态。

```tsx
const { useMergeState } = require('@zero-song/hooks');

export () => {
  const {state, setState} = useMergeState({ count: 0 })
  return (
    <div>
      <Button onClick={()=>{ setState({count: state.count + 1}) }}/>加1</Button>
    </div>
  )
}
```

### `useCreation`

useCreation 是 useMemo 或 useRef 的替代品。换言之，useCreation 这个钩子增强了 useMemo 和 useRef，让这个钩子可以替换这两个钩子。

- useMemo 的值不一定是最新的值，但 useCreation 可以保证拿到的值一定是最新的值
- 对于复杂常量的创建，useRef 容易出现潜在的的性能隐患，但 useCreation 可以避免
  这里的性能隐患是指：

```ts
// 每次重渲染，都会执行实例化 Subject 的过程，即便这个实例立刻就被扔掉了
const a = useRef(new Subject());

// 通过 factory 函数，可以避免性能隐患
const b = useCreation(() => new Subject(), []);
```

### `useUpdate`

强制更新，有的时候我们需要组件强制更新，这个时候就可以使用这个钩子：

### `useReactive`

一种具备**响应式**特点的`useState`，

### `useLatest`

确保获取最新值，且可以解决闭包问题

### `useSingleton`

用于定义只执行一次的代码

```ts
import { useSingleton } from '@zero-song/hooks';

const MyComp = () => {
  // 使用自定义 Hook
  useSingleton(() => {
    console.log('这段代码只执行一次');
  });

  return <div>My Component</div>;
};
```

## 参考文档

- [搞懂这 12 个 Hooks，保证让你玩转 React](https://juejin.cn/post/7101486767336849421)
- [React Hooks 核心原理与实战](https://time.geekbang.org/column/intro/100079901?tab=catalog)
