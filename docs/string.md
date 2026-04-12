# 字符串

## 快速开始

### 首字母大写

利用数组的解构赋值，可以非常优雅地将字符串拆解为首字符和剩余部分，分别处理后再拼接。

```javascript
function capitalize(str) {
  if (!str) return '';
  const [first, ...rest] = str.toLowerCase();
  return first.toUpperCase() + rest.join('');
}

console.log(capitalize('hello world')); // "Hello world"
```

### 反转字符串

```javascript
const str = 'Hello World';

// 方法：扩展运算符 + reverse + join
const reversed = [...str].reverse().join('');

console.log(reversed); // "dlroW olleH"
```

### 检查是否为回文

回文是指正读和反读都一样的字符串。核心逻辑是：将字符串反转后与原字符串进行比较。

```javascript
function isPalindrome(str) {
  // 1. 转为小写并去除空格（可选，视需求而定）
  const cleanStr = str.toLowerCase().replace(/\s/g, '');
  // 2. 反转并比较
  return cleanStr === [...cleanStr].reverse().join('');
}

console.log(isPalindrome('A man a plan a canal Panama')); // true
console.log(isPalindrome('hello')); // false
```

### 生成随机 ID / UUID

生成唯一标识符通常有两种场景：一种是现代浏览器环境，一种是兼容旧环境或 Node.js。

#### 现代标准做法 (推荐)
现代浏览器和 Node.js (v14.17+) 原生支持 `crypto.randomUUID()`。

```javascript
const uuid = crypto.randomUUID();

console.log(uuid); 
// 例如："36b8f84d-df4e-4d49-b662-b0de7b84cf6c"
```

#### 传统兼容做法
如果环境不支持 `crypto` API，可以使用 `Math.random()` 配合 16 进制转换来生成简易 ID（注意：这种方法生成的 ID 随机性不如 UUID 强，仅适用于非安全敏感的临时 ID）。

```javascript
const simpleId = 'id-' + Math.random().toString(36).substr(2, 9);

console.log(simpleId); 
// 例如："id-k2j9d8f7a"
```