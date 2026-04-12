# 正则表达式

## 快速开始

正则表达式是处理文本的强大工具，在表单验证、数据清洗等场景中不可或缺。下面为你介绍如何转义特殊字符以及编写常用的格式验证规则。

### 转义特殊字符

正则表达式中有许多具有特殊含义的元字符（如 `.`, `*`, `+`, `?`, `^`, `$`, `[`, `]`, `{`, `}`, `|`, `(`, `)`）。如果你希望匹配这些字符本身的字面量，就需要使用反斜杠 `\` 进行转义。

```javascript
// 一个用于转义正则表达式特殊字符的函数
function escapeRegExp(string) {
  // $& 代表匹配到的整个子串
  return string.replace(/[.*+?^${}()|[$$\$$/g, '\\$&');
}

// 示例：在一个文本中查找包含特殊字符的子串
const searchTerm = "Hello. How are you?"; // 包含 . 和 ?
const escapedTerm = escapeRegExp(searchTerm);
const regex = new RegExp(escapedTerm, 'gi'); // g:全局, i:忽略大小写

const text = "This is a test. Hello. How are you? I'm fine.";
const found = text.match(regex);
console.log(found); // ["Hello. How are you?"]
```

### 邮箱/手机号等格式验证

编写准确的格式验证正则表达式是一门艺术。

::: warning 注意
正则表达式主要用于格式上的初步校验。对于身份证等有复杂算法的号码，还需要结合业务逻辑进行二次校验才能确保数据的绝对准确性。
:::

#### 邮箱验证

```javascript
// 一个较为通用的邮箱正则表达式
// ^: 匹配字符串开头
// [a-zA-Z0-9._%+-]+: 用户名部分，由字母、数字及少量特殊符号组成，至少一个
// @: 必须包含 @ 符号
// [a-zA-Z0-9.-]+: 域名部分
// \.: 匹配点号（转义）
// [a-zA-Z]{2,}$: 顶级域名，至少2个字母，$表示字符串结尾
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validateEmail(email) {
  return emailRegex.test(email);
}

// 示例
console.log(validateEmail("test@example.com")); // true
console.log(validateEmail("user.name+tag@domain.co.uk")); // true
console.log(validateEmail("invalid.email")); // false
```

#### 中国大陆手机号验证

```javascript
// 中国大陆手机号通常为11位，以1开头，第二位是3-9
// ^1: 必须以1开头
// [3-9]: 第二位数字范围
// \d{9}: 后面跟9位数字
const phoneRegex = /^1[3-9]\d{9}$/;

function validatePhone(phone) {
  return phoneRegex.test(phone);
}

// 示例
console.log(validatePhone("13812345678")); // true
console.log(validatePhone("15987654321")); // true
console.log(validatePhone("12345678901")); // false (第二位不是3-9)
```

#### 身份证号验证

```javascript
// 18位身份证号格式：前17位为数字，最后一位为数字或X/x
const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

function validateIdCard(idCard) {
  return idCardRegex.test(idCard);
}

// 示例
console.log(validateIdCard("11010519491231002X")); // true
console.log(validateIdCard("110105194912310021")); // true
console.log(validateIdCard("11010519491331002X")); // false (13月不存在)
```