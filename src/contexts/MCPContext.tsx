/**
 * MCP Context - 管理 MCP 客户端状态和功能
 */

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { MCPClient, getDefaultMCPClient } from '../utils/mcpClient';

// MCP 状态类型定义
interface MCPState {
  client: MCPClient | null;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  availableTools: any[];
  lastResult: any;
}

// MCP 动作类型定义
type MCPAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CONNECTED'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CLIENT'; payload: MCPClient }
  | { type: 'SET_TOOLS'; payload: any[] }
  | { type: 'SET_RESULT'; payload: any }
  | { type: 'RESET' };

// 初始状态
const initialState: MCPState = {
  client: null,
  isConnected: false,
  isLoading: false,
  error: null,
  availableTools: [],
  lastResult: null
};

// Reducer 函数
function mcpReducer(state: MCPState, action: MCPAction): MCPState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_CONNECTED':
      return { ...state, isConnected: action.payload, error: action.payload ? null : state.error };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'SET_CLIENT':
      return { ...state, client: action.payload };
    case 'SET_TOOLS':
      return { ...state, availableTools: action.payload };
    case 'SET_RESULT':
      return { ...state, lastResult: action.payload };
    case 'RESET':
      return { ...initialState, client: state.client };
    default:
      return state;
  }
}

// Context 接口定义
interface MCPContextType {
  state: MCPState;
  // 连接管理
  connectMCP: () => Promise<boolean>;
  disconnectMCP: () => Promise<void>;
  // 工具操作
  getTools: () => Promise<any[]>;
  callTool: (toolName: string, args: Record<string, any>) => Promise<any>;
  // 快捷方法
  searchActors: (query: string, limit?: number) => Promise<any>;
  getActorDetails: (actorId: string) => Promise<any>;
  browseWeb: (query: string, maxResults?: number) => Promise<any>;
  searchDocs: (query: string, limit?: number) => Promise<any>;
  // 状态重置
  clearError: () => void;
  clearResult: () => void;
}

// 创建 Context
const MCPContext = createContext<MCPContextType | undefined>(undefined);

// Provider 组件属性
interface MCPProviderProps {
  children: ReactNode;
}

// Provider 组件
export function MCPProvider({ children }: MCPProviderProps) {
  const [state, dispatch] = useReducer(mcpReducer, initialState);

  // 初始化客户端
  useEffect(() => {
    const client = getDefaultMCPClient();
    dispatch({ type: 'SET_CLIENT', payload: client });
  }, []);

  // 连接 MCP 服务器
  const connectMCP = async (): Promise<boolean> => {
    if (!state.client) {
      dispatch({ type: 'SET_ERROR', payload: 'MCP 客户端未初始化' });
      return false;
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const connected = await state.client.connect();
      dispatch({ type: 'SET_CONNECTED', payload: connected });
      
      if (connected) {
        // 连接成功后获取可用工具
        const tools = await state.client.getAvailableTools();
        dispatch({ type: 'SET_TOOLS', payload: tools });
      } else {
        dispatch({ type: 'SET_ERROR', payload: '连接 MCP 服务器失败' });
      }
      
      return connected;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '连接过程中发生未知错误';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return false;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // 断开连接
  const disconnectMCP = async (): Promise<void> => {
    if (state.client && state.isConnected) {
      try {
        await state.client.disconnect();
        dispatch({ type: 'SET_CONNECTED', payload: false });
        dispatch({ type: 'SET_TOOLS', payload: [] });
      } catch (error) {
        console.error('断开连接失败:', error);
      }
    }
  };

  // 获取工具列表
  const getTools = async (): Promise<any[]> => {
    if (!state.client || !state.isConnected) {
      throw new Error('MCP 客户端未连接');
    }

    try {
      const tools = await state.client.getAvailableTools();
      dispatch({ type: 'SET_TOOLS', payload: tools });
      return tools;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '获取工具列表失败';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    }
  };

  // 调用工具
  const callTool = async (toolName: string, args: Record<string, any>): Promise<any> => {
    if (!state.client || !state.isConnected) {
      throw new Error('MCP 客户端未连接');
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const result = await state.client.callTool({ name: toolName, arguments: args });
      dispatch({ type: 'SET_RESULT', payload: result });
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '工具调用失败';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // 搜索 Actors
  const searchActors = async (query: string, limit: number = 10): Promise<any> => {
    if (!state.client || !state.isConnected) {
      throw new Error('MCP 客户端未连接');
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const result = await state.client.searchActors(query, limit);
      dispatch({ type: 'SET_RESULT', payload: result });
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '搜索 Actors 失败';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // 获取 Actor 详情
  const getActorDetails = async (actorId: string): Promise<any> => {
    if (!state.client || !state.isConnected) {
      throw new Error('MCP 客户端未连接');
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const result = await state.client.getActorDetails(actorId);
      dispatch({ type: 'SET_RESULT', payload: result });
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '获取 Actor 详情失败';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Web 浏览
  const browseWeb = async (query: string, maxResults: number = 3): Promise<any> => {
    if (!state.client || !state.isConnected) {
      throw new Error('MCP 客户端未连接');
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const result = await state.client.browseWeb(query, maxResults);
      dispatch({ type: 'SET_RESULT', payload: result });
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Web 浏览失败';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // 搜索文档
  const searchDocs = async (query: string, limit: number = 5): Promise<any> => {
    if (!state.client || !state.isConnected) {
      throw new Error('MCP 客户端未连接');
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const result = await state.client.searchApifyDocs(query, limit);
      dispatch({ type: 'SET_RESULT', payload: result });
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '搜索文档失败';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // 清除错误
  const clearError = (): void => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  // 清除结果
  const clearResult = (): void => {
    dispatch({ type: 'SET_RESULT', payload: null });
  };

  const contextValue: MCPContextType = {
    state,
    connectMCP,
    disconnectMCP,
    getTools,
    callTool,
    searchActors,
    getActorDetails,
    browseWeb,
    searchDocs,
    clearError,
    clearResult
  };

  return (
    <MCPContext.Provider value={contextValue}>
      {children}
    </MCPContext.Provider>
  );
}

// Hook 来使用 MCP Context
export function useMCP(): MCPContextType {
  const context = useContext(MCPContext);
  if (context === undefined) {
    throw new Error('useMCP 必须在 MCPProvider 内部使用');
  }
  return context;
}

export default MCPContext;
