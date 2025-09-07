# HeroUI MCP 配置指南

本文档介绍如何在您的 HeroUI 项目中配置和使用 Model Context Protocol (MCP) 功能。

## 🚀 快速开始

### 1. 安装依赖

项目已经包含了必要的 MCP 依赖：

```bash
npm install
```

### 2. 配置环境变量

复制 `env.example` 文件并重命名为 `.env.local`：

```bash
cp env.example .env.local
```

编辑 `.env.local` 文件，添加您的 Apify API Token：

```env
# Apify MCP 配置
VITE_APIFY_TOKEN=your_apify_token_here
VITE_MCP_SERVER_URL=https://mcp.apify.com

# 可选配置
VITE_MCP_TIMEOUT=30000
VITE_MCP_RETRY_ATTEMPTS=3
VITE_MCP_LOG_LEVEL=info
```

### 3. 获取 Apify API Token

1. 访问 [Apify Console](https://console.apify.com/)
2. 注册或登录您的账户
3. 前往 **Settings** -> **Integrations**
4. 复制您的 **Personal API Token**
5. 将 Token 粘贴到 `.env.local` 文件中

### 4. 启动项目

```bash
npm run dev
```

访问 `http://localhost:5173/mcp` 查看 MCP 工具面板。

## 📋 功能特性

### 🔌 连接管理
- 自动连接到 Apify MCP 服务器
- 实时连接状态显示
- 支持重连和断开连接

### 🔍 智能搜索
- **Apify Actors 搜索**：搜索可用的自动化工具
- **文档搜索**：搜索 Apify 官方文档
- **网页浏览**：使用 RAG Web Browser 浏览网页内容

### 🛠️ 工具管理
- 查看所有可用的 MCP 工具
- 工具详情展示
- 动态工具发现

### 🎯 自定义查询
- 支持自定义 MCP 查询
- 灵活的参数配置
- 结果可视化展示

## 🎛️ MCP 配置选项

### 服务器配置

编辑 `mcp.config.json` 文件来自定义 MCP 服务器配置：

```json
{
  "mcpServers": {
    "apify": {
      "url": "https://mcp.apify.com",
      "description": "Apify MCP 服务器，提供 web 抓取和数据提取功能",
      "tools": [
        "actors",
        "docs", 
        "apify/rag-web-browser"
      ]
    }
  },
  "defaultTimeout": 30000,
  "retryAttempts": 3,
  "logLevel": "info"
}
```

### 可用工具

默认启用的工具包括：

- **actors**: Actor 搜索和管理
- **docs**: Apify 文档搜索
- **apify/rag-web-browser**: 智能网页浏览器

您可以通过修改 `tools` 数组来启用/禁用特定工具。

## 🔧 API 使用

### 在组件中使用 MCP

```tsx
import { useMCP } from '../contexts/MCPContext';

function MyComponent() {
  const { 
    state, 
    connectMCP, 
    searchActors, 
    browseWeb 
  } = useMCP();

  const handleSearch = async () => {
    if (state.isConnected) {
      const results = await searchActors('web scraping', 5);
      console.log(results);
    }
  };

  return (
    <div>
      <button onClick={connectMCP}>连接 MCP</button>
      <button onClick={handleSearch}>搜索 Actors</button>
    </div>
  );
}
```

### 直接使用 MCP 客户端

```tsx
import { getDefaultMCPClient } from '../utils/mcpClient';

const client = getDefaultMCPClient();

// 连接
await client.connect();

// 搜索 Actors
const actors = await client.searchActors('data extraction', 10);

// 浏览网页
const webContent = await client.browseWeb('latest AI news', 3);

// 搜索文档
const docs = await client.searchApifyDocs('webscraping tutorial', 5);
```

## 🎨 UI 组件

### MCPPanel 组件

主要的 MCP 用户界面组件，提供：

- 连接状态指示器
- 搜索功能界面
- 工具列表展示
- 结果展示模态框

```tsx
import MCPPanel from '../components/ui/MCPPanel';

function MyPage() {
  return <MCPPanel />;
}
```

### 自定义样式

组件使用 HeroUI 的设计系统，支持主题自定义：

```tsx
// 自定义颜色主题
const mcpTheme = {
  colors: {
    primary: '#0070f3',
    secondary: '#7c3aed',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444'
  }
};
```

## 🔍 故障排除

### 常见问题

1. **连接失败**
   - 检查 API Token 是否正确
   - 确认网络连接正常
   - 验证服务器 URL 配置

2. **工具不可用**
   - 确认已成功连接到 MCP 服务器
   - 检查 `mcp.config.json` 中的工具配置
   - 验证 Apify 账户权限

3. **搜索无结果**
   - 尝试使用不同的关键词
   - 检查搜索类型是否正确
   - 确认网络连接稳定

### 调试模式

启用调试模式来获取更多日志信息：

```env
VITE_MCP_LOG_LEVEL=debug
```

### 重置配置

如果遇到配置问题，可以删除本地存储并重新配置：

```javascript
// 在浏览器控制台中执行
localStorage.clear();
sessionStorage.clear();
```

## 📚 进一步学习

- [Apify MCP 官方文档](https://docs.apify.com/platform/integrations/mcp)
- [Model Context Protocol 规范](https://modelcontextprotocol.io/)
- [HeroUI 组件文档](https://heroui.com/)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进 MCP 集成功能！

## 📄 许可证

本项目遵循 MIT 许可证。
