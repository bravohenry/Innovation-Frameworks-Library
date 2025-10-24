import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Input, Textarea, Chip, Slider, Select, SelectItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import BaseInteractiveLayout from './BaseInteractiveLayout';
import { InteractiveComponentProps, SSwotData, SwotFactor, SwotStrategy } from './types';

// Sample data for sSWOT Analysis
const initialSSwotData: SSwotData = {
  situation: 'We need to decide whether to enter the emerging AI assistant market',
  situationEn: 'We need to decide whether to enter the emerging AI assistant market',
  factors: [
    {
      id: 'strength-1',
      type: 'strength',
      title: 'Strong Technical Team',
      titleEn: 'Strong Technical Team',
      description: 'Experienced AI and machine learning experts',
      descriptionEn: 'Experienced AI and machine learning experts',
      weight: 4
    },
    {
      id: 'strength-2',
      type: 'strength',
      title: 'Adequate Funding',
      titleEn: 'Adequate Funding',
      description: 'Recently completed Series B funding with adequate resources',
      descriptionEn: 'Recently completed Series B funding with adequate resources',
      weight: 5
    },
    {
      id: 'weakness-1',
      type: 'weakness',
      title: 'Lack of Market Experience',
      titleEn: 'Lack of Market Experience',
      description: 'Limited experience in consumer AI products',
      descriptionEn: 'Limited experience in consumer AI products',
      weight: 4
    },
    {
      id: 'opportunity-1',
      type: 'opportunity',
      title: 'Rapid Market Growth',
      titleEn: 'Rapid Market Growth',
      description: 'AI assistant market expected to grow 300% in next 5 years',
      descriptionEn: 'AI assistant market expected to grow 300% in next 5 years',
      weight: 5
    },
    {
      id: 'threat-1',
      type: 'threat',
      title: 'Intense Big Tech Competition',
      titleEn: 'Intense Big Tech Competition',
      description: 'Google, Apple, Microsoft and other giants dominate market share',
      descriptionEn: 'Google, Apple, Microsoft and other giants dominate market share',
      weight: 5
    }
  ],
  strategies: [
    {
      id: 'so-1',
      type: 'SO',
      title: 'Technical Differentiation Strategy',
      titleEn: 'Technical Differentiation Strategy',
      description: 'Leverage strong tech team to develop unique AI features and capture market growth',
      descriptionEn: 'Leverage strong tech team to develop unique AI features and capture market growth',
      feasibility: 4,
      impact: 5,
      priority: 'high'
    },
    {
      id: 'wo-1',
      type: 'WO',
      title: 'Partnership Strategy',
      titleEn: 'Partnership Strategy',
      description: 'Partner with experienced market players to quickly enter growing market',
      descriptionEn: 'Partner with experienced market players to quickly enter growing market',
      feasibility: 3,
      impact: 4,
      priority: 'medium'
    },
    {
      id: 'st-1',
      type: 'ST',
      title: 'Vertical Specialization',
      titleEn: 'Vertical Specialization',
      description: 'Focus on specific verticals to avoid direct competition with big tech',
      descriptionEn: 'Focus on specific verticals to avoid direct competition with big tech',
      feasibility: 4,
      impact: 3,
      priority: 'medium'
    },
    {
      id: 'wt-1',
      type: 'WT',
      title: 'Cautious Observation',
      titleEn: 'Cautious Observation',
      description: 'Given lack of market experience and intense competition, wait for better timing',
      descriptionEn: 'Given lack of market experience and intense competition, wait for better timing',
      feasibility: 5,
      impact: 2,
      priority: 'low'
    }
  ]
};

const SWOT_TYPES = {
  strength: { 
    labelZh: '优势', 
    labelEn: 'Strengths', 
    icon: 'lucide:trending-up',
    color: 'success',
    bgColor: 'bg-success/10'
  },
  weakness: { 
    labelZh: '劣势', 
    labelEn: 'Weaknesses', 
    icon: 'lucide:trending-down',
    color: 'danger',
    bgColor: 'bg-danger/10'
  },
  opportunity: { 
    labelZh: '机会', 
    labelEn: 'Opportunities', 
    icon: 'lucide:zap',
    color: 'warning',
    bgColor: 'bg-warning/10'
  },
  threat: { 
    labelZh: '威胁', 
    labelEn: 'Threats', 
    icon: 'lucide:shield-alert',
    color: 'primary',
    bgColor: 'bg-primary/10'
  }
} as const;

