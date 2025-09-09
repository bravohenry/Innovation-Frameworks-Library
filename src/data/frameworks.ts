// 已移除 gray-matter 与 marked（浏览器环境无需）

// Define the Framework type
export interface Framework {
  title: string;
  englishTitle: string;
  slug: string;
  chapter: string;
  chapterTitle: string;
  chapterTitleEn?: string;
  subsectionId?: string; // 如 "1.2"
  tags: string[];
  tagsEn?: string[];
  summary: string;
  summaryEn?: string;
  templateUrl: string;
  content?: string;
  htmlContent?: string;
  htmlContentEn?: string;
  diagrams?: { title: string; url: string; description?: string }[];
  interactive?: InteractiveConfig;
}

// 交互配置（宽松定义，具体字段由类型决定）
export interface InteractiveConfig {
  type: 'radar' | 'matrix' | 'gantt' | 'table' | 'tree' | 'viz' | 'matrix-generic';
  title?: { zh: string; en: string };
  schema?: any; // 允许对象或数组
  data?: any;   // 允许对象或数组
  export?: { png?: boolean; csv?: boolean };
  // 扩展字段
  [key: string]: any;
}

// 章节元数据：目标与子标签
export interface ChapterSubsection {
  id: string; // 如 "1.1"
  labelZh: string;
  labelEn: string;
}

export interface ChapterMeta {
  goalZh: string;
  goalEn: string;
  descZh?: string;
  descEn?: string;
  subsections?: ChapterSubsection[];
}

