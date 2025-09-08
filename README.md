## DMGT Toolkit（创新框架知识库）

本项目是一个基于 React + Vite + HeroUI + Tailwind 的双语（中/英）创新方法论知识库。项目按章节与小章节组织框架，支持搜索、面包屑、侧栏导航、模板下载、图示预览等能力。

---

### 交互图表与可视化规范（新增）

目标：为每一个框架提供“互动数据体验”。若该框架不适合做图表，则提供可视化展示（信息结构化、一图讲清）。所有实现需要符合统一的设计标准与导出规范。

#### 设计标准
- 路径标签统一：顶部显示 `Chapter N` + `1.x 子章节`（随语言切换）。
- 视觉风格统一：HeroUI + Tailwind，浅色主题；图表采用一致的色板与圆角。
- 双语一致：标题、图例、坐标、提示均随语言切换（依赖 `useI18n()`）。
- 空态与错误提示：提供占位与引导文案；输入缺失时给出提示。
- 导出能力：
  - PNG（图表或容器快照）
  - CSV（底层数据表格）
- 性能：交互模块按需懒加载；移动端可降级为只读预览。

#### 推荐技术栈（可选其一组合）
- 通用图表：ECharts（功能强、内置导出）、Recharts（轻量）
- 关系/指标树：React Flow、AntV G6（折叠/拖拽）
- 甘特/时间轴：Frappé Gantt、vis-timeline
- 可编辑表格：TanStack Table（RACI 等）
- 快照导出：`html-to-image`（非 ECharts 场景）

#### 框架到交互类型的映射建议（Chapter 1）
- 1.1 Team & Mission
  - RACI Chart → 可编辑表格（CSV 导出）
  - Gantt Chart → 任务条拖拽/里程碑（PNG/CSV）
  - Five Dysfunctions → 金字塔点击展开症状/对策（可视化）
- 1.2 Industry Structure
  - Porter’s Five Forces → 雷达图 + 权重滑杆 + 证据数（PNG/CSV）
  - PESTLE → 维度筛选 + 列表/标签云（CSV）
  - SWOT/sSWOT → 2×2 策略矩阵（PNG/CSV）
- 1.3 Opportunity Space
  - Business Opportunity Statement → 一页纸预览（PNG）
  - North Star Framework → 可折叠指标树（PNG/CSV）

#### 交互配置数据模型（文档层，非代码）
每个框架可在数据中增加一个 `interactive` 描述，用于驱动组件（示意字段，仅作约定说明）。

```json
{
  "slug": "porters-five-forces",
  "interactive": {
    "type": "radar",                 
    "title": { "zh": "五力评分", "en": "Five Forces" },
    "schema": [                       
      { "key": "rivalry", "labelZh": "现有竞争", "labelEn": "Rivalry" },
      { "key": "newEntrants", "labelZh": "新进入者", "labelEn": "New Entrants" },
      { "key": "substitutes", "labelZh": "替代品", "labelEn": "Substitutes" },
      { "key": "suppliers", "labelZh": "供应商议价", "labelEn": "Suppliers" },
      { "key": "buyers", "labelZh": "购买者议价", "labelEn": "Buyers" }
    ],
    "data": [                         
      { "factor": "rivalry", "value": 3.5, "weight": 0.25, "evidenceCount": 6 }
    ],
    "export": { "png": true, "csv": true }
  }
}
```

常见类型：
- `radar`（五力/能力评估）
- `matrix`（sSWOT 2×2、价值-复杂度）
- `gantt`（任务进度）
- `table`（RACI、对比清单）
- `tree`（北极星指标树）
- `viz`（结构化可视化，不涉及数值）

#### CSV 字段建议
- 五力：`factor,value,weight,evidenceCount,notes`
- RACI：`task,<role1>,<role2>...`（单元格值 R/A/C/I，多值用分号）
- 甘特：`task,start,end,owner,dependency,progress`
- 指标树：`metricId,parentId,name,type,unit,owner,hypothesis`
文件命名：`{slug}-{lang}-{yyyyMMdd-HHmm}.png|csv`

#### 为某个框架添加交互/可视化（流程）
1. 在 `src/data/frameworks.ts` 的该框架对象中补充 `interactive` 描述（见上）
2. 页面组件按类型懒加载并读取 `interactive` 渲染（后续实现）
3. 导出：
   - ECharts → `getDataURL()` 导出 PNG
   - 其他 → 使用 `html-to-image` 对容器节点快照
   - CSV → 将 `interactive.data` 序列化
4. 中英文：所有文案使用 `useI18n()`，schema 文本提供 `zh/en` 两份

---

### 开发
```bash
npm i
npm run dev
# http://localhost:5173
```

### 构建
```bash
npm run build
npm run preview
```

### 贡献与版本
- 提交规范：`feat|fix|chore|docs: ...`
- 版本标签：`vX.Y.Z`
