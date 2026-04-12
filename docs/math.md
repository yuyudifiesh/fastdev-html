# 数字与数学

## 快速开始

### 检查偶数/奇数

利用取模运算符 `%` 是判断奇偶性的经典方法。`num % 2 === 0` 表示能被 2 整除，即为偶数。

```javascript
const isEven = num => num % 2 === 0;
const isOdd = num => num % 2 !== 0;

console.log(isEven(4)); // true
console.log(isOdd(7));  // true
```

### 数字格式化（千位分隔符）

现代 JavaScript 提供了强大的 `Intl.NumberFormat` API，不仅能添加千位分隔符，还能根据地区格式化货币、百分比等。

```javascript
// 使用 Intl.NumberFormat
const formatNumber = num => new Intl.NumberFormat('en-US').format(num);

console.log(formatNumber(1234567)); // "1,234,567"

// 或者使用 toLocaleString (简写)
const shortFormat = num => num.toLocaleString('en-US');

console.log(shortFormat(1234567)); // "1,234,567"
```

### 生成指定范围内的随机数

`Math.random()` 生成的是 `[0, 1)` 区间的浮点数。要生成 `[min, max]` 范围内的整数，需要进行相应的数学变换。

```javascript
function randomInt(min, max) {
  // Math.floor 向下取整，确保结果在 [min, max] 范围内
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(randomInt(1, 10)); // 例如: 7
```

### 计算阶乘与最大公约数 (GCD)

阶乘和 GCD 是两个经典的数学算法。

```javascript
// 计算阶乘 (n!)
function factorial(n) {
  // 基线条件：0! 和 1! 都等于 1
  if (n <= 1) return 1;
  // 递归：n! = n * (n-1)!
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120

// 计算最大公约数 (GCD) - 欧几里得算法
function gcd(a, b) {
  // 当 b 为 0 时，a 就是最大公约数
  while (b !== 0) {
    // 将 a % b 的结果赋给 b，原来的 b 赋给 a
    [a, b] = [b, a % b];
  }
  return a;
}

console.log(gcd(48, 18)); // 6
```