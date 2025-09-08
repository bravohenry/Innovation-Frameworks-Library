## DMGT Toolkit（创新框架知识库）

本项目是一个基于 React + Vite + HeroUI + Tailwind 的双语（中/英）创新方法论知识库。项目按章节与小章节组织框架，支持搜索、面包屑、侧栏导航、模板下载、图示预览等能力。

---

### 框架内容撰写规范（核心）
每个框架应包含以下 10 个部分（中英双份）：
- What / Why / When（是什么、价值、适用时机）
- Inputs（进入前需要的资料/工件）
- Step-by-step（3–7 步；每步含操作要点/示例/常见错误）
- Outputs（可交付产物；判定标准 DoD）
- Diagnostics（核查清单）
- Metrics（阶段性指标建议）
- Cross-links（与其他框架的依赖/映射）
- Visuals（至少 1 张图示，放到 `public/diagrams/`）
- Case（迷你案例）
- Pitfalls（易错点与反模式）

数据落位到 `src/data/frameworks.ts`：
- `summary/summaryEn`：≤ 200 字，强调“产出物与价值”。
- `tags/tagsEn`：3–7 个关键词。
- `htmlContent/htmlContentEn`：从 `<h2>` 开始的结构化 HTML。
- `diagrams`：0–3 张图示（`title/url/description`）。
- `interactive`（可选）：交互配置，见下文。

建议 HTML 模板（可直接给撰写者使用）：
```html
<h2>是什么 / 何时使用</h2>
<p>……</p>
<h2>前置输入</h2>
<ul><li>……</li></ul>
<h2>步骤</h2>
<ol>
  <li><strong>步骤名</strong>：操作要点；示例；常见错误</li>
  <li>……</li>
  <li>……</li>
</ol>
<h2>输出与判定（DoD）</h2>
<ul><li>产出物清单 + 合格标准</li></ul>
<h2>核查清单</h2>
<ul><li>……</li></ul>
<h2>指标建议</h2>
<ul><li>……</li></ul>
<h2>关联</h2>
<ul><li>与 X/Y 的依赖与映射</li></ul>
<h2>案例</h2>
<p>1 段迷你案例，说明前后因果</p>
<h2>易错点</h2>
<ul><li>……</li></ul>
```

### Chapter 1 的内容要求（期望产出）
- 1.1 Team & Mission：
  - 团队障碍：金字塔各层症状–对策表；团队契约要点清单
  - RACI：角色定义、任务分解与表格示例；导出 CSV 字段说明
  - Gantt：关键路径/里程碑示例；节奏建议与风险缓冲
- 1.2 Industry Structure：
  - PESTLE：六维扫描提示清单与证据示例
  - 五力：强度驱动因子表、评分示例与证据索引
  - sSWOT/SWOT：四象限策略草案与映射示例
- 1.3 Opportunity Space：
  - 机会声明：对象/痛点/价值/成功标准的一页纸样例
  - North Star：NSM 与驱动指标树的分解方法与示意

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

## Prompts（可直接复制给内容撰写助手）

> 说明：以下 Prompt 以“数据优先、可落地”为原则，输出可直接写入 `src/data/frameworks.ts` 的字段。所有 Prompt 默认中文为主、英文为忠实翻译，不生成多余解释。

### 1) 框架内容撰写（JSON 输出）
请为下列框架撰写双语内容，返回一个 JSON 数组，每个元素对应一个框架：

输入（示例）
```json
{
  "frameworks": [
    { "slug": "porters-five-forces", "title": "波特五力模型", "englishTitle": "Porter's Five Forces" },
    { "slug": "business-opportunity-statement", "title": "商业机会声明", "englishTitle": "Business Opportunity Statement" }
  ]
}
```

要求：
- 填充字段：`summary/summaryEn`、`tags/tagsEn`、`htmlContent/htmlContentEn`、`diagrams`（可空数组）。
- `htmlContent*` 使用结构化 HTML（从 `<h2>` 开始，使用 `<p>`, `<ul>`, `<ol>`）。
- 语言风格：行动导向、避免空话；每步提供“操作要点/常见错误”。

