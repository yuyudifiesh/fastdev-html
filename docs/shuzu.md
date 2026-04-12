# 数组

## 快速开始

### 数组去重

```javascript
const arr = [1, 2, 2, 3, 4, 4, 5];

const uniqueArr = [...new Set(arr)];

console.log(uniqueArr); // [1, 2, 3, 4, 5]
```

### 数组扁平化
将多维数组转换为一维数组。现代浏览器支持 `flat(Infinity)`，如果需要兼容旧环境，可以使用 `reduce` 递归。

```javascript
const deepArr = [1, [2, [3, [4, 5]]], 6];

// 现代语法
const flat1 = deepArr.flat(Infinity);

// 兼容写法
const flat2 = deepArr.reduce((acc, val) => 
  acc.concat(Array.isArray(val) ? flat2(val) : val), []
);

console.log(flat1); // [1, 2, 3, 4, 5, 6]
```

### 数组乱序
经典的 Fisher-Yates 洗牌算法，或者利用 `sort` 的随机比较

```javascript
const arr = [1, 2, 3, 4, 5];

// 方法：利用 sort 的随机比较函数
const shuffled = [...arr].sort(() => Math.random() - 0.5);

console.log(shuffled); // 例如：[3, 1, 5, 2, 4]
```

### 数组排序
注意：默认的 `sort()` 是按字符编码排序的，数字排序必须传入比较函数。

```javascript
const numbers = [10, 5, 40, 25];

// 升序
numbers.sort((a, b) => a - b); 

// 降序
numbers.sort((a, b) => b - a);

console.log(numbers); // [5, 10, 25, 40]
```

### 寻找数组交集与差集
利用 `filter` 和 `includes` 快速处理两个数组的关系。

```javascript
const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];

// 交集 (在 arr1 中 且 在 arr2 中)
const intersection = arr1.filter(item => arr2.includes(item));

// 差集 (在 arr1 中 但 不在 arr2 中)
const difference = arr1.filter(item => !arr2.includes(item));

console.log(intersection); // [3, 4]
console.log(difference);   // [1, 2]
```

### 数组转对象
将数组根据某个属性转换为对象，常用于通过 ID 快速查找数据。

```javascript
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

// 方法：reduce
const userMap = users.reduce((acc, curr) => {
  acc[curr.id] = curr;
  return acc;
}, {});

console.log(userMap);
// { 1: { id: 1, name: 'Alice' }, 2: { id: 2, name: 'Bob' } }
```

### 数组合并与去重

```javascript
const arr1 = [1, 2, 3];
const arr2 = [3, 4, 5];

// 合并并去重
const merged = [...new Set([...arr1, ...arr2])];

console.log(merged); // [1, 2, 3, 4, 5]
```

### 数组求和

```javascript
const nums = [1, 2, 3, 4, 5];

// 方法：reduce
const sum = nums.reduce((acc, curr) => acc + curr, 0);

console.log(sum); // 15
```

### 移除数组中的假值
快速清理数组中的 `false`, `null`, `0`, `""`, `undefined`, `NaN`。

```javascript
const dirtyArr = [0, 1, false, 2, '', 3, null, undefined];

// 方法：filter(Boolean)
const cleanArr = dirtyArr.filter(Boolean);

console.log(cleanArr); // [1, 2, 3]
```