/**
 * MCP (Model Context Protocol) 客户端工具类
 * 用于与 Apify MCP 服务器进行通信
 */

import axios, { AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';

// MCP 请求类型定义
interface MCPRequest {
  jsonrpc: '2.0';
  id: string;
  method: string;
  params?: Record<string, any>;
}

// MCP 响应类型定义
interface MCPResponse {
  jsonrpc: '2.0';
  id: string;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

// MCP 工具调用参数
interface MCPToolCall {
  name: string;
  arguments: Record<string, any>;
}

// 配置选项
interface MCPClientConfig {
  serverUrl: string;
  apiToken?: string;
  timeout?: number;
  retryAttempts?: number;
}

export class MCPClient {
  private config: MCPClientConfig;
  private isConnected: boolean = false;

  constructor(config: MCPClientConfig) {
    this.config = {
      timeout: 30000,
      retryAttempts: 3,
      ...config
    };
  }

  /**
   * 连接到 MCP 服务器
   */
  async connect(): Promise<boolean> {
    try {
      const response = await this.sendRequest('initialize', {
        protocolVersion: '2024-11-05',
        capabilities: {
          tools: {},
          resources: {},
          prompts: {}
        },
        clientInfo: {
          name: 'HeroUI-MCP-Client',
          version: '1.0.0'
        }
      });

      this.isConnected = !!response.result;
      return this.isConnected;
    } catch (error) {
      console.error('MCP 连接失败:', error);
      return false;
    }
  }

  /**
   * 获取可用的工具列表
   */
  async getAvailableTools(): Promise<any[]> {
    if (!this.isConnected) {
      throw new Error('MCP 客户端未连接');
    }

    try {
      const response = await this.sendRequest('tools/list', {});
      return response.result?.tools || [];
    } catch (error) {
      console.error('获取工具列表失败:', error);
      return [];
    }
  }

  /**
   * 调用 MCP 工具
   */
  async callTool(toolCall: MCPToolCall): Promise<any> {
    if (!this.isConnected) {
      throw new Error('MCP 客户端未连接');
    }

    try {
      const response = await this.sendRequest('tools/call', {
        name: toolCall.name,
        arguments: toolCall.arguments
      });

      if (response.error) {
        throw new Error(`工具调用失败: ${response.error.message}`);
      }

      return response.result;
    } catch (error) {
      console.error('工具调用失败:', error);
      throw error;
    }
  }

  /**
   * 搜索 Apify Actors
   */
  async searchActors(query: string, limit: number = 10): Promise<any> {
    return this.callTool({
      name: 'search-actors',
      arguments: {
        search: query,
        limit: limit
      }
    });
  }

  /**
   * 获取 Actor 详细信息
   */
  async getActorDetails(actorId: string): Promise<any> {
    return this.callTool({
      name: 'fetch-actor-details',
      arguments: {
        actor: actorId
      }
    });
  }

  /**
   * 调用 RAG Web Browser Actor
   */
  async browseWeb(query: string, maxResults: number = 3): Promise<any> {
    return this.callTool({
      name: 'apify-slash-rag-web-browser',
      arguments: {
        query: query,
        maxResults: maxResults,
        outputFormats: ['markdown'],
        scrapingTool: 'raw-http'
      }
    });
  }

  /**
   * 搜索 Apify 文档
   */
  async searchApifyDocs(query: string, limit: number = 5): Promise<any> {
    return this.callTool({
      name: 'search-apify-docs',
      arguments: {
        query: query,
        limit: limit
      }
    });
  }

  /**
   * 发送 MCP 请求
   */
  private async sendRequest(method: string, params?: Record<string, any>): Promise<MCPResponse> {
    const request: MCPRequest = {
      jsonrpc: '2.0',
      id: uuidv4(),
      method: method,
      params: params
    };

    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };

    // 如果有 API Token，添加授权头
    if (this.config.apiToken) {
      headers['Authorization'] = `Bearer ${this.config.apiToken}`;
    }

    try {
      const response: AxiosResponse<MCPResponse> = await axios.post(
        this.config.serverUrl,
        request,
        {
          headers: headers,
          timeout: this.config.timeout
        }
      );

      return response.data;
    } catch (error) {
      console.error('MCP 请求失败:', error);
      throw error;
    }
  }

  /**
   * 断开连接
   */
  async disconnect(): Promise<void> {
    if (this.isConnected) {
      try {
        await this.sendRequest('shutdown', {});
        this.isConnected = false;
      } catch (error) {
        console.error('MCP 断开连接失败:', error);
      }
    }
  }

  /**
   * 检查连接状态
   */
  isClientConnected(): boolean {
    return this.isConnected;
  }
}

// 创建默认的 MCP 客户端实例
let defaultClient: MCPClient | null = null;

/**
 * 获取默认的 MCP 客户端实例
 */
export function getDefaultMCPClient(): MCPClient {
  if (!defaultClient) {
    const config: MCPClientConfig = {
      serverUrl: import.meta.env.VITE_MCP_SERVER_URL || 'https://mcp.apify.com',
      apiToken: import.meta.env.VITE_APIFY_TOKEN,
      timeout: parseInt(import.meta.env.VITE_MCP_TIMEOUT) || 30000,
      retryAttempts: parseInt(import.meta.env.VITE_MCP_RETRY_ATTEMPTS) || 3
    };

    defaultClient = new MCPClient(config);
  }

  return defaultClient;
}

/**
 * 初始化 MCP 连接
 */
export async function initializeMCP(): Promise<boolean> {
  const client = getDefaultMCPClient();
  return await client.connect();
}

export default MCPClient;
