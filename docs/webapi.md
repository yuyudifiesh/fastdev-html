# Web API

## 快速开始

### 获取滚动位置

获取页面或元素的滚动位置是实现吸顶导航、懒加载等功能的基础。`window.pageYOffset` (或 `pageXOffset`) 是获取页面垂直（水平）滚动距离的标准方法。

```javascript
// 获取页面滚动的 Y 轴位置
function getScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

// 获取页面滚动的 X 轴位置
function getScrollLeft() {
  return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
}

// 示例
console.log("垂直滚动距离:", getScrollTop());
console.log("水平滚动距离:", getScrollLeft());

// 对于特定元素
const element = document.querySelector('.scrollable-div');
if (element) {
  console.log("元素滚动Y轴:", element.scrollTop);
}
```

### 全屏切换

`Fullscreen API` 让你可以让整个页面或某个特定元素进入全屏模式，常用于视频播放器、游戏或演示文稿。

```javascript
function toggleFullScreen() {
  const doc = window.document;
  const docEl = doc.documentElement;

  // 检查是否已处于全屏状态
  const isFullScreen = doc.fullscreenElement || doc.mozFullScreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement;

  if (!isFullScreen) {
    // 请求进入全屏
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen();
    } else if (docEl.mozRequestFullScreen) { // Firefox
      docEl.mozRequestFullScreen();
    } else if (docEl.webkitRequestFullscreen) { // Chrome, Safari and Opera
      docEl.webkitRequestFullscreen();
    } else if (docEl.msRequestFullscreen) { // IE/Edge
      docEl.msRequestFullscreen();
    }
  } else {
    // 退出全屏
    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.mozCancelFullScreen) { // Firefox
      doc.mozCancelFullScreen();
    } else if (doc.webkitExitFullscreen) { // Chrome, Safari and Opera
      doc.webkitExitFullscreen();
    } else if (doc.msExitFullscreen) { // IE/Edge
      doc.msExitFullscreen();
    }
  }
}

// 绑定到按钮点击事件
document.getElementById('fullscreen-btn')?.addEventListener('click', toggleFullScreen);
```

### 检测设备类型 (移动/桌面)

通过分析 `navigator.userAgent` 字符串可以区分用户使用的设备类型。这是一个常用但不够完美的方法（因为 User Agent 可能被伪造）。

```javascript
function detectDeviceType() {
  const userAgent = navigator.userAgent;
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return mobileRegex.test(userAgent) ? 'Mobile' : 'Desktop';
}

// 示例
if (detectDeviceType() === 'Mobile') {
  console.log("当前设备是移动设备");
  // 执行移动端优化逻辑
} else {
  console.log("当前设备是桌面端");
  // 执行桌面端优化逻辑
}
```

### Cookie 操作

虽然 `localStorage` 和 `sessionStorage` 更常用，但 Cookie 在处理服务端认证、用户偏好设置等方面仍有不可替代的作用。

```javascript
// 设置 Cookie
function setCookie(name, value, daysToExpire) {
  const expires = new Date();
  expires.setTime(expires.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

// 获取 Cookie
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// 删除 Cookie
function deleteCookie(name) {
  setCookie(name, "", -1);
}

// 示例
setCookie('username', 'JohnDoe', 7); // 7天后过期
console.log(getCookie('username')); // "JohnDoe"
deleteCookie('username');
```

### localStorage/sessionStorage 安全存取

直接访问 `localStorage` 或 `sessionStorage` 可能因浏览器隐私设置或配额超出而报错。一个安全的封装函数可以避免这些问题。

```javascript
const storage = {
  setItem(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  },

  getItem(key) {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Failed to read from localStorage:', e);
      return null;
    }
  },

  removeItem(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      console.error('Failed to remove from localStorage:', e);
    }
  }
};

// 示例
storage.setItem('theme', 'dark');
console.log(storage.getItem('theme')); // "dark"
```

### 复制到剪贴板

`Clipboard API` 提供了安全便捷的剪贴板操作方式，取代了过去依赖 `execCommand` 的不安全方法。

```javascript
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('内容已复制到剪贴板');
  } catch (err) {
    // 如果 Clipboard API 不可用，则回退到传统方法
    console.error('无法使用异步剪贴板API: ', err);
    
    // 创建一个临时的 textarea 元素
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    console.log('已使用备用方案复制');
  }
}

// 示例
document.getElementById('copy-btn')?.addEventListener('click', () => {
  copyToClipboard('这是要复制的内容');
});
```

### 检测网络状态

`Navigator.onLine` 属性和 `online`/`offline` 事件可以帮助你构建离线优先的应用。

```javascript
function updateOnlineStatus(event) {
  const condition = navigator.onLine ? 'online' : 'offline';
  console.log('网络状态:', condition);
  
  // 根据网络状态更新 UI
  document.body.classList.toggle('offline', !navigator.onLine);
}

// 页面加载时检查初始状态
updateOnlineStatus();

// 监听网络状态变化
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
```

### 页面跳转/重定向 (如强制HTTPS)

可以通过检查 `location.protocol` 来判断当前协议，并进行强制跳转。

```javascript
// 强制 HTTPS
if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
  location.replace(`https:${location.href.substring(location.protocol.length)}`);
}
```

### 检测元素是否包含在另一个元素内

`Node.contains()` 方法是判断一个节点是否是另一个节点后代的最直接方式。

```javascript
function isChildOf(parentElement, childElement) {
  return parentElement.contains(childElement);
}

// 示例
const parent = document.getElementById('parent-div');
const child = document.getElementById('child-span');

if (isChildOf(parent, child)) {
  console.log('child-span 是 parent-div 的子元素');
}
```