import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MCPProvider } from './contexts/MCPContext';
import { I18nProvider } from './contexts/I18nContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import FrameworkDetail from './pages/FrameworkDetail';
import ChapterPage from './pages/ChapterPage';
import MCPPanel from './components/ui/MCPPanel';
import MCPDemo from './pages/MCPDemo';

const App: React.FC = () => {
  return (
    <I18nProvider>
      <MCPProvider>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/frameworks/:slug" component={FrameworkDetail} />
            <Route path="/chapters/:chapterSlug" component={ChapterPage} />
            <Route path="/mcp" component={MCPPanel} />
            <Route path="/mcp-demo" component={MCPDemo} />
          </Switch>
        </Layout>
      </MCPProvider>
    </I18nProvider>
  );
};

export default App;