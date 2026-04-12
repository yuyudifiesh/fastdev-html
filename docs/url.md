# URL

## 快速开始

### 解析 URL 参数
利用 `URL` 构造函数和 `searchParams` 属性，可以极其轻松地提取查询参数。

```javascript
const url = new URL('https://example.com/search?q=js&sort=desc&page=1');

// 获取特定参数
const query = url.searchParams.get('q'); 
const page = url.searchParams.get('page');

console.log(query); // "js"
console.log(page);   // "1"
```

### 修改或添加参数
使用 `searchParams.set()` 可以自动处理参数的增删改，无需手动拼接字符串。

```javascript
const url = new URL('https://example.com/search?q=js');

// 修改现有参数或添加新参数
url.searchParams.set('q', 'typescript'); // 修改 q
url.searchParams.set('sort', 'asc');     // 添加 sort

console.log(url.toString());
// "https://example.com/search?q=typescript&sort=asc"
```

### 删除参数
使用 `searchParams.delete()` 移除不需要的参数。

```javascript
const url = new URL('https://example.com/search?q=js&token=123&debug=true');

// 删除特定参数
url.searchParams.delete('token');
url.searchParams.delete('debug');

console.log(url.toString());
// "https://example.com/search?q=js"
```

### 获取当前页面的所有参数
在浏览器环境中，直接使用 `window.location.search`。

```javascript
const params = new URLSearchParams(window.location.search);

const userId = params.get('id');
const source = params.get('source');

console.log(userId, source);
```

### 解析绝对路径与相对路径
`URL` 构造函数支持第二个参数作为“基础路径”，非常适合处理相对链接。

```javascript
// 基础 URL
const base = 'https://example.com/blog/post/1';

// 解析相对路径
const url1 = new URL('/about', base);
const url2 = new URL('../contact', base);
const url3 = new URL('https://other.com', base);

console.log(url1.href); // "https://example.com/about"
console.log(url2.href); // "https://example.com/blog/contact"
console.log(url3.href); // "https://other.com/"
```

### 获取 URL 的各个部分
轻松提取协议、域名、端口、路径等。

```javascript
const url = new URL('https://user:pass@example.com:8080/path/page?query=1#hash');

console.log(url.protocol); // "https:"
console.log(url.hostname); // "example.com"
console.log(url.port);     // "8080"
console.log(url.pathname); // "/path/page"
console.log(url.hash);     // "#hash"
console.log(url.username); // "user"
console.log(url.password); // "pass"
```

### 将参数对象转换为 URL 字符串
利用 `URLSearchParams` 构造函数直接传入对象。

```javascript
const paramsObj = { q: 'javascript', category: 'frontend', page: '1' };
const params = new URLSearchParams(paramsObj);

const fullUrl = `https://example.com/search?${params.toString()}`;

console.log(fullUrl);
// "https://example.com/search?q=javascript&category=frontend&page=1"
```

### 检查参数是否存在
使用 `searchParams.has()` 进行快速判断。

```javascript
const url = new URL('https://example.com/dashboard?admin=true');

if (url.searchParams.has('admin')) {
  console.log('这是管理员页面');
}
```