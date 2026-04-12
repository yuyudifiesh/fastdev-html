# 防抖

## 快速开始

### 基础防抖函数

这是最通用的实现方式，利用闭包保存定时器。如果在等待时间内再次触发，则清除之前的定时器。

```javascript
function debounce(fn, delay) {
  let timer = null; // 闭包保存定时器
  
  return function(...args) {
    // 取消上一次的任务
    if (timer) clearTimeout(timer);
    
    // 重新设置定时器
    timer = setTimeout(() => {
      fn.apply(this, args); // 确保 this 指向正确
    }, delay);
  };
}

// 使用示例
const input = document.querySelector('input');
const search = (e) => console.log('搜索:', e.target.value);

input.addEventListener('input', debounce(search, 500));
```

### 立即执行版

有时候我们需要在触发事件的第一次立即执行函数（例如用户快速点击按钮），而不是等待延迟。

```javascript
function debounce(fn, delay, immediate = false) {
  let timer = null;

  return function(...args) {
    const callNow = immediate && !timer; // 判断是否立即执行

    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      timer = null; // 延迟结束后清空 timer，允许下次立即执行
    }, delay);

    if (callNow) {
      fn.apply(this, args);
    }
  };
}

// 使用示例：按钮防抖，第一次点击立即生效，500ms 内再次点击无效
const btn = document.querySelector('button');
const submit = () => console.log('提交表单');

btn.addEventListener('click', debounce(submit, 500, true));
```

### 使用 Lodash 库

如果你项目中已经引入了 Lodash，直接使用它的 `_.debounce` 是最稳妥、兼容性最好的方案，它还提供了 `cancel` 和 `flush` 方法。

```javascript
// 假设已引入 lodash
// import _ from 'lodash';

const handleResize = () => console.log('窗口调整完毕');

// 创建防抖函数
const debouncedResize = _.debounce(handleResize, 300);

window.addEventListener('resize', debouncedResize);

// 高级用法：立即取消防抖并执行
// debouncedResize.flush(); 
```