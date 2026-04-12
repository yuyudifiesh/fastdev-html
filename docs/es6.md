# ES6+

## 快速开始

### 展开数组/对象

展开运算符 (`...`) 是 ES6 引入的一个强大特性，它能将一个可迭代对象（如数组、字符串）或对象“展开”成独立的元素。

#### 展开数组

展开运算符在处理数组合并、复制、传递参数时非常方便。

```javascript
// 1. 数组合并
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const mergedArray = [...arr1, ...arr2];
console.log(mergedArray); // [1, 2, 3, 4, 5, 6]

// 2. 数组浅拷贝
const originalArray = [1, 2, 3];
const copiedArray = [...originalArray];
copiedArray[0] = 999;
console.log(originalArray); // [1, 2, 3] - 原数组未变
console.log(copiedArray);   // [999, 2, 3]

// 3. 与 rest 参数配合，解构数组
const [first, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(rest);  // [2, 3, 4, 5]

// 4. 将类数组对象（如 arguments 或 NodeList）转换为真数组
function logArguments() {
  const args = [...arguments];
  console.log(args); // [1, 'hello', true]
}
logArguments(1, 'hello', true);

// 5. 传递数组元素作为函数参数
Math.max(...[1, 2, 3]); // 等同于 Math.max(1, 2, 3)，结果为 3
```

#### 展开对象

展开运算符同样适用于对象，常用于对象合并和浅拷贝。

```javascript
// 1. 对象合并
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const mergedObj = { ...obj1, ...obj2 };
console.log(mergedObj); // { a: 1, b: 2, c: 3, d: 4 }

// 2. 对象浅拷贝
const originalObj = { x: 1, y: { z: 2 } };
const copiedObj = { ...originalObj };
copiedObj.x = 999;
copiedObj.y.z = 888; // 注意：浅拷贝，内部对象仍被共享
console.log(originalObj); // { x: 1, y: { z: 888 } }
console.log(copiedObj);   // { x: 999, y: { z: 888 } }

// 3. 与 rest 结构配合，提取对象属性
const { a, ...others } = { a: 1, b: 2, c: 3 };
console.log(a);     // 1
console.log(others); // { b: 2, c: 3 }
```

### 创建包含特定值的数组 (Array initialization)

ES6 提供了 `Array.from()` 和 `Array()` 构造函数结合 `fill()` 方法来创建特定长度和初始值的数组。

#### 使用 Array.from()

`Array.from()` 更灵活，可以接受一个映射函数来为每个元素赋予不同的值。

```javascript
// 1. 创建一个指定长度的空数组
const emptyArray = Array.from({ length: 5 });
console.log(emptyArray); // [undefined, undefined, undefined, undefined, undefined]

// 2. 创建一个包含相同初始值的数组
const filledArray = Array.from({ length: 5 }, () => 0);
console.log(filledArray); // [0, 0, 0, 0, 0]

const filledWithIndex = Array.from({ length: 5 }, (_, index) => index);
console.log(filledWithIndex); // [0, 1, 2, 3, 4]

// 3. 创建一个包含随机数的数组
const randomArray = Array.from({ length: 3 }, () => Math.random());
console.log(randomArray); // [0.234..., 0.567..., 0.890...]
```

#### 使用 Array().fill()

`fill()` 方法更直接，用于将数组的所有元素填充为指定的静态值。

```javascript
// 创建一个长度为5，所有元素都为'apple'的数组
const fruitArray = new Array(5).fill('apple');
console.log(fruitArray); // ['apple', 'apple', 'apple', 'apple', 'apple']

// 注意：如果填充值是对象，那么所有元素都会引用同一个对象实例
const objArray = new Array(2).fill({ name: 'Bob' });
objArray[0].name = 'Alice';
console.log(objArray[1].name); // 'Alice' - 因为它们指向同一个对象
```