// Pre-parsed frameworks data to avoid using gray-matter in browser
const frameworksData: Record<string, Framework> = {
  'porters-five-forces': {
    title: "波特五力模型",
    englishTitle: "Porter's Five Forces",
    slug: "porters-five-forces",
    chapter: "1",
    chapterTitle: "发现与战略基础",
    chapterTitleEn: "Discovery & Strategy",
    tags: ["战略分析", "竞争", "行业结构"],
    tagsEn: ["Strategy Analysis", "Competition", "Industry Structure"],
    summary: "一个用于分析行业吸引力和竞争强度的强大工具，帮助企业理解其所处的竞争环境。",
    summaryEn: "Analyze industry attractiveness and competitive intensity to understand market structure.",
    templateUrl: "/templates/porters-five-forces.pptx",
    content: `## 这是什么？ (What is it?)

波特五力模型是由哈佛商学院教授迈克尔·波特（Michael Porter）在1979年提出的分析框架，用于评估行业结构和竞争强度。该模型认为，一个行业内的竞争程度取决于五种基本竞争力量：

1. **现有竞争者之间的竞争**
2. **新进入者的威胁**
3. **替代品的威胁**
4. **供应商的议价能力**
5. **购买者的议价能力**

这五种力量共同决定了行业的整体竞争强度和盈利能力。

## 什么时候使用？ (When to use?)

波特五力模型适用于以下场景：

- 评估一个新行业的吸引力
- 制定公司的战略定位
- 分析竞争环境的变化
- 识别可能影响行业结构的关键因素
- 预测行业未来的发展趋势

## 如何使用？ (How to use?)

1. **分析现有竞争者之间的竞争**：评估市场上现有企业的数量、规模、多样性以及它们之间的竞争强度。
2. **评估新进入者的威胁**：考察进入该行业的壁垒，如资本需求、规模经济、品牌忠诚度等。
3. **识别替代品的威胁**：确定可能替代该行业产品或服务的替代品，以及它们对行业的影响。
4. **分析供应商的议价能力**：评估供应商的集中度、转换成本、差异化程度等因素。
5. **评估购买者的议价能力**：考察购买者的集中度、购买量、信息获取能力等因素。
6. **综合分析**：根据以上五个方面的分析，得出对行业整体竞争强度和盈利能力的评估。

## 案例 (Example)

以智能手机行业为例：

- **现有竞争者之间的竞争**：苹果、三星、华为等大型厂商之间竞争激烈，不断推出新功能和新技术。
- **新进入者的威胁**：进入壁垒高，需要大量研发投入和专利技术，但小米、OPPO等新兴品牌仍成功进入。
- **替代品的威胁**：智能手表、AR/VR设备等可能部分替代智能手机的功能。
- **供应商的议价能力**：关键组件（如高端芯片）供应商较少，议价能力较强。
- **购买者的议价能力**：个人消费者议价能力较弱，但大型零售商和电信运营商议价能力较强。

综合分析：智能手机行业竞争激烈，但由于高进入壁垒和持续创新，领先企业仍能保持较高利润率。`,
    htmlContent: `<h2>这是什么？ (What is it?)</h2>
<p>波特五力模型是由哈佛商学院教授迈克尔·波特（Michael Porter）在1979年提出的分析框架，用于评估行业结构和竞争强度。该模型认为，一个行业内的竞争程度取决于五种基本竞争力量：</p>
<ol>
<li><strong>现有竞争者之间的竞争</strong></li>
<li><strong>新进入者的威胁</strong></li>
<li><strong>替代品的威胁</strong></li>
<li><strong>供应商的议价能力</strong></li>
<li><strong>购买者的议价能力</strong></li>
</ol>
<p>这五种力量共同决定了行业的整体竞争强度和盈利能力。</p>
<h2>什么时候使用？ (When to use?)</h2>
<p>波特五力模型适用于以下场景：</p>
<ul>
<li>评估一个新行业的吸引力</li>
<li>制定公司的战略定位</li>
<li>分析竞争环境的变化</li>
<li>识别可能影响行业结构的关键因素</li>
<li>预测行业未来的发展趋势</li>
</ul>
<h2>如何使用？ (How to use?)</h2>
<ol>
<li><strong>分析现有竞争者之间的竞争</strong>：评估市场上现有企业的数量、规模、多样性以及它们之间的竞争强度。</li>
<li><strong>评估新进入者的威胁</strong>：考察进入该行业的壁垒，如资本需求、规模经济、品牌忠诚度等。</li>
<li><strong>识别替代品的威胁</strong>：确定可能替代该行业产品或服务的替代品，以及它们对行业的影响。</li>
<li><strong>分析供应商的议价能力</strong>：评估供应商的集中度、转换成本、差异化程度等因素。</li>
<li><strong>评估购买者的议价能力</strong>：考察购买者的集中度、购买量、信息获取能力等因素。</li>
<li><strong>综合分析</strong>：根据以上五个方面的分析，得出对行业整体竞争强度和盈利能力的评估。</li>
</ol>
<h2>案例 (Example)</h2>
<p>以智能手机行业为例：</p>
<ul>
<li><strong>现有竞争者之间的竞争</strong>：苹果、三星、华为等大型厂商之间竞争激烈，不断推出新功能和新技术。</li>
<li><strong>新进入者的威胁</strong>：进入壁垒高，需要大量研发投入和专利技术，但小米、OPPO等新兴品牌仍成功进入。</li>
<li><strong>替代品的威胁</strong>：智能手表、AR/VR设备等可能部分替代智能手机的功能。</li>
<li><strong>供应商的议价能力</strong>：关键组件（如高端芯片）供应商较少，议价能力较强。</li>
<li><strong>购买者的议价能力</strong>：个人消费者议价能力较弱，但大型零售商和电信运营商议价能力较强。</li>
</ul>
<p>综合分析：智能手机行业竞争激烈，但由于高进入壁垒和持续创新，领先企业仍能保持较高利润率。</p>`,
    htmlContentEn: `<h2>What is it?</h2>
<p>Porter's Five Forces, proposed by Michael Porter in 1979, evaluates industry structure and competitive intensity based on five forces:</p>
<ol>
<li><strong>Competition among existing rivals</strong></li>
<li><strong>Threat of new entrants</strong></li>
<li><strong>Threat of substitutes</strong></li>
<li><strong>Bargaining power of suppliers</strong></li>
<li><strong>Bargaining power of buyers</strong></li>
</ol>
<p>Together, these forces determine overall industry competitiveness and profitability.</p>`,
    diagrams: [
      { title: "五力模型图", url: "/diagrams/porters-five-forces.svg", description: "行业结构五要素示意" }
    ]
  },
  'five-dysfunctions-team': {
    title: "团队协作的五大障碍",
    englishTitle: "The Five Dysfunctions of a Team",
    slug: "five-dysfunctions-team",
    chapter: "1",
    subsectionId: '1.1',
    chapterTitle: "发现与战略基础",
    chapterTitleEn: "Discovery & Strategy",
    tags: ["团队协作", "组织效能", "领导力", "信任建立"],
    tagsEn: ["Team Collaboration", "Organizational Effectiveness", "Leadership", "Trust Building"],
    summary: "识别并化解信任缺失、冲突畏惧、责任规避、投入不足、结果忽视五大障碍，构建高效团队基础。产出症状诊断表、团队契约与改善行动计划。",
    summaryEn: "Identify and resolve five team dysfunctions to build high-performing teams. Delivers diagnostic assessments, team charter and improvement action plans.",
    templateUrl: "/templates/five-dysfunctions-team.pptx",
    htmlContent: `<h2>是什么 / 何时使用</h2>
<p>团队协作五大障碍模型由Patrick Lencioni提出，识别团队效能的核心障碍。五大障碍按层级关系排列：</p>
<ol>
<li><strong>信任缺失</strong>：成员无法在团队中展示脆弱性</li>
<li><strong>冲突畏惧</strong>：为维护人为和谐避免必要争论</li>
<li><strong>责任规避</strong>：对决策缺乏清晰承诺</li>
<li><strong>投入不足</strong>：不愿意问责同事</li>
<li><strong>结果忽视</strong>：追求个人目标超过集体成果</li>
</ol>
<p><strong>适用时机</strong>：团队组建期、效能诊断、冲突频发、目标不对齐、合并重组等场景。</p>

<h2>前置输入</h2>
<ul>
<li>团队现状观察记录</li>
<li>成员行为样本与互动模式</li>
<li>之前团队评估结果（如有）</li>
<li>组织文化背景与期望</li>
</ul>

<h2>步骤</h2>
<ol>
<li><strong>障碍诊断</strong>：使用评估工具识别五层障碍表现；观察会议互动、决策过程；收集成员匿名反馈。<em>常见错误：仅凭主观印象判断，缺乏具体行为证据。</em></li>
<li><strong>根因分析</strong>：从底层信任开始逐层分析；找到障碍间的因果链条；识别关键触发事件。<em>示例：信任缺失→不敢提出异议→决策模糊→无人问责→个人利益优先。</em></li>
<li><strong>优先级排序</strong>：聚焦最底层障碍作为突破口；制定渐进改善路径；设定阶段性里程碑。<em>常见错误：试图同时解决所有障碍，缺乏重点。</em></li>
<li><strong>干预设计</strong>：针对性设计团队活动与规则；建立新的互动模式；创建安全的练习环境。<em>示例：信任建设活动、冲突管理培训、决策流程优化。</em></li>
<li><strong>实施与强化</strong>：逐步引入新行为模式；提供持续反馈与指导；建立制度化保障机制。<em>常见错误：缺乏持续跟进，改变无法固化。</em></li>
</ol>

<h2>输出与判定（DoD）</h2>
<ul>
<li>五层障碍诊断报告，包含症状清单与证据</li>
<li>团队契约文档，明确新的协作规则</li>
<li>90天改善行动计划，含具体活动与责任人</li>
<li>评估改进指标体系与追踪机制</li>
<li><strong>合格标准</strong>：团队成员能识别各层障碍；对改善计划达成承诺；建立定期复盘机制。</li>
</ul>

<h2>核查清单</h2>
<ul>
<li>□ 五大障碍的表现症状已清晰识别</li>
<li>□ 诊断基于具体行为观察而非主观判断</li>
<li>□ 已找到障碍间的层级因果关系</li>
<li>□ 团队契约条款具体可执行</li>
<li>□ 改善活动设计针对根本原因</li>
<li>□ 建立了跟踪进展的机制</li>
<li>□ 团队领导承诺推动改变</li>
</ul>

<h2>指标建议</h2>
<ul>
<li><strong>信任度</strong>：团队心理安全感评分、脆弱性展示频次</li>
<li><strong>冲突质量</strong>：建设性冲突vs破坏性冲突比例</li>
<li><strong>承诺清晰度</strong>：会议决策明确率、承诺履行率</li>
<li><strong>问责频率</strong>：同伴问责事件数、反馈质量评估</li>
<li><strong>结果导向</strong>：集体目标达成率、个人vs团队目标优先级调查</li>
</ul>

<h2>关联</h2>
<ul>
<li><strong>前置</strong>：RACI矩阵明确角色分工，为责任承诺奠定基础</li>
<li><strong>后续</strong>：North Star Framework对齐团队目标，强化结果导向</li>
<li><strong>互补</strong>：甘特图规划改善活动的时间安排</li>
</ul>

<h2>案例</h2>
<p>某科技公司产品团队频繁错过交付期限。诊断发现：成员间缺乏信任，不敢在会议中提出资源不足的担忧（障碍1）→避免与PM就需求变更产生冲突（障碍2）→对不合理期限没有明确承诺，只是被动接受（障碍3）→没人愿意提醒同事进度滞后（障碍4）→各自优化个人KPI而非团队交付目标（障碍5）。通过信任建设工作坊、冲突管理培训、明确决策权责，3个月后团队准时交付率从40%提升到85%。</p>

<h2>易错点</h2>
<ul>
<li><strong>层级跳跃</strong>：试图绕过信任建设直接解决上层问题</li>
<li><strong>表象治理</strong>：只关注行为表现而忽视深层心理因素</li>
<li><strong>一刀切方案</strong>：对所有团队使用相同的改善方法</li>
<li><strong>缺乏耐心</strong>：期望短期内彻底解决所有障碍</li>
<li><strong>领导缺位</strong>：认为这是HR或外部顾问的工作</li>
</ul>`,
    htmlContentEn: `<h2>What / When to Use</h2>
<p>The Five Dysfunctions model by Patrick Lencioni identifies core barriers to team effectiveness in hierarchical order:</p>
<ol>
<li><strong>Absence of Trust</strong>: Members unable to show vulnerability</li>
<li><strong>Fear of Conflict</strong>: Avoiding necessary debates to maintain artificial harmony</li>
<li><strong>Lack of Commitment</strong>: Unclear commitment to decisions</li>
<li><strong>Avoidance of Accountability</strong>: Reluctance to hold peers accountable</li>
<li><strong>Inattention to Results</strong>: Pursuing individual goals over collective outcomes</li>
</ol>
<p><strong>Use when</strong>: Team forming, performance diagnosis, frequent conflicts, misaligned goals, mergers/reorganizations.</p>

<h2>Prerequisites</h2>
<ul>
<li>Team behavior observation records</li>
<li>Member interaction patterns and behavioral samples</li>
<li>Previous team assessment results (if any)</li>
<li>Organizational culture context and expectations</li>
</ul>

<h2>Steps</h2>
<ol>
<li><strong>Dysfunction Diagnosis</strong>: Use assessment tools to identify five-layer dysfunction manifestations; observe meeting interactions and decision processes; collect anonymous member feedback. <em>Common mistake: Relying on subjective impressions without behavioral evidence.</em></li>
<li><strong>Root Cause Analysis</strong>: Analyze layer by layer starting from foundational trust; identify causal chains between dysfunctions; spot key triggering events. <em>Example: Lack of trust → fear of raising objections → unclear decisions → no accountability → personal interests priority.</em></li>
<li><strong>Priority Setting</strong>: Focus on bottom-layer dysfunction as breakthrough point; create progressive improvement path; set milestone markers. <em>Common mistake: Attempting to solve all dysfunctions simultaneously without focus.</em></li>
<li><strong>Intervention Design</strong>: Design targeted team activities and rules; establish new interaction patterns; create safe practice environments. <em>Example: Trust-building activities, conflict management training, decision process optimization.</em></li>
<li><strong>Implementation & Reinforcement</strong>: Gradually introduce new behavioral patterns; provide continuous feedback and guidance; establish institutional safeguard mechanisms. <em>Common mistake: Lack of continuous follow-up, changes fail to stick.</em></li>
</ol>

<h2>Outputs & Definition of Done</h2>
<ul>
<li>Five-layer dysfunction diagnostic report with symptom checklist and evidence</li>
<li>Team charter document with clear new collaboration rules</li>
<li>90-day improvement action plan with specific activities and owners</li>
<li>Progress tracking metrics system and monitoring mechanisms</li>
<li><strong>Acceptance criteria</strong>: Team members can identify each dysfunction layer; commit to improvement plan; establish regular retrospective mechanism.</li>
</ul>

<h2>Diagnostics</h2>
<ul>
<li>□ Five dysfunction symptoms clearly identified</li>
<li>□ Diagnosis based on specific behavioral observations, not subjective judgment</li>
<li>□ Found hierarchical causal relationships between dysfunctions</li>
<li>□ Team charter clauses are specific and executable</li>
<li>□ Improvement activities designed for root causes</li>
<li>□ Established progress tracking mechanisms</li>
<li>□ Team leadership committed to driving change</li>
</ul>

<h2>Metrics</h2>
<ul>
<li><strong>Trust Level</strong>: Psychological safety scores, vulnerability display frequency</li>
<li><strong>Conflict Quality</strong>: Constructive vs destructive conflict ratio</li>
<li><strong>Commitment Clarity</strong>: Meeting decision clarity rate, commitment fulfillment rate</li>
<li><strong>Accountability Frequency</strong>: Peer accountability incidents, feedback quality assessment</li>
<li><strong>Results Orientation</strong>: Collective goal achievement rate, individual vs team priority surveys</li>
</ul>

<h2>Cross-links</h2>
<ul>
<li><strong>Prerequisites</strong>: RACI Chart clarifies role divisions, laying foundation for responsibility commitment</li>
<li><strong>Follow-up</strong>: North Star Framework aligns team goals, reinforcing results orientation</li>
<li><strong>Complementary</strong>: Gantt Chart plans timing for improvement activities</li>
</ul>

<h2>Case</h2>
<p>A tech company's product team frequently missed delivery deadlines. Diagnosis revealed: Members lacked trust, afraid to voice resource concerns in meetings (dysfunction 1) → avoided conflict with PM over requirement changes (dysfunction 2) → no clear commitment to unrealistic timelines, just passive acceptance (dysfunction 3) → no one willing to remind colleagues of delays (dysfunction 4) → each optimized personal KPIs over team delivery goals (dysfunction 5). Through trust-building workshops, conflict management training, and clear decision authority, on-time delivery rate improved from 40% to 85% in 3 months.</p>

<h2>Pitfalls</h2>
<ul>
<li><strong>Layer skipping</strong>: Attempting to solve upper-layer problems without trust foundation</li>
<li><strong>Surface treatment</strong>: Focusing only on behavioral manifestations while ignoring deep psychological factors</li>
<li><strong>One-size-fits-all</strong>: Using same improvement methods for all teams</li>
<li><strong>Impatience</strong>: Expecting to completely resolve all dysfunctions short-term</li>
<li><strong>Leadership absence</strong>: Considering this HR or external consultant work</li>
</ul>`,
    diagrams: [
      { title: "五大障碍金字塔", url: "/diagrams/five-dysfunctions-team.svg", description: "自下而上：信任→冲突→承诺→问责→结果" }
    ],
    interactive: {
      type: "viz",
      title: { "zh": "团队障碍诊断", "en": "Team Dysfunction Assessment" },
      schema: [
        { "key": "trust", "labelZh": "信任缺失", "labelEn": "Absence of Trust" },
        { "key": "conflict", "labelZh": "冲突畏惧", "labelEn": "Fear of Conflict" },
        { "key": "commitment", "labelZh": "责任规避", "labelEn": "Lack of Commitment" },
        { "key": "accountability", "labelZh": "投入不足", "labelEn": "Avoidance of Accountability" },
        { "key": "results", "labelZh": "结果忽视", "labelEn": "Inattention to Results" }
      ],
      export: { "png": true, "csv": true }
    }
  },
  'raci-chart': {
    title: "RACI 责任分配矩阵",
    englishTitle: "RACI Chart",
    slug: "raci-chart",
    chapter: "1",
    subsectionId: '1.1',
    chapterTitle: "发现与战略基础",
    chapterTitleEn: "Discovery & Strategy",
    tags: ["项目治理", "角色职责", "流程清晰", "责任分配"],
    tagsEn: ["Project Governance", "Role Clarity", "Process Clarity", "Responsibility Assignment"],
    summary: "通过 R（负责）、A（签核）、C（咨询）、I（知会）澄清跨角色分工，降低协调成本。产出角色定义表、任务分解矩阵与导出CSV模板。",
    summaryEn: "Clarify cross-role responsibilities using R (Responsible), A (Accountable), C (Consulted), I (Informed) to reduce coordination costs. Delivers role definition table, task breakdown matrix and CSV export template.",
    templateUrl: "/templates/raci-chart.pptx",
    htmlContent: `<h2>是什么 / 何时使用</h2>
<p>RACI责任分配矩阵是一种项目管理工具，通过四种角色类型澄清任务与人员的责任关系：</p>
<ul>
<li><strong>R - Responsible（负责）</strong>：实际执行任务的人员</li>
<li><strong>A - Accountable（签核）</strong>：对任务结果负最终责任并签字确认的人，每个任务只能有一个A</li>
<li><strong>C - Consulted（咨询）</strong>：提供专业意见，需要双向沟通的专家</li>
<li><strong>I - Informed（知会）</strong>：需要被告知进展和结果，但不参与决策</li>
</ul>
<p><strong>适用时机</strong>：项目启动期、跨部门协作、职责不清、决策缓慢、重复沟通成本高的场景。</p>

<h2>前置输入</h2>
<ul>
<li>完整的任务分解结构（WBS）或活动清单</li>
<li>项目涉及的所有角色和人员名单</li>
<li>现有的组织架构和汇报关系</li>
<li>关键决策点和审批流程要求</li>
</ul>

<h2>步骤</h2>
<ol>
<li><strong>任务梳理</strong>：列出所有需要明确责任的任务或交付物；按重要性和复杂度排序；识别跨部门或跨角色的关键任务。<em>示例：需求收集、方案设计、开发实施、测试验收、上线部署。</em></li>
<li><strong>角色识别</strong>：确定所有相关的角色、部门或具体人员；明确每个角色的专业能力和权限范围；标注汇报关系和决策层级。<em>常见错误：遗漏关键角色或将角色定义过于宽泛。</em></li>
<li><strong>矩阵填充</strong>：为每个任务分配RACI角色；确保每个任务有且仅有一个A；避免过多的C和I角色。<em>原则：一个任务可以有多个R，但A必须唯一；C角色需要真正的专业输入，I角色仅需了解结果。</em></li>
<li><strong>冲突解决</strong>：识别角色冲突或空缺；通过讨论协商解决分歧；必要时调整任务分解或组织结构。<em>常见冲突：多人争夺A角色、关键任务无人负责、C/I角色过多导致沟通成本高。</em></li>
<li><strong>确认与发布</strong>：与所有相关方确认矩阵内容；形成正式文档并广泛分发；建立定期回顾更新机制。<em>常见错误：一次性制定后不再维护更新。</em></li>
</ol>

<h2>输出与判定（DoD）</h2>
<ul>
<li>RACI责任分配矩阵表格，包含所有任务和角色映射</li>
<li>角色定义文档，明确各角色的职责边界和权限</li>
<li>CSV格式的可编辑模板，支持项目定制化调整</li>
<li>冲突识别和解决方案记录</li>
<li><strong>合格标准</strong>：每个任务都有明确的A角色；无角色冲突或空缺；所有相关方对分工达成共识；建立定期回顾机制。</li>
</ul>

<h2>核查清单</h2>
<ul>
<li>☐ 每个任务都分配了RACI角色</li>
<li>☐ 每个任务有且仅有一个A（Accountable）</li>
<li>☐ R角色具备执行任务的能力和资源</li>
<li>☐ C角色确实需要双向沟通，非形式主义</li>
<li>☐ I角色控制在必要范围，避免信息过载</li>
<li>☐ 跨部门任务的协调机制已明确</li>
<li>☐ 所有相关方已确认并承诺执行</li>
</ul>

<h2>指标建议</h2>
<ul>
<li><strong>决策效率</strong>：决策周期时间、决策质量评分</li>
<li><strong>沟通成本</strong>：会议时长、邮件往来次数、重复询问频率</li>
<li><strong>任务完成率</strong>：按时完成率、质量达标率</li>
<li><strong>角色满意度</strong>：工作量合理性、职责清晰度评价</li>
<li><strong>矩阵维护</strong>：更新频率、实际执行与矩阵一致性</li>
</ul>

<h2>关联</h2>
<ul>
<li><strong>前置</strong>：五大障碍诊断解决信任问题，为责任承诺创造条件</li>
<li><strong>后续</strong>：甘特图规划时间安排，明确各角色的时间投入</li>
<li><strong>互补</strong>：北极星框架确保所有角色朝向共同目标</li>
</ul>

<h2>案例</h2>
<p>某软件公司新产品发布项目中，产品经理、开发团队、QA、运维、市场部职责混乱，导致需求反复变更、测试延期、上线失败。通过RACI梳理：需求确认A=产品经理，R=需求分析师；开发任务A=技术主管，R=开发工程师；测试验收A=QA主管，C=产品经理；市场推广A=市场总监，I=产品经理。明确分工后，需求变更减少60%，项目按时交付率从40%提升到85%。</p>

<h2>易错点</h2>
<ul>
<li><strong>A角色过多</strong>：一个任务分配多个A，导致责任稀释</li>
<li><strong>形式主义</strong>：为了平衡关系让所有人都参与C或I</li>
<li><strong>粒度不当</strong>：任务分解过细或过粗，难以操作</li>
<li><strong>静态思维</strong>：制定后不根据项目进展调整</li>
<li><strong>权责不匹配</strong>：分配责任但不给予相应权限和资源</li>
</ul>`,
    htmlContentEn: `<h2>What / When to Use</h2>
<p>RACI responsibility assignment matrix is a project management tool that clarifies task-people responsibility relationships through four role types:</p>
<ul>
<li><strong>R - Responsible</strong>: Person who actually executes the task</li>
<li><strong>A - Accountable</strong>: Person ultimately responsible for task outcome and sign-off, only one A per task</li>
<li><strong>C - Consulted</strong>: Expert providing professional input, requires two-way communication</li>
<li><strong>I - Informed</strong>: Needs to be told about progress and results, but doesn't participate in decisions</li>
</ul>
<p><strong>Use when</strong>: Project initiation, cross-departmental collaboration, unclear responsibilities, slow decision-making, high repetitive communication costs.</p>

<h2>Prerequisites</h2>
<ul>
<li>Complete Work Breakdown Structure (WBS) or activity list</li>
<li>List of all roles and personnel involved in the project</li>
<li>Existing organizational structure and reporting relationships</li>
<li>Key decision points and approval process requirements</li>
</ul>

<h2>Steps</h2>
<ol>
<li><strong>Task Organization</strong>: List all tasks or deliverables requiring clear responsibility; sort by importance and complexity; identify key cross-departmental or cross-role tasks. <em>Example: Requirements gathering, solution design, development implementation, testing acceptance, deployment.</em></li>
<li><strong>Role Identification</strong>: Determine all relevant roles, departments or specific personnel; clarify each role's professional capabilities and authority scope; mark reporting relationships and decision hierarchies. <em>Common mistake: Missing key roles or defining roles too broadly.</em></li>
<li><strong>Matrix Population</strong>: Assign RACI roles for each task; ensure each task has one and only one A; avoid excessive C and I roles. <em>Principle: One task can have multiple R's, but A must be unique; C roles need real professional input, I roles only need outcome awareness.</em></li>
<li><strong>Conflict Resolution</strong>: Identify role conflicts or gaps; resolve disagreements through discussion and negotiation; adjust task breakdown or organizational structure if necessary. <em>Common conflicts: Multiple people competing for A role, key tasks with no owner, too many C/I roles causing high communication costs.</em></li>
<li><strong>Confirmation & Publication</strong>: Confirm matrix content with all stakeholders; formalize document and distribute widely; establish regular review and update mechanism. <em>Common mistake: One-time creation without ongoing maintenance.</em></li>
</ol>

<h2>Outputs & Definition of Done</h2>
<ul>
<li>RACI responsibility assignment matrix table with all task-role mappings</li>
<li>Role definition document clarifying each role's responsibility boundaries and authority</li>
<li>CSV format editable template supporting project customization</li>
<li>Conflict identification and resolution records</li>
<li><strong>Acceptance criteria</strong>: Every task has clear A role; no role conflicts or gaps; all stakeholders agree on division of work; regular review mechanism established.</li>
</ul>

<h2>Diagnostics</h2>
<ul>
<li>☐ Every task assigned RACI roles</li>
<li>☐ Every task has one and only one A (Accountable)</li>
<li>☐ R roles have capability and resources to execute tasks</li>
<li>☐ C roles genuinely need two-way communication, not formalistic</li>
<li>☐ I roles controlled to necessary scope, avoiding information overload</li>
<li>☐ Cross-departmental task coordination mechanisms clarified</li>
<li>☐ All stakeholders confirmed and committed to execution</li>
</ul>

<h2>Metrics</h2>
<ul>
<li><strong>Decision Efficiency</strong>: Decision cycle time, decision quality scores</li>
<li><strong>Communication Costs</strong>: Meeting duration, email exchanges, repetitive inquiry frequency</li>
<li><strong>Task Completion Rate</strong>: On-time completion rate, quality compliance rate</li>
<li><strong>Role Satisfaction</strong>: Workload reasonableness, responsibility clarity evaluation</li>
<li><strong>Matrix Maintenance</strong>: Update frequency, actual execution vs matrix consistency</li>
</ul>

<h2>Cross-links</h2>
<ul>
<li><strong>Prerequisites</strong>: Five Dysfunctions diagnosis resolves trust issues, creating conditions for responsibility commitment</li>
<li><strong>Follow-up</strong>: Gantt Chart plans timing arrangements, clarifying time investment for each role</li>
<li><strong>Complementary</strong>: North Star Framework ensures all roles align toward common goals</li>
</ul>

<h2>Case</h2>
<p>A software company's new product launch project had confused responsibilities among product manager, development team, QA, DevOps, and marketing, causing repeated requirement changes, testing delays, and launch failures. Through RACI clarification: Requirements confirmation A=Product Manager, R=Requirements Analyst; Development tasks A=Tech Lead, R=Development Engineers; Testing acceptance A=QA Manager, C=Product Manager; Marketing promotion A=Marketing Director, I=Product Manager. After clear division of work, requirement changes reduced 60%, on-time delivery rate improved from 40% to 85%.</p>

<h2>Pitfalls</h2>
<ul>
<li><strong>Too many A roles</strong>: Assigning multiple A's to one task, causing responsibility dilution</li>
<li><strong>Formalism</strong>: Including everyone in C or I roles to balance relationships</li>
<li><strong>Wrong granularity</strong>: Task breakdown too detailed or too coarse, difficult to operate</li>
<li><strong>Static thinking</strong>: Not adjusting based on project progress after creation</li>
<li><strong>Authority-responsibility mismatch</strong>: Assigning responsibility without corresponding authority and resources</li>
</ul>`,
    diagrams: [
      { title: "RACI 示例表", url: "/diagrams/raci-chart.svg", description: "行=任务，列=角色，单元格填 R/A/C/I" }
    ],
    interactive: {
      type: "table",
      title: { "zh": "RACI 责任矩阵", "en": "RACI Responsibility Matrix" },
      schema: {
        columns: ["task", "role1", "role2", "role3", "role4"],
        rows: [
          { "task": "需求分析", "role1": "R", "role2": "A", "role3": "C", "role4": "I" },
          { "task": "方案设计", "role1": "C", "role2": "R", "role3": "A", "role4": "I" }
        ]
      },
      export: { "png": true, "csv": true }
    }
  },
  'gantt-chart': {
    title: "甘特图",
    englishTitle: "Gantt Chart",
    slug: "gantt-chart",
    chapter: "1",
    subsectionId: '1.1',
    chapterTitle: "发现与战略基础",
    chapterTitleEn: "Discovery & Strategy",
    tags: ["项目计划", "进度管理", "里程碑", "时间管理"],
    tagsEn: ["Project Planning", "Progress Management", "Milestones", "Time Management"],
    summary: "以时间轴展示任务起止、依赖与里程碑，统一节奏与关键路径。产出任务分解表、时间进度计划与风险缓冲方案。",
    summaryEn: "Display task timelines, dependencies and milestones to unify pace and critical path. Delivers task breakdown, timeline schedule and risk buffer plan.",
    templateUrl: "/templates/gantt-chart.pptx",
    htmlContent: `<h2>是什么 / 何时使用</h2>
<p>甘特图由亨利·甘特（Henry Gantt）发明，是一种项目进度管理工具，以条形图形式显示项目、任务的开始时间、结束时间和持续时间。关键特点：</p>
<ul>
<li><strong>时间可视化</strong>：直观显示任务在时间轴上的分布</li>
<li><strong>依赖关系</strong>：显示任务间的先后依赖关系</li>
<li><strong>关键路径</strong>：识别影响项目总期的关键任务链</li>
<li><strong>进度跟踪</strong>：显示实际进度vs计划进度</li>
<li><strong>资源分配</strong>：展示任务负责人和资源需求</li>
</ul>
<p><strong>适用时机</strong>：项目计划阶段、复杂任务协调、进度监控、跨团队协作、里程碑管理等场景。</p>

<h2>前置输入</h2>
<ul>
<li>完整的工作分解结构（WBS）或任务列表</li>
<li>任务时间估算和资源需求</li>
<li>任务间的逻辑依赖关系</li>
<li>关键里程碑和交付节点</li>
<li>团队成员能力和可用时间</li>
</ul>

<h2>步骤</h2>
<ol>
<li><strong>任务分解</strong>：将项目分解为可管理的具体任务；确定任务粒度（建议1-2周）；明确任务的可交付成果。<em>原则：任务太细难以管理，太粗缺乏控制。</em></li>
<li><strong>时间估算</strong>：使用三点估算法（乐观/可能/悲观）；考虑历史数据和团队经验；为高风险任务添加缓冲时间。<em>常见错误：过度乐观，忽略风险和不确定性。</em></li>
<li><strong>依赖映射</strong>：标识任务间的前置关系（FS/SS/FF/SF）；建立关键路径网络；检查循环依赖和逻辑矛盾。<em>示例：需求确认完成后才能开始设计，设计完成后才能开发。</em></li>
<li><strong>资源分配</strong>：为每个任务分配责任人和资源；检查资源冲突和过载情况；进行资源平衡优化。<em>常见错误：假设资源100%可用，忽略请假、会议等非生产时间。</em></li>
<li><strong>里程碑设置</strong>：识别关键交付节点和检查点；设置明确的里程碑标准；建立里程碑审查机制。<em>建议：里程碑不占用工期，但需要明确的完成条件。</em></li>
</ol>

<h2>输出与判定（DoD）</h2>
<ul>
<li>甘特图表，包含任务条、时间轴、依赖线和里程碑</li>
<li>关键路径分析报告，标注关键任务和总浮动时间</li>
<li>资源分配表和负载分析，识别瓶颈资源</li>
<li>风险缓冲计划和应急方案</li>
<li>进度跟踪定期报告模板</li>
<li><strong>合格标准</strong>：任务分解完整无避漏；依赖关系正确无循环；资源分配合理可行；里程碑标准清晰可衡量。</li>
</ul>

<h2>核查清单</h2>
<ul>
<li>□ 所有任务都有明确的起止时间</li>
<li>□ 任务依赖关系正确完整</li>
<li>□ 关键路径已标识并重点监控</li>
<li>□ 资源分配现实可行无过载</li>
<li>□ 里程碑设置合理有意义</li>
<li>□ 风险缓冲时间已考虑</li>
<li>□ 进度更新机制已建立</li>
</ul>

<h2>指标建议</h2>
<ul>
<li><strong>进度绩效</strong>：计划完成率（EV/PV）、进度偏差率</li>
<li><strong>里程碑达成</strong>：里程碑按时完成率、质量达标率</li>
<li><strong>资源效率</strong>：资源利用率、负载平衡度</li>
<li><strong>风险控制</strong>：风险发生频率、缓冲时间使用率</li>
<li><strong>变更管理</strong>：计划变更次数、变更影响度</li>
</ul>

<h2>关联</h2>
<ul>
<li><strong>前置</strong>：RACI矩阵明确任务责任人，为甘特图分配提供基础</li>
<li><strong>后续</strong>：北极星框架确保项目里程碑与业务目标对齐</li>
<li><strong>互补</strong>：五大障碍的解决建立了协作基础，提高执行效率</li>
</ul>

<h2>案例</h2>
<p>某科技公司开发新APP，项目周期6个月，涉及产品、设计、开发、4个团队。通过甘特图规划：第1月需求调研和产品定义；第2月UI/UX设计与技术架构并行；第3-5月分模块开发，关键路径为用户模块→核心业务→支付模块；第6月集成测试和上线准备。设置3个里程碑：MVP原型确认、Beta版本发布、正式上线。结果：通过关键路径管理，项目提前1周交付，质量达标率100%。</p>

<h2>易错点</h2>
<ul>
<li><strong>过度细化</strong>：任务分解过细，导致管理成本高于价值</li>
<li><strong>忽略依赖</strong>：认为任务可以独立并行，忽略逻辑依赖</li>
<li><strong>时间估算偏差</strong>：过度乐观或悲观，缺乏历史数据支撑</li>
<li><strong>资源假设不实</strong>：假设资源100%投入，忽略请假和其他工作</li>
<li><strong>静态管理</strong>：一次制定后不再更新，失去指导意义</li>
<li><strong>忽略缓冲</strong>：不考虑风险和不确定性，计划过于紧凑</li>
</ul>`,
    htmlContentEn: `<h2>What / When to Use</h2>
<p>Gantt Chart, invented by Henry Gantt, is a project progress management tool that displays project tasks' start time, end time and duration in bar chart format. Key features:</p>
<ul>
<li><strong>Time Visualization</strong>: Intuitively displays task distribution on timeline</li>
<li><strong>Dependencies</strong>: Shows precedence relationships between tasks</li>
<li><strong>Critical Path</strong>: Identifies key task chains affecting project duration</li>
<li><strong>Progress Tracking</strong>: Shows actual vs planned progress</li>
<li><strong>Resource Allocation</strong>: Displays task owners and resource requirements</li>
</ul>
<p><strong>Use when</strong>: Project planning phase, complex task coordination, progress monitoring, cross-team collaboration, milestone management.</p>

<h2>Prerequisites</h2>
<ul>
<li>Complete Work Breakdown Structure (WBS) or task list</li>
<li>Task time estimates and resource requirements</li>
<li>Logical dependency relationships between tasks</li>
<li>Key milestones and delivery checkpoints</li>
<li>Team member capabilities and availability</li>
</ul>

<h2>Steps</h2>
<ol>
<li><strong>Task Breakdown</strong>: Break project into manageable specific tasks; determine task granularity (recommended 1-2 weeks); clarify task deliverables. <em>Principle: Too detailed tasks are hard to manage, too coarse lacks control.</em></li>
<li><strong>Time Estimation</strong>: Use three-point estimation (optimistic/likely/pessimistic); consider historical data and team experience; add buffer time for high-risk tasks. <em>Common mistake: Over-optimism, ignoring risks and uncertainties.</em></li>
<li><strong>Dependency Mapping</strong>: Identify precedence relationships between tasks (FS/SS/FF/SF); establish critical path network; check circular dependencies and logical contradictions. <em>Example: Requirements confirmation must complete before design, design must complete before development.</em></li>
<li><strong>Resource Allocation</strong>: Assign owners and resources to each task; check resource conflicts and overload situations; perform resource leveling optimization. <em>Common mistake: Assuming 100% resource availability, ignoring leave, meetings and non-productive time.</em></li>
<li><strong>Milestone Setting</strong>: Identify key delivery nodes and checkpoints; set clear milestone criteria; establish milestone review mechanisms. <em>Recommendation: Milestones don't consume duration but need clear completion conditions.</em></li>
</ol>

<h2>Outputs & Definition of Done</h2>
<ul>
<li>Gantt chart with task bars, timeline, dependency lines and milestones</li>
<li>Critical path analysis report marking key tasks and total float time</li>
<li>Resource allocation table and workload analysis identifying bottleneck resources</li>
<li>Risk buffer plan and contingency measures</li>
<li>Progress tracking regular report template</li>
<li><strong>Acceptance criteria</strong>: Task breakdown complete without omissions; dependency relationships correct without loops; resource allocation reasonable and feasible; milestone criteria clear and measurable.</li>
</ul>

<h2>Diagnostics</h2>
<ul>
<li>□ All tasks have clear start and end times</li>
<li>□ Task dependencies are correct and complete</li>
<li>□ Critical path identified and closely monitored</li>
<li>□ Resource allocation realistic and feasible without overload</li>
<li>□ Milestones set reasonably and meaningfully</li>
<li>□ Risk buffer time considered</li>
<li>□ Progress update mechanism established</li>
</ul>

<h2>Metrics</h2>
<ul>
<li><strong>Progress Performance</strong>: Plan completion rate (EV/PV), schedule variance rate</li>
<li><strong>Milestone Achievement</strong>: On-time milestone completion rate, quality compliance rate</li>
<li><strong>Resource Efficiency</strong>: Resource utilization rate, workload balance degree</li>
<li><strong>Risk Control</strong>: Risk occurrence frequency, buffer time usage rate</li>
<li><strong>Change Management</strong>: Plan change frequency, change impact degree</li>
</ul>

<h2>Cross-links</h2>
<ul>
<li><strong>Prerequisites</strong>: RACI Chart clarifies task owners, providing foundation for Gantt allocation</li>
<li><strong>Follow-up</strong>: North Star Framework ensures project milestones align with business goals</li>
<li><strong>Complementary</strong>: Five Dysfunctions resolution establishes collaboration foundation, improving execution efficiency</li>
</ul>

<h2>Case</h2>
<p>A tech company developing new APP with 6-month timeline involving Product, Design, Development, QA teams. Through Gantt planning: Month 1 requirements research and product definition; Month 2 UI/UX design parallel with technical architecture; Month 3-5 modular development, critical path: User Module → Core Business → Payment Module; Month 6 integration testing and launch preparation. Set 3 milestones: MVP prototype confirmation, Beta release, official launch. Result: Through critical path management, project delivered 1 week early with 100% quality compliance rate.</p>

<h2>Pitfalls</h2>
<ul>
<li><strong>Over-detailing</strong>: Breaking down tasks too finely, causing management costs higher than value</li>
<li><strong>Ignoring dependencies</strong>: Thinking tasks can be independent and parallel, ignoring logical dependencies</li>
<li><strong>Time estimation bias</strong>: Being overly optimistic or pessimistic, lacking historical data support</li>
<li><strong>Unrealistic resource assumptions</strong>: Assuming 100% resource commitment, ignoring leave and other work</li>
<li><strong>Static management</strong>: One-time creation without updates, losing guidance value</li>
<li><strong>Ignoring buffers</strong>: Not considering risks and uncertainties, plans too tight</li>
</ul>`,
    diagrams: [
      { title: "甘特图示意", url: "/diagrams/gantt-chart.svg", description: "条形表示时长，菱形为里程碑" }
    ],
    interactive: {
      type: "gantt",
      title: { "zh": "项目进度计划", "en": "Project Schedule" },
      schema: {
        tasks: [
          { "task": "需求分析", "start": "2024-01-01", "end": "2024-01-15", "owner": "产品经理", "dependency": "", "progress": 100 },
          { "task": "设计原型", "start": "2024-01-16", "end": "2024-02-15", "owner": "UI设计师", "dependency": "需求分析", "progress": 80 },
          { "task": "开发实现", "start": "2024-02-16", "end": "2024-04-15", "owner": "开发团队", "dependency": "设计原型", "progress": 60 }
        ]
      },
      export: { "png": true, "csv": true }
    }
  },
  'pestle-analysis': {
    title: "PESTLE 分析",
    englishTitle: "PESTLE Analysis",
    slug: "pestle-analysis",
    chapter: "1",
    subsectionId: '1.2',
    chapterTitle: "发现与战略基础",
    chapterTitleEn: "Discovery & Strategy",
    tags: ["宏观环境", "外部分析", "战略情境", "环境扫描"],
    tagsEn: ["Macro Environment", "External Analysis", "Strategic Context", "Environmental Scanning"],
    summary: "从政治、经济、社会、技术、法律、环境六维度系统扫描外部环境，识别影响业务的关键因素。产出环境因子清单、影响度评估与机会风险映射表。",
    summaryEn: "Systematically scan external environment across Political, Economic, Social, Technological, Legal, Environmental dimensions to identify key business factors. Delivers environmental factor inventory, impact assessment and opportunity-risk mapping.",
    templateUrl: "/templates/pestle-analysis.pptx",
    htmlContent: `<h2>是什么 / 何时使用</h2>
<p>PESTLE分析是一种宏观环境分析工具，通过六个维度系统性扫描外部环境：</p>
<ul>
<li><strong>政治（Political）</strong>：政策法规、政治稳定性、贸易政策、税收制度</li>
<li><strong>经济（Economic）</strong>：经济增长、利率汇率、通胀失业、消费水平</li>
<li><strong>社会（Social）</strong>：人口结构、文化价值观、生活方式、教育水平</li>
<li><strong>技术（Technological）</strong>：技术创新、研发投入、数字化程度、专利保护</li>
<li><strong>法律（Legal）</strong>：行业监管、合规要求、知识产权、劳动法规</li>
<li><strong>环境（Environmental）</strong>：气候变化、环保政策、可持续发展、资源稀缺</li>
</ul>
<p><strong>适用时机</strong>：战略规划、进入新市场、业务模式调整、风险评估、投资决策等场景。</p>

<h2>前置输入</h2>
<ul>
<li>目标市场或业务领域的基本情况</li>
<li>相关行业报告与政策文件</li>
<li>历史数据与趋势资料</li>
<li>利益相关方地图与影响关系</li>
</ul>

<h2>步骤</h2>
<ol>
<li><strong>维度分解</strong>：按P-E-S-T-L-E六维度收集相关信息；关注与业务直接相关的因素；避免泛泛而谈的宏观描述。<em>示例：政治维度关注具体的行业监管政策，而非一般政治环境。</em></li>
<li><strong>因子识别</strong>：每个维度列出3-7个关键影响因子；基于事实和数据，避免主观臆测；关注变化趋势而非静态现状。<em>常见错误：罗列过多琐碎因素，缺乏重点。</em></li>
<li><strong>影响评估</strong>：评估每个因子对业务的影响程度（高/中/低）；判断影响方向（机会/威胁/中性）；考虑时间维度（短期/中期/长期）。<em>工具：可使用1-5分评分法量化影响度。</em></li>
<li><strong>关联分析</strong>：识别维度间的相互作用和联动效应；关注政策与技术的组合影响；发现可能的连锁反应。<em>示例：环保政策推动新技术发展，进而影响成本结构。</em></li>
<li><strong>机会风险映射</strong>：将高影响因子转化为具体的机会或风险；制定应对策略和行动计划；建立监控预警机制。<em>常见错误：分析停留在因子识别，未转化为行动。</em></li>
</ol>

<h2>输出与判定（DoD）</h2>
<ul>
<li>PESTLE六维因子清单，每维度3-7个关键因子</li>
<li>影响度评估矩阵，包含影响程度、方向、时间维度</li>
<li>机会与风险映射表，优先级排序</li>
<li>关键因子监控指标与预警阈值</li>
<li><strong>合格标准</strong>：因子基于具体事实；影响评估有量化依据；输出能指导决策行动；建立了持续监控机制。</li>
</ul>

<h2>核查清单</h2>
<ul>
<li>□ 六个维度都有涉及且平衡</li>
<li>□ 每个因子都有具体事实支撑</li>
<li>□ 影响评估考虑了程度、方向、时间</li>
<li>□ 识别了维度间的关联效应</li>
<li>□ 高影响因子转化为具体机会/风险</li>
<li>□ 制定了针对性的应对策略</li>
<li>□ 建立了监控更新机制</li>
</ul>

<h2>指标建议</h2>
<ul>
<li><strong>覆盖完整性</strong>：六维度因子数量均衡度、信息来源多样性</li>
<li><strong>预测准确性</strong>：趋势判断准确率、风险发生概率</li>
<li><strong>行动转化率</strong>：机会抓取成功率、风险规避效果</li>
<li><strong>更新及时性</strong>：监控频率、信息更新周期</li>
<li><strong>决策支撑度</strong>：战略调整响应速度、投资决策成功率</li>
</ul>

<h2>关联</h2>
<ul>
<li><strong>前置</strong>：波特五力分析确定行业结构，为PESTLE提供聚焦方向</li>
<li><strong>后续</strong>：SWOT分析将外部环境因素与内部能力匹配</li>
<li><strong>互补</strong>：商业机会声明将环境洞察转化为具体机会定义</li>
</ul>

<h2>案例</h2>
<p>某电动车企业进入东南亚市场的PESTLE分析：政治—各国新能源汽车激励政策差异；经济—GDP增长带动消费升级但汇率波动影响成本；社会—年轻人环保意识提升，城市化加速；技术—充电基础设施建设加快，电池技术本土化需求；法律—各国排放标准趋严，进口关税政策变化；环境—极端天气影响供应链，碳中和承诺推动需求。最终识别出政策窗口期机会，制定了分阶段进入策略。</p>

<h2>易错点</h2>
<ul>
<li><strong>表面化分析</strong>：停留在宏观描述，缺乏具体业务关联</li>
<li><strong>静态思维</strong>：忽略趋势变化，只看当前状态</li>
<li><strong>孤立分析</strong>：各维度割裂，不考虑相互影响</li>
<li><strong>信息过载</strong>：罗列过多细节，抓不住重点</li>
<li><strong>分析与行动脱节</strong>：做完分析不知道如何应用</li>
</ul>`,
    htmlContentEn: `<h2>What / When to Use</h2>
<p>PESTLE Analysis is a macro-environmental analysis tool that systematically scans the external environment across six dimensions:</p>
<ul>
<li><strong>Political</strong>: Policies, political stability, trade policies, tax systems</li>
<li><strong>Economic</strong>: Economic growth, interest/exchange rates, inflation/unemployment, consumption levels</li>
<li><strong>Social</strong>: Demographics, cultural values, lifestyles, education levels</li>
<li><strong>Technological</strong>: Innovation, R&D investment, digitalization, patent protection</li>
<li><strong>Legal</strong>: Industry regulations, compliance requirements, intellectual property, labor laws</li>
<li><strong>Environmental</strong>: Climate change, environmental policies, sustainability, resource scarcity</li>
</ul>
<p><strong>Use when</strong>: Strategic planning, entering new markets, business model adjustments, risk assessment, investment decisions.</p>

<h2>Prerequisites</h2>
<ul>
<li>Basic understanding of target market or business domain</li>
<li>Relevant industry reports and policy documents</li>
<li>Historical data and trend materials</li>
<li>Stakeholder map and influence relationships</li>
</ul>

<h2>Steps</h2>
<ol>
<li><strong>Dimension Breakdown</strong>: Collect relevant information across P-E-S-T-L-E dimensions; focus on factors directly related to business; avoid generic macro descriptions. <em>Example: Political dimension focuses on specific industry regulatory policies, not general political environment.</em></li>
<li><strong>Factor Identification</strong>: List 3-7 key influencing factors per dimension; base on facts and data, avoid subjective speculation; focus on trends rather than static status. <em>Common mistake: Listing too many trivial factors without focus.</em></li>
<li><strong>Impact Assessment</strong>: Evaluate each factor's impact on business (high/medium/low); determine impact direction (opportunity/threat/neutral); consider time dimension (short/medium/long-term). <em>Tool: Use 1-5 scoring method to quantify impact.</em></li>
<li><strong>Correlation Analysis</strong>: Identify interactions and linkage effects between dimensions; focus on combined impact of policies and technology; discover potential chain reactions. <em>Example: Environmental policies drive new technology development, affecting cost structure.</em></li>
<li><strong>Opportunity-Risk Mapping</strong>: Transform high-impact factors into specific opportunities or risks; develop response strategies and action plans; establish monitoring and early warning mechanisms. <em>Common mistake: Analysis stops at factor identification without converting to action.</em></li>
</ol>

<h2>Outputs & Definition of Done</h2>
<ul>
<li>PESTLE six-dimension factor inventory with 3-7 key factors per dimension</li>
<li>Impact assessment matrix including impact degree, direction, time dimension</li>
<li>Opportunity and risk mapping table with priority ranking</li>
<li>Key factor monitoring indicators and warning thresholds</li>
<li><strong>Acceptance criteria</strong>: Factors based on specific facts; impact assessment has quantitative basis; outputs can guide decision actions; continuous monitoring mechanism established.</li>
</ul>

<h2>Diagnostics</h2>
<ul>
<li>□ All six dimensions covered and balanced</li>
<li>□ Each factor supported by specific facts</li>
<li>□ Impact assessment considers degree, direction, time</li>
<li>□ Identified correlations between dimensions</li>
<li>□ High-impact factors converted to specific opportunities/risks</li>
<li>□ Developed targeted response strategies</li>
<li>□ Established monitoring and update mechanisms</li>
</ul>

<h2>Metrics</h2>
<ul>
<li><strong>Coverage Completeness</strong>: Balance of factors across six dimensions, diversity of information sources</li>
<li><strong>Prediction Accuracy</strong>: Trend judgment accuracy rate, risk occurrence probability</li>
<li><strong>Action Conversion Rate</strong>: Opportunity capture success rate, risk mitigation effectiveness</li>
<li><strong>Update Timeliness</strong>: Monitoring frequency, information update cycle</li>
<li><strong>Decision Support</strong>: Strategic adjustment response speed, investment decision success rate</li>
</ul>

<h2>Cross-links</h2>
<ul>
<li><strong>Prerequisites</strong>: Porter's Five Forces determines industry structure, providing focus direction for PESTLE</li>
<li><strong>Follow-up</strong>: SWOT Analysis matches external environmental factors with internal capabilities</li>
<li><strong>Complementary</strong>: Business Opportunity Statement converts environmental insights into specific opportunity definitions</li>
</ul>

<h2>Case</h2>
<p>An electric vehicle company's PESTLE analysis for Southeast Asian market entry: Political—varying new energy vehicle incentive policies across countries; Economic—GDP growth driving consumption upgrade but currency volatility affecting costs; Social—rising environmental awareness among young people, accelerating urbanization; Technological—accelerating charging infrastructure construction, local battery technology needs; Legal—tightening emission standards across countries, changing import tariff policies; Environmental—extreme weather affecting supply chains, carbon neutrality commitments driving demand. Finally identified policy window opportunities and developed phased entry strategy.</p>

<h2>Pitfalls</h2>
<ul>
<li><strong>Surface-level analysis</strong>: Staying at macro descriptions without specific business connections</li>
<li><strong>Static thinking</strong>: Ignoring trend changes, only looking at current state</li>
<li><strong>Isolated analysis</strong>: Fragmenting dimensions without considering mutual influences</li>
<li><strong>Information overload</strong>: Listing too many details, missing key points</li>
<li><strong>Analysis-action disconnect</strong>: Not knowing how to apply after completing analysis</li>
</ul>`,
    diagrams: [
      { title: "PESTLE 六象限", url: "/diagrams/pestle-analysis.svg", description: "六维度外部因素盘点" }
    ],
    interactive: {
      type: "matrix",
      title: { "zh": "PESTLE 环境因子评估", "en": "PESTLE Environmental Factor Assessment" },
      schema: {
        dimensions: ["Political", "Economic", "Social", "Technological", "Legal", "Environmental"],
        factors: [
          { dimension: "Political", factor: "新能源政策", impact: 4, direction: "opportunity", timeframe: "short" },
          { dimension: "Economic", factor: "汇率波动", impact: 3, direction: "threat", timeframe: "medium" },
          { dimension: "Social", factor: "环保意识", impact: 4, direction: "opportunity", timeframe: "long" }
        ]
      },
      export: { "png": true, "csv": true }
    }
  },
  'sswot-analysis': {
    title: "sSWOT 分析",
    englishTitle: "sSWOT Analysis",
    slug: "sswot-analysis",
    chapter: "1",
    subsectionId: '1.2',
    chapterTitle: "发现与战略基础",
    chapterTitleEn: "Discovery & Strategy",
    tags: ["战略分析", "内外匹配", "情境化", "策略制定"],
    tagsEn: ["Strategic Analysis", "Internal-External Matching", "Contextualization", "Strategy Formulation"],
    summary: "在SWOT基础上强调情境化，将内部要素与外部环境精准匹配，形成SO/ST/WO/WT四组具体策略。产出情境化分析报告与行动策略矩阵。",
    summaryEn: "Emphasizes contextualization based on SWOT, precisely matching internal factors with external environment to form four specific strategy groups: SO/ST/WO/WT. Delivers contextualized analysis report and action strategy matrix.",
    templateUrl: "/templates/sswot-analysis.pptx",
    htmlContent: `<h2>是什么 / 何时使用</h2>
<p>sSWOT（Situational SWOT）是传统SWOT分析的升级版，强调情境化和策略导向。与传统SWOT不同，sSWOT：</p>
<ul>
<li><strong>情境锚定</strong>：以特定问题或目标为核心，而非泛泛分析</li>
<li><strong>策略输出</strong>：直接产出四组行动策略而非停留在要素识别</li>
<li><strong>匹配精准</strong>：将内部S/W与外部O/T进行精确配对</li>
<li><strong>行动导向</strong>：每个策略都配有具体的执行路径</li>
</ul>
<p>四组策略矩阵：</p>
<ul>
<li><strong>SO策略（增长型）</strong>：利用内部优势抓住外部机会</li>
<li><strong>ST策略（对抗型）</strong>：发挥内部优势应对外部威胁</li>
<li><strong>WO策略（扭转型）</strong>：克服内部劣势把握外部机会</li>
<li><strong>WT策略（防御型）</strong>：减少内部劣势并规避外部威胁</li>
</ul>
<p><strong>适用时机</strong>：战略转型、竞争策略制定、问题解决、投资决策、危机应对等需要具体行动方案的场景。</p>

<h2>前置输入</h2>
<ul>
<li>明确的分析目标或关键问题</li>
<li>PESTLE或行业分析的外部环境洞察</li>
<li>内部能力审计或资源评估结果</li>
<li>关键决策时点和约束条件</li>
</ul>

<h2>步骤</h2>
<ol>
<li><strong>情境界定</strong>：明确分析的具体问题、目标或情境；设定分析边界和时间范围；识别关键利益相关方。<em>示例：不是分析"公司整体状况"，而是"进入新兴市场的可行性"。</em></li>
<li><strong>要素识别</strong>：基于特定情境收集内部优势/劣势；识别该情境下的外部机会/威胁；每个象限3-5个关键要素即可。<em>常见错误：要素过于宽泛，与具体情境关联度低。</em></li>
<li><strong>匹配分析</strong>：将每个优势与每个机会进行配对，评估匹配度；同理进行S-T、W-O、W-T配对；识别最有潜力的组合。<em>工具：可使用匹配度矩阵评分1-5分。</em></li>
<li><strong>策略制定</strong>：为每个高匹配度组合制定具体策略；策略应包含目标、行动、资源、时间；按可行性和影响力排序。<em>示例：SO策略"利用技术优势（S）抓住数字化机会（O）→开发AI产品线"。</em></li>
<li><strong>执行路径</strong>：为优先策略制定详细执行计划；分解关键里程碑和成功指标；识别风险点和应对方案。<em>常见错误：策略制定后缺乏可执行的行动计划。</em></li>
</ol>

<h2>输出与判定（DoD）</h2>
<ul>
<li>情境化SWOT四象限要素清单，每象限3-5个关键要素</li>
<li>策略匹配矩阵，显示S/W与O/T的配对关系</li>
<li>四组策略方案（SO/ST/WO/WT），每组2-4个具体策略</li>
<li>优先策略执行路径图，包含时间线和资源配置</li>
<li><strong>合格标准</strong>：分析聚焦特定情境；策略具体可执行；匹配关系清晰合理；有明确的优先级排序。</li>
</ul>

<h2>核查清单</h2>
<ul>
<li>□ 分析围绕明确的问题或目标</li>
<li>□ SWOT要素与情境高度相关</li>
<li>□ 完成了S/W与O/T的匹配分析</li>
<li>□ 四组策略都有具体内容</li>
<li>□ 策略包含目标、行动、资源、时间</li>
<li>□ 制定了优先级和执行顺序</li>
<li>□ 识别了执行风险和应对措施</li>
</ul>

<h2>指标建议</h2>
<ul>
<li><strong>策略相关性</strong>：策略与情境目标匹配度、要素关联度评分</li>
<li><strong>可行性评估</strong>：资源可获得性、技术可实现性、时间合理性</li>
<li><strong>执行进展</strong>：里程碑完成率、关键行动执行率</li>
<li><strong>效果评估</strong>：目标达成度、竞争优势改善程度</li>
<li><strong>动态调整</strong>：策略修正频率、环境变化适应速度</li>
</ul>

<h2>关联</h2>
<ul>
<li><strong>前置</strong>：PESTLE提供外部环境分析，为O/T识别提供基础</li>
<li><strong>后续</strong>：商业机会声明将优选策略转化为具体机会定义</li>
<li><strong>互补</strong>：波特五力分析补充行业竞争维度的威胁识别</li>
</ul>

<h2>案例</h2>
<p>某传统制造企业面临数字化转型的sSWOT分析：情境—在行业数字化浪潮中保持竞争力。S：深厚制造经验、客户关系稳固；W：IT能力不足、创新文化缺乏；O：工业4.0政策支持、新兴技术成熟；T：数字化竞争对手涌现、客户需求变化。SO策略：利用客户关系推广智能制造解决方案；WO策略：与科技公司合作补齐数字化能力；ST策略：强化传统优势建立差异化壁垒；WT策略：渐进式转型降低变革风险。最终选择WO策略为主，成功实现数字化升级。</p>

<h2>易错点</h2>
<ul>
<li><strong>缺乏情境聚焦</strong>：仍然做泛泛的SWOT分析，没有具体问题导向</li>
<li><strong>要素匹配草率</strong>：机械组合S/W与O/T，缺乏逻辑思考</li>
<li><strong>策略空泛无力</strong>：策略表述模糊，缺乏可操作性</li>
<li><strong>忽视优先级</strong>：所有策略并列，没有资源和时间考量</li>
<li><strong>执行与分析脱节</strong>：完成分析后缺乏执行跟进</li>
</ul>`,
    htmlContentEn: `<h2>What / When to Use</h2>
<p>sSWOT (Situational SWOT) is an upgraded version of traditional SWOT analysis, emphasizing contextualization and strategy orientation. Unlike traditional SWOT, sSWOT features:</p>
<ul>
<li><strong>Situational Anchoring</strong>: Centers on specific problems or goals rather than general analysis</li>
<li><strong>Strategy Output</strong>: Directly produces four action strategy groups instead of stopping at factor identification</li>
<li><strong>Precise Matching</strong>: Accurately pairs internal S/W with external O/T</li>
<li><strong>Action-Oriented</strong>: Each strategy comes with specific execution paths</li>
</ul>
<p>Four strategy matrix groups:</p>
<ul>
<li><strong>SO Strategy (Growth)</strong>: Leverage internal strengths to capture external opportunities</li>
<li><strong>ST Strategy (Confrontational)</strong>: Use internal strengths to counter external threats</li>
<li><strong>WO Strategy (Turnaround)</strong>: Overcome internal weaknesses to seize external opportunities</li>
<li><strong>WT Strategy (Defensive)</strong>: Minimize internal weaknesses and avoid external threats</li>
</ul>
<p><strong>Use when</strong>: Strategic transformation, competitive strategy development, problem solving, investment decisions, crisis response requiring specific action plans.</p>

<h2>Prerequisites</h2>
<ul>
<li>Clear analysis objectives or key questions</li>
<li>External environment insights from PESTLE or industry analysis</li>
<li>Internal capability audit or resource assessment results</li>
<li>Key decision points and constraint conditions</li>
</ul>

<h2>Steps</h2>
<ol>
<li><strong>Situational Definition</strong>: Clarify specific problems, goals or situations for analysis; set analysis boundaries and time scope; identify key stakeholders. <em>Example: Not analyzing "overall company situation" but "feasibility of entering emerging markets".</em></li>
<li><strong>Factor Identification</strong>: Collect internal strengths/weaknesses based on specific situation; identify external opportunities/threats in this context; 3-5 key factors per quadrant sufficient. <em>Common mistake: Factors too broad with low relevance to specific situation.</em></li>
<li><strong>Matching Analysis</strong>: Pair each strength with each opportunity, assess matching degree; similarly pair S-T, W-O, W-T; identify most promising combinations. <em>Tool: Use matching degree matrix scoring 1-5 points.</em></li>
<li><strong>Strategy Formulation</strong>: Develop specific strategies for each high-matching combination; strategies should include objectives, actions, resources, timing; prioritize by feasibility and impact. <em>Example: SO strategy "Leverage technology advantage (S) to capture digitalization opportunity (O) → Develop AI product line".</em></li>
<li><strong>Execution Pathway</strong>: Create detailed execution plans for priority strategies; break down key milestones and success indicators; identify risk points and response measures. <em>Common mistake: Lacking executable action plans after strategy formulation.</em></li>
</ol>

<h2>Outputs & Definition of Done</h2>
<ul>
<li>Situational SWOT four-quadrant factor list with 3-5 key factors per quadrant</li>
<li>Strategy matching matrix showing S/W and O/T pairing relationships</li>
<li>Four strategy groups (SO/ST/WO/WT) with 2-4 specific strategies each</li>
<li>Priority strategy execution roadmap including timeline and resource allocation</li>
<li><strong>Acceptance criteria</strong>: Analysis focuses on specific situation; strategies are concrete and executable; matching relationships clear and reasonable; clear priority ranking established.</li>
</ul>

<h2>Diagnostics</h2>
<ul>
<li>□ Analysis centers on clear problems or objectives</li>
<li>□ SWOT factors highly relevant to situation</li>
<li>□ Completed S/W and O/T matching analysis</li>
<li>□ All four strategy groups have specific content</li>
<li>□ Strategies include objectives, actions, resources, timing</li>
<li>□ Established priorities and execution sequence</li>
<li>□ Identified execution risks and response measures</li>
</ul>

<h2>Metrics</h2>
<ul>
<li><strong>Strategy Relevance</strong>: Strategy-situation objective matching degree, factor correlation scores</li>
<li><strong>Feasibility Assessment</strong>: Resource availability, technical achievability, time reasonableness</li>
<li><strong>Execution Progress</strong>: Milestone completion rate, key action execution rate</li>
<li><strong>Effectiveness Evaluation</strong>: Objective achievement degree, competitive advantage improvement</li>
<li><strong>Dynamic Adjustment</strong>: Strategy modification frequency, environmental change adaptation speed</li>
</ul>

<h2>Cross-links</h2>
<ul>
<li><strong>Prerequisites</strong>: PESTLE provides external environmental analysis, offering foundation for O/T identification</li>
<li><strong>Follow-up</strong>: Business Opportunity Statement converts selected strategies into specific opportunity definitions</li>
<li><strong>Complementary</strong>: Porter's Five Forces supplements industry competitive dimension threat identification</li>
</ul>

<h2>Case</h2>
<p>A traditional manufacturing company's sSWOT analysis facing digital transformation: Situation—maintaining competitiveness amid industry digitalization wave. S: Deep manufacturing experience, solid customer relationships; W: Insufficient IT capabilities, lacking innovation culture; O: Industry 4.0 policy support, emerging technology maturity; T: Digital competitors emerging, changing customer demands. SO Strategy: Leverage customer relationships to promote smart manufacturing solutions; WO Strategy: Partner with tech companies to fill digital capability gaps; ST Strategy: Strengthen traditional advantages to build differentiation barriers; WT Strategy: Gradual transformation to reduce change risks. Finally chose WO strategy as primary approach, successfully achieving digital upgrade.</p>

<h2>Pitfalls</h2>
<ul>
<li><strong>Lack of situational focus</strong>: Still doing general SWOT analysis without specific problem orientation</li>
<li><strong>Hasty factor matching</strong>: Mechanically combining S/W with O/T without logical thinking</li>
<li><strong>Vague strategies</strong>: Strategy statements ambiguous, lacking operability</li>
<li><strong>Ignoring priorities</strong>: All strategies parallel without resource and time considerations</li>
<li><strong>Execution-analysis disconnect</strong>: Lacking execution follow-up after completing analysis</li>
</ul>`,
    diagrams: [
      { title: "sSWOT 矩阵", url: "/diagrams/sswot-analysis.svg", description: "四象限策略推导示意" }
    ],
    interactive: {
      type: "matrix",
      title: { "zh": "sSWOT 策略矩阵", "en": "sSWOT Strategy Matrix" },
      schema: {
        rows: ["Strengths", "Weaknesses"],
        cols: ["Opportunities", "Threats"],
        cells: [
          { row: 0, col: 0, strategy: "SO", content: "利用优势抓住机会", strategies: ["技术优势+市场机会", "品牌优势+政策机会"] },
          { row: 0, col: 1, strategy: "ST", content: "优势应对威胁", strategies: ["核心能力+竞争威胁", "客户关系+价格威胁"] },
          { row: 1, col: 0, strategy: "WO", content: "克服劣势把握机会", strategies: ["能力补齐+新兴机会", "资源整合+技术机会"] },
          { row: 1, col: 1, strategy: "WT", content: "减少劣势规避威胁", strategies: ["风险控制+威胁防范", "成本优化+市场退出"] }
        ]
      },
      export: { "png": true, "csv": true }
    }
  },
  'business-opportunity-statement': {
    title: "商业机会声明",
    englishTitle: "Business Opportunity Statement",
    slug: "business-opportunity-statement",
    chapter: "1",
    subsectionId: '1.3',
    chapterTitle: "发现与战略基础",
    chapterTitleEn: "Discovery & Strategy",
    tags: ["机会定义", "问题陈述", "对齐共识", "价值主张"],
    tagsEn: ["Opportunity Definition", "Problem Statement", "Alignment Consensus", "Value Proposition"],
    summary: "用简洁四要素结构（对象、痛点、价值、成功标准）描述商业机会，形成团队统一理解的机会锚点。产出一页纸机会画布与验证假设清单。",
    summaryEn: "Uses concise four-element structure (target, pain point, value, success criteria) to describe business opportunities, forming unified team understanding. Delivers one-page opportunity canvas and validation hypothesis list.",
    templateUrl: "/templates/business-opportunity-statement.pptx",
    htmlContent: `<h2>是什么 / 何时使用</h2>
<p>商业机会声明是一个结构化的一页纸工具，通过四个核心要素清晰定义商业机会：</p>
<ul>
<li><strong>面向对象（Who）</strong>：具体的目标客户群体或用户画像</li>
<li><strong>核心痛点（What）</strong>：客户面临的关键问题和未满足需求</li>
<li><strong>价值主张（Why）</strong>：我们提供的独特价值和解决方案</li>
<li><strong>成功标准（How）</strong>：可衡量的成功指标和验证标准</li>
</ul>
<p>与传统商业计划书不同，机会声明：</p>
<ul>
<li><strong>聚焦核心</strong>：只关注最关键的四个要素</li>
<li><strong>假设导向</strong>：明确标注假设，便于后续验证</li>
<li><strong>迭代友好</strong>：结构简单，便于快速调整</li>
<li><strong>对齐工具</strong>：帮助团队形成统一理解</li>
</ul>
<p><strong>适用时机</strong>：项目立项、投资决策、产品规划、市场进入、战略转型等需要明确机会定义的场景。</p>

<h2>前置输入</h2>
<ul>
<li>用户研究和市场调研数据</li>
<li>竞品分析和行业洞察</li>
<li>内部能力评估和资源盘点</li>
<li>SWOT或PESTLE等战略分析结果</li>
</ul>

<h2>步骤</h2>
<ol>
<li><strong>对象定义</strong>：明确具体的目标客户群体；使用用户画像或细分标准；避免"所有人"等泛泛表述；量化市场规模和特征。<em>示例：25-35岁一线城市职场新手，年收入15-30万，注重效率和品质。</em></li>
<li><strong>痛点挖掘</strong>：识别目标用户的核心痛点；基于真实调研而非主观臆测；区分表面需求和潜在需求；评估痛点的紧迫性和普遍性。<em>常见错误：罗列过多痛点，没有聚焦最关键问题。</em></li>
<li><strong>价值设计</strong>：明确我们提供的独特价值；说明为什么我们能更好地解决问题；避免功能罗列，聚焦核心价值；考虑竞争差异化。<em>工具：可使用"与其...不如..."句式表达差异化价值。</em></li>
<li><strong>成功量化</strong>：设定可衡量的成功指标；包含商业指标和用户指标；设定验证时间节点；明确数据获取方式。<em>示例：6个月内获得10000付费用户，用户留存率达到60%。</em></li>
<li><strong>假设标注</strong>：识别声明中的关键假设；标注需要验证的不确定因素；制定假设验证计划；建立学习反馈机制。<em>常见错误：将假设当作既定事实，缺乏验证意识。</em></li>
</ol>

<h2>输出与判定（DoD）</h2>
<ul>
<li>一页纸商业机会声明，包含四要素完整描述</li>
<li>关键假设清单，标注优先级和验证方法</li>
<li>成功指标仪表板设计，包含数据获取计划</li>
<li>机会评估打分表，从可行性、市场性、竞争性维度评分</li>
<li><strong>合格标准</strong>：四要素描述具体清晰；假设明确可验证；指标可衡量有时限；团队达成共识。</li>
</ul>

<h2>核查清单</h2>
<ul>
<li>□ 目标用户定义具体且可识别</li>
<li>□ 痛点基于真实调研数据</li>
<li>□ 价值主张差异化明显</li>
<li>□ 成功标准具体可衡量</li>
<li>□ 关键假设已明确标注</li>
<li>□ 制定了验证计划和时间表</li>
<li>□ 团队对机会声明达成共识</li>
</ul>

<h2>指标建议</h2>
<ul>
<li><strong>用户契合度</strong>：目标用户识别准确率、痛点共鸣度评分</li>
<li><strong>价值验证度</strong>：价值主张接受率、愿付价格调研</li>
<li><strong>假设验证率</strong>：关键假设验证完成率、验证结果准确性</li>
<li><strong>团队对齐度</strong>：机会理解一致性评分、决策效率提升</li>
<li><strong>迭代速度</strong>：机会声明更新频率、学习反馈周期</li>
</ul>

<h2>关联</h2>
<ul>
<li><strong>前置</strong>：sSWOT分析的优选策略为机会声明提供方向</li>
<li><strong>后续</strong>：北极星框架将机会转化为可执行的指标体系</li>
<li><strong>互补</strong>：用户画像和同理心地图提供目标用户洞察</li>
</ul>

<h2>案例</h2>
<p>某在线教育公司的机会声明：对象—二三线城市25-40岁有学龄儿童的双职工家庭，收入稳定但时间受限；痛点—优质教育资源稀缺，线下辅导班地理位置不便，家长缺乏辅导专业知识；价值—提供名师在线1对1辅导，灵活时间安排，家长可旁听学习辅导方法；成功标准—12个月内获得50万注册用户，付费转化率15%，月续费率80%。关键假设：二三线家长愿意为在线教育付费、网络基础设施支持流畅教学。通过逐步验证假设，成功进入细分市场。</p>

<h2>易错点</h2>
<ul>
<li><strong>目标过于宽泛</strong>："所有家长"等无法执行的泛泛定义</li>
<li><strong>痛点主观臆测</strong>：基于个人经验而非用户调研</li>
<li><strong>价值表述模糊</strong>：功能罗列而非核心价值凝练</li>
<li><strong>指标无法衡量</strong>："大幅提升"等定性描述</li>
<li><strong>假设当作事实</strong>：对不确定因素过度自信</li>
</ul>`,
    htmlContentEn: `<h2>What / When to Use</h2>
<p>Business Opportunity Statement is a structured one-page tool that clearly defines business opportunities through four core elements:</p>
<ul>
<li><strong>Target Audience (Who)</strong>: Specific target customer groups or user profiles</li>
<li><strong>Core Pain Point (What)</strong>: Key problems customers face and unmet needs</li>
<li><strong>Value Proposition (Why)</strong>: Unique value and solutions we provide</li>
<li><strong>Success Criteria (How)</strong>: Measurable success indicators and validation standards</li>
</ul>
<p>Unlike traditional business plans, opportunity statements feature:</p>
<ul>
<li><strong>Core Focus</strong>: Only addresses four most critical elements</li>
<li><strong>Hypothesis-Driven</strong>: Clearly marks assumptions for future validation</li>
<li><strong>Iteration-Friendly</strong>: Simple structure for quick adjustments</li>
<li><strong>Alignment Tool</strong>: Helps teams form unified understanding</li>
</ul>
<p><strong>Use when</strong>: Project initiation, investment decisions, product planning, market entry, strategic transformation requiring clear opportunity definition.</p>

<h2>Prerequisites</h2>
<ul>
<li>User research and market research data</li>
<li>Competitive analysis and industry insights</li>
<li>Internal capability assessment and resource inventory</li>
<li>Strategic analysis results like SWOT or PESTLE</li>
</ul>

<h2>Steps</h2>
<ol>
<li><strong>Audience Definition</strong>: Clarify specific target customer groups; use personas or segmentation criteria; avoid generic terms like "everyone"; quantify market size and characteristics. <em>Example: 25-35 year old first-tier city professionals, annual income 150-300k RMB, value efficiency and quality.</em></li>
<li><strong>Pain Point Discovery</strong>: Identify core pain points of target users; base on actual research not subjective speculation; distinguish surface needs from underlying needs; assess pain point urgency and prevalence. <em>Common mistake: Listing too many pain points without focusing on key issues.</em></li>
<li><strong>Value Design</strong>: Clarify unique value we provide; explain why we can solve problems better; avoid feature lists, focus on core value; consider competitive differentiation. <em>Tool: Use "Instead of... we offer..." format to express differentiated value.</em></li>
<li><strong>Success Quantification</strong>: Set measurable success indicators; include business and user metrics; set validation timelines; clarify data acquisition methods. <em>Example: Acquire 10,000 paying users in 6 months with 60% retention rate.</em></li>
<li><strong>Assumption Annotation</strong>: Identify key assumptions in statement; mark uncertain factors needing validation; develop assumption validation plan; establish learning feedback mechanisms. <em>Common mistake: Treating assumptions as established facts without validation awareness.</em></li>
</ol>

<h2>Outputs & Definition of Done</h2>
<ul>
<li>One-page business opportunity statement with complete four-element description</li>
<li>Key assumption list with priorities and validation methods</li>
<li>Success indicator dashboard design with data acquisition plan</li>
<li>Opportunity assessment scorecard evaluating feasibility, market potential, competitiveness</li>
<li><strong>Acceptance criteria</strong>: Four elements described specifically and clearly; assumptions clear and verifiable; indicators measurable with deadlines; team consensus achieved.</li>
</ul>

<h2>Diagnostics</h2>
<ul>
<li>□ Target user definition specific and identifiable</li>
<li>□ Pain points based on actual research data</li>
<li>□ Value proposition clearly differentiated</li>
<li>□ Success criteria specific and measurable</li>
<li>□ Key assumptions clearly marked</li>
<li>□ Validation plan and timeline established</li>
<li>□ Team consensus achieved on opportunity statement</li>
</ul>

<h2>Metrics</h2>
<ul>
<li><strong>User Fit</strong>: Target user identification accuracy, pain point resonance scores</li>
<li><strong>Value Validation</strong>: Value proposition acceptance rate, willingness to pay research</li>
<li><strong>Assumption Validation Rate</strong>: Key assumption validation completion rate, validation result accuracy</li>
<li><strong>Team Alignment</strong>: Opportunity understanding consistency scores, decision-making efficiency improvement</li>
<li><strong>Iteration Speed</strong>: Opportunity statement update frequency, learning feedback cycles</li>
</ul>

<h2>Cross-links</h2>
<ul>
<li><strong>Prerequisites</strong>: sSWOT Analysis selected strategies provide direction for opportunity statement</li>
<li><strong>Follow-up</strong>: North Star Framework converts opportunities into executable indicator systems</li>
<li><strong>Complementary</strong>: User personas and empathy maps provide target user insights</li>
</ul>

<h2>Case</h2>
<p>An online education company's opportunity statement: Audience—dual-income families with school-age children in tier-2/3 cities, aged 25-40, stable income but time-constrained; Pain Point—scarce quality education resources, inconvenient offline tutoring locations, parents lack professional guidance knowledge; Value—provides famous teacher 1-on-1 online tutoring, flexible scheduling, parents can observe and learn tutoring methods; Success Criteria—acquire 500,000 registered users in 12 months, 15% paid conversion rate, 80% monthly retention rate. Key assumptions: tier-2/3 city parents willing to pay for online education, network infrastructure supports smooth teaching. Successfully entered niche market through gradual hypothesis validation.</p>

<h2>Pitfalls</h2>
<ul>
<li><strong>Overly broad targets</strong>: Unexecutable generic definitions like "all parents"</li>
<li><strong>Subjective pain point speculation</strong>: Based on personal experience rather than user research</li>
<li><strong>Vague value expression</strong>: Feature lists rather than core value refinement</li>
<li><strong>Unmeasurable indicators</strong>: Qualitative descriptions like "significant improvement"</li>
<li><strong>Assumptions as facts</strong>: Overconfidence in uncertain factors</li>
</ul>`,
    diagrams: [
      { title: "机会声明画布", url: "/diagrams/business-opportunity-statement.svg", description: "四区块结构示意" }
    ],
    interactive: {
      type: "viz",
      title: { "zh": "商业机会画布", "en": "Business Opportunity Canvas" },
      schema: {
        sections: [
          { key: "who", labelZh: "面向对象", labelEn: "Target Audience", content: "具体的目标客户群体" },
          { key: "what", labelZh: "核心痛点", labelEn: "Core Pain Point", content: "客户关键问题和未满足需求" },
          { key: "why", labelZh: "价值主张", labelEn: "Value Proposition", content: "独特价值和解决方案" },
          { key: "how", labelZh: "成功标准", labelEn: "Success Criteria", content: "可衡量的成功指标" }
        ],
        assumptions: ["目标用户愿意付费", "解决方案技术可行", "市场规模足够大"],
        validation: ["用户访谈", "MVP测试", "市场调研"]
      },
      export: { "png": true, "csv": true }
    }
  },
  'north-star-framework': {
    title: "谷歌\"北极星\"框架",
    englishTitle: "The North Star Framework",
    slug: "north-star-framework",
    chapter: "1",
    subsectionId: '1.3',
    chapterTitle: "发现与战略基础",
    chapterTitleEn: "Discovery & Strategy",
    tags: ["增长指标", "战略对齐", "指标体系", "团队目标", "驱动因子"],
    tagsEn: ["Growth Metrics", "Strategic Alignment", "Indicator System", "Team Goals", "Driving Factors"],
    summary: "以北极星指标（NSM）与驱动指标树对齐战略与执行，统一团队关注点与优先级。产出NSM定义、驱动因子分解树与实验路线图。",
    summaryEn: "Align strategy and execution using North Star Metric (NSM) and driving indicator tree to unify team focus and priorities. Delivers NSM definition, driving factor decomposition tree and experiment roadmap.",
    templateUrl: "/templates/north-star-framework.pptx",
    htmlContent: `<h2>是什么 / 何时使用</h2>
<p>北极星框架（North Star Framework）是谷歌等科技公司广泛使用的战略对齐工具，核心理念是确定一个关键指标作为"北极星"，指导团队所有决策和行动。框架包含三个核心要素：</p>
<ul>
<li><strong>北极星指标（NSM）</strong>：反映产品核心价值的单一关键指标</li>
<li><strong>驱动因子（Inputs）</strong>：影响NSM的可控变量和假设</li>
<li><strong>实验路线图</strong>：验证驱动因子假设的实验计划</li>
</ul>
<p>与传统KPI不同，NSM强调：</p>
<ul>
<li><strong>价值导向</strong>：衡量用户获得的真实价值，而非虚荣指标</li>
<li><strong>长期视角</strong>：平衡短期增长与长期健康</li>
<li><strong>全员对齐</strong>：跨部门统一目标，减少内耗</li>
<li><strong>实验驱动</strong>：通过假设验证指导决策</li>
</ul>
<p><strong>适用时机</strong>：产品发展期、团队扩张期、战略转型期、跨部门协作、增长瓶颈突破等需要统一目标的场景。</p>

<h2>前置输入</h2>
<ul>
<li>清晰的产品愿景与价值主张</li>
<li>用户行为数据与产品使用路径</li>
<li>业务模式与收入结构理解</li>
<li>竞争环境与市场阶段分析</li>
<li>团队组织架构与决策流程</li>
</ul>

<h2>步骤</h2>
<ol>
<li><strong>NSM候选识别</strong>：基于产品核心价值提出3-5个候选指标；评估指标与用户价值的直接关联度；考虑指标的可量化性和影响范围。<em>示例：电商平台的候选NSM可能是月活购买用户数、人均订单价值、用户生命周期价值等。</em></li>
<li><strong>NSM筛选确认</strong>：使用HEART框架（快乐度、参与度、接受度、留存率、任务成功率）评估；选择最能反映产品核心价值的指标；确保指标平衡增长与健康。<em>常见错误：选择易操控的虚荣指标，如注册用户数而非活跃用户数。</em></li>
<li><strong>驱动因子分解</strong>：将NSM拆解为2-4个一级驱动因子；每个一级因子继续拆解为可执行的二级因子；标注各因子间的逻辑关系和权重。<em>工具：可使用指标树或公式分解法，如DAU = 新用户获取 + 老用户留存。</em></li>
<li><strong>假设标注</strong>：为每个驱动因子标注关键假设；评估假设的重要性和不确定性；识别需要优先验证的假设。<em>示例：假设"提升产品推荐准确率能增加用户留存"需要通过A/B测试验证。</em></li>
<li><strong>实验路线设计</strong>：为高优先级假设设计验证实验；制定实验时间表和成功标准；建立学习反馈机制和指标监控体系。<em>常见错误：实验设计缺乏统计显著性考量，或实验周期过短无法得出可靠结论。</em></li>
</ol>

<h2>输出与判定（DoD）</h2>
<ul>
<li>北极星指标定义卡片，包含指标公式、目标值、测量方式</li>
<li>驱动因子分解树，显示各层级因子及其逻辑关系</li>
<li>关键假设清单，标注优先级、不确定性、验证方法</li>
<li>3个月实验路线图，包含实验设计、时间安排、成功标准</li>
<li>NSM仪表板设计，支持实时监控和趋势分析</li>
<li><strong>合格标准</strong>：NSM与产品价值强关联；驱动因子可量化可控制；假设清晰可验证；团队对目标达成共识；建立了定期回顾机制。</li>
</ul>

<h2>核查清单</h2>
<ul>
<li>□ NSM直接反映用户获得的核心价值</li>
<li>□ NSM平衡了增长速度与长期健康</li>
<li>□ 驱动因子分解逻辑清晰完整</li>
<li>□ 每个因子都有明确的负责人</li>
<li>□ 关键假设已识别并排序</li>
<li>□ 实验设计科学严谨</li>
<li>□ 监控体系支持实时追踪</li>
<li>□ 团队对框架理解一致</li>
</ul>

<h2>指标建议</h2>
<ul>
<li><strong>目标达成度</strong>：NSM目标完成率、各驱动因子达成情况</li>
<li><strong>实验效果</strong>：假设验证成功率、实验ROI、学习速度</li>
<li><strong>团队对齐度</strong>：目标理解一致性、决策效率提升程度</li>
<li><strong>长期健康度</strong>：用户留存率、产品NPS、收入质量指标</li>
<li><strong>框架运转</strong>：回顾频率、指标更新及时性、行动响应速度</li>
</ul>

<h2>关联</h2>
<ul>
<li><strong>前置</strong>：商业机会声明为NSM选择提供价值锚点和成功标准</li>
<li><strong>后续</strong>：平衡计分卡将NSM扩展为多维度绩效管理体系</li>
<li><strong>互补</strong>：A/B测试提供假设验证的具体方法和工具</li>
</ul>

<h2>案例</h2>
<p>某在线教育平台的北极星框架：NSM设定为"月度学习成就用户数"（完成课程模块并通过测验的用户），而非简单的MAU。驱动因子分解：新用户转化（注册→首次学习→付费）+ 老用户激活（登录频率→学习时长→成就达成）。关键假设包括"个性化推荐能提升学习完成率"、"社交功能能增加用户粘性"等。通过3个月的实验验证，发现学习路径优化比社交功能对NSM影响更大，团队重新调整产品重点，最终NSM提升35%，用户满意度同步提升。</p>

<h2>易错点</h2>
<ul>
<li><strong>指标选择偏差</strong>：选择易操控但与用户价值弱相关的虚荣指标</li>
<li><strong>分解过度复杂</strong>：驱动因子层级过多，执行团队理解困难</li>
<li><strong>假设缺乏验证</strong>：将假设当作事实，缺乏实验验证意识</li>
<li><strong>短期优化陷阱</strong>：过度关注短期NSM提升而忽视长期健康</li>
<li><strong>部门各自为政</strong>：各部门基于NSM制定冲突的子目标</li>
<li><strong>指标僵化</strong>：NSM确定后长期不调整，无法适应业务发展</li>
</ul>`,
    htmlContentEn: `<h2>What / When to Use</h2>
<p>The North Star Framework is a strategic alignment tool widely used by tech companies like Google. Its core concept is identifying a key metric as the "North Star" to guide all team decisions and actions. The framework consists of three core elements:</p>
<ul>
<li><strong>North Star Metric (NSM)</strong>: A single key metric reflecting the product's core value</li>
<li><strong>Inputs/Drivers</strong>: Controllable variables and assumptions that influence NSM</li>
<li><strong>Experiment Roadmap</strong>: Experiment plans to validate driver assumptions</li>
</ul>
<p>Unlike traditional KPIs, NSM emphasizes:</p>
<ul>
<li><strong>Value-Oriented</strong>: Measures real user value, not vanity metrics</li>
<li><strong>Long-term Perspective</strong>: Balances short-term growth with long-term health</li>
<li><strong>Organization-wide Alignment</strong>: Unifies cross-departmental goals, reducing internal friction</li>
<li><strong>Experiment-Driven</strong>: Guides decisions through hypothesis validation</li>
</ul>
<p><strong>Use when</strong>: Product growth phase, team scaling, strategic transformation, cross-departmental collaboration, breaking growth bottlenecks requiring unified objectives.</p>

<h2>Prerequisites</h2>
<ul>
<li>Clear product vision and value proposition</li>
<li>User behavior data and product usage paths</li>
<li>Understanding of business model and revenue structure</li>
<li>Competitive environment and market stage analysis</li>
<li>Team organizational structure and decision processes</li>
</ul>

<h2>Steps</h2>
<ol>
<li><strong>NSM Candidate Identification</strong>: Propose 3-5 candidate metrics based on core product value; evaluate direct correlation between metrics and user value; consider metric quantifiability and impact scope. <em>Example: E-commerce platform NSM candidates might include monthly active buyers, average order value per user, customer lifetime value.</em></li>
<li><strong>NSM Selection & Confirmation</strong>: Use HEART framework (Happiness, Engagement, Adoption, Retention, Task success) for evaluation; select metric best reflecting core product value; ensure metric balances growth and health. <em>Common mistake: Choosing manipulable vanity metrics like registered users instead of active users.</em></li>
<li><strong>Driver Factor Decomposition</strong>: Break down NSM into 2-4 level-one drivers; further decompose each level-one factor into executable level-two factors; annotate logical relationships and weights between factors. <em>Tool: Use metric trees or formula decomposition, e.g., DAU = New User Acquisition + Existing User Retention.</em></li>
<li><strong>Assumption Annotation</strong>: Mark key assumptions for each driver factor; assess assumption importance and uncertainty; identify assumptions requiring priority validation. <em>Example: Assumption "improving product recommendation accuracy increases user retention" needs A/B testing validation.</em></li>
<li><strong>Experiment Roadmap Design</strong>: Design validation experiments for high-priority assumptions; create experiment timeline and success criteria; establish learning feedback mechanisms and metric monitoring systems. <em>Common mistake: Experiment design lacks statistical significance consideration or experiment duration too short for reliable conclusions.</em></li>
</ol>

<h2>Outputs & Definition of Done</h2>
<ul>
<li>North Star Metric definition card including metric formula, target value, measurement method</li>
<li>Driver factor decomposition tree showing hierarchical factors and logical relationships</li>
<li>Key assumption list marking priority, uncertainty, validation methods</li>
<li>3-month experiment roadmap with experiment design, timeline, success criteria</li>
<li>NSM dashboard design supporting real-time monitoring and trend analysis</li>
<li><strong>Acceptance criteria</strong>: NSM strongly correlates with product value; drivers are quantifiable and controllable; assumptions clear and verifiable; team consensus on objectives; regular review mechanism established.</li>
</ul>

<h2>Diagnostics</h2>
<ul>
<li>□ NSM directly reflects core user value obtained</li>
<li>□ NSM balances growth speed with long-term health</li>
<li>□ Driver factor decomposition is logically clear and complete</li>
<li>□ Each factor has a clear owner</li>
<li>□ Key assumptions identified and prioritized</li>
<li>□ Experiment design is scientifically rigorous</li>
<li>□ Monitoring system supports real-time tracking</li>
<li>□ Team understanding of framework is consistent</li>
</ul>

<h2>Metrics</h2>
<ul>
<li><strong>Goal Achievement</strong>: NSM target completion rate, driver factor achievement status</li>
<li><strong>Experiment Effectiveness</strong>: Hypothesis validation success rate, experiment ROI, learning velocity</li>
<li><strong>Team Alignment</strong>: Goal understanding consistency, decision-making efficiency improvement</li>
<li><strong>Long-term Health</strong>: User retention rate, product NPS, revenue quality indicators</li>
<li><strong>Framework Operation</strong>: Review frequency, metric update timeliness, action response speed</li>
</ul>

<h2>Cross-links</h2>
<ul>
<li><strong>Prerequisites</strong>: Business Opportunity Statement provides value anchor and success criteria for NSM selection</li>
<li><strong>Follow-up</strong>: Balanced Scorecard extends NSM into multi-dimensional performance management system</li>
<li><strong>Complementary</strong>: A/B Testing provides specific methods and tools for hypothesis validation</li>
</ul>

<h2>Case</h2>
<p>An online education platform's North Star Framework: Set NSM as "Monthly Learning Achievement Users" (users who complete course modules and pass quizzes) rather than simple MAU. Driver factor decomposition: New User Conversion (registration → first learning → payment) + Existing User Activation (login frequency → learning duration → achievement completion). Key assumptions included "personalized recommendations improve learning completion rates" and "social features increase user stickiness." Through 3 months of experiment validation, discovered learning path optimization had greater impact on NSM than social features. Team refocused product priorities, ultimately achieving 35% NSM improvement with simultaneous user satisfaction increase.</p>

<h2>Pitfalls</h2>
<ul>
<li><strong>Metric Selection Bias</strong>: Choosing manipulable vanity metrics weakly correlated with user value</li>
<li><strong>Over-complex Decomposition</strong>: Too many driver factor levels causing execution team comprehension difficulties</li>
<li><strong>Lack of Assumption Validation</strong>: Treating assumptions as facts, lacking experimental validation awareness</li>
<li><strong>Short-term Optimization Trap</strong>: Over-focusing on short-term NSM improvement while ignoring long-term health</li>
<li><strong>Departmental Silos</strong>: Different departments creating conflicting sub-goals based on NSM</li>
<li><strong>Metric Rigidity</strong>: NSM remains unchanged long-term after establishment, unable to adapt to business evolution</li>
</ul>`,
    diagrams: [
      { title: "NSM 指标树", url: "/diagrams/north-star-framework.svg", description: "北极星指标与驱动因子分解" }
    ],
    interactive: {
      type: "tree",
      title: { "zh": "北极星指标分解树", "en": "North Star Metric Tree" },
      schema: {
        nodes: [
          { id: "nsm", parentId: "", name: "月活跃学习用户", nameEn: "Monthly Active Learning Users", type: "nsm", unit: "人", owner: "产品总监" },
          { id: "acquisition", parentId: "nsm", name: "新用户获取", nameEn: "New User Acquisition", type: "driver", unit: "人", owner: "增长团队" },
          { id: "activation", parentId: "nsm", name: "用户激活", nameEn: "User Activation", type: "driver", unit: "%", owner: "产品团队" },
          { id: "retention", parentId: "nsm", name: "用户留存", nameEn: "User Retention", type: "driver", unit: "%", owner: "运营团队" },
          { id: "channels", parentId: "acquisition", name: "获客渠道", nameEn: "Acquisition Channels", type: "input", unit: "个", owner: "市场团队" },
          { id: "conversion", parentId: "activation", name: "转化漏斗", nameEn: "Conversion Funnel", type: "input", unit: "%", owner: "产品经理" },
          { id: "engagement", parentId: "retention", name: "参与度", nameEn: "Engagement", type: "input", unit: "次/月", owner: "运营经理" }
        ],
        hypotheses: [
          "优化注册流程能提升激活率20%",
          "个性化推荐能增加用户学习时长30%",
          "社群功能能提高月留存率15%"
        ]
      },
      export: { "png": true, "csv": true }
    }
  },
  'business-model-canvas': {
    title: "商业模式画布",
    englishTitle: "Business Model Canvas",
    slug: "business-model-canvas",
    chapter: "2",
    subsectionId: '3.3',
    chapterTitle: "商业模式与价值创造",
    chapterTitleEn: "Business Model & Value Creation",
    tags: ["商业模式", "价值主张", "创业"],
    summary: "一个直观的工具，帮助企业描述、设计、挑战和转变其商业模式。",
    summaryEn: "A visual tool to describe, design, challenge and transform business models.",
    templateUrl: "/templates/business-model-canvas.pptx",
    content: `## 这是什么？ (What is it?)

商业模式画布是由亚历山大·奥斯特瓦德（Alexander Osterwalder）和伊夫·皮尼厄（Yves Pigneur）开发的战略管理工具，用于描述、设计、挑战和转变商业模式。它以视觉化的方式将企业的商业模式分解为九个基本构建块：

1. **客户细分**：企业服务的不同客户群体
2. **价值主张**：解决客户问题和满足客户需求的产品和服务
3. **渠道**：企业如何与客户沟通并传递价值主张
4. **客户关系**：企业与特定客户群体建立的关系类型
5. **收入来源**：企业从客户群体获取的收入
6. **核心资源**：使商业模式运作所需的最重要资产
7. **关键业务**：使商业模式运作所需的最重要活动
8. **重要合作**：使商业模式运作的供应商和合作伙伴网络
9. **成本结构**：运营商业模式所产生的所有成本

## 什么时候使用？ (When to use?)

商业模式画布适用于以下场景：

- 创业初期，设计和规划新的商业模式
- 分析和评估现有商业模式的优劣势
- 探索和开发新的商业机会
- 应对市场变化，调整商业模式
- 与团队和利益相关者沟通商业模式

## 如何使用？ (How to use?)

1. **准备画布**：在大幅纸张上绘制九个构建块，或使用在线工具。
2. **头脑风暴**：与团队一起，使用便利贴在每个构建块中填写相关内容。
3. **从客户出发**：先确定客户细分和价值主张，再思考其他构建块。
4. **迭代优化**：根据反馈和新的见解不断调整和完善商业模式。
5. **测试假设**：识别商业模式中的关键假设，并设计实验进行验证。
6. **制定行动计划**：根据画布分析结果，确定下一步行动。

## 案例 (Example)

以Airbnb为例：

- **客户细分**：旅行者、房东
- **价值主张**：旅行者 - 独特住宿体验、本地文化融入、价格实惠；房东 - 额外收入、灵活利用闲置空间
- **渠道**：网站、移动应用、社交媒体、口碑营销
- **客户关系**：自助服务、社区、评价系统
- **收入来源**：向旅行者收取的服务费、向房东收取的佣金
- **核心资源**：平台技术、用户数据、品牌
- **关键业务**：平台开发和维护、用户获取、信任和安全管理
- **重要合作**：支付处理商、摄影师、保险公司
- **成本结构**：技术开发、市场营销、客户支持、保险`,
    htmlContent: `<h2>这是什么？ (What is it?)</h2>
<p>商业模式画布是由亚历山大·奥斯特瓦德（Alexander Osterwalder）和伊夫·皮尼厄（Yves Pigneur）开发的战略管理工具，用于描述、设计、挑战和转变商业模式。它以视觉化的方式将企业的商业模式分解为九个基本构建块：</p>
<ol>
<li><strong>客户细分</strong>：企业服务的不同客户群体</li>
<li><strong>价值主张</strong>：解决客户问题和满足客户需求的产品和服务</li>
<li><strong>渠道</strong>：企业如何与客户沟通并传递价值主张</li>
<li><strong>客户关系</strong>：企业与特定客户群体建立的关系类型</li>
<li><strong>收入来源</strong>：企业从客户群体获取的收入</li>
<li><strong>核心资源</strong>：使商业模式运作所需的最重要资产</li>
<li><strong>关键业务</strong>：使商业模式运作所需的最重要活动</li>
<li><strong>重要合作</strong>：使商业模式运作的供应商和合作伙伴网络</li>
<li><strong>成本结构</strong>：运营商业模式所产生的所有成本</li>
</ol>
<h2>什么时候使用？ (When to use?)</h2>
<p>商业模式画布适用于以下场景：</p>
<ul>
<li>创业初期，设计和规划新的商业模式</li>
<li>分析和评估现有商业模式的优劣势</li>
<li>探索和开发新的商业机会</li>
<li>应对市场变化，调整商业模式</li>
<li>与团队和利益相关者沟通商业模式</li>
</ul>
<h2>如何使用？ (How to use?)</h2>
<ol>
<li><strong>准备画布</strong>：在大幅纸张上绘制九个构建块，或使用在线工具。</li>
<li><strong>头脑风暴</strong>：与团队一起，使用便利贴在每个构建块中填写相关内容。</li>
<li><strong>从客户出发</strong>：先确定客户细分和价值主张，再思考其他构建块。</li>
<li><strong>迭代优化</strong>：根据反馈和新的见解不断调整和完善商业模式。</li>
<li><strong>测试假设</strong>：识别商业模式中的关键假设，并设计实验进行验证。</li>
<li><strong>制定行动计划</strong>：根据画布分析结果，确定下一步行动。</li>
</ol>
<h2>案例 (Example)</h2>
<p>以Airbnb为例：</p>
<ul>
<li><strong>客户细分</strong>：旅行者、房东</li>
<li><strong>价值主张</strong>：旅行者 - 独特住宿体验、本地文化融入、价格实惠；房东 - 额外收入、灵活利用闲置空间</li>
<li><strong>渠道</strong>：网站、移动应用、社交媒体、口碑营销</li>
<li><strong>客户关系</strong>：自助服务、社区、评价系统</li>
<li><strong>收入来源</strong>：向旅行者收取的服务费、向房东收取的佣金</li>
<li><strong>核心资源</strong>：平台技术、用户数据、品牌</li>
<li><strong>关键业务</strong>：平台开发和维护、用户获取、信任和安全管理</li>
<li><strong>重要合作</strong>：支付处理商、摄影师、保险公司</li>
<li><strong>成本结构</strong>：技术开发、市场营销、客户支持、保险</li>
</ul>`
  },
  'swot-analysis': {
    title: "SWOT分析",
    englishTitle: "SWOT Analysis",
    slug: "swot-analysis",
    chapter: "1",
    chapterTitle: "发现与战略基础",
    chapterTitleEn: "Discovery & Strategy",
    tags: ["战略分析", "内部评估", "外部评估"],
    summary: "一种评估组织优势、劣势、机会和威胁的战略规划工具，帮助识别内部和外部因素对组织目标的影响。",
    summaryEn: "Evaluate strengths, weaknesses, opportunities and threats to inform strategy.",
    templateUrl: "/templates/swot-analysis.pptx",
    content: `## 这是什么？ (What is it?)

SWOT分析是一种战略规划工具，用于评估组织的优势(Strengths)、劣势(Weaknesses)、机会(Opportunities)和威胁(Threats)。它帮助组织识别实现目标所需的内部和外部因素：

- **优势**：组织拥有的内部积极因素，如独特资源、核心竞争力等
- **劣势**：组织内部的消极因素，如资源不足、能力缺乏等
- **机会**：外部环境中可能对组织有利的因素，如市场趋势、竞争格局变化等
- **威胁**：外部环境中可能对组织不利的因素，如新竞争者、法规变化等

## 什么时候使用？ (When to use?)

SWOT分析适用于以下场景：

- 制定或调整组织战略
- 解决特定业务问题
- 评估新项目或业务机会
- 进行竞争分析
- 个人职业规划和发展

## 如何使用？ (How to use?)

1. **确定分析目标**：明确你想要评估的具体问题或决策。
2. **识别内部因素**：
   - **优势**：列出组织的核心竞争力、独特资源、市场优势等。
   - **劣势**：诚实评估组织的不足之处、资源限制、能力缺口等。
3. **分析外部因素**：
   - **机会**：识别市场趋势、竞争格局变化、新技术等可能带来的机会。
   - **威胁**：考虑可能对组织构成挑战的外部因素，如竞争加剧、法规变化等。
4. **制定策略**：
   - 利用优势抓住机会
   - 克服劣势以把握机会
   - 利用优势应对威胁
   - 减少劣势并避免威胁
5. **定期更新**：随着内外部环境的变化，定期更新SWOT分析。

## 案例 (Example)

以一家传统零售企业为例：

**优势**：
- 良好的品牌声誉
- 优越的实体店位置
- 忠诚的客户群体
- 经验丰富的销售团队

**劣势**：
- 有限的在线销售能力
- 高固定成本结构
- 供应链效率低下
- 技术基础设施落后

**机会**：
- 电子商务市场增长
- 全渠道零售趋势
- 新兴市场扩张
- 个性化购物体验需求增加

**威胁**：
- 纯电商竞争对手崛起
- 消费者购物习惯转向线上
- 经济不确定性
- 租金和人力成本上升

基于此分析，该零售企业可能会制定发展全渠道销售策略，利用其品牌声誉和实体店优势，同时加强在线销售能力，以应对市场变化。`,
    htmlContent: `<h2>这是什么？ (What is it?)</h2>
<p>SWOT分析是一种战略规划工具，用于评估组织的优势(Strengths)、劣势(Weaknesses)、机会(Opportunities)和威胁(Threats)。它帮助组织识别实现目标所需的内部和外部因素：</p>
<ul>
<li><strong>优势</strong>：组织拥有的内部积极因素，如独特资源、核心竞争力等</li>
<li><strong>劣势</strong>：组织内部的消极因素，如资源不足、能力缺乏等</li>
<li><strong>机会</strong>：外部环境中可能对组织有利的因素，如市场趋势、竞争格局变化等</li>
<li><strong>威胁</strong>：外部环境中可能对组织不利的因素，如新竞争者、法规变化等</li>
</ul>
<h2>什么时候使用？ (When to use?)</h2>
<p>SWOT分析适用于以下场景：</p>
<ul>
<li>制定或调整组织战略</li>
<li>解决特定业务问题</li>
<li>评估新项目或业务机会</li>
<li>进行竞争分析</li>
<li>个人职业规划和发展</li>
</ul>
<h2>如何使用？ (How to use?)</h2>
<ol>
<li><strong>确定分析目标</strong>：明确你想要评估的具体问题或决策。</li>
<li><strong>识别内部因素</strong>：
<ul>
<li><strong>优势</strong>：列出组织的核心竞争力、独特资源、市场优势等。</li>
<li><strong>劣势</strong>：诚实评估组织的不足之处、资源限制、能力缺口等。</li>
</ul>
</li>
<li><strong>分析外部因素</strong>：
<ul>
<li><strong>机会</strong>：识别市场趋势、竞争格局变化、新技术等可能带来的机会。</li>
<li><strong>威胁</strong>：考虑可能对组织构成挑战的外部因素，如竞争加剧、法规变化等。</li>
</ul>
</li>
<li><strong>制定策略</strong>：
<ul>
<li>利用优势抓住机会</li>
<li>克服劣势以把握机会</li>
<li>利用优势应对威胁</li>
<li>减少劣势并避免威胁</li>
</ul>
</li>
<li><strong>定期更新</strong>：随着内外部环境的变化，定期更新SWOT分析。</li>
</ol>
<h2>案例 (Example)</h2>
<p>以一家传统零售企业为例：</p>
<p><strong>优势</strong>：</p>
<ul>
<li>良好的品牌声誉</li>
<li>优越的实体店位置</li>
<li>忠诚的客户群体</li>
<li>经验丰富的销售团队</li>
</ul>
<p><strong>劣势</strong>：</p>
<ul>
<li>有限的在线销售能力</li>
<li>高固定成本结构</li>
<li>供应链效率低下</li>
<li>技术基础设施落后</li>
</ul>
<p><strong>机会</strong>：</p>
<ul>
<li>电子商务市场增长</li>
<li>全渠道零售趋势</li>
<li>新兴市场扩张</li>
<li>个性化购物体验需求增加</li>
</ul>
<p><strong>威胁</strong>：</p>
<ul>
<li>纯电商竞争对手崛起</li>
<li>消费者购物习惯转向线上</li>
<li>经济不确定性</li>
<li>租金和人力成本上升</li>
</ul>
<p>基于此分析，该零售企业可能会制定发展全渠道销售策略，利用其品牌声誉和实体店优势，同时加强在线销售能力，以应对市场变化。</p>`
  },
  'design-thinking': {
    title: "设计思维",
    englishTitle: "Design Thinking",
    slug: "design-thinking",
    chapter: "3",
    chapterTitle: "创新与用户体验",
    chapterTitleEn: "Innovation & User Experience",
    tags: ["创新方法", "用户体验", "问题解决"],
    summary: "一种以人为本的创新方法，通过深入理解用户需求，创造性地解决复杂问题。",
    summaryEn: "A human-centered approach to creatively solve complex problems.",
    templateUrl: "/templates/design-thinking.pptx",
    content: `## 这是什么？ (What is it?)

设计思维是一种以人为本的创新方法，强调通过深入理解用户需求，创造性地解决复杂问题。它结合了创造力和分析性思维，通过一系列迭代过程，开发出既满足用户需求，又技术可行且商业可行的解决方案。

设计思维通常包含五个阶段：

1. **共情(Empathize)**：深入理解用户的需求、痛点和期望
2. **定义(Define)**：基于用户洞察，明确定义待解决的问题
3. **构思(Ideate)**：广泛探索可能的解决方案
4. **原型(Prototype)**：将想法转化为有形的原型
5. **测试(Test)**：通过用户反馈验证和改进解决方案

## 什么时候使用？ (When to use?)

设计思维适用于以下场景：

- 面对复杂、模糊或难以定义的问题
- 需要创新和突破性思维的项目
- 开发新产品或服务
- 改进用户体验
- 组织变革和文化转型
- 跨学科团队协作解决问题

## 如何使用？ (How to use?)

1. **共情阶段**：
   - 进行用户访谈和观察
   - 创建用户画像
   - 体验用户旅程
   - 收集用户故事和反馈

2. **定义阶段**：
   - 整理和分析用户洞察
   - 识别核心问题和机会
   - 创建问题陈述（"我们如何..."问题）
   - 确定成功标准

3. **构思阶段**：
   - 组织头脑风暴会议
   - 使用"是的，而且..."原则
   - 鼓励大胆和创新的想法
   - 汇总和筛选创意

4. **原型阶段**：
   - 快速创建低保真原型
   - 关注核心功能和体验
   - 使用简单材料和工具
   - 准备好迭代和改进

5. **测试阶段**：
   - 让用户体验原型
   - 收集反馈和观察
   - 识别改进机会
   - 迭代原型并再次测试

## 案例 (Example)

以改进医院急诊室等待体验为例：

**共情**：研究团队在急诊室观察患者和家属，进行访谈，发现等待时间不确定性是主要痛点。

**定义**：问题陈述："我们如何减轻患者在急诊室等待期间的焦虑和不确定性？"

**构思**：团队提出多种创意，包括实时等待时间显示系统、分诊优先级可视化、等待区域重新设计等。

**原型**：开发一个简单的移动应用原型，显示实时等待时间、当前位置在队列中的状态，以及提供医疗状况信息。

**测试**：让患者和家属使用原型，收集反馈。发现用户喜欢实时更新功能，但希望增加与医护人员沟通的选项。

通过多次迭代，最终解决方案不仅包括等待时间管理系统，还整合了患者教育内容和简单的沟通渠道，显著改善了患者体验。`,
    htmlContent: `<h2>这是什么？ (What is it?)</h2>
<p>设计思维是一种以人为本的创新方法，强调通过深入理解用户需求，创造性地解决复杂问题。它结合了创造力和分析性思维，通过一系列迭代过程，开发出既满足用户需求，又技术可行且商业可行的解决方案。</p>
<p>设计思维通常包含五个阶段：</p>
<ol>
<li><strong>共情(Empathize)</strong>：深入理解用户的需求、痛点和期望</li>
<li><strong>定义(Define)</strong>：基于用户洞察，明确定义待解决的问题</li>
<li><strong>构思(Ideate)</strong>：广泛探索可能的解决方案</li>
<li><strong>原型(Prototype)</strong>：将想法转化为有形的原型</li>
<li><strong>测试(Test)</strong>：通过用户反馈验证和改进解决方案</li>
</ol>
<h2>什么时候使用？ (When to use?)</h2>
<p>设计思维适用于以下场景：</p>
<ul>
<li>面对复杂、模糊或难以定义的问题</li>
<li>需要创新和突破性思维的项目</li>
<li>开发新产品或服务</li>
<li>改进用户体验</li>
<li>组织变革和文化转型</li>
<li>跨学科团队协作解决问题</li>
</ul>
<h2>如何使用？ (How to use?)</h2>
<ol>
<li><strong>共情阶段</strong>：
<ul>
<li>进行用户访谈和观察</li>
<li>创建用户画像</li>
<li>体验用户旅程</li>
<li>收集用户故事和反馈</li>
</ul>
</li>
<li><strong>定义阶段</strong>：
<ul>
<li>整理和分析用户洞察</li>
<li>识别核心问题和机会</li>
<li>创建问题陈述（"我们如何..."问题）</li>
<li>确定成功标准</li>
</ul>
</li>
<li><strong>构思阶段</strong>：
<ul>
<li>组织头脑风暴会议</li>
<li>使用"是的，而且..."原则</li>
<li>鼓励大胆和创新的想法</li>
<li>汇总和筛选创意</li>
</ul>
</li>
<li><strong>原型阶段</strong>：
<ul>
<li>快速创建低保真原型</li>
<li>关注核心功能和体验</li>
<li>使用简单材料和工具</li>
<li>准备好迭代和改进</li>
</ul>
</li>
<li><strong>测试阶段</strong>：
<ul>
<li>让用户体验原型</li>
<li>收集反馈和观察</li>
<li>识别改进机会</li>
<li>迭代原型并再次测试</li>
</ul>
</li>
</ol>
<h2>案例 (Example)</h2>
<p>以改进医院急诊室等待体验为例：</p>
<p><strong>共情</strong>：研究团队在急诊室观察患者和家属，进行访谈，发现等待时间不确定性是主要痛点。</p>
<p><strong>定义</strong>：问题陈述："我们如何减轻患者在急诊室等待期间的焦虑和不确定性？"</p>
<p><strong>构思</strong>：团队提出多种创意，包括实时等待时间显示系统、分诊优先级可视化、等待区域重新设计等。</p>
<p><strong>原型</strong>：开发一个简单的移动应用原型，显示实时等待时间、当前位置在队列中的状态，以及提供医疗状况信息。</p>
<p><strong>测试</strong>：让患者和家属使用原型，收集反馈。发现用户喜欢实时更新功能，但希望增加与医护人员沟通的选项。</p>
<p>通过多次迭代，最终解决方案不仅包括等待时间管理系统，还整合了患者教育内容和简单的沟通渠道，显著改善了患者体验。</p>`
  }
};

