# 悦听播放器

一个基于 Nuxt 4 + Vue 3 + Tailwind CSS 构建的现代化音乐播放器 Web 应用。

## 技术栈

- **框架**: [Nuxt 4](https://nuxt.com/) - 全栈 Vue 框架
- **UI 框架**: [Vue 3](https://vuejs.org/) + [Tailwind CSS](https://tailwindcss.com/)
- **组件库**: [shadcn-vue](https://www.shadcn-vue.com/) - 基于 Radix Vue 的 UI 组件
- **图标**: [@nuxt/icon](https://icones.js.org/) + Font Awesome
- **状态管理**: Vue Composition API (useState)
- **本地存储**: [Dexie.js](https://dexie.org/) - IndexedDB 封装
- **代码规范**: ESLint + Commitlint + cz-git

## 功能特性

- 音乐分类浏览
- 歌单管理
- 音乐播放控制（播放/暂停/上一首/下一首/循环）
- 播放进度控制
- 本地数据持久化


## 项目结构

```
.
├── app/
│   ├── components/          # Vue 组件
│   │   ├── ui/             # shadcn UI 组件
│   │   ├── Header.vue      # 顶部搜索栏
│   │   ├── NavBar.vue      # 侧边导航栏
│   │   ├── Footer.vue      # 底部播放控制栏
│   │   ├── Classification.vue  # 音乐分类
│   │   ├── MyPlaylist.vue  # 我的歌单
│   │   └── Dialog.vue      # 对话框组件
│   ├── composables/        # 组合式函数
│   │   ├── useMusicList.ts # 音乐列表状态管理
│   │   ├── useTypeList.ts  # 分类列表状态管理
│   │   └── useClient.ts    # 客户端环境判断
│   ├── layouts/            # 布局组件
│   │   └── default.vue     # 默认布局
│   ├── pages/              # 页面
│   │   └── index.vue       # 首页/歌曲列表页
│   ├── assets/             # 静态资源
│   │   └── css/
│   │       └── tailwind.css
│   ├── utils/              # 工具函数
│   │   └── dexie.ts        # IndexedDB 数据库操作
│   └── app.vue             # 应用入口
├── public/                 # 公共静态资源
├── nuxt.config.ts          # Nuxt 配置
├── tailwind.config.ts      # Tailwind 配置
├── package.json
└── README.md
```

## 安装与运行

### 环境要求

- Node.js >= 18
- pnpm (推荐) 或 npm

### 安装依赖

```bash
pnpm install
```

### 开发环境

```bash
pnpm dev
```

应用将在 `http://localhost:3000` 启动。

### 构建生产版本

```bash
pnpm build
```

### 预览生产构建

```bash
pnpm preview
```

## 组件说明

### Header.vue
顶部搜索栏组件，包含搜索输入框。

### NavBar.vue
侧边导航栏，包含：
- 应用 Logo
- 音乐分类 (Classification)
- 我的歌单 (MyPlaylist)

### Footer.vue
底部播放控制栏，包含：
- 当前播放歌曲信息
- 播放控制按钮（播放/暂停/上一首/下一首/循环）
- 进度条和时间显示
- 音量控制

### Classification.vue
音乐分类组件，支持分类切换。

### MyPlaylist.vue
用户歌单列表管理。

### Dialog.vue
通用对话框组件，基于 shadcn Dialog。

## 状态管理

项目使用 Vue 3 的 Composition API 进行状态管理：

- `useMusicList()` - 管理当前音乐列表和选中分类
- `useTypeList()` - 管理音乐分类列表

## 样式规范

- 使用 Tailwind CSS 进行样式开发
- 主题色：
  - 主色调: `#1db954` (绿色)
  - 背景色: `#121212` (深色模式)
  - 文字色: 白色/灰色系
- 支持深色模式

## 提交规范

项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```bash
pnpm commit
```

或

```bash
git add .
git commit -m "feat: 新增功能"
```

提交类型：
- `feat`: 新功能
- `fix`: 修复问题
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具相关

## 待开发功能

### 播放功能
- [ ] 真实的音频播放（使用 HTML5 Audio API 或 Howler.js）
- [ ] 播放模式切换（顺序播放/随机播放/单曲循环）
- [ ] 播放列表队列管理
- [ ] 歌词显示与同步滚动
- [ ] 歌曲预加载和缓存

### 用户功能
- [ ] 播放历史记录

### 歌单功能
- [ ] 创建自定义歌单
- [ ] 删除歌单
- [ ] 歌单内歌曲排序
- [ ] 从歌单中移除歌曲

### 搜索功能
- [ ] 歌曲搜索（支持关键词、歌手、专辑）

### 数据与存储
- [ ] 接入真实音乐 API（如网易云音乐 API）
- [ ] 本地音乐文件导入
- [ ]  IndexedDB 数据备份与恢复
- [ ] 云端同步功能

### 界面优化
- [ ] 歌曲详情页面


## 许可证

MIT
