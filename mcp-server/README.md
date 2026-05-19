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

## 安装

```bash
cd mcp-server
npm install

# 复制环境变量文件
cp .env.example .env

# 编辑 .env 文件，填入数据库连接字符串
```

## 运行

### 开发模式
```bash
npm run dev
```

### 生产模式
```bash
npm run build
npm start
```

## Claude Desktop 配置

在 Claude Desktop 的配置文件中添加：

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

## 使用示例

### 通过 Cursor/Windsurf 调用

在 Cursor/Windsurf 的 MCP 配置中添加：

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

### 定时更新工具内容

你可以让大模型定期调用 MCP 服务来：
1. 使用 `list_tools` 获取所有工具
2. 用爬虫获取最新价格和描述
3. 使用 `update_tool` 更新工具信息
4. 使用 `add_pricing_plan` 更新定价方案
5. 使用 `update_pricing_checked` 记录价格检查时间

## 数据库

MCP 服务复用主项目的 Prisma 数据库配置。确保 `.env` 中的 `DATABASE_URL` 与主项目一致。