// 保持框架内容完整，不再清洗
const sanitizeFramework = (f: Framework): Framework => ({
  ...f,
});

// 新目录的最小化双语数据（仅标题/英文标题/章节/章节标题/模板占位）
const seededFrameworks: Framework[] = [
  // 第一章：发现与战略基础 (Discovery & Strategy)
  { title: '团队协作的五大障碍', englishTitle: 'The Five Dysfunctions of a Team', slug: 'five-dysfunctions-team', chapter: '1', subsectionId: '1.1', chapterTitle: '发现与战略基础', chapterTitleEn: 'Discovery & Strategy', tags: ['团队协作','组织效能','领导力'], tagsEn: ['Teamwork','Organizational Effectiveness','Leadership'], summary: '识别并化解信任缺失、冲突畏惧、责任规避、投入不足、结果忽视，打造高效团队。', summaryEn: 'Identify and resolve five dysfunctions to build a high-performing team.', templateUrl: '/templates/five-dysfunctions-team.pptx' },
  { title: 'RACI 责任分配矩阵', englishTitle: 'RACI Chart', slug: 'raci-chart', chapter: '1', subsectionId: '1.1', chapterTitle: '发现与战略基础', chapterTitleEn: 'Discovery & Strategy', tags: ['角色职责','项目治理','协同'], tagsEn: ['Roles & Responsibilities','Governance','Collaboration'], summary: '用 R/A/C/I 明确分工与决策权，降低协调成本。', summaryEn: 'Clarify roles and decision ownership with R/A/C/I to reduce coordination cost.', templateUrl: '/templates/raci-chart.pptx' },
  { title: '甘特图', englishTitle: 'Gantt Chart', slug: 'gantt-chart', chapter: '1', subsectionId: '1.1', chapterTitle: '发现与战略基础', chapterTitleEn: 'Discovery & Strategy', tags: ['进度管理','里程碑','关键路径'], tagsEn: ['Schedule','Milestones','Critical Path'], summary: '用时间轴呈现任务、依赖与里程碑，统一节奏与关键路径。', summaryEn: 'Timeline view of tasks, dependencies and milestones to align cadence and critical path.', templateUrl: '/templates/gantt-chart.pptx' },
  { title: 'PESTLE 分析', englishTitle: 'PESTLE Analysis', slug: 'pestle-analysis', chapter: '1', subsectionId: '1.2', chapterTitle: '发现与战略基础', chapterTitleEn: 'Discovery & Strategy', tags: ['宏观环境','外部分析','政策技术'], tagsEn: ['Macro Environment','External Analysis','Policy & Tech'], summary: '从政治、经济、社会、技术、法律与环境六维扫描外部环境，识别机会与风险。', summaryEn: 'Scan external environment across P,E,S,T,L,E to surface opportunities and risks.', templateUrl: '/templates/pestle-analysis.pptx' },
  { title: '波特五力模型', englishTitle: "Porter's Five Forces", slug: 'porters-five-forces', chapter: '1', subsectionId: '1.2', chapterTitle: '发现与战略基础', chapterTitleEn: 'Discovery & Strategy', tags: ['行业结构','竞争强度','战略分析'], tagsEn: ['Industry Structure','Competitive Intensity','Strategy'], summary: '基于五力评估行业吸引力与竞争强度，发现结构性约束与机会。', summaryEn: 'Assess attractiveness and competitive intensity via five forces to find structural insights.', templateUrl: '/templates/porters-five-forces.pptx',
    htmlContent: `<h2>是什么 / 何时使用</h2>
<p>波特五力模型通过 <strong>现有竞争者竞争</strong>、<strong>供应商议价能力</strong>、<strong>买方议价能力</strong>、<strong>替代品威胁</strong>、<strong>新进入者威胁</strong> 五个维度评估行业的吸引力与竞争强度。适用于行业进入、战略定位、投资评估与年度复盘。</p>
<h2>前置输入</h2>
<ul>
<li>行业边界与细分定义、目标市场规模/增速</li>
<li>近 3 年财报/研报、份额结构与集中度</li>
<li>代表性企业的商业模式/渠道/成本结构</li>
</ul>
<h2>步骤</h2>
<ol>
<li><strong>定义边界</strong>：确认产品/服务与替代范围，避免把“结论当作边界”。</li>
<li><strong>列出强度驱动因子</strong>：为每一力罗列 3–6 个驱动因子（如集中度、差异化、转换成本、进入壁垒等），并收集证据。</li>
<li><strong>打分与证据链接</strong>：按 1–5 评分并附证据来源；多人独立评分后取一致性结果。</li>
<li><strong>可视化与结论</strong>：绘制雷达图与结论卡片，明确“结构性约束/机会”。</li>
<li><strong>落地到策略</strong>：将发现映射到 sSWOT，形成 SO/ST/WO/WT 初稿。</li>
</ol>
<h2>输出与判定（DoD）</h2>
<ul>
<li>五力评分表（含证据链接）与一页式结论</li>
<li>与 sSWOT 的映射关系清单</li>
<li>评分一致性 ≥ 70%，证据覆盖率 ≥ 80%</li>
</ul>
<h2>易错点</h2>
<ul>
<li>只罗列现象而缺少<strong>驱动因子与证据</strong></li>
<li>忽视替代品/渠道/生态位的重要性</li>
<li>把公司问题等同于行业问题</li>
</ul>`,
    htmlContentEn: `<h2>What / When</h2>
<p>Porter's Five Forces assesses industry attractiveness via <strong>rivalry</strong>, <strong>supplier power</strong>, <strong>buyer power</strong>, <strong>threat of substitutes</strong>, and <strong>threat of new entrants</strong>. Use it for market entry, strategic positioning, investment review, and annual retrospectives.</p>
<h2>Inputs</h2>
<ul>
<li>Industry boundary/segments, TAM/CAGR</li>
<li>3-year reports/analyst notes, share structure and concentration</li>
<li>Representative players’ business models, channels, cost structure</li>
</ul>
<h2>Steps</h2>
<ol>
<li><strong>Define boundary</strong> precisely to avoid circular conclusions.</li>
<li><strong>List drivers</strong> for each force (3–6 per force) with evidence.</li>
<li><strong>Score with evidence</strong> (1–5) by multiple raters and reconcile.</li>
<li><strong>Visualize & conclude</strong> with a radar and concise implications.</li>
<li><strong>Map to strategy</strong> by linking findings to sSWOT options.</li>
</ol>
<h2>Outputs & DoD</h2>
<ul>
<li>Force scoring table with evidence links + one-page conclusion</li>
<li>Mapping to sSWOT strategies</li>
<li>Rating agreement ≥ 70%, evidence coverage ≥ 80%</li>
</ul>
<h2>Pitfalls</h2>
<ul>
<li>Listing phenomena without <strong>drivers and evidence</strong></li>
<li>Ignoring substitutes/channels/ecosystem</li>
<li>Confusing company issues with industry structure</li>
</ul>`,
    diagrams: [
      { title: '五力雷达图', url: '/diagrams/porters-five-forces.svg', description: '五力评分与强弱对比' }
    ],
    interactive: { type: 'radar', title: { zh: '五力评分', en: 'Five Forces' } }
  },
  { title: 'SWOT 分析', englishTitle: 'SWOT Analysis', slug: 'swot-analysis', chapter: '1', subsectionId: '1.2', chapterTitle: '发现与战略基础', chapterTitleEn: 'Discovery & Strategy', tags: ['内外评估','战略分析','定位'], tagsEn: ['Internal & External Assessment','Strategy','Positioning'], summary: '评估优势、劣势、机会与威胁，形成战略选项。', summaryEn: 'Evaluate strengths, weaknesses, opportunities and threats to shape strategy.', templateUrl: '/templates/swot-analysis.pptx' },
  { title: 'sSWOT 分析', englishTitle: 'sSWOT Analysis', slug: 'sswot-analysis', chapter: '1', subsectionId: '1.2', chapterTitle: '发现与战略基础', chapterTitleEn: 'Discovery & Strategy', tags: ['情境化','策略组合','矩阵'], tagsEn: ['Contextual SWOT','Strategy Options','Matrix'], summary: '在 SWOT 基础上做情境化配对，推导 SO/ST/WO/WT 策略组。', summaryEn: 'Contextualize SWOT pairings to derive SO/ST/WO/WT strategies.', templateUrl: '/templates/sswot-analysis.pptx' },
  { title: '商业机会声明', englishTitle: 'Business Opportunity Statement', slug: 'business-opportunity-statement', chapter: '1', subsectionId: '1.3', chapterTitle: '发现与战略基础', chapterTitleEn: 'Discovery & Strategy', tags: ['机会定义','成功标准','价值主张'], tagsEn: ['Opportunity Definition','Success Criteria','Value Proposition'], summary: '以对象/痛点/价值/成功标准描述机会，形成统一对齐锚点。', summaryEn: 'Define audience, pains, value and success criteria to align on an opportunity.', templateUrl: '/templates/business-opportunity-statement.pptx' },
  { title: '谷歌“北极星”框架', englishTitle: 'The North Star Framework', slug: 'north-star-framework', chapter: '1', subsectionId: '1.3', chapterTitle: '发现与战略基础', chapterTitleEn: 'Discovery & Strategy', tags: ['北极星指标','增长模型','对齐'], tagsEn: ['North Star Metric','Growth Model','Alignment'], summary: '以 NSM 与驱动指标树对齐战略与执行，建立实验-学习闭环。', summaryEn: 'Use NSM and driver tree to align strategy and execution with an experiment loop.', templateUrl: '/templates/north-star-framework.pptx' },

  // 第二章：深度用户同理心与价值定义 (Empathy & Value Definition)
  { title: '待办任务', englishTitle: 'Jobs to be Done (JTBD)', slug: 'jobs-to-be-done', chapter: '2', subsectionId: '2.1', chapterTitle: '深度用户同理心与价值定义', chapterTitleEn: 'Empathy & Value Definition', tags: ['需求本质','场景','触发'], tagsEn: ['Job-to-be-Done','Context','Trigger'], summary: '用“要完成的工作”视角理解需求本质，识别情境、触发与期望结果。', summaryEn: 'Understand needs via JTBD, identifying context, triggers, and desired outcomes.', templateUrl: '/templates/jobs-to-be-done.pptx',
    htmlContent: `<h2>是什么 / 何时使用</h2>
<p>JTBD 用“要完成的工作”替代“用户画像=需求”的假设，关注 <strong>情境-动机-期望结果</strong>。适用于早期发现机会、优化产品定位与功能优先级。</p>
<h2>前置输入</h2>
<ul><li>关键用户旅程/触点</li><li>近期投诉/需求单</li><li>代表性用户访谈样本</li></ul>
<h2>步骤</h2>
<ol>
<li><strong>收集情境</strong>：记录何时何地、与谁、受什么限制。</li>
<li><strong>拆分功能性/情感性工作</strong>：列“要达成/要避免”。</li>
<li><strong>提炼期望结果</strong>：用“减少/增加/保持 + 可度量”表达。</li>
<li><strong>评估重要度×满意度</strong>：找出机会空隙。</li>
<li><strong>形成声明</strong>：<em>当…我想…以便…</em>。</li>
<li><strong>落地</strong>：映射到价值主张与优先级。</li>
</ol>
<h2>输出与判定（DoD）</h2>
<ul><li>JTBD 列表（含情境/结果与评分）</li><li>顶层声明 3–5 条</li><li>重要×不满矩阵与机会点</li></ul>
<h2>易错点</h2>
<ul><li>把解决方案写成工作</li><li>缺少情境与限制</li><li>只做一次、不复核</li></ul>`,
    htmlContentEn: `<h2>What / When</h2>
<p>JTBD frames needs by <strong>context–motivation–desired outcomes</strong>. Use for opportunity discovery, positioning and prioritization.</p>
<h2>Inputs</h2>
<ul><li>Key journey/touchpoints</li><li>Recent tickets/requests</li><li>Interview samples</li></ul>
<h2>Steps</h2>
<ol>
<li><strong>Gather contexts</strong>: when/where/with whom/constraints.</li>
<li><strong>Split functional/emotional jobs</strong>.</li>
<li><strong>Outcome statements</strong>: decrease/increase/maintain + measurable.</li>
<li><strong>Importance × satisfaction</strong> to find gaps.</li>
<li><strong>Craft top statements</strong>: <em>When… I want… so that…</em></li>
<li><strong>Map to value and priorities</strong>.</li>
<ol>
</ol>
<h2>Outputs & DoD</h2>
<ul><li>JTBD list with scores</li><li>3–5 top statements</li><li>Gap matrix and opportunities</li></ul>
<h2>Pitfalls</h2>
<ul><li>Solution masquerading as job</li><li>Missing context/constraints</li><li>One-off exercise</li></ul>`,
    diagrams: [{ title: '重要度×满意度矩阵', url: '/diagrams/jtbd-matrix.svg', description: '发现机会空隙' }],
    interactive: { type: 'matrix-generic', title: { zh: 'JTBD 重要×满意度', en: 'JTBD Importance × Satisfaction' } }
  },
  { title: '二手研究 vs. 一手研究', englishTitle: 'Secondary vs. Primary Research', slug: 'secondary-vs-primary-research', chapter: '2', subsectionId: '2.2', chapterTitle: '深度用户同理心与价值定义', chapterTitleEn: 'Empathy & Value Definition', tags: ['研究设计','数据来源','证据'], tagsEn: ['Research Design','Data Sources','Evidence'], summary: '明确二手与一手研究的适用边界与搭配方式，构建高性价比的证据体系。', summaryEn: 'Clarify when to use secondary vs primary research and how to combine them for cost‑effective evidence.', templateUrl: '/templates/secondary-vs-primary-research.pptx',
    htmlContent: `<h2>是什么 / 何时使用</h2>
<p>二手研究利用既有资料；一手研究通过调研/实验采集新数据。二者应按 <strong>问题→证据→方法</strong> 选择与组合。</p>
<h2>前置输入</h2>
<ul><li>核心决策问题（如市场规模/用户需求/可用性）</li><li>预算与时间</li></ul>
<h2>步骤</h2>
<ol>
<li><strong>问题分解</strong>：明确待验证假设与证据标准。</li>
<li><strong>二手先行</strong>：行业报告/数据库/竞品公开信息。</li>
<li><strong>缺口清单</strong>：标注需要一手补齐的变量。</li>
<li><strong>一手设计</strong>：定性访谈/可用性/问卷/对照试验。</li>
<li><strong>整合与偏差校正</strong>：交叉验证，记录局限性。</li>
</ol>
<h2>输出与判定（DoD）</h2>
<ul><li>研究设计表（问题→证据→方法→样本）</li><li>来源清单与可信度评级</li><li>关键结论与对决策影响</li></ul>
<h2>易错点</h2>
<ul><li>先选方法再找问题</li><li>忽视来源偏差与样本偏差</li><li>只报现象不回答决策问题</li></ul>`,
    htmlContentEn: `<h2>What / When</h2>
<p>Secondary uses existing sources; primary collects new data. Always choose by <strong>question → evidence → method</strong>.</p>
<h2>Steps</h2>
<ol><li>Decompose decision questions and hypotheses</li><li>Secondary first</li><li>Gap list</li><li>Primary design (qual/quant/experiments)</li><li>Synthesize and correct biases</li></ol>
<h2>Outputs & DoD</h2>
<ul><li>Research design table</li><li>Source inventory with credibility</li><li>Key implications</li></ul>
<h2>Pitfalls</h2>
<ul><li>Method‑first thinking</li><li>Ignoring source/sample bias</li><li>Describing facts without decisions</li></ul>`,
    diagrams: [{ title: '研究设计表', url: '/diagrams/research-design.svg', description: '问题-证据-方法映射' }]
  },
  { title: '定量研究 vs. 定性研究', englishTitle: 'Quantitative vs. Qualitative Research', slug: 'quantitative-vs-qualitative-research', chapter: '2', subsectionId: '2.2', chapterTitle: '深度用户同理心与价值定义', chapterTitleEn: 'Empathy & Value Definition', tags: ['方法论','抽样','有效性'], tagsEn: ['Methodology','Sampling','Validity'], summary: '理解定量与定性的互补：规模与因果 vs. 深度与机制。选择取决于问题而非偏好。', summaryEn: 'Quant vs qual are complementary: scale/causality vs depth/mechanism; choose by question, not preference.', templateUrl: '/templates/quantitative-vs-qualitative-research.pptx',
    htmlContent: `<h2>是什么 / 何时使用</h2>
<p>定量回答“多少/是否显著”，定性回答“为什么/如何发生”。真实项目常为 <strong>定性探索 → 定量验证</strong>。</p>
<h2>步骤</h2>
<ol><li>定义变量与操作化</li><li>选择抽样与样本量</li><li>确定测量工具（量表/访谈提纲）</li><li>控制偏差与伦理</li><li>分析与三角验证</li></ol>
<h2>输出与判定</h2>
<ul><li>研究方案与样本说明</li><li>显著性/效应量或主题归纳</li><li>对产品与策略的含义</li></ul>`,
    htmlContentEn: `<h2>What / When</h2><p>Quant answers how much/causal; qual answers why/how. Typical flow: <strong>qual explore → quant validate</strong>.</p>
<h2>Steps</h2><ol><li>Operationalize variables</li><li>Sampling/size</li><li>Instruments</li><li>Bias/ethics control</li><li>Analysis & triangulation</li></ol>
<h2>Outputs</h2><ul><li>Plan & sampling note</li><li>Significance/effect or thematic results</li><li>Implications</li></ul>`,
    diagrams: [{ title: '研究流程', url: '/diagrams/quant-qual-flow.svg', description: '定性→定量组合' }]
  },
  { title: '用户原型/心智模型', englishTitle: 'Archetypes/Mindsets', slug: 'archetypes-mindsets', chapter: '2', subsectionId: '2.2', chapterTitle: '深度用户同理心与价值定义', chapterTitleEn: 'Empathy & Value Definition', tags: ['细分','心理模型','动机'], tagsEn: ['Segmentation','Mindsets','Motivation'], summary: '基于动机与心智而非人口统计进行细分，输出可行动的原型与暗含心理模型。', summaryEn: 'Segment by motivations/mindsets rather than demographics to create actionable archetypes.', templateUrl: '/templates/archetypes-mindsets.pptx',
    htmlContent: `<h2>是什么 / 何时使用</h2>
<p>原型比“平均用户”更能指导设计；心智模型帮助预测其行为边界。</p>
<h2>步骤</h2>
<ol><li>从定性材料中归纳动机与障碍</li><li>聚类形成 3–6 个原型</li><li>为每个原型定义 JTBD/触发/反对意见</li><li>绘制心智模型（目标→策略→规则）</li><li>映射到旅程与渠道</li></ol>
<h2>输出与判定</h2>
<ul><li>原型卡（故事/引语/行为线索）</li><li>心智模型图</li><li>与关键场景的匹配度</li></ul>`,
    htmlContentEn: `<h2>What / When</h2><p>Archetypes guide design; mindsets reveal boundaries.</p>
<h2>Steps</h2><ol><li>Induce motives and barriers from qual data</li><li>Cluster into 3–6 archetypes</li><li>Define JTBD/triggers/objections</li><li>Model mindset (goals→strategies→rules)</li><li>Map to journeys/channels</li></ol>
<h2>Outputs</h2><ul><li>Archetype cards</li><li>Mindset diagram</li><li>Fit to key scenarios</li></ul>`,
    diagrams: [{ title: '心智模型图', url: '/diagrams/mindset-model.svg', description: '目标-策略-规则' }]
  },
  { title: '同理心地图', englishTitle: 'Empathy Map', slug: 'empathy-map', chapter: '2', subsectionId: '2.3', chapterTitle: '深度用户同理心与价值定义', chapterTitleEn: 'Empathy & Value Definition', tags: ['共情','洞察','旅程'], tagsEn: ['Empathy','Insights','Journey'], summary: '用“说/想/做/感受”快速沉淀洞察，推动团队达成用户共识。', summaryEn: 'Capture insights with Say/Think/Do/Feel to align teams on user understanding.', templateUrl: '/templates/empathy-map.pptx',
    htmlContent: `<h2>是什么 / 何时使用</h2><p>同理心地图帮助团队从证据出发共创洞察，适合访谈后梳理与工作坊协作。</p>
<h2>步骤</h2><ol><li>收集证据与引语</li><li>四象限贴卡并归纳主题</li><li>提取痛点/渴望/阻碍</li><li>形成机会陈述与待验证假设</li></ol>
<h2>输出与判定</h2><ul><li>同理心地图与主题簇</li><li>机会陈述 3–5 条</li><li>下一步验证清单</li></ul>`,
    htmlContentEn: `<h2>What / When</h2><p>Align team with evidence-based empathy after research sessions.</p>
<h2>Steps</h2><ol><li>Collect quotes/evidence</li><li>Cluster within Say/Think/Do/Feel</li><li>Extract pains/desires/barriers</li><li>Create opportunity statements</li></ol>
<h2>Outputs</h2><ul><li>Empathy map & themes</li><li>3–5 opportunity statements</li><li>Validation list</li></ul>`,
    diagrams: [{ title: '同理心地图模板', url: '/diagrams/empathy-map.svg', description: '说/想/做/感受' }]
  },
  { title: '用户画像', englishTitle: 'Customer Profile / Persona', slug: 'customer-persona', chapter: '2', subsectionId: '2.3', chapterTitle: '深度用户同理心与价值定义', chapterTitleEn: 'Empathy & Value Definition', tags: ['画像','细分','场景'], tagsEn: ['Persona','Segmentation','Scenario'], summary: '以场景与目标为核心构建画像，而非静态人口学清单。', summaryEn: 'Persona centered on scenarios and goals, not just demographics.', templateUrl: '/templates/customer-persona.pptx',
    htmlContent: `<h2>是什么 / 何时使用</h2><p>画像用于对齐目标用户的场景/目标/行为特征与渠道偏好。</p>
<h2>步骤</h2><ol><li>基于原型聚合典型特征</li><li>补充行为/渠道/设备/支付等数据</li><li>选择 1–2 个关键场景写“使用日记”</li><li>列关键任务与阻碍</li></ol>
<h2>输出与判定</h2><ul><li>一页式画像卡</li><li>关键场景描述与证据</li><li>对定位与信息传达的影响</li></ul>`,
    htmlContentEn: `<h2>What / When</h2><p>Persona aligns target scenarios/goals/behaviors and channel preferences.</p>
<h2>Steps</h2><ol><li>Synthesize from archetypes</li><li>Add behavioral/channel/device/payment data</li><li>Write 1–2 scenario diaries</li><li>List key tasks and blockers</li></ol>
<h2>Outputs</h2><ul><li>One‑pager persona card</li><li>Evidence‑backed scenarios</li><li>Messaging implications</li></ul>`,
    diagrams: [{ title: '画像卡模板', url: '/diagrams/persona-card.svg', description: '一页式结构' }]
  },
  { title: '我们该如何…？', englishTitle: 'How Might We? (HMW)', slug: 'how-might-we', chapter: '2', subsectionId: '2.4', chapterTitle: '深度用户同理心与价值定义', chapterTitleEn: 'Empathy & Value Definition', tags: ['问题定义','创意','机会'], tagsEn: ['Problem Framing','Ideation','Opportunities'], summary: '把洞察转化为可激发创意的问题句式，确保范围可控且可验证。', summaryEn: 'Translate insights into creativity‑sparking, testable problem statements.', templateUrl: '/templates/how-might-we.pptx',
    htmlContent: `<h2>是什么 / 何时使用</h2><p>HMW 用开放且有边界的句式把机会具体化，作为创意工作坊与原型设计的输入。</p>
<h2>步骤</h2><ol><li>从同理心/研究输出提炼机会</li><li>使用“如何能…以便…”句式</li><li>评估影响×可行×验证难度</li><li>优先级排序并进入原型</li></ol>
<h2>输出与判定</h2><ul><li>HMW 列表（含评分）</li><li>入选的 3–5 条进入原型实验</li></ul>`,
    htmlContentEn: `<h2>What / When</h2><p>HMW frames opportunities into open yet bounded prompts for ideation and prototyping.</p>
<h2>Steps</h2><ol><li>Derive from empathy/research outputs</li><li>Use "How might we … so that …"</li><li>Score impact × feasibility × testability</li><li>Prioritize for prototyping</li></ol>
<h2>Outputs</h2><ul><li>Scored HMW list</li><li>Top 3–5 for prototypes</li></ul>`,
    diagrams: [{ title: 'HMW 优先级矩阵', url: '/diagrams/hmw-matrix.svg', description: '影响×可行×验证' }],
    interactive: { type: 'matrix-generic', title: { zh: 'HMW 优先级矩阵', en: 'HMW Prioritization' } }
  },

  // 第三章：设计商业模式与产品概念 (Design & Conception)
  { title: '竞品分析矩阵', englishTitle: 'Competitive Analysis Matrix', slug: 'competitive-analysis-matrix', chapter: '3', subsectionId: '3.1', chapterTitle: '设计商业模式与产品概念', chapterTitleEn: 'Design & Conception', tags: [], summary: '', templateUrl: '/templates/competitive-analysis-matrix.pptx' },
  { title: '功能对比分析', englishTitle: 'Feature Comparison', slug: 'feature-comparison', chapter: '3', subsectionId: '3.1', chapterTitle: '设计商业模式与产品概念', chapterTitleEn: 'Design & Conception', tags: [], summary: '', templateUrl: '/templates/feature-comparison.pptx' },
  { title: '价值主张画布', englishTitle: 'Value Proposition Canvas', slug: 'value-proposition-canvas', chapter: '3', subsectionId: '3.2', chapterTitle: '设计商业模式与产品概念', chapterTitleEn: 'Design & Conception', tags: [], summary: '', templateUrl: '/templates/value-proposition-canvas.pptx' },
  { title: '商业模式画布', englishTitle: 'Business Model Canvas (BMC)', slug: 'business-model-canvas', chapter: '3', subsectionId: '3.3', chapterTitle: '设计商业模式与产品概念', chapterTitleEn: 'Design & Conception', tags: [], summary: '', templateUrl: '/templates/business-model-canvas.pptx' },
  { title: '蓝海战略', englishTitle: 'Blue Ocean Strategy', slug: 'blue-ocean-strategy', chapter: '3', subsectionId: '3.4', chapterTitle: '设计商业模式与产品概念', chapterTitleEn: 'Design & Conception', tags: [], summary: '', templateUrl: '/templates/blue-ocean-strategy.pptx' },
  { title: '战略画布', englishTitle: 'Strategy Canvas', slug: 'strategy-canvas', chapter: '3', subsectionId: '3.4', chapterTitle: '设计商业模式与产品概念', chapterTitleEn: 'Design & Conception', tags: [], summary: '', templateUrl: '/templates/strategy-canvas.pptx' },
  { title: '四步动作框架', englishTitle: 'ERRC Grid', slug: 'errc-grid', chapter: '3', subsectionId: '3.4', chapterTitle: '设计商业模式与产品概念', chapterTitleEn: 'Design & Conception', tags: [], summary: '', templateUrl: '/templates/errc-grid.pptx' },
  { title: '价值-复杂度矩阵', englishTitle: 'Value vs. Effort Matrix', slug: 'value-vs-effort-matrix', chapter: '3', subsectionId: '3.5', chapterTitle: '设计商业模式与产品概念', chapterTitleEn: 'Design & Conception', tags: [], summary: '', templateUrl: '/templates/value-vs-effort-matrix.pptx' },
  { title: 'Kano 模型', englishTitle: 'Kano Model', slug: 'kano-model', chapter: '3', subsectionId: '3.5', chapterTitle: '设计商业模式与产品概念', chapterTitleEn: 'Design & Conception', tags: [], summary: '', templateUrl: '/templates/kano-model.pptx' },
  { title: 'MoSCoW 方法', englishTitle: 'MoSCoW Method', slug: 'moscow-method', chapter: '3', subsectionId: '3.5', chapterTitle: '设计商业模式与产品概念', chapterTitleEn: 'Design & Conception', tags: [], summary: '', templateUrl: '/templates/moscow-method.pptx' },
  { title: '滩头策略', englishTitle: 'Beachhead Strategy', slug: 'beachhead-strategy', chapter: '3', subsectionId: '3.5', chapterTitle: '设计商业模式与产品概念', chapterTitleEn: 'Design & Conception', tags: [], summary: '', templateUrl: '/templates/beachhead-strategy.pptx' },
  { title: '低保真原型', englishTitle: 'Low-Fidelity Prototype', slug: 'low-fidelity-prototype', chapter: '3', subsectionId: '3.6', chapterTitle: '设计商业模式与产品概念', chapterTitleEn: 'Design & Conception', tags: [], summary: '', templateUrl: '/templates/low-fidelity-prototype.pptx' },
  { title: '高保真原型', englishTitle: 'High-Fidelity Prototype', slug: 'high-fidelity-prototype', chapter: '3', subsectionId: '3.6', chapterTitle: '设计商业模式与产品概念', chapterTitleEn: 'Design & Conception', tags: [], summary: '', templateUrl: '/templates/high-fidelity-prototype.pptx' },

  // 第四章：测试、迭代与战略优化 (Test & Iteration)
  { title: '可用性测试', englishTitle: 'Usability Testing', slug: 'usability-testing', chapter: '4', subsectionId: '4.1', chapterTitle: '测试、迭代与战略优化', chapterTitleEn: 'Test & Iteration', tags: [], summary: '', templateUrl: '/templates/usability-testing.pptx' },
  { title: 'A/B 测试', englishTitle: 'A/B Testing', slug: 'ab-testing', chapter: '4', subsectionId: '4.1', chapterTitle: '测试、迭代与战略优化', chapterTitleEn: 'Test & Iteration', tags: [], summary: '', templateUrl: '/templates/ab-testing.pptx' },
  { title: '出声思维法', englishTitle: 'Think Aloud Protocol', slug: 'think-aloud-protocol', chapter: '4', subsectionId: '4.1', chapterTitle: '测试、迭代与战略优化', chapterTitleEn: 'Test & Iteration', tags: [], summary: '', templateUrl: '/templates/think-aloud-protocol.pptx' },
  { title: '迭代式设计', englishTitle: 'Iterative Design', slug: 'iterative-design', chapter: '4', subsectionId: '4.2', chapterTitle: '测试、迭代与战略优化', chapterTitleEn: 'Test & Iteration', tags: [], summary: '', templateUrl: '/templates/iterative-design.pptx' },
  { title: '平衡计分卡', englishTitle: 'Balanced Scorecard', slug: 'balanced-scorecard', chapter: '4', subsectionId: '4.3', chapterTitle: '测试、迭代与战略优化', chapterTitleEn: 'Test & Iteration', tags: [], summary: '', templateUrl: '/templates/balanced-scorecard.pptx' },

  // 第五章：市场推广叙事与发布 (Launch & Storytelling)
  { title: '演示文稿', englishTitle: 'Pitch Deck', slug: 'pitch-deck', chapter: '5', subsectionId: '5.1', chapterTitle: '市场推广叙事与发布', chapterTitleEn: 'Launch & Storytelling', tags: [], summary: '', templateUrl: '/templates/pitch-deck.pptx' },
  { title: '愿景视频', englishTitle: 'Vision Video', slug: 'vision-video', chapter: '5', subsectionId: '5.1', chapterTitle: '市场推广叙事与发布', chapterTitleEn: 'Launch & Storytelling', tags: [], summary: '', templateUrl: '/templates/vision-video.pptx' },
  { title: '品牌遗书', englishTitle: 'Brand Obituary', slug: 'brand-obituary', chapter: '5', subsectionId: '5.1', chapterTitle: '市场推广叙事与发布', chapterTitleEn: 'Launch & Storytelling', tags: [], summary: '', templateUrl: '/templates/brand-obituary.pptx' },
  { title: '执行摘要', englishTitle: 'Executive Summary', slug: 'executive-summary', chapter: '5', subsectionId: '5.2', chapterTitle: '市场推广叙事与发布', chapterTitleEn: 'Launch & Storytelling', tags: [], summary: '', templateUrl: '/templates/executive-summary.pptx' },
  { title: '过程书', englishTitle: 'Process Book', slug: 'process-book', chapter: '5', subsectionId: '5.3', chapterTitle: '市场推广叙事与发布', chapterTitleEn: 'Launch & Storytelling', tags: [], summary: '', templateUrl: '/templates/process-book.pptx' },
];