输出格式（示例）
```json
[
  {
    "slug": "porters-five-forces",
    "summary": "……",
    "summaryEn": "……",
    "tags": ["战略分析", "行业结构"],
    "tagsEn": ["Strategy Analysis", "Industry Structure"],
    "htmlContent": "<h2>是什么/何时使用</h2><p>……</p>…",
    "htmlContentEn": "<h2>What/When</h2><p>…</p>…",
    "diagrams": [ { "title": "五力雷达", "url": "/diagrams/porters-five-forces.svg", "description": "评分示意" } ]
  }
]
```

#### 第 1 章批量撰写（一次性）
请针对第 1 章的全部框架一次性输出双语 JSON 数组，字段同上：
```json
{
  "frameworks": [
    { "slug": "five-dysfunctions-team", "title": "团队协作的五大障碍", "englishTitle": "The Five Dysfunctions of a Team" },
    { "slug": "raci-chart", "title": "RACI 责任分配矩阵", "englishTitle": "RACI Chart" },
    { "slug": "gantt-chart", "title": "甘特图", "englishTitle": "Gantt Chart" },
    { "slug": "pestle-analysis", "title": "PESTLE 分析", "englishTitle": "PESTLE Analysis" },
    { "slug": "porters-five-forces", "title": "波特五力模型", "englishTitle": "Porter's Five Forces" },
    { "slug": "swot-analysis", "title": "SWOT 分析", "englishTitle": "SWOT Analysis" },
    { "slug": "sswot-analysis", "title": "sSWOT 分析", "englishTitle": "sSWOT Analysis" },
    { "slug": "business-opportunity-statement", "title": "商业机会声明", "englishTitle": "Business Opportunity Statement" },
    { "slug": "north-star-framework", "title": "谷歌“北极星”框架", "englishTitle": "The North Star Framework" }
  ]
}
```
可选：若该框架适合交互，同时补充 `interactive` 配置；不适合则忽略。

### 2) 交互图表数据（Interactive Config）
为给定框架生成 `interactive` 配置（见“交互配置数据模型”），仅返回 JSON：

输入示例
```json
{ "slug": "porters-five-forces", "type": "radar" }
```

输出要求
```json
{
  "slug": "porters-five-forces",
  "interactive": {
    "type": "radar",
    "title": { "zh": "五力评分", "en": "Five Forces" },
    "schema": [ { "key": "rivalry", "labelZh": "现有竞争", "labelEn": "Rivalry" } ],
    "data": [ { "factor": "rivalry", "value": 3.5, "weight": 0.25, "evidenceCount": 6 } ],
    "export": { "png": true, "csv": true }
  }
}
```

类型建议与字段：
- `radar`：`schema[key,labelZh,labelEn]`，`data[factor,value,weight,evidenceCount]`
- `matrix`：`rows/cols` 定义 + `cells`
- `gantt`：`tasks[task,start,end,owner,dependency,progress]`
- `table`：`columns/rows`（RACI 列为角色，单元格取 `R/A/C/I`）
- `tree`：`nodes[id,parentId,name,type,unit]`

### 3) 翻译与术语对齐
请对下列中文内容生成忠实英文翻译，保持术语一致，并输出术语表：
```json
{ "zh": "……中文 HTML……" }
```
输出
```json
{ "en": "……英文 HTML……", "glossary": [ { "zh": "北极星指标", "en": "North Star Metric (NSM)" } ] }
```

### 4) QA 校验（Definition of Done）
根据本 README 中“内容撰写规范”，为以下框架内容给出检查结论与缺失项列表（JSON）：
```json
{ "slug": "porters-five-forces", "htmlContent": "<h2>…</h2>…", "summary": "…" }
```

### 5) CSV 导出映射说明生成
为指定交互类型返回 CSV 列定义与示例行（JSON）：
```json
{ "type": "radar" }
```
输出
```json
{ "columns": ["factor","value","weight","evidenceCount","notes"], "example": ["rivalry",3.5,0.25,6,""] }
```

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
