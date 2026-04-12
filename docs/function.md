# 函数

## 快速开始

### 函数柯里化 (Curry)

柯里化是一种将接受多个参数的函数转换为一系列接受单个参数的函数的技术。

```javascript
// 实现一个通用的柯里化函数
function curry(fn) {
  // 获取原函数期望的参数数量
  const arity = fn.length;

  return function curried(...args) {
    // 如果已传入的参数数量达到了原函数的要求
    if (args.length >= arity) {
      // 则直接执行原函数
      return fn.apply(this, args);
    } else {
      // 否则返回一个新函数，等待接收更多参数
      return function (...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

// 示例：一个计算三数之和的函数
function addThreeNumbers(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(addThreeNumbers);

// 可以分步调用
const addFiveAnd = curriedAdd(5); // 已经提供了第一个参数
const addFiveAndTen = addFiveAnd(10); // 提供第二个参数
console.log(addFiveAndTen(15)); // 30

// 也可以一次性提供所有参数
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
```

### 限制函数执行次数 (Once)

`once` 是一个高阶函数，它确保被包装的函数只被执行一次。

```javascript
function once(fn) {
  let called = false;
  let result;

  return function (...args) {
    if (!called) {
      result = fn.apply(this, args);
      called = true;
    }
    return result; // 返回第一次调用的结果
  };
}

// 示例：一个模拟支付的函数
function processPayment(amount) {
  console.log(`Processing payment of $${amount}...`);
  return { status: 'success', transactionId: 'tx_' + Date.now() };
}

const processPaymentOnce = once(processPayment);

console.log(processPaymentOnce(100)); // Processing payment of $100... { status: 'success', transactionId: '...' }
console.log(processPaymentOnce(200)); // 直接返回上一次的结果，不再执行原函数
```

### 偏函数应用 (Partial Application)

偏函数应用是固定一个函数的一些参数，生成一个更具体的新函数。它和柯里化类似，但偏函数应用通常是在调用时就固定一部分参数，而不是逐个接收。

```javascript
function partial(fn, ...fixedArgs) {
  return function (...remainingArgs) {
    // 将固定的参数和新传入的参数合并，然后调用原函数
    return fn.apply(this, [...fixedArgs, ...remainingArgs]);
  };
}

// 示例：一个通用的格式化消息函数
function formatMessage(prefix, name, message) {
  return `${prefix}, ${name}: ${message}`;
}

// 创建一个专门用于发送欢迎消息的函数，固定了前缀
const welcomeUser = partial(formatMessage, 'Welcome');
const goodbyeUser = partial(formatMessage, 'Goodbye');

console.log(welcomeUser('Alice', 'Hope you enjoy your stay!'));
// "Welcome, Alice: Hope you enjoy your stay!"

console.log(goodbyeUser('Bob', 'Thanks for visiting.'));
// "Goodbye, Bob: Thanks for visiting."
```