// 章节元数据（各章统一架构：目标 + 子标签）
const chapterIdToMeta: Record<string, ChapterMeta> = {
  '1': {
    goalZh: '确立项目战略航向与团队游戏规则',
    goalEn: 'Set strategic course and team rules',
    descZh: '通过团队治理、外部环境与竞争结构洞察，以及机会空间定义，建立清晰的对齐机制与行动框架。',
    descEn: 'Establish alignment via team governance, market/competition insights and opportunity definition.',
    subsections: [
      { id: '1.1', labelZh: '团队与使命', labelEn: 'Team & Mission' },
      { id: '1.2', labelZh: '行业结构', labelEn: 'Industry Structure' },
      { id: '1.3', labelZh: '机会空间', labelEn: 'Opportunity Space' },
    ],
  },
  '2': {
    goalZh: '建立深度用户同理心并明确价值假设',
    goalEn: 'Build deep user empathy and define value hypotheses',
    descZh: '通过研究体系化构建 360° 用户视图，并将洞察转化为清晰的问题表述。',
    descEn: 'Construct a 360° user view via research and translate insights into well-formed problems.',
    subsections: [
      { id: '2.1', labelZh: '待办任务（JTBD）', labelEn: 'Jobs to be Done (JTBD)' },
      { id: '2.2', labelZh: '研究与细分', labelEn: 'Research & Segmentation' },
      { id: '2.3', labelZh: '连接研究与设计', labelEn: 'Link Research to Design' },
      { id: '2.4', labelZh: '提出正确的问题', labelEn: 'Formulating HMW' },
    ],
  },
  '3': {
    goalZh: '设计商业模式与产品概念，实现问题-方案匹配',
    goalEn: 'Design business model and product concept to reach problem-solution fit',
    subsections: [
      { id: '3.1', labelZh: '竞品分析与机会', labelEn: 'Competitive Analysis & Opportunities' },
      { id: '3.2', labelZh: '价值主张', labelEn: 'Value Proposition' },
      { id: '3.3', labelZh: '商业模式', labelEn: 'Business Model' },
      { id: '3.4', labelZh: '战略突破', labelEn: 'Strategic Breakthroughs' },
      { id: '3.5', labelZh: 'MVP 范围', labelEn: 'MVP Scope' },
      { id: '3.6', labelZh: '为学习而原型', labelEn: 'Prototyping to Learn' },
    ],
  },
  '4': {
    goalZh: '快速验证并迭代优化方案',
    goalEn: 'Validate quickly and iterate for optimization',
    subsections: [
      { id: '4.1', labelZh: '用户反馈与可用性', labelEn: 'User Feedback & Usability' },
      { id: '4.2', labelZh: '迭代式设计', labelEn: 'Iterative Design' },
      { id: '4.3', labelZh: '衡量成功标准', labelEn: 'Define Success Metrics' },
    ],
  },
  '5': {
    goalZh: '完成发布并构建清晰的叙事',
    goalEn: 'Launch and craft compelling storytelling',
    subsections: [
      { id: '5.1', labelZh: '商业叙事', labelEn: 'Business Narrative' },
      { id: '5.2', labelZh: '提炼精髓', labelEn: 'Executive Summary' },
      { id: '5.3', labelZh: '记录征程', labelEn: 'Process Book' },
    ],
  },
};


