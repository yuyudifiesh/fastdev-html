# 元素

## 快速开始

### 检查元素是否存在

在操作 DOM 之前，确保元素存在于文档中是一个好习惯。

```javascript
const el = document.querySelector('.my-element');

// 方法：简单的真值判断
if (el) {
  console.log('元素存在');
} else {
  console.log('元素未找到');
}
```

### 检查元素是否包含特定类名

虽然可以使用 `className` 配合字符串查找，但 `classList.contains` 是性能更好且语义更清晰的标准做法。

```javascript
const box = document.querySelector('.box');

// 方法：classList.contains
const hasActive = box.classList.contains('active');

if (hasActive) {
  // 执行逻辑
}
```

### 检查元素是否可见

判断元素是否在页面上实际可见（即不仅仅存在于 DOM 中，而且宽高不为 0 且未被隐藏）。

```javascript
function isVisible(el) {
  if (!el) return false;
  // 检查 offsetParent 是否为 null (display: none 或 position: fixed 等特殊情况需额外处理)
  // 更严谨的方法是检查 offsetWidth 和 offsetHeight
  return el.offsetWidth > 0 && el.offsetHeight > 0;
}

const element = document.querySelector('.modal');
console.log(isVisible(element));
```

### 检查元素是否包含某子元素

判断一个父元素内部是否包含特定的子元素。

```javascript
const parent = document.querySelector('.parent');
const child = document.querySelector('.child');

// 方法：contains
const isChild = parent.contains(child);

console.log(isChild); // true 或 false
```

### 检查元素是否拥有特定属性

判断元素标签上是否有某个属性（例如 `disabled`, `data-id` 等）。

```javascript
const input = document.querySelector('input');

// 方法：hasAttribute
const hasDisabled = input.hasAttribute('disabled');

console.log(hasDisabled);
```

### 检查元素是否在视口内

判断元素当前是否出现在用户的浏览器可视区域内，常用于懒加载或无限滚动。

```javascript
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

const item = document.querySelector('.lazy-image');
if (isInViewport(item)) {
  // 加载图片
}
```

### 检查元素是否为空节点

判断元素内部是否没有任何内容（包括文本和子标签）。

```javascript
const container = document.querySelector('.container');

// 方法：检查 childNodes 的长度
const isEmpty = !container.hasChildNodes(); 
// 或者更严格地检查文本内容
const isTextEmpty = container.innerText.trim() === '';

console.log(isEmpty);
```

### 检查元素是否匹配选择器

判断某个特定的 DOM 元素是否符合指定的 CSS 选择器规则。

```javascript
const btn = document.querySelector('button');

// 方法：matches
const isPrimaryBtn = btn.matches('.btn-primary');

if (isPrimaryBtn) {
  // 这是一个主按钮
}
```