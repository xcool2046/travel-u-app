旅U - 智能旅行伙伴
===================

一个现代化的旅行社交平台，帮助用户寻找旅行伙伴和规划旅行路线。

功能特性
--------
- 首页：智能旅行服务展示，包含智配同行、智推探地、智行规划
- 好友页面：聊天列表，可点击进入聊天对话
- 目的地页面：旅行目的地推荐
- 游戏页面：旅行相关的互动游戏
- 用户登录注册：邮箱密码登录，个人主页管理

技术栈
------
- React 18
- Styled Components
- Framer Motion
- 响应式设计

安装和运行
----------
1. 安装依赖包
   npm install

2. 启动开发服务器
   npm start

3. 浏览器访问 http://localhost:3000

项目结构
--------
src/
  ├── components/
  │   ├── TopHeader.js        # 顶部导航和头像
  │   ├── ContentDisplay.js   # 主要内容区域
  │   ├── AuthModal.js        # 登录注册模态框
  │   ├── UserProfile.js      # 个人主页
  │   ├── ChatBox.js          # 聊天框
  │   └── pages/
  │       ├── HomePage.js     # 首页
  │       ├── FriendPage.js   # 好友页面
  │       ├── DestinationPage.js  # 目的地页面
  │       └── GamePage.js     # 游戏页面
  ├── App.js                  # 主应用
  └── index.js               # 入口文件

使用说明
--------
- 点击头像可以登录/注册或查看个人资料
- 在好友页面点击任意好友可以开始聊天
- 首页三个功能卡片展示主要服务特色
- 支持移动端和桌面端响应式设计

开发团队
--------
旅U开发团队

版本：1.0.0 