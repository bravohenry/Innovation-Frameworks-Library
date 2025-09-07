import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';

type Lang = 'zh' | 'en';

type Dict = Record<string, string>;

const zh: Dict = {
  app_title: '创新框架库',
  nav_home: '首页',
  nav_github: 'GitHub',
  home_hero_title: '创新框架库',
  home_hero_desc: '探索《产品新生》中的创新框架，系统性地学习和应用这些强大的工具，提升您的创新能力和产品思维。',
  home_start: '开始学习',
  home_browse_all: '浏览所有框架',
  search_placeholder: '搜索框架...',
  search_no_result: '未找到相关框架',
  chapter_not_found: '章节未找到',
  go_home: '返回首页',
  chapter_prefix: '第{n}章',
  chapter_view_all: '查看全部',
  chapter_empty: '本章暂无框架',
  chapter_empty_desc: '该章节尚未添加任何创新框架',
  framework_not_found: '框架未找到',
  back_to_chapter: '返回章节',
  share: '分享',
  loading: '内容加载中...',
  chapter1_goal_title: '本章目标：确立项目战略航向与团队游戏规则',
  chapter1_goal_desc: '通过团队治理、外部环境与竞争结构洞察，以及机会空间定义，建立清晰的对齐机制与行动框架。',
  chapter1_goal_1: '1.1 奠定基石：创新团队与使命',
  chapter1_goal_2: '1.2 竞争舞台：行业结构解析',
  chapter1_goal_3: '1.3 机会空间：内外现实综合',
  diagrams: '图示',
  preview: '预览',
  prev: '上一张',
  next: '下一张',
  close: '关闭',
};

const en: Dict = {
  app_title: 'Innovation Frameworks Library',
  nav_home: 'Home',
  nav_github: 'GitHub',
  home_hero_title: 'Innovation Frameworks Library',
  home_hero_desc: 'Explore frameworks from “Product Reborn”. Learn and apply them systematically to boost innovation and product thinking.',
  home_start: 'Get Started',
  home_browse_all: 'Browse All',
  search_placeholder: 'Search frameworks...',
  search_no_result: 'No matching frameworks',
  chapter_not_found: 'Chapter not found',
  go_home: 'Back to Home',
  chapter_prefix: 'Chapter {n}',
  chapter_view_all: 'View all',
  chapter_empty: 'No frameworks in this chapter',
  chapter_empty_desc: 'No frameworks have been added to this chapter yet',
  framework_not_found: 'Framework not found',
  back_to_chapter: 'Back to Chapter',
  share: 'Share',
  loading: 'Loading...',
  chapter1_goal_title: 'Goal: Set strategic course and team rules',
  chapter1_goal_desc: 'Establish alignment via team governance, market/competition insights and opportunity definition.',
  chapter1_goal_1: '1.1 Team & Mission',
  chapter1_goal_2: '1.2 Industry Structure',
  chapter1_goal_3: '1.3 Opportunity Space',
  diagrams: 'Diagrams',
  preview: 'Preview',
  prev: 'Prev',
  next: 'Next',
  close: 'Close',
};

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(() => (localStorage.getItem('lang') as Lang) || 'zh');
  const dict = lang === 'zh' ? zh : en;

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('lang', l);
  };

  const t = (key: string, vars?: Record<string, string | number>) => {
    const raw = dict[key] ?? key;
    if (!vars) return raw;
    return Object.keys(vars).reduce((s, k) => s.replace(new RegExp(`\\{${k}\\}`, 'g'), String(vars[k]!)), raw);
  };

  const value = useMemo(() => ({ lang, setLang, t }), [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n 必须在 I18nProvider 内使用');
  return ctx;
};


