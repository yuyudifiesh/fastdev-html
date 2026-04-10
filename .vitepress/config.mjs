import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/fastdev-html/',
  title: "Fastdev For HTML",
  description: "快速可复制的 JS 代码",
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
    ],

    outline: { level: [2, 3], label: '目录' },
    langMenuLabel: '切换语言',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    docFooter: { prev: '上一篇', next: '下一篇' },

    sidebar: [
      {
        text: '快速开始',
        items: [
          { text: '数组', link: '/docs/shuzu' },
          { text: '元素', link: '/docs/element' },
          { text: '防抖', link: '/docs/debounce' },
          { text: '节流', link: '/docs/throttle' },
          { text: '处理 URL', link: '/docs/url' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yuyudifiesh/fastdev-html' }
    ],

    footer: {
      copyright: 'Copyright © 2026 yuyudifiesh'
    }
  }
})
