# 日期

## 快速开始

### 日期格式化

`Intl.DateTimeFormat` 是格式化日期的现代标准方法，它不仅能处理多种格式，还能根据用户本地化设置显示日期。相比手动拼接字符串，它更加健壮和国际化友好。

```javascript
const date = new Date();

// 格式化为本地日期时间
const formattedDateTime = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
}).format(date);

console.log(formattedDateTime); // 例如: "2026/4/12 17:25:00"

// 仅格式化日期部分
const formattedDate = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: 'long', // 或 '2-digit'
  day: '2-digit'
}).format(date);

console.log(formattedDate); // 例如: "2026年4月12日"

// 使用 toLocaleDateString/toLocaleTimeString (简写)
const shortDate = date.toLocaleDateString('zh-CN');
const shortTime = date.toLocaleTimeString('zh-CN');

console.log(`${shortDate} ${shortTime}`); // 例如: "2026/4/12 17:25:00"
```

### 计算两个日期间的差值

日期对象实际上存储的是自 Unix 纪元以来的毫秒数，因此可以直接进行数值运算。通过计算毫秒差，再换算成天、小时、分钟等单位，即可得到两个日期之间的差异。

```javascript
function dateDiff(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // 计算毫秒差
  const diffInMs = Math.abs(end - start);

  // 换算成天数 (1天 = 24 * 60 * 60 * 1000 毫秒)
  const days = Math.floor(diffInMs / (24 * 60 * 60 * 1000));

  // 换算成小时 (先减去天数对应的毫秒，再除以小时对应的毫秒)
  const hours = Math.floor((diffInMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));

  // 换算成分钟
  const minutes = Math.floor((diffInMs % (60 * 60 * 1000)) / (60 * 1000));

  return { days, hours, minutes };
}

const start = new Date('2026-04-10T10:00:00');
const end = new Date('2026-04-12T17:30:00');

const diff = dateDiff(start, end);
console.log(`${diff.days}天 ${diff.hours}小时 ${diff.minutes}分钟`);
// 输出: "2天 7小时 30分钟"
```

### 验证日期合法性

JavaScript 的 `Date` 构造函数对于无效日期输入（如 "2026-02-30"）不会抛出错误，而是会返回一个 "Invalid Date" 对象。这个对象在布尔上下文中为 `true`，但其 `getTime()` 方法会返回 `NaN`。因此，验证日期是否有效，可以通过检查 `getTime()` 是否为 `NaN` 来实现。

```javascript
function isValidDate(dateStr) {
  const date = new Date(dateStr);
  // 检查是否为 "Invalid Date"
  return !isNaN(date.getTime());
}

console.log(isValidDate('2026-04-12')); // true
console.log(isValidDate('2026-02-30')); // false
console.log(isValidDate('invalid-date')); // false
```