const STRATEGY_TYPES = {
  SO: { 
    labelZh: '增长型战略', 
    labelEn: 'Growth Strategies', 
    description: '利用优势抓住机会',
    descriptionEn: 'Use strengths to capitalize on opportunities',
    color: 'success' 
  },
  WO: { 
    labelZh: '扭转型战略', 
    labelEn: 'Turnaround Strategies', 
    description: '克服劣势抓住机会',
    descriptionEn: 'Overcome weaknesses to capitalize on opportunities',
    color: 'warning' 
  },
  ST: { 
    labelZh: '多元化战略', 
    labelEn: 'Diversification Strategies', 
    description: '利用优势应对威胁',
    descriptionEn: 'Use strengths to counter threats',
    color: 'primary' 
  },
  WT: { 
    labelZh: '防御型战略', 
    labelEn: 'Defensive Strategies', 
    description: '最小化劣势和威胁',
    descriptionEn: 'Minimize weaknesses and threats',
    color: 'danger' 
  }
} as const;

interface SSwotAnalysisDiagramProps extends InteractiveComponentProps {}

const SSwotAnalysisDiagram: React.FC<SSwotAnalysisDiagramProps> = ({
  lang = 'zh',
  data: initialData,
  onDataChange,
  onExport,
  readOnly = false,
  showExportButtons = true,
  className = ''
}) => {
  const [data, setData] = useState<SSwotData>(initialData || initialSSwotData);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'analysis' | 'strategies'>('analysis');
  const [editingItem, setEditingItem] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  const updateData = (newData: SSwotData) => {
    setData(newData);
    onDataChange?.(newData);
  };

  const addFactor = (type: string) => {
    const newFactor: SwotFactor = {
      id: `${type}-${Date.now()}`,
      type: type as any,
      title: lang === 'zh' ? '新因素' : 'New Factor',
      titleEn: 'New Factor',
      description: '',
      descriptionEn: '',
      weight: 3
    };
    
    updateData({
      ...data,
      factors: [...data.factors, newFactor]
    });
    setEditingItem(newFactor.id);
  };

  const updateFactor = (factorId: string, updates: Partial<SwotFactor>) => {
    updateData({
      ...data,
      factors: data.factors.map(f => f.id === factorId ? { ...f, ...updates } : f)
    });
  };

  const deleteFactor = (factorId: string) => {
    updateData({
      ...data,
      factors: data.factors.filter(f => f.id !== factorId)
    });
  };

  const addStrategy = (type: string) => {
    const newStrategy: SwotStrategy = {
      id: `${type.toLowerCase()}-${Date.now()}`,
      type: type as any,
      title: lang === 'zh' ? '新战略' : 'New Strategy',
      titleEn: 'New Strategy',
      description: '',
      descriptionEn: '',
      feasibility: 3,
      impact: 3,
      priority: 'medium'
    };
    
    updateData({
      ...data,
      strategies: [...data.strategies, newStrategy]
    });
    setEditingItem(newStrategy.id);
  };

  const updateStrategy = (strategyId: string, updates: Partial<SwotStrategy>) => {
    updateData({
      ...data,
      strategies: data.strategies.map(s => s.id === strategyId ? { ...s, ...updates } : s)
    });
  };

  const deleteStrategy = (strategyId: string) => {
    updateData({
      ...data,
      strategies: data.strategies.filter(s => s.id !== strategyId)
    });
  };

  const handleExportData = (type: 'png' | 'csv') => {
    if (type === 'csv') {
      const factorsData = data.factors.map(factor => ({
        Type: 'Factor',
        Category: lang === 'en' ? SWOT_TYPES[factor.type].labelEn : SWOT_TYPES[factor.type].labelZh,
        Title: lang === 'en' ? factor.titleEn || factor.title : factor.title,
        Description: lang === 'en' ? factor.descriptionEn || factor.description : factor.description,
        Weight: factor.weight,
        Feasibility: '',
        Impact: '',
        Priority: ''
      }));
      
      const strategiesData = data.strategies.map(strategy => ({
        Type: 'Strategy',
        Category: lang === 'en' ? STRATEGY_TYPES[strategy.type].labelEn : STRATEGY_TYPES[strategy.type].labelZh,
        Title: lang === 'en' ? strategy.titleEn || strategy.title : strategy.title,
        Description: lang === 'en' ? strategy.descriptionEn || strategy.description : strategy.description,
        Weight: '',
        Feasibility: strategy.feasibility,
        Impact: strategy.impact,
        Priority: strategy.priority
      }));
      
      onExport?.(type, [...factorsData, ...strategiesData]);
    } else {
      onExport?.(type, data);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getPriorityLabel = (priority: string) => {
    const labels = {
      high: lang === 'zh' ? '高' : 'High',
      medium: lang === 'zh' ? '中' : 'Medium',
      low: lang === 'zh' ? '低' : 'Low'
    };
    return labels[priority as keyof typeof labels] || priority;
  };

  const controls = !readOnly && (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant={activeTab === 'analysis' ? 'solid' : 'flat'}
        color={activeTab === 'analysis' ? 'primary' : 'default'}
        onPress={() => setActiveTab('analysis')}
      >
        {lang === 'zh' ? 'SWOT分析' : 'SWOT Analysis'}
      </Button>
      <Button
        size="sm"
        variant={activeTab === 'strategies' ? 'solid' : 'flat'}
        color={activeTab === 'strategies' ? 'primary' : 'default'}
        onPress={() => setActiveTab('strategies')}
      >
        {lang === 'zh' ? '战略矩阵' : 'Strategy Matrix'}
      </Button>
      <Button
        size="sm"
        variant={isEditing ? 'solid' : 'flat'}
        color={isEditing ? 'primary' : 'default'}
        startContent={<Icon icon={isEditing ? 'lucide:check' : 'lucide:edit-3'} />}
        onPress={() => {
          setIsEditing(!isEditing);
          setEditingItem(null);
        }}
      >
        {isEditing ? (lang === 'zh' ? '完成' : 'Done') : (lang === 'zh' ? '编辑' : 'Edit')}
      </Button>
    </div>
  );

  return (
    <BaseInteractiveLayout
      title="情境化SWOT分析"
      titleEn="Situational SWOT Analysis"
      lang={lang}
      onExport={handleExportData}
      showExportButtons={showExportButtons}
      controls={controls}
      className={className}
      data={data}
      pathLabels={{
        chapter: lang === 'zh' ? '第1章' : 'Chapter 1',
        subsection: lang === 'zh' ? '1.2 行业结构' : '1.2 Industry Structure'
      }}
    >
      <div className="space-y-6" id="sswot-analysis-diagram">
        {/* Situation Context */}
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardBody className="p-4">
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Icon icon="lucide:target" className="text-primary" />
              {lang === 'zh' ? '情境描述' : 'Situation Context'}
            </h4>
            {isEditing ? (
              <Textarea
                placeholder={lang === 'zh' ? '描述需要分析的具体情境或决策...' : 'Describe the specific situation or decision to analyze...'}
                value={lang === 'en' ? data.situationEn || data.situation : data.situation}
                onChange={(e) => {
                  if (lang === 'en') {
                    updateData({ ...data, situationEn: e.target.value });
                  } else {
                    updateData({ ...data, situation: e.target.value });
                  }
                }}
                minRows={2}
              />
            ) : (
              <p className="text-default-700">
                {lang === 'en' ? data.situationEn || data.situation : data.situation}
              </p>
            )}
          </CardBody>
        </Card>

        {activeTab === 'analysis' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(SWOT_TYPES).map(([type, config]) => {
              const factors = data.factors.filter(f => f.type === type);
              
              return (
                <Card key={type} className={config.bgColor}>
                  <CardBody className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Icon
                          icon={config.icon}
                          className={`text-xl text-${config.color}`}
                        />
                        <h4 className="text-lg font-semibold">
                          {lang === 'en' ? config.labelEn : config.labelZh}
                        </h4>
                        <Chip variant="flat" size="sm">
                          {factors.length}
                        </Chip>
                      </div>
                      {isEditing && (
                        <Button
                          size="sm"
                          variant="flat"
                          color={config.color}
                          isIconOnly
                          onPress={() => addFactor(type)}
                        >
                          <Icon icon="lucide:plus" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-3">
                      {factors.map((factor) => (
                        <Card key={factor.id} className="border bg-background/50">
                          <CardBody className="p-3">
                            {editingItem === factor.id && isEditing ? (
                              <div className="space-y-3">
                                <Input
                                  label={lang === 'zh' ? '标题' : 'Title'}
                                  value={lang === 'en' ? factor.titleEn || factor.title : factor.title}
                                  onChange={(e) => {
                                    if (lang === 'en') {
                                      updateFactor(factor.id, { titleEn: e.target.value });
                                    } else {
                                      updateFactor(factor.id, { title: e.target.value });
                                    }
                                  }}
                                  size="sm"
                                />
                                <Textarea
                                  label={lang === 'zh' ? '描述' : 'Description'}
                                  value={lang === 'en' ? factor.descriptionEn || factor.description : factor.description}
                                  onChange={(e) => {
                                    if (lang === 'en') {
                                      updateFactor(factor.id, { descriptionEn: e.target.value });
                                    } else {
                                      updateFactor(factor.id, { description: e.target.value });
                                    }
                                  }}
                                  minRows={2}
                                  size="sm"
                                />
                                <Slider
                                  label={lang === 'zh' ? '重要程度' : 'Weight'}
                                  step={1}
                                  maxValue={5}
                                  minValue={1}
                                  value={factor.weight}
                                  onChange={(value) => updateFactor(factor.id, { weight: value as number })}
                                  size="sm"
                                  color={config.color}
                                  marks={[
                                    { value: 1, label: '1' },
                                    { value: 3, label: '3' },
                                    { value: 5, label: '5' }
                                  ]}
                                />
                              </div>
                            ) : (
                              <div>
                                <div className="flex items-start justify-between mb-2">
                                  <h5 className="font-semibold text-sm">
                                    {lang === 'en' ? factor.titleEn || factor.title : factor.title}
                                  </h5>
                                  <div className="flex items-center gap-2">
                                    <Chip
                                      color={config.color}
                                      variant="flat"
                                      size="sm"
                                    >
                                      {factor.weight}/5
                                    </Chip>
                                    {isEditing && (
                                      <div className="flex gap-1">
                                        <Button
                                          size="sm"
                                          variant="flat"
                                          isIconOnly
                                          onPress={() => setEditingItem(editingItem === factor.id ? null : factor.id)}
                                        >
                                          <Icon icon={editingItem === factor.id ? 'lucide:check' : 'lucide:edit-3'} />
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="flat"
                                          color="danger"
                                          isIconOnly
                                          onPress={() => deleteFactor(factor.id)}
                                        >
                                          <Icon icon="lucide:trash" />
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <p className="text-xs text-default-600">
                                  {lang === 'en' ? factor.descriptionEn || factor.description : factor.description}
                                </p>
                              </div>
                            )}
                          </CardBody>
                        </Card>
                      ))}
                      
                      {factors.length === 0 && (
                        <div className="text-center py-4 text-default-400">
                          <p className="text-sm">
                            {lang === 'zh' ? '暂无因素' : 'No factors yet'}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        )}

        {activeTab === 'strategies' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(STRATEGY_TYPES).map(([type, config]) => {
              const strategies = data.strategies.filter(s => s.type === type);
              
              return (
                <Card key={type}>
                  <CardBody className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold flex items-center gap-2">
                          <Chip color={config.color} variant="flat" size="sm">{type}</Chip>
                          {lang === 'en' ? config.labelEn : config.labelZh}
                        </h4>
                        <p className="text-xs text-default-500 mt-1">
                          {lang === 'en' ? config.descriptionEn : config.description}
                        </p>
                      </div>
                      {isEditing && (
                        <Button
                          size="sm"
                          variant="flat"
                          color={config.color}
                          isIconOnly
                          onPress={() => addStrategy(type)}
                        >
                          <Icon icon="lucide:plus" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-3">
                      {strategies.map((strategy) => (
                        <Card key={strategy.id} className="border">
                          <CardBody className="p-3">
                            {editingItem === strategy.id && isEditing ? (
                              <div className="space-y-3">
                                <Input
                                  label={lang === 'zh' ? '战略标题' : 'Strategy Title'}
                                  value={lang === 'en' ? strategy.titleEn || strategy.title : strategy.title}
                                  onChange={(e) => {
                                    if (lang === 'en') {
                                      updateStrategy(strategy.id, { titleEn: e.target.value });
                                    } else {
                                      updateStrategy(strategy.id, { title: e.target.value });
                                    }
                                  }}
                                  size="sm"
                                />
                                <Textarea
                                  label={lang === 'zh' ? '详细描述' : 'Description'}
                                  value={lang === 'en' ? strategy.descriptionEn || strategy.description : strategy.description}
                                  onChange={(e) => {
                                    if (lang === 'en') {
                                      updateStrategy(strategy.id, { descriptionEn: e.target.value });
                                    } else {
                                      updateStrategy(strategy.id, { description: e.target.value });
                                    }
                                  }}
                                  minRows={2}
                                  size="sm"
                                />
                                <div className="grid grid-cols-2 gap-3">
                                  <Slider
                                    label={lang === 'zh' ? '可行性' : 'Feasibility'}
                                    step={1}
                                    maxValue={5}
                                    minValue={1}
                                    value={strategy.feasibility}
                                    onChange={(value) => updateStrategy(strategy.id, { feasibility: value as number })}
                                    size="sm"
                                    color={config.color}
                                  />
                                  <Slider
                                    label={lang === 'zh' ? '影响力' : 'Impact'}
                                    step={1}
                                    maxValue={5}
                                    minValue={1}
                                    value={strategy.impact}
                                    onChange={(value) => updateStrategy(strategy.id, { impact: value as number })}
                                    size="sm"
                                    color={config.color}
                                  />
                                </div>
                                <Select
                                  label={lang === 'zh' ? '优先级' : 'Priority'}
                                  selectedKeys={[strategy.priority]}
                                  onSelectionChange={(keys) => {
                                    const priority = Array.from(keys)[0] as string;
                                    updateStrategy(strategy.id, { priority: priority as any });
                                  }}
                                  size="sm"
                                >
                                  <SelectItem key="high">{lang === 'zh' ? '高优先级' : 'High Priority'}</SelectItem>
                                  <SelectItem key="medium">{lang === 'zh' ? '中优先级' : 'Medium Priority'}</SelectItem>
                                  <SelectItem key="low">{lang === 'zh' ? '低优先级' : 'Low Priority'}</SelectItem>
                                </Select>
                              </div>
                            ) : (
                              <div>
                                <div className="flex items-start justify-between mb-2">
                                  <h5 className="font-semibold text-sm">
                                    {lang === 'en' ? strategy.titleEn || strategy.title : strategy.title}
                                  </h5>
                                  <div className="flex items-center gap-2">
                                    <Chip
                                      color={getPriorityColor(strategy.priority)}
                                      variant="flat"
                                      size="sm"
                                    >
                                      {getPriorityLabel(strategy.priority)}
                                    </Chip>
                                    {isEditing && (
                                      <div className="flex gap-1">
                                        <Button
                                          size="sm"
                                          variant="flat"
                                          isIconOnly
                                          onPress={() => setEditingItem(editingItem === strategy.id ? null : strategy.id)}
                                        >
                                          <Icon icon={editingItem === strategy.id ? 'lucide:check' : 'lucide:edit-3'} />
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="flat"
                                          color="danger"
                                          isIconOnly
                                          onPress={() => deleteStrategy(strategy.id)}
                                        >
                                          <Icon icon="lucide:trash" />
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <p className="text-xs text-default-600 mb-2">
                                  {lang === 'en' ? strategy.descriptionEn || strategy.description : strategy.description}
                                </p>
                                <div className="flex items-center gap-2">
                                  <Chip variant="flat" size="sm">
                                    {lang === 'zh' ? '可行性' : 'Feasibility'}: {strategy.feasibility}/5
                                  </Chip>
                                  <Chip variant="flat" size="sm">
                                    {lang === 'zh' ? '影响力' : 'Impact'}: {strategy.impact}/5
                                  </Chip>
                                </div>
                              </div>
                            )}
                          </CardBody>
                        </Card>
                      ))}
                      
                      {strategies.length === 0 && (
                        <div className="text-center py-4 text-default-400">
                          <p className="text-sm">
                            {lang === 'zh' ? '暂无战略' : 'No strategies yet'}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </BaseInteractiveLayout>
  );
};

export default SSwotAnalysisDiagram;