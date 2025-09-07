// Remove gray-matter and marked imports as they cause browser compatibility issues
import matter from 'gray-matter';
import { marked } from 'marked';

// Define the Framework type
export interface Framework {
  title: string;
  englishTitle: string;
  slug: string;
  chapter: string;
  chapterTitle: string;
  chapterTitleEn?: string;
  tags: string[];
  tagsEn?: string[];
  summary: string;
  summaryEn?: string;
  templateUrl: string;
  content?: string;
  htmlContent?: string;
  htmlContentEn?: string;
  diagrams?: { title: string; url: string; description?: string }[];
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
    chapterTitle: "发现与战略基础",
    tags: ["团队协作", "组织效能", "领导力"],
    summary: "识别并化解信任缺失、冲突畏惧、责任规避、投入不足、结果忽视五大障碍，打造高效团队。",
    templateUrl: "/templates/five-dysfunctions-team.pptx",
    content: `## 核心要点\n- 信任是地基\n- 鼓励健康冲突\n- 明确承诺与责任\n- 同伴压力促问责\n- 聚焦集体结果`,
    htmlContent: `<h2>核心要点</h2><ul><li>信任是地基</li><li>鼓励健康冲突</li><li>明确承诺与责任</li><li>同伴压力促问责</li><li>聚焦集体结果</li></ul>`,
    diagrams: [
      { title: "五大障碍金字塔", url: "/diagrams/five-dysfunctions-team.svg", description: "自下而上：信任→冲突→承诺→问责→结果" }
    ]
  },
  'raci-chart': {
    title: "RACI 责任分配矩阵",
    englishTitle: "RACI Chart",
    slug: "raci-chart",
    chapter: "1",
    chapterTitle: "发现与战略基础",
    tags: ["项目治理", "角色职责", "流程清晰"],
    summary: "通过 R（负责）、A（签核）、C（咨询）、I（知会）澄清跨角色分工，降低协调成本。",
    templateUrl: "/templates/raci-chart.pptx",
    content: `## 使用建议\n- 先列任务后配角色\n- 一项任务仅一个 A\n- C/I 仅保留必要者\n- 定期回顾更新`,
    htmlContent: `<h2>使用建议</h2><ul><li>先列任务后配角色</li><li>一项任务仅一个 A</li><li>C/I 仅保留必要者</li><li>定期回顾更新</li></ul>`,
    diagrams: [
      { title: "RACI 示例表", url: "/diagrams/raci-chart.svg", description: "行=任务，列=角色，单元格填 R/A/C/I" }
    ]
  },
  'gantt-chart': {
    title: "甘特图",
    englishTitle: "Gantt Chart",
    slug: "gantt-chart",
    chapter: "1",
    chapterTitle: "发现与战略基础",
    tags: ["项目计划", "进度管理", "里程碑"],
    summary: "以时间轴展示任务起止、依赖与里程碑，统一节奏与关键路径。",
    templateUrl: "/templates/gantt-chart.pptx",
    content: `## 实施要点\n- 标注关键路径与里程碑\n- 粒度适中可维护\n- 高风险任务留缓冲\n- 周期滚动更新`,
    htmlContent: `<h2>实施要点</h2><ul><li>标注关键路径与里程碑</li><li>粒度适中可维护</li><li>高风险任务留缓冲</li><li>周期滚动更新</li></ul>`,
    diagrams: [
      { title: "甘特图示意", url: "/diagrams/gantt-chart.svg", description: "条形表示时长，菱形为里程碑" }
    ]
  },
  'pestle-analysis': {
    title: "PESTLE 分析",
    englishTitle: "PESTLE Analysis",
    slug: "pestle-analysis",
    chapter: "1",
    chapterTitle: "发现与战略基础",
    tags: ["宏观环境", "外部分析", "战略情境"],
    summary: "从政治、经济、社会、技术、法律与环境六维扫描外部环境，识别机会与风险。",
    templateUrl: "/templates/pestle-analysis.pptx",
    content: `## 提示\n- 结合行业周期与地区差异\n- 关注技术与政策联动效应\n- 将发现映射到机会/风险`,
    htmlContent: `<h2>提示</h2><ul><li>结合行业周期与地区差异</li><li>关注技术与政策联动效应</li><li>将发现映射到机会/风险</li></ul>`,
    diagrams: [
      { title: "PESTLE 六象限", url: "/diagrams/pestle-analysis.svg", description: "六维度外部因素盘点" }
    ]
  },
  'sswot-analysis': {
    title: "sSWOT 分析",
    englishTitle: "sSWOT Analysis",
    slug: "sswot-analysis",
    chapter: "1",
    chapterTitle: "发现与战略基础",
    tags: ["战略分析", "内外匹配", "情境化"],
    summary: "在 SWOT 基础上强调情境化，将内部要素与外部环境匹配，形成 SO/ST/WO/WT 策略组。",
    templateUrl: "/templates/sswot-analysis.pptx",
    content: `## 做法\n- 以关键问题为锚点\n- 将 S/W 与 O/T 做矩阵组合\n- 推导 SO/ST/WO/WT`,
    htmlContent: `<h2>做法</h2><ul><li>以关键问题为锚点</li><li>将 S/W 与 O/T 做矩阵组合</li><li>推导 SO/ST/WO/WT</li></ul>`,
    diagrams: [
      { title: "sSWOT 矩阵", url: "/diagrams/sswot-analysis.svg", description: "四象限策略推导示意" }
    ]
  },
  'business-opportunity-statement': {
    title: "商业机会声明",
    englishTitle: "Business Opportunity Statement",
    slug: "business-opportunity-statement",
    chapter: "1",
    chapterTitle: "发现与战略基础",
    tags: ["机会定义", "问题陈述", "对齐共识"],
    summary: "用简洁结构描述对象、痛点、价值与成功标准，形成统一机会锚点。",
    templateUrl: "/templates/business-opportunity-statement.pptx",
    content: `## 结构\n- 面向对象（Persona/Segment）\n- 核心痛点（Why now）\n- 价值主张（Value）\n- 成功标准（Success Criteria）`,
    htmlContent: `<h2>结构</h2><ul><li>面向对象（Persona/Segment）</li><li>核心痛点（Why now）</li><li>价值主张（Value）</li><li>成功标准（Success Criteria）</li></ul>`,
    diagrams: [
      { title: "机会声明画布", url: "/diagrams/business-opportunity-statement.svg", description: "四区块结构示意" }
    ]
  },
  'north-star-framework': {
    title: "谷歌“北极星”框架",
    englishTitle: "The North Star Framework",
    slug: "north-star-framework",
    chapter: "1",
    chapterTitle: "发现与战略基础",
    tags: ["增长指标", "战略对齐", "指标体系"],
    summary: "以北极星指标（NSM）与驱动指标树对齐战略与执行，统一团队关注。",
    templateUrl: "/templates/north-star-framework.pptx",
    content: `## 实施\n- 明确 North Star Metric\n- 拆解驱动指标/假设\n- 建立实验-学习闭环`,
    htmlContent: `<h2>实施</h2><ul><li>明确 North Star Metric</li><li>拆解驱动指标/假设</li><li>建立实验-学习闭环</li></ul>`,
    diagrams: [
      { title: "NSM 指标树", url: "/diagrams/north-star-framework.svg", description: "北极星指标与驱动因子分解" }
    ]
  },
  'business-model-canvas': {
    title: "商业模式画布",
    englishTitle: "Business Model Canvas",
    slug: "business-model-canvas",
    chapter: "2",
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

// 清洗：删除子卡片内容（为后续中英双语改写留空）
const sanitizeFramework = (f: Framework): Framework => ({
  ...f,
  summary: '',
  summaryEn: '',
  content: '',
  htmlContent: '',
  htmlContentEn: '',
  diagrams: [],
});

// 新目录的最小化双语数据（仅标题/英文标题/章节/章节标题/模板占位）
const seededFrameworks: Framework[] = [
  // 第一章：发现与战略基础 (Discovery & Strategy)
  { title: '团队协作的五大障碍', englishTitle: 'The Five Dysfunctions of a Team', slug: 'five-dysfunctions-team', chapter: '1', chapterTitle: '发现与战略基础', chapterTitleEn: 'Discovery & Strategy', tags: [], summary: '', templateUrl: '/templates/five-dysfunctions-team.pptx' },
  { title: 'RACI 责任分配矩阵', englishTitle: 'RACI Chart', slug: 'raci-chart', chapter: '1', chapterTitle: '发现与战略基础', chapterTitleEn: 'Discovery & Strategy', tags: [], summary: '', templateUrl: '/templates/raci-chart.pptx' },
  { title: '甘特图', englishTitle: 'Gantt Chart', slug: 'gantt-chart', chapter: '1', chapterTitle: '发现与战略基础', chapterTitleEn: 'Discovery & Strategy', tags: [], summary: '', templateUrl: '/templates/gantt-chart.pptx' },
  { title: 'PESTLE 分析', englishTitle: 'PESTLE Analysis', slug: 'pestle-analysis', chapter: '1', chapterTitle: '发现与战略基础', chapterTitleEn: 'Discovery & Strategy', tags: [], summary: '', templateUrl: '/templates/pestle-analysis.pptx' },
  { title: '波特五力模型', englishTitle: "Porter's Five Forces", slug: 'porters-five-forces', chapter: '1', chapterTitle: '发现与战略基础', chapterTitleEn: 'Discovery & Strategy', tags: [], summary: '', templateUrl: '/templates/porters-five-forces.pptx' },
  { title: 'SWOT 分析', englishTitle: 'SWOT Analysis', slug: 'swot-analysis', chapter: '1', chapterTitle: '发现与战略基础', chapterTitleEn: 'Discovery & Strategy', tags: [], summary: '', templateUrl: '/templates/swot-analysis.pptx' },
  { title: 'sSWOT 分析', englishTitle: 'sSWOT Analysis', slug: 'sswot-analysis', chapter: '1', chapterTitle: '发现与战略基础', chapterTitleEn: 'Discovery & Strategy', tags: [], summary: '', templateUrl: '/templates/sswot-analysis.pptx' },
  { title: '商业机会声明', englishTitle: 'Business Opportunity Statement', slug: 'business-opportunity-statement', chapter: '1', chapterTitle: '发现与战略基础', chapterTitleEn: 'Discovery & Strategy', tags: [], summary: '', templateUrl: '/templates/business-opportunity-statement.pptx' },
  { title: '谷歌“北极星”框架', englishTitle: 'The North Star Framework', slug: 'north-star-framework', chapter: '1', chapterTitle: '发现与战略基础', chapterTitleEn: 'Discovery & Strategy', tags: [], summary: '', templateUrl: '/templates/north-star-framework.pptx' },

  // 第二章：深度用户同理心与价值定义 (Empathy & Value Definition)
  { title: '待办任务', englishTitle: 'Jobs to be Done (JTBD)', slug: 'jobs-to-be-done', chapter: '2', chapterTitle: '深度用户同理心与价值定义', chapterTitleEn: 'Empathy & Value Definition', tags: [], summary: '', templateUrl: '/templates/jobs-to-be-done.pptx' },
  { title: '二手研究 vs. 一手研究', englishTitle: 'Secondary vs. Primary Research', slug: 'secondary-vs-primary-research', chapter: '2', chapterTitle: '深度用户同理心与价值定义', chapterTitleEn: 'Empathy & Value Definition', tags: [], summary: '', templateUrl: '/templates/secondary-vs-primary-research.pptx' },
  { title: '定量研究 vs. 定性研究', englishTitle: 'Quantitative vs. Qualitative Research', slug: 'quantitative-vs-qualitative-research', chapter: '2', chapterTitle: '深度用户同理心与价值定义', chapterTitleEn: 'Empathy & Value Definition', tags: [], summary: '', templateUrl: '/templates/quantitative-vs-qualitative-research.pptx' },
  { title: '用户原型/心智模型', englishTitle: 'Archetypes/Mindsets', slug: 'archetypes-mindsets', chapter: '2', chapterTitle: '深度用户同理心与价值定义', chapterTitleEn: 'Empathy & Value Definition', tags: [], summary: '', templateUrl: '/templates/archetypes-mindsets.pptx' },
  { title: '同理心地图', englishTitle: 'Empathy Map', slug: 'empathy-map', chapter: '2', chapterTitle: '深度用户同理心与价值定义', chapterTitleEn: 'Empathy & Value Definition', tags: [], summary: '', templateUrl: '/templates/empathy-map.pptx' },
  { title: '用户画像', englishTitle: 'Customer Profile / Persona', slug: 'customer-persona', chapter: '2', chapterTitle: '深度用户同理心与价值定义', chapterTitleEn: 'Empathy & Value Definition', tags: [], summary: '', templateUrl: '/templates/customer-persona.pptx' },
  { title: '我们该如何…？', englishTitle: 'How Might We? (HMW)', slug: 'how-might-we', chapter: '2', chapterTitle: '深度用户同理心与价值定义', chapterTitleEn: 'Empathy & Value Definition', tags: [], summary: '', templateUrl: '/templates/how-might-we.pptx' },

  // 第三章：设计商业模式与产品概念 (Design & Conception)
  { title: '竞品分析矩阵', englishTitle: 'Competitive Analysis Matrix', slug: 'competitive-analysis-matrix', chapter: '3', chapterTitle: '设计商业模式与产品概念', chapterTitleEn: 'Design & Conception', tags: [], summary: '', templateUrl: '/templates/competitive-analysis-matrix.pptx' },
  { title: '功能对比分析', englishTitle: 'Feature Comparison', slug: 'feature-comparison', chapter: '3', chapterTitle: '设计商业模式与产品概念', chapterTitleEn: 'Design & Conception', tags: [], summary: '', templateUrl: '/templates/feature-comparison.pptx' },
  { title: '价值主张画布', englishTitle: 'Value Proposition Canvas', slug: 'value-proposition-canvas', chapter: '3', chapterTitle: '设计商业模式与产品概念', chapterTitleEn: 'Design & Conception', tags: [], summary: '', templateUrl: '/templates/value-proposition-canvas.pptx' },
  { title: '商业模式画布', englishTitle: 'Business Model Canvas (BMC)', slug: 'business-model-canvas', chapter: '3', chapterTitle: '设计商业模式与产品概念', chapterTitleEn: 'Design & Conception', tags: [], summary: '', templateUrl: '/templates/business-model-canvas.pptx' },
  { title: '蓝海战略', englishTitle: 'Blue Ocean Strategy', slug: 'blue-ocean-strategy', chapter: '3', chapterTitle: '设计商业模式与产品概念', chapterTitleEn: 'Design & Conception', tags: [], summary: '', templateUrl: '/templates/blue-ocean-strategy.pptx' },
  { title: '战略画布', englishTitle: 'Strategy Canvas', slug: 'strategy-canvas', chapter: '3', chapterTitle: '设计商业模式与产品概念', chapterTitleEn: 'Design & Conception', tags: [], summary: '', templateUrl: '/templates/strategy-canvas.pptx' },
  { title: '四步动作框架', englishTitle: 'ERRC Grid', slug: 'errc-grid', chapter: '3', chapterTitle: '设计商业模式与产品概念', chapterTitleEn: 'Design & Conception', tags: [], summary: '', templateUrl: '/templates/errc-grid.pptx' },
  { title: '价值-复杂度矩阵', englishTitle: 'Value vs. Effort Matrix', slug: 'value-vs-effort-matrix', chapter: '3', chapterTitle: '设计商业模式与产品概念', chapterTitleEn: 'Design & Conception', tags: [], summary: '', templateUrl: '/templates/value-vs-effort-matrix.pptx' },
  { title: 'Kano 模型', englishTitle: 'Kano Model', slug: 'kano-model', chapter: '3', chapterTitle: '设计商业模式与产品概念', chapterTitleEn: 'Design & Conception', tags: [], summary: '', templateUrl: '/templates/kano-model.pptx' },
  { title: 'MoSCoW 方法', englishTitle: 'MoSCoW Method', slug: 'moscow-method', chapter: '3', chapterTitle: '设计商业模式与产品概念', chapterTitleEn: 'Design & Conception', tags: [], summary: '', templateUrl: '/templates/moscow-method.pptx' },
  { title: '滩头策略', englishTitle: 'Beachhead Strategy', slug: 'beachhead-strategy', chapter: '3', chapterTitle: '设计商业模式与产品概念', chapterTitleEn: 'Design & Conception', tags: [], summary: '', templateUrl: '/templates/beachhead-strategy.pptx' },
  { title: '低保真原型', englishTitle: 'Low-Fidelity Prototype', slug: 'low-fidelity-prototype', chapter: '3', chapterTitle: '设计商业模式与产品概念', chapterTitleEn: 'Design & Conception', tags: [], summary: '', templateUrl: '/templates/low-fidelity-prototype.pptx' },
  { title: '高保真原型', englishTitle: 'High-Fidelity Prototype', slug: 'high-fidelity-prototype', chapter: '3', chapterTitle: '设计商业模式与产品概念', chapterTitleEn: 'Design & Conception', tags: [], summary: '', templateUrl: '/templates/high-fidelity-prototype.pptx' },

  // 第四章：测试、迭代与战略优化 (Test & Iteration)
  { title: '可用性测试', englishTitle: 'Usability Testing', slug: 'usability-testing', chapter: '4', chapterTitle: '测试、迭代与战略优化', chapterTitleEn: 'Test & Iteration', tags: [], summary: '', templateUrl: '/templates/usability-testing.pptx' },
  { title: 'A/B 测试', englishTitle: 'A/B Testing', slug: 'ab-testing', chapter: '4', chapterTitle: '测试、迭代与战略优化', chapterTitleEn: 'Test & Iteration', tags: [], summary: '', templateUrl: '/templates/ab-testing.pptx' },
  { title: '出声思维法', englishTitle: 'Think Aloud Protocol', slug: 'think-aloud-protocol', chapter: '4', chapterTitle: '测试、迭代与战略优化', chapterTitleEn: 'Test & Iteration', tags: [], summary: '', templateUrl: '/templates/think-aloud-protocol.pptx' },
  { title: '迭代式设计', englishTitle: 'Iterative Design', slug: 'iterative-design', chapter: '4', chapterTitle: '测试、迭代与战略优化', chapterTitleEn: 'Test & Iteration', tags: [], summary: '', templateUrl: '/templates/iterative-design.pptx' },
  { title: '平衡计分卡', englishTitle: 'Balanced Scorecard', slug: 'balanced-scorecard', chapter: '4', chapterTitle: '测试、迭代与战略优化', chapterTitleEn: 'Test & Iteration', tags: [], summary: '', templateUrl: '/templates/balanced-scorecard.pptx' },

  // 第五章：市场推广叙事与发布 (Launch & Storytelling)
  { title: '演示文稿', englishTitle: 'Pitch Deck', slug: 'pitch-deck', chapter: '5', chapterTitle: '市场推广叙事与发布', chapterTitleEn: 'Launch & Storytelling', tags: [], summary: '', templateUrl: '/templates/pitch-deck.pptx' },
  { title: '愿景视频', englishTitle: 'Vision Video', slug: 'vision-video', chapter: '5', chapterTitle: '市场推广叙事与发布', chapterTitleEn: 'Launch & Storytelling', tags: [], summary: '', templateUrl: '/templates/vision-video.pptx' },
  { title: '品牌遗书', englishTitle: 'Brand Obituary', slug: 'brand-obituary', chapter: '5', chapterTitle: '市场推广叙事与发布', chapterTitleEn: 'Launch & Storytelling', tags: [], summary: '', templateUrl: '/templates/brand-obituary.pptx' },
  { title: '执行摘要', englishTitle: 'Executive Summary', slug: 'executive-summary', chapter: '5', chapterTitle: '市场推广叙事与发布', chapterTitleEn: 'Launch & Storytelling', tags: [], summary: '', templateUrl: '/templates/executive-summary.pptx' },
  { title: '过程书', englishTitle: 'Process Book', slug: 'process-book', chapter: '5', chapterTitle: '市场推广叙事与发布', chapterTitleEn: 'Launch & Storytelling', tags: [], summary: '', templateUrl: '/templates/process-book.pptx' },
];

// Function to get all frameworks（返回已清空内容的数据）
export const getAllFrameworks = (): Framework[] => {
  // 返回已清洗后的最小化双语目录数据
  const list: Framework[] = seededFrameworks.map((f) => sanitizeFramework(f));
  return list.sort((a, b) => {
    if (a.chapter === b.chapter) return a.title.localeCompare(b.title, 'zh');
    return parseInt(a.chapter) - parseInt(b.chapter);
  });
};

// Function to get a framework by slug
export const getFrameworkBySlug = (slug: string): Framework | undefined => {
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
