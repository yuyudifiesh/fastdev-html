# 节流

## 快速开始

### 基础时间戳版

利用时间戳来判断时间差。这种方式的特点是**立即执行**，也就是在事件触发的一瞬间就会执行一次，然后在设定的时间内不再执行。

```javascript
function throttle(fn, delay) {
  let previous = 0;

  return function(...args) {
    const now = Date.now();
    
    // 如果当前时间减去上次执行时间大于设定的延迟
    if (now - previous > delay) {
      fn.apply(this, args);
      previous = now; // 更新上次执行时间
    }
  };
}

// 使用示例：监听滚动，每 100ms 执行一次
window.addEventListener('scroll', throttle(() => {
  console.log('滚动中...', Date.now());
}, 100));
```

### 定时器版

使用 `setTimeout` 来实现。这种方式的特点是**延迟执行**，即事件触发后不会立即执行，而是等待第一个周期结束后再执行，适合那些不需要立即响应，但需要持续反馈的场景。

```javascript
function throttle(fn, delay) {
  let timer = null;

  return function(...args) {
    // 如果定时器不存在，则设置一个
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null; // 执行完毕后清空定时器
      }, delay);
    }
  };
}

// 使用示例：鼠标移动，每 200ms 更新一次坐标
document.addEventListener('mousemove', throttle((e) => {
  console.log(`坐标: ${e.clientX}, ${e.clientY}`);
}, 200));
```

### 混合版

结合了时间戳和定时器的优点。既能保证不错过初始状态，又能防止最后一次操作被忽略。

```javascript
function throttle(fn, delay) {
  let timer = null;
  let previous = 0;

  return function(...args) {
    const now = Date.now();
    const remaining = delay - (now - previous);

    // 如果没有剩余时间（即时间到了），立即执行
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn.apply(this, args);
      previous = now;
    } else if (!timer) {
      // 如果定时器不存在，设置一个定时器处理剩余时间
      timer = setTimeout(() => {
        fn.apply(this, args);
        previous = Date.now();
        timer = null;
      }, remaining);
    }
  };
}
```

### React Hooks 版

在 React 中，我们需要确保节流函数在组件生命周期内保持稳定，避免重复创建。

```javascript
import { useRef, useCallback } from 'react';

function useThrottle(callback, delay) {
  const lastRun = useRef(Date.now());
  const timeoutRef = useRef();

  const throttledFn = useCallback((...args) => {
    const now = Date.now();
    
    // 如果距离上次执行超过 delay，立即执行
    if (now - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = now;
    } else {
      // 否则设置定时器，确保最后一次也能执行
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
      timeoutRef.current = setTimeout(() => {
        callback(...args);
        lastRun.current = now;
        timeoutRef.current = null;
      }, delay - (now - lastRun.current));
    }
  }, [callback, delay]);

  return throttledFn;
}

// 使用示例
// const handleScroll = useThrottle(() => console.log('Scroll'), 200);
// window.addEventListener('scroll', handleScroll);
```