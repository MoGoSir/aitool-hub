# AIToolHub MCP Server

MCP (Model Context Protocol) server for AIToolHub - allows LLMs to manage AI tool content in your database.

## 功能

提供以下 MCP 工具供大模型调用：

| 工具名 | 描述 |
|--------|------|
| `list_tools` | 列出所有 AI 工具，支持筛选 |
| `get_tool` | 获取单个工具详情 |
| `create_tool` | 创建新工具 |
| `update_tool` | 更新工具信息 |
| `delete_tool` | 删除工具 |
| `add_pricing_plan` | 添加工具定价方案 |
| `update_pricing_checked` | 更新价格检查时间 |
| `list_categories` | 列出所有分类 |
| `create_category` | 创建新分类 |
| `list_tags` | 列出所有标签 |
| `create_tag` | 创建新标签 |
| `add_tags_to_tool` | 为工具添加标签 |
| `list_submissions` | 列出工具提交 |
| `approve_submission` | 批准工具提交 |
| `get_stats` | 获取数据库统计信息 |

## 方式一：本地运行（Stdio 传输）

适合 Claude Desktop、Cursor 等本地 MCP 客户端。

```bash
cd mcp-server
npm install

# 复制环境变量文件
cp ../.env .env  # 或 cp ../.env.local .env

# 开发模式
npm run dev

# 生产模式
npm run build
npm start
```

### Claude Desktop 配置

```json
{
  "mcpServers": {
    "aitoolhub": {
      "command": "node",
      "args": ["/path/to/AITOOL-WEB/mcp-server/dist/index.js"],
      "env": {
        "DATABASE_URL": "your_database_url"
      }
    }
  }
}
```

### Cursor/Windsurf 配置

```json
{
  "mcpServers": {
    "aitoolhub": {
      "command": "npx",
      "args": ["tsx", "/path/to/AITOOL-WEB/mcp-server/src/index.ts"],
      "env": {
        "DATABASE_URL": "your_database_url"
      }
    }
  }
}
```

## 方式二：Vercel 部署（Streamable HTTP 传输）

适合远程调用，其他大模型可通过 HTTP 访问。

### 1. API 路由已内置

MCP API 路由位于 `app/api/mcp/route.ts`，使用 Web Standard Streamable HTTP 传输，完全兼容 Vercel Serverless。

### 2. 部署到 Vercel

部署主项目即可自动包含 MCP API：

```bash
cd /path/to/AITOOL-WEB
git push origin main
```

Vercel 会自动检测 Next.js 项目并部署，MCP 端点将可用在：

```
https://your-domain.vercel.app/api/mcp
```

### 3. 配置环境变量

在 Vercel 项目设置中确保 `DATABASE_URL` 已配置（通常自动同步自 .env.production）。

### 4. 远程 MCP 客户端配置

在支持远程 MCP 的客户端中配置：

```json
{
  "mcpServers": {
    "aitoolhub": {
      "url": "https://your-domain.vercel.app/api/mcp"
    }
  }
}
```

## 使用示例

### 定时更新工具内容

你可以让大模型定期调用 MCP 服务来：
1. 使用 `list_tools` 获取所有工具
2. 用爬虫获取最新价格和描述
3. 使用 `update_tool` 更新工具信息
4. 使用 `add_pricing_plan` 更新定价方案
5. 使用 `update_pricing_checked` 记录价格检查时间

## 数据库

MCP 服务复用主项目的 Prisma 数据库配置。确保 `.env` 中的 `DATABASE_URL` 与主项目一致。

## 传输协议对比

| 特性 | Stdio（本地） | Streamable HTTP（Vercel） |
|------|--------------|--------------------------|
| 运行方式 | 本地进程 | HTTP 端点 |
| 适合场景 | 本地开发、Claude Desktop | 远程部署、多客户端 |
| 部署平台 | 本地机器 | Vercel、任何 HTTP 服务器 |
| 会话管理 | 进程生命周期 | 基于 Session ID |
