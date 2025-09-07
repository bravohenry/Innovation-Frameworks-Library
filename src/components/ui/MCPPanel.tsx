/**
 * MCP 面板组件 - 提供 MCP 功能的用户界面
 */

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  Chip,
  Spinner,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Alert
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useMCP } from '../../contexts/MCPContext';

// 工具类型定义
interface MCPTool {
  name: string;
  description?: string;
  inputSchema?: any;
}

// 搜索结果类型
interface SearchResult {
  id: string;
  title: string;
  description: string;
  url?: string;
  rating?: number;
}

export default function MCPPanel() {
  const {
    state,
    connectMCP,
    disconnectMCP,
    searchActors,
    getActorDetails,
    browseWeb,
    searchDocs,
    clearError,
    clearResult
  } = useMCP();

  // 本地状态
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('actors');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedTool, setSelectedTool] = useState<MCPTool | null>(null);
  const [toolInput, setToolInput] = useState('');
  const [customQuery, setCustomQuery] = useState('');

  // Modal 控制
  const { isOpen: isResultOpen, onOpen: onResultOpen, onClose: onResultClose } = useDisclosure();
  const { isOpen: isToolOpen, onOpen: onToolOpen, onClose: onToolClose } = useDisclosure();

  // 连接状态指示器颜色
  const getConnectionColor = () => {
    if (state.isLoading) return 'warning';
    if (state.isConnected) return 'success';
    if (state.error) return 'danger';
    return 'default';
  };

  // 处理连接/断开连接
  const handleConnection = async () => {
    if (state.isConnected) {
      await disconnectMCP();
    } else {
      await connectMCP();
    }
  };

  // 执行搜索
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    clearError();
    clearResult();

    try {
      let results: any;
      
      switch (searchType) {
        case 'actors':
          results = await searchActors(searchQuery, 10);
          break;
        case 'docs':
          results = await searchDocs(searchQuery, 5);
          break;
        case 'web':
          results = await browseWeb(searchQuery, 3);
          break;
        default:
          return;
      }

      // 处理搜索结果
      if (results) {
        const formattedResults = formatSearchResults(results, searchType);
        setSearchResults(formattedResults);
        onResultOpen();
      }
    } catch (error) {
      console.error('搜索失败:', error);
    }
  };

  // 格式化搜索结果
  const formatSearchResults = (results: any, type: string): SearchResult[] => {
    if (!results) return [];

    switch (type) {
      case 'actors':
        if (results.actors && Array.isArray(results.actors)) {
          return results.actors.map((actor: any, index: number) => ({
            id: actor.id || `actor-${index}`,
            title: actor.title || actor.name || 'Unknown Actor',
            description: actor.description || '无描述',
            url: actor.url,
            rating: actor.rating
          }));
        }
        break;
      case 'docs':
        if (Array.isArray(results)) {
          return results.map((doc: any, index: number) => ({
            id: doc.url || `doc-${index}`,
            title: doc.title || 'Unknown Document',
            description: doc.content || doc.description || '无内容',
            url: doc.url
          }));
        }
        break;
      case 'web':
        if (results.items && Array.isArray(results.items)) {
          return results.items.map((item: any, index: number) => ({
            id: item.url || `web-${index}`,
            title: item.title || 'Unknown Page',
            description: item.text || item.content || '无内容',
            url: item.url
          }));
        }
        break;
    }

    return [];
  };

  // 执行自定义查询
  const handleCustomQuery = async () => {
    if (!customQuery.trim()) return;

    try {
      const result = await browseWeb(customQuery, 1);
      onResultOpen();
    } catch (error) {
      console.error('自定义查询失败:', error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {/* 连接状态卡片 */}
      <Card>
        <CardHeader className="flex gap-3">
          <Icon 
            icon="mdi:connection" 
            className={`text-2xl ${
              state.isConnected ? 'text-success' : 'text-default-400'
            }`} 
          />
          <div className="flex flex-col">
            <p className="text-md font-semibold">MCP 连接状态</p>
            <p className="text-small text-default-500">
              {state.isConnected ? '已连接到 Apify MCP 服务器' : '未连接'}
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex items-center gap-4">
            <Chip 
              color={getConnectionColor()} 
              variant="flat"
              startContent={
                state.isLoading ? (
                  <Spinner size="sm" />
                ) : (
                  <Icon 
                    icon={state.isConnected ? "mdi:check-circle" : "mdi:close-circle"} 
                  />
                )
              }
            >
              {state.isLoading ? '连接中...' : state.isConnected ? '已连接' : '未连接'}
            </Chip>
            
            <Button
              color={state.isConnected ? "danger" : "primary"}
              variant="flat"
              onPress={handleConnection}
              isLoading={state.isLoading}
              startContent={
                !state.isLoading && (
                  <Icon 
                    icon={state.isConnected ? "mdi:lan-disconnect" : "mdi:lan-connect"} 
                  />
                )
              }
            >
              {state.isConnected ? '断开连接' : '连接'}
            </Button>

            {state.availableTools.length > 0 && (
              <Chip color="secondary" variant="flat">
                {state.availableTools.length} 个工具可用
              </Chip>
            )}
          </div>

          {state.error && (
            <Alert color="danger" className="mt-4">
              <Icon icon="mdi:alert-circle" className="text-lg" />
              <span>{state.error}</span>
            </Alert>
          )}
        </CardBody>
      </Card>

      {/* 搜索功能卡片 */}
      <Card>
        <CardHeader>
          <Icon icon="mdi:magnify" className="text-2xl text-primary" />
          <div className="flex flex-col">
            <p className="text-md font-semibold">智能搜索</p>
            <p className="text-small text-default-500">搜索 Actors、文档或浏览网页</p>
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex gap-4">
            <Select
              label="搜索类型"
              placeholder="选择搜索类型"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="max-w-xs"
            >
              <SelectItem key="actors" value="actors">
                <div className="flex items-center gap-2">
                  <Icon icon="mdi:robot" />
                  <span>Apify Actors</span>
                </div>
              </SelectItem>
              <SelectItem key="docs" value="docs">
                <div className="flex items-center gap-2">
                  <Icon icon="mdi:file-document" />
                  <span>Apify 文档</span>
                </div>
              </SelectItem>
              <SelectItem key="web" value="web">
                <div className="flex items-center gap-2">
                  <Icon icon="mdi:web" />
                  <span>网页浏览</span>
                </div>
              </SelectItem>
            </Select>

            <Input
              placeholder="输入搜索关键词..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
              startContent={<Icon icon="mdi:magnify" />}
            />

            <Button
              color="primary"
              onPress={handleSearch}
              isDisabled={!state.isConnected || !searchQuery.trim()}
              isLoading={state.isLoading}
              startContent={!state.isLoading && <Icon icon="mdi:send" />}
            >
              搜索
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* 自定义查询卡片 */}
      <Card>
        <CardHeader>
          <Icon icon="mdi:code-braces" className="text-2xl text-secondary" />
          <div className="flex flex-col">
            <p className="text-md font-semibold">自定义查询</p>
            <p className="text-small text-default-500">执行自定义的 MCP 查询</p>
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          <Textarea
            label="查询内容"
            placeholder="输入您的查询内容..."
            value={customQuery}
            onChange={(e) => setCustomQuery(e.target.value)}
            minRows={3}
          />
          
          <Button
            color="secondary"
            onPress={handleCustomQuery}
            isDisabled={!state.isConnected || !customQuery.trim()}
            isLoading={state.isLoading}
            startContent={!state.isLoading && <Icon icon="mdi:play" />}
          >
            执行查询
          </Button>
        </CardBody>
      </Card>

      {/* 可用工具展示 */}
      {state.availableTools.length > 0 && (
        <Card>
          <CardHeader>
            <Icon icon="mdi:tools" className="text-2xl text-warning" />
            <div className="flex flex-col">
              <p className="text-md font-semibold">可用工具</p>
              <p className="text-small text-default-500">当前可用的 MCP 工具</p>
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {state.availableTools.map((tool, index) => (
                <Chip
                  key={tool.name || index}
                  color="warning"
                  variant="flat"
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedTool(tool);
                    onToolOpen();
                  }}
                >
                  {tool.name || `工具 ${index + 1}`}
                </Chip>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      {/* 搜索结果 Modal */}
      <Modal isOpen={isResultOpen} onClose={onResultClose} size="4xl" scrollBehavior="inside">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:view-list" className="text-xl" />
              <span>搜索结果</span>
            </div>
          </ModalHeader>
          <ModalBody>
            {searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((result, index) => (
                  <Card key={result.id || index} className="w-full">
                    <CardBody>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-start justify-between">
                          <h4 className="font-semibold text-lg">{result.title}</h4>
                          {result.rating && (
                            <Chip color="warning" size="sm">
                              ⭐ {result.rating}
                            </Chip>
                          )}
                        </div>
                        <p className="text-default-600 text-sm line-clamp-3">
                          {result.description}
                        </p>
                        {result.url && (
                          <div className="flex items-center gap-2">
                            <Icon icon="mdi:link" className="text-sm" />
                            <a
                              href={result.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary text-sm hover:underline"
                            >
                              {result.url}
                            </a>
                          </div>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Icon icon="mdi:magnify-close" className="text-4xl text-default-300 mb-2" />
                <p className="text-default-500">暂无搜索结果</p>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={onResultClose}>
              关闭
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* 工具详情 Modal */}
      <Modal isOpen={isToolOpen} onClose={onToolClose} size="2xl">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:tool" className="text-xl" />
              <span>工具详情</span>
            </div>
          </ModalHeader>
          <ModalBody>
            {selectedTool && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">工具名称</h4>
                  <Chip color="primary" variant="flat">{selectedTool.name}</Chip>
                </div>
                
                {selectedTool.description && (
                  <div>
                    <h4 className="font-semibold mb-2">描述</h4>
                    <p className="text-default-600">{selectedTool.description}</p>
                  </div>
                )}

                {selectedTool.inputSchema && (
                  <div>
                    <h4 className="font-semibold mb-2">输入格式</h4>
                    <Card>
                      <CardBody>
                        <pre className="text-sm overflow-auto">
                          {JSON.stringify(selectedTool.inputSchema, null, 2)}
                        </pre>
                      </CardBody>
                    </Card>
                  </div>
                )}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={onToolClose}>
              关闭
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
