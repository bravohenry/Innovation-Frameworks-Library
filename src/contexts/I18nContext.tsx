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
  
  // Interactive Components Common
  edit: '编辑',
  done: '完成',
  save: '保存',
  cancel: '取消',
  add: '添加',
  delete: '删除',
  remove: '移除',
  export_png: '导出PNG',
  export_csv: '导出CSV',
  overall_score: '总体评分',
  average: '平均值',
  
  // Status and Progress
  pending: '待开始',
  in_progress: '进行中',
  completed: '已完成',
  blocked: '被阻塞',
  low: '低',
  medium: '中',
  high: '高',
  good: '良好',
  fair: '一般',
  needs_improvement: '需改进',
  
  // Porter's Five Forces
  porters_title: '波特五力分析',
  competitive_rivalry: '现有竞争者竞争',
  supplier_power: '供应商议价能力',
  buyer_power: '买方议价能力',
  threat_substitutes: '替代品威胁',
  threat_new_entrants: '新进入者威胁',
  threat_level: '威胁程度',
  key_factors: '关键因素',
  industry_attractiveness: '整体行业吸引力',
  analysis_summary: '分析总结',
  low_threat: '低威胁',
  medium_threat: '中威胁',
  high_threat: '高威胁',
  
  // North Star Framework
  north_star_title: '北极星框架',
  north_star_metric: '北极星指标',
  drivers: '驱动因素',
  inputs: '输入指标',
  hypotheses: '关键假设',
  current_value: '当前值',
  target_value: '目标值',
  progress: '进度',
  
  // RACI Chart
  raci_title: 'RACI责任矩阵',
  responsible: '执行者',
  accountable: '负责者',
  consulted: '咨询者',
  informed: '知情者',
  roles: '角色',
  tasks: '任务',
  role_name: '角色名称',
  task_name: '任务名称',
  add_role: '添加角色',
  add_task: '添加任务',
  
  // Five Dysfunctions
  five_dysfunctions_title: '团队五大障碍',
  team_name: '团队名称',
  assessment_date: '评估日期',
  dysfunction_pyramid: '团队障碍金字塔',
  team_health_overview: '团队健康度概览',
  symptoms: '症状表现',
  solutions: '解决方案',
  score: '评分',
  editing: '编辑中',
  
  // PESTLE Analysis
  pestle_title: 'PESTLE分析',
  political: '政治',
  economic: '经济',
  social: '社会',
  technological: '技术',
  legal: '法律',
  environmental: '环境',
  factor_title: '因素标题',
  description: '描述',
  impact_level: '影响程度',
  direction: '影响方向',
  opportunity: '机遇',
  threat: '威胁',
  neutral: '中性',
  timeframe: '时间框架',
  short_term: '短期',
  medium_term: '中期',
  long_term: '长期',
  probability: '可能性',
  add_factor: '添加因素',
  factors: '因素',
  
  // sSWOT Analysis
  sswot_title: '情境化SWOT分析',
  situation_context: '情境描述',
  swot_analysis: 'SWOT分析',
  strategy_matrix: '战略矩阵',
  strengths: '优势',
  weaknesses: '劣势',
  opportunities: '机会',
  threats: '威胁',
  growth_strategies: '增长型战略',
  turnaround_strategies: '扭转型战略',
  diversification_strategies: '多元化战略',
  defensive_strategies: '防御型战略',
  use_strengths_opportunities: '利用优势抓住机会',
  overcome_weaknesses_opportunities: '克服劣势抓住机会',
  use_strengths_threats: '利用优势应对威胁',
  minimize_weaknesses_threats: '最小化劣势和威胁',
  title: '标题',
  feasibility: '可行性',
  impact: '影响力',
  priority: '优先级',
  high_priority: '高优先级',
  medium_priority: '中优先级',
  low_priority: '低优先级',
  weight: '重要程度',
  
  // Business Opportunity
  opportunity_title: '商业机会陈述',
  who_section: '谁 (WHO)',
  what_section: '什么 (WHAT)',
  why_section: '为什么 (WHY)',
  how_section: '如何 (HOW)',
  who_subtitle: '目标客户是谁？',
  what_subtitle: '核心痛点是什么？',
  why_subtitle: '你的解决方案价值主张？',
  how_subtitle: '成功的衡量标准？',
  key_assumptions: '关键假设',
  validation_plan: '验证计划',
  add_assumption: '添加假设',
  add_validation_item: '添加验证项',
  opportunity_summary: '机会陈述摘要',
  target_customer: '目标客户：',
  core_pain_point: '核心痛点：',
  solution: '解决方案：',
  success_metrics: '成功指标：',
  
  // Gantt Chart
  gantt_title: '甘特图',
  task_name_col: '任务名称',
  total_tasks: '总任务数',
  overall_progress: '整体进度',
  month_view: '月视图',
  week_view: '周视图',
  add_task: '添加任务',
  edit_task: '编辑任务',
  new_task: '新任务',
  unassigned: '待分配',
  start_date: '开始日期',
  end_date: '结束日期',
  owner: '负责人',
  status: '状态',
  dependencies: '依赖关系',
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


