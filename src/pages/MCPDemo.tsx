/**
 * MCP 演示页面 - 展示 MCP 功能的使用示例
 */

import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Divider,
  Code,
  Snippet
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useMCP } from '../contexts/MCPContext';

export default function MCPDemo() {
  const { state, connectMCP, searchActors, browseWeb, searchDocs } = useMCP();
  const [demoQuery, setDemoQuery] = useState('web scraping');
  const [demoResults, setDemoResults] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);

  // 演示搜索 Actors
  const demoSearchActors = async () => {
    setIsRunning(true);
    try {
      const results = await searchActors(demoQuery, 5);
      setDemoResults({
        type: 'actors',
        query: demoQuery,
        data: results
      });
    } catch (error) {
      console.error('演示失败:', error);
    } finally {
      setIsRunning(false);
    }
  };

  // 演示网页浏览
  const demoBrowseWeb = async () => {
    setIsRunning(true);
    try {
      const results = await browseWeb(demoQuery, 2);
      setDemoResults({
        type: 'web',
        query: demoQuery,
        data: results
      });
    } catch (error) {
      console.error('演示失败:', error);
    } finally {
      setIsRunning(false);
    }
  };

  // 演示文档搜索
  const demoSearchDocs = async () => {
    setIsRunning(true);
    try {
      const results = await searchDocs(demoQuery, 3);
      setDemoResults({
        type: 'docs',
        query: demoQuery,
        data: results
      });
    } catch (error) {
      console.error('演示失败:', error);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* 页面标题 */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-primary">MCP 功能演示</h1>
        <p className="text-lg text-default-600">
          体验 Model Context Protocol 的强大功能
        </p>
      </div>

      {/* 连接状态 */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Icon 
              icon="mdi:connection" 
              className={`text-2xl ${state.isConnected ? 'text-success' : 'text-default-400'}`}
            />
            <div>
              <h3 className="text-lg font-semibold">连接状态</h3>
              <p className="text-small text-default-500">
                {state.isConnected ? '✅ 已连接到 MCP 服务器' : '❌ 未连接'}
              </p>
            </div>
          </div>
        </CardHeader>
        {!state.isConnected && (
          <CardBody>
            <Button
              color="primary"
              onPress={connectMCP}
              isLoading={state.isLoading}
              startContent={<Icon icon="mdi:lan-connect" />}
              className="w-full"
            >
              连接 MCP 服务器
            </Button>
          </CardBody>
        )}
      </Card>

      {/* 演示控制面板 */}
      {state.isConnected && (
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Icon icon="mdi:play-circle" className="text-2xl text-primary" />
              <div>
                <h3 className="text-lg font-semibold">功能演示</h3>
                <p className="text-small text-default-500">选择一个功能进行演示</p>
              </div>
            </div>
          </CardHeader>
          <CardBody className="space-y-6">
            {/* 查询输入 */}
            <div className="space-y-2">
              <label className="text-sm font-medium">演示查询</label>
              <Input
                placeholder="输入查询内容..."
                value={demoQuery}
                onChange={(e) => setDemoQuery(e.target.value)}
                startContent={<Icon icon="mdi:magnify" />}
              />
            </div>

            <Divider />

            {/* 演示按钮 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                color="primary"
                variant="flat"
                onPress={demoSearchActors}
                isLoading={isRunning}
                isDisabled={!demoQuery.trim()}
                startContent={<Icon icon="mdi:robot" />}
                className="h-16"
              >
                <div className="text-center">
                  <div className="font-semibold">搜索 Actors</div>
                  <div className="text-xs opacity-70">查找自动化工具</div>
                </div>
              </Button>

              <Button
                color="secondary"
                variant="flat"
                onPress={demoBrowseWeb}
                isLoading={isRunning}
                isDisabled={!demoQuery.trim()}
                startContent={<Icon icon="mdi:web" />}
                className="h-16"
              >
                <div className="text-center">
                  <div className="font-semibold">浏览网页</div>
                  <div className="text-xs opacity-70">获取网页内容</div>
                </div>
              </Button>

              <Button
                color="warning"
                variant="flat"
                onPress={demoSearchDocs}
                isLoading={isRunning}
                isDisabled={!demoQuery.trim()}
                startContent={<Icon icon="mdi:file-document" />}
                className="h-16"
              >
                <div className="text-center">
                  <div className="font-semibold">搜索文档</div>
                  <div className="text-xs opacity-70">查找相关文档</div>
                </div>
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {/* 结果展示 */}
      {demoResults && (
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Icon icon="mdi:chart-box" className="text-2xl text-success" />
              <div>
                <h3 className="text-lg font-semibold">演示结果</h3>
                <p className="text-small text-default-500">
                  查询: "{demoResults.query}" | 类型: {demoResults.type}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <Snippet hideCopyButton className="w-full">
              <pre className="text-sm overflow-auto max-h-96">
                {JSON.stringify(demoResults.data, null, 2)}
              </pre>
            </Snippet>
            
            <Button
              color="default"
              variant="flat"
              onPress={() => setDemoResults(null)}
              startContent={<Icon icon="mdi:close" />}
            >
              清除结果
            </Button>
          </CardBody>
        </Card>
      )}

      {/* 代码示例 */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Icon icon="mdi:code-braces" className="text-2xl text-secondary" />
            <div>
              <h3 className="text-lg font-semibold">代码示例</h3>
              <p className="text-small text-default-500">如何在您的组件中使用 MCP</p>
            </div>
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">1. 导入 MCP Hook</h4>
              <Code className="w-full">
                {`import { useMCP } from '../contexts/MCPContext';`}
              </Code>
            </div>

            <div>
              <h4 className="font-semibold mb-2">2. 使用 MCP 功能</h4>
              <Snippet hideCopyButton className="w-full">
                <pre className="text-sm">{`function MyComponent() {
  const { state, connectMCP, searchActors } = useMCP();
  
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
}`}</pre>
              </Snippet>
            </div>

            <div>
              <h4 className="font-semibold mb-2">3. 环境配置</h4>
              <Snippet hideCopyButton className="w-full">
                <pre className="text-sm">{`# .env.local
VITE_APIFY_TOKEN=your_apify_token_here
VITE_MCP_SERVER_URL=https://mcp.apify.com`}</pre>
              </Snippet>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* 错误信息 */}
      {state.error && (
        <Card className="max-w-4xl mx-auto border-danger">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Icon icon="mdi:alert-circle" className="text-2xl text-danger" />
              <div>
                <h3 className="text-lg font-semibold text-danger">错误信息</h3>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <Code color="danger" className="w-full">
              {state.error}
            </Code>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