// Function to get all frameworks（返回完整内容数据）
export const getAllFrameworks = (): Framework[] => {
  // 合并完整的frameworksData和seededFrameworks
  const enhancedFrameworks: Framework[] = [];
  
  // 从seededFrameworks获取基础列表
  seededFrameworks.forEach(seedFw => {
    // 如果在frameworksData中有对应的完整数据，使用完整数据
    const fullData = frameworksData[seedFw.slug];
    if (fullData) {
      enhancedFrameworks.push(fullData);
    } else {
      enhancedFrameworks.push(seedFw);
    }
  });
  
  return enhancedFrameworks.sort((a, b) => {
    if (a.chapter === b.chapter) return a.title.localeCompare(b.title, 'zh');
    return parseInt(a.chapter) - parseInt(b.chapter);
  });
};

// Function to get a framework by slug
export const getFrameworkBySlug = (slug: string): Framework | undefined => {
  // 优先从frameworksData获取完整数据
  const fullData = frameworksData[slug];
  if (fullData) {
    return fullData;
  }
  
  // 回退到seededFrameworks
  const found = seededFrameworks.find((f) => f.slug === slug);
  return found ? sanitizeFramework(found) : undefined;
};

// Function to get all unique chapters
export const getAllChapters = (): { id: string; title: string; titleEn?: string }[] => {
  const map = new Map<string, { title: string; titleEn?: string }>();
  seededFrameworks.forEach((f) => {
    const existing = map.get(f.chapter);
    map.set(f.chapter, { title: f.chapterTitle, titleEn: f.chapterTitleEn || existing?.titleEn });
  });
  return Array.from(map.entries())
    .map(([id, v]) => ({ id, title: v.title, titleEn: v.titleEn }))
    .sort((a, b) => parseInt(a.id) - parseInt(b.id));
};

// 获取章节元数据
export const getChapterMeta = (chapterId: string): ChapterMeta | undefined => {
  return chapterIdToMeta[chapterId];
};

// Function to get frameworks by chapter
export const getFrameworksByChapter = (chapterId: string): Framework[] => {
  return getAllFrameworks().filter((f) => f.chapter === chapterId);
};

// Function to search frameworks
export const searchFrameworks = (query: string): Framework[] => {
  if (!query) return getAllFrameworks();
  const q = query.toLowerCase();
  return getAllFrameworks().filter((f) => {
    const pools: string[] = [
      f.title,
      f.englishTitle,
      f.summary,
      f.summaryEn || '',
      ...(f.tags || []),
      ...((f.tagsEn || []) as string[]),
    ];
    return pools.some((p) => (p || '').toLowerCase().includes(q));
  });
};
