# 对象

## 快速开始

### Deep Clone

深拷贝是前端面试常考题，也是避免数据污染的重要手段。`JSON.parse(JSON.stringify(obj))` 是最简洁的方案，适用于只包含简单数据类型（数字、字符串、布尔值、数组、纯对象）的对象。但如果对象中包含 `undefined`, `Symbol`, `Function`, `Date`, `RegExp` 或循环引用，此方法会失效。

对于更复杂的需求，可以使用 `structuredClone`（现代浏览器支持），或者自己实现一个递归函数。

```javascript
// 简洁版：适用于 JSON 安全的对象
const obj = { a: 1, b: { c: 2 }, d: [3, 4] };
const deepCloned = JSON.parse(JSON.stringify(obj));

// 注意：修改克隆体不会影响原对象
deepCloned.b.c = 999;
console.log(obj.b.c); // 仍然是 2

// 现代版：structuredClone (推荐用于现代环境)
try {
  const modernClone = structuredClone(obj);
  console.log(modernClone);
} catch (e) {
  console.warn('structuredClone not supported in this environment.');
}
```

### 从键值对生成对象

有时我们会有一个键值对数组，需要将其转换为标准的 JavaScript 对象。`Object.fromEntries()` 方法完美地解决了这个问题，它是 `Object.entries()` 的逆向操作。

```javascript
const pairs = [
  ['name', 'Alice'],
  ['age', 30],
  ['city', 'Beijing']
];

const obj = Object.fromEntries(pairs);

console.log(obj); 
// { name: 'Alice', age: 30, city: 'Beijing' }
```

### 对象属性过滤

类似于数组的 `filter`，我们经常需要根据某个条件从对象中挑选出一部分属性。这可以通过 `Object.entries()`、`filter()` 和 `Object.fromEntries()` 的组合来实现。

```javascript
const user = {
  id: 1,
  name: 'Bob',
  email: 'bob@example.com',
  password: 'secret123', // 我们不想包含密码
  isActive: true
};

// 定义一个过滤函数，返回 true 表示保留该属性
const filterFn = ([key, value]) => key !== 'password';

const publicInfo = Object.fromEntries(
  Object.entries(user).filter(filterFn)
);

console.log(publicInfo);
// { id: 1, name: 'Bob', email: 'bob@example.com', isActive: true }

// 更多过滤例子：
// 只保留字符串类型的属性
const stringProps = Object.fromEntries(
  Object.entries(user).filter(([k, v]) => typeof v === 'string')
);
// { name: 'Bob', email: 'password123' }

// 只保留值为 true 的布尔属性
const activeFlags = Object.fromEntries(
  Object.entries(user).filter(([k, v]) => typeof v === 'boolean' && v)
);
// { isActive: true }
```