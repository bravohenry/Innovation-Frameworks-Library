import React from 'react';
import { Switch, Route } from 'react-router-dom';
// 移除 MCPProvider（未使用）
import { I18nProvider } from './contexts/I18nContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import FrameworkDetail from './pages/FrameworkDetail';
import ChapterPage from './pages/ChapterPage';
// 移除 MCP 演示与面板路由

const App: React.FC = () => {
  return (
    <I18nProvider>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/frameworks/:slug" component={FrameworkDetail} />
          <Route path="/chapters/:chapterSlug" component={ChapterPage} />
        </Switch>
      </Layout>
    </I18nProvider>
  );
};

export default App;