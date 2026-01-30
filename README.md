# EdgeOne Webhook 飞书转发器

这是一个基于 Nuxt 4 构建的 Webhook 转发服务，用于将 EdgeOne 的部署、项目、域名等事件通知转发到飞书群机器人。

## ✨ 功能特性

- 🚀 支持 EdgeOne 部署创建、成功、失败等事件通知
- 💬 使用飞书交互式卡片，消息展示美观清晰
- 🔐 支持飞书机器人签名校验，保障安全性
- ⚙️ 通过环境变量配置，安全可靠

## 🛠️ 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

在项目根目录创建 `.env` 文件（或在部署平台设置环境变量）：

```bash
# 飞书自定义机器人 Webhook 地址
LARK_WEBHOOK_URL=https://open.larksuite.com/open-apis/bot/v2/hook/xxxxxxxx

# 飞书自定义机器人签名密钥 (在机器人安全设置中查看)
LARK_SECRET=xxxxxxxx
```

### 3. 本地开发

```bash
npm run dev
```

服务启动后，Webhook 接收地址为：`http://localhost:3000/api/webhook`

### 4. 部署到 EdgeOne Pages

1. 将代码提交到 Git 仓库。
2. 在 EdgeOne 控制台创建 Pages 项目。
3. 选择 **Nuxt.js** 框架预设。
4. 设置环境变量 `LARK_WEBHOOK_URL` 和 `LARK_SECRET`。
5. 点击部署即可。

## 📦 接口说明

- **URL**: `/api/webhook`
- **Method**: `POST`
- **Content-Type**: `application/json`

支持的 EdgeOne 事件类型：
- `deployment.created`: 部署已创建
- `deployment.success`: 部署成功
- `deployment.failed`: 部署失败
- `project.created`: 项目已创建
- `domain.added`: 域名已添加
