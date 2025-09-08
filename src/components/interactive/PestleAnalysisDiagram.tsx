import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Textarea, Chip, Slider, Select, SelectItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import BaseInteractiveLayout from './BaseInteractiveLayout';
import { InteractiveComponentProps, PestleData, PestleFactor } from './types';

// Sample data for PESTLE Analysis
const initialPestleData: PestleData = {
  factors: [
    {
      id: 'political-1',
      dimension: 'political',
      title: '政府政策变化',
      titleEn: 'Government Policy Changes',
      description: '政府对行业监管政策的调整可能影响业务运营',
      descriptionEn: 'Government regulatory policy adjustments may affect business operations',
      impact: 4,
      direction: 'threat',
      timeframe: 'medium',
      probability: 3
    },
    {
      id: 'economic-1',
      dimension: 'economic',
      title: '经济增长放缓',
      titleEn: 'Economic Growth Slowdown',
      description: '宏观经济环境变化影响消费者购买力',
      descriptionEn: 'Macroeconomic changes affect consumer purchasing power',
      impact: 3,
      direction: 'threat',
      timeframe: 'short',
      probability: 4
    },
    {
      id: 'social-1',
      dimension: 'social',
      title: '消费行为数字化',
      titleEn: 'Digital Consumer Behavior',
      description: '消费者越来越倾向于数字化购物体验',
      descriptionEn: 'Consumers increasingly prefer digital shopping experiences',
      impact: 5,
      direction: 'opportunity',
      timeframe: 'short',
      probability: 5
    },
    {
      id: 'technological-1',
      dimension: 'technological',
      title: 'AI技术发展',
      titleEn: 'AI Technology Development',
      description: '人工智能技术的快速发展创造新的商业机会',
      descriptionEn: 'Rapid development of AI technology creates new business opportunities',
      impact: 4,
      direction: 'opportunity',
      timeframe: 'medium',
      probability: 4
    },
    {
      id: 'legal-1',
      dimension: 'legal',
      title: '数据保护法规',
      titleEn: 'Data Protection Regulations',
      description: '严格的数据保护法规增加合规成本',
      descriptionEn: 'Strict data protection regulations increase compliance costs',
      impact: 3,
      direction: 'threat',
      timeframe: 'long',
      probability: 4
    },
    {
      id: 'environmental-1',
      dimension: 'environmental',
      title: '可持续发展需求',
      titleEn: 'Sustainability Requirements',
      description: '消费者和监管机构对环保的要求不断提高',
      descriptionEn: 'Growing environmental requirements from consumers and regulators',
      impact: 3,
      direction: 'opportunity',
      timeframe: 'long',
      probability: 4
    }
  ],
  summary: '该分析显示数字化转型和AI技术发展带来重大机遇，但政策变化和经济环境存在挑战。',
  summaryEn: 'The analysis shows significant opportunities from digital transformation and AI development, but challenges from policy changes and economic environment.'
};

const PESTLE_DIMENSIONS = {
  political: { 
    labelZh: '政治', 
    labelEn: 'Political', 
    icon: 'lucide:landmark',
    color: 'primary'
  },
  economic: { 
    labelZh: '经济', 
    labelEn: 'Economic', 
    icon: 'lucide:trending-up',
    color: 'success'
  },
  social: { 
    labelZh: '社会', 
    labelEn: 'Social', 
    icon: 'lucide:users',
    color: 'secondary'
  },
  technological: { 
    labelZh: '技术', 
    labelEn: 'Technological', 
    icon: 'lucide:cpu',
    color: 'warning'
  },
  legal: { 
    labelZh: '法律', 
    labelEn: 'Legal', 
    icon: 'lucide:scale',
    color: 'danger'
  },
  environmental: { 
    labelZh: '环境', 
    labelEn: 'Environmental', 
    icon: 'lucide:leaf',
    color: 'success'
  }
} as const;

interface PestleAnalysisDiagramProps extends InteractiveComponentProps {}

const PestleAnalysisDiagram: React.FC<PestleAnalysisDiagramProps> = ({
  lang = 'zh',
  data: initialData,
  onDataChange,
  onExport,
  readOnly = false,
  showExportButtons = true,
  className = ''
}) => {
  const [data, setData] = useState<PestleData>(initialData || initialPestleData);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null);
  const [editingFactor, setEditingFactor] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  const updateData = (newData: PestleData) => {
    setData(newData);
    onDataChange?.(newData);
  };

  const addFactor = (dimension: string) => {
    const newFactor: PestleFactor = {
      id: `${dimension}-${Date.now()}`,
      dimension: dimension as any,
      title: lang === 'zh' ? '新因素' : 'New Factor',
      titleEn: 'New Factor',
      description: '',
      descriptionEn: '',
      impact: 3,
      direction: 'neutral',
      timeframe: 'medium',
      probability: 3
    };
    
    updateData({
      ...data,
      factors: [...data.factors, newFactor]
    });
    setEditingFactor(newFactor.id);
  };

  const updateFactor = (factorId: string, updates: Partial<PestleFactor>) => {
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

  const handleExportData = (type: 'png' | 'csv') => {
    if (type === 'csv') {
      const csvData = data.factors.map(factor => ({
        Dimension: lang === 'en' ? PESTLE_DIMENSIONS[factor.dimension].labelEn : PESTLE_DIMENSIONS[factor.dimension].labelZh,
        Factor: lang === 'en' ? factor.titleEn || factor.title : factor.title,
        Description: lang === 'en' ? factor.descriptionEn || factor.description : factor.description,
        Impact: factor.impact,
        Direction: factor.direction,
        Timeframe: factor.timeframe,
        Probability: factor.probability
      }));
      onExport?.(type, csvData);
    } else {
      onExport?.(type, data);
    }
  };

  const getDirectionColor = (direction: string) => {
    switch (direction) {
      case 'opportunity': return 'success';
      case 'threat': return 'danger';
      default: return 'default';
    }
  };

  const getDirectionIcon = (direction: string) => {
    switch (direction) {
      case 'opportunity': return 'lucide:trending-up';
      case 'threat': return 'lucide:trending-down';
      default: return 'lucide:minus';
    }
  };

  const getDirectionLabel = (direction: string) => {
    const labels = {
      opportunity: lang === 'zh' ? '机遇' : 'Opportunity',
      threat: lang === 'zh' ? '威胁' : 'Threat',
      neutral: lang === 'zh' ? '中性' : 'Neutral'
    };
    return labels[direction as keyof typeof labels] || direction;
  };

  const getTimeframeLabel = (timeframe: string) => {
    const labels = {
      short: lang === 'zh' ? '短期' : 'Short-term',
      medium: lang === 'zh' ? '中期' : 'Medium-term',
      long: lang === 'zh' ? '长期' : 'Long-term'
    };
    return labels[timeframe as keyof typeof labels] || timeframe;
  };

  const getDimensionStats = (dimension: string) => {
    const factors = data.factors.filter(f => f.dimension === dimension);
    const avgImpact = factors.reduce((sum, f) => sum + f.impact, 0) / (factors.length || 1);
    const opportunities = factors.filter(f => f.direction === 'opportunity').length;
    const threats = factors.filter(f => f.direction === 'threat').length;
    
    return { factors: factors.length, avgImpact: Math.round(avgImpact * 10) / 10, opportunities, threats };
  };

  const controls = !readOnly && (
    <Button
      size="sm"
      variant={isEditing ? 'solid' : 'flat'}
      color={isEditing ? 'primary' : 'default'}
      startContent={<Icon icon={isEditing ? 'lucide:check' : 'lucide:edit-3'} />}
      onPress={() => {
        setIsEditing(!isEditing);
        setEditingFactor(null);
      }}
    >
      {isEditing ? (lang === 'zh' ? '完成' : 'Done') : (lang === 'zh' ? '编辑' : 'Edit')}
    </Button>
  );

  return (
    <BaseInteractiveLayout
      title="PESTLE分析"
      titleEn="PESTLE Analysis"
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
      <div className="space-y-6" id="pestle-analysis-diagram">
        {/* Overview Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(PESTLE_DIMENSIONS).map(([key, dimension]) => {
            const stats = getDimensionStats(key);
            const isSelected = selectedDimension === key;
            
            return (
              <Card
                key={key}
                isPressable
                className={`transition-all ${isSelected ? 'ring-2 ring-primary scale-105' : ''}`}
                onPress={() => setSelectedDimension(isSelected ? null : key)}
              >
                <CardBody className="p-3 text-center">
                  <Icon
                    icon={dimension.icon}
                    className={`text-2xl mx-auto mb-2 text-${dimension.color}`}
                  />
                  <h5 className="font-semibold text-sm">
                    {lang === 'en' ? dimension.labelEn : dimension.labelZh}
                  </h5>
                  <div className="text-xs text-default-500 mt-1">
                    <div>{stats.factors} {lang === 'zh' ? '因素' : 'factors'}</div>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Icon icon="lucide:trending-up" className="text-success" />
                      <span>{stats.opportunities}</span>
                      <Icon icon="lucide:trending-down" className="text-danger" />
                      <span>{stats.threats}</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>

        {/* Factors by Dimension */}
        {Object.entries(PESTLE_DIMENSIONS).map(([dimensionKey, dimension]) => {
          if (selectedDimension && selectedDimension !== dimensionKey) return null;
          
          const dimensionFactors = data.factors.filter(f => f.dimension === dimensionKey);
          
          return (
            <Card key={dimensionKey}>
              <CardBody className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Icon
                      icon={dimension.icon}
                      className={`text-xl text-${dimension.color}`}
                    />
                    <h4 className="text-lg font-semibold">
                      {lang === 'en' ? dimension.labelEn : dimension.labelZh}
                    </h4>
                    <Chip variant="flat" size="sm">
                      {dimensionFactors.length} {lang === 'zh' ? '个因素' : 'factors'}
                    </Chip>
                  </div>
                  {isEditing && (
                    <Button
                      size="sm"
                      variant="flat"
                      color="primary"
                      startContent={<Icon icon="lucide:plus" />}
                      onPress={() => addFactor(dimensionKey)}
                    >
                      {lang === 'zh' ? '添加因素' : 'Add Factor'}
                    </Button>
                  )}
                </div>

                <div className="space-y-3">
                  {dimensionFactors.map((factor) => (
                    <Card key={factor.id} className="border">
                      <CardBody className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              {editingFactor === factor.id && isEditing ? (
                                <div className="space-y-3">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <Textarea
                                      label={lang === 'zh' ? '因素标题' : 'Factor Title'}
                                      value={lang === 'en' ? factor.titleEn || factor.title : factor.title}
                                      onChange={(e) => {
                                        if (lang === 'en') {
                                          updateFactor(factor.id, { titleEn: e.target.value });
                                        } else {
                                          updateFactor(factor.id, { title: e.target.value });
                                        }
                                      }}
                                      minRows={1}
                                      size="sm"
                                    />
                                    <Textarea
                                      label={lang === 'zh' ? '详细描述' : 'Description'}
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
                                  </div>
                                  
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <div>
                                      <Slider
                                        label={lang === 'zh' ? '影响程度' : 'Impact'}
                                        step={1}
                                        maxValue={5}
                                        minValue={1}
                                        value={factor.impact}
                                        onChange={(value) => updateFactor(factor.id, { impact: value as number })}
                                        size="sm"
                                        marks={[
                                          { value: 1, label: '1' },
                                          { value: 3, label: '3' },
                                          { value: 5, label: '5' }
                                        ]}
                                      />
                                    </div>
                                    
                                    <Select
                                      label={lang === 'zh' ? '影响方向' : 'Direction'}
                                      selectedKeys={[factor.direction]}
                                      onSelectionChange={(keys) => {
                                        const direction = Array.from(keys)[0] as string;
                                        updateFactor(factor.id, { direction: direction as any });
                                      }}
                                      size="sm"
                                    >
                                      <SelectItem key="opportunity">{lang === 'zh' ? '机遇' : 'Opportunity'}</SelectItem>
                                      <SelectItem key="threat">{lang === 'zh' ? '威胁' : 'Threat'}</SelectItem>
                                      <SelectItem key="neutral">{lang === 'zh' ? '中性' : 'Neutral'}</SelectItem>
                                    </Select>
                                    
                                    <Select
                                      label={lang === 'zh' ? '时间框架' : 'Timeframe'}
                                      selectedKeys={[factor.timeframe]}
                                      onSelectionChange={(keys) => {
                                        const timeframe = Array.from(keys)[0] as string;
                                        updateFactor(factor.id, { timeframe: timeframe as any });
                                      }}
                                      size="sm"
                                    >
                                      <SelectItem key="short">{lang === 'zh' ? '短期' : 'Short-term'}</SelectItem>
                                      <SelectItem key="medium">{lang === 'zh' ? '中期' : 'Medium-term'}</SelectItem>
                                      <SelectItem key="long">{lang === 'zh' ? '长期' : 'Long-term'}</SelectItem>
                                    </Select>
                                    
                                    <div>
                                      <Slider
                                        label={lang === 'zh' ? '可能性' : 'Probability'}
                                        step={1}
                                        maxValue={5}
                                        minValue={1}
                                        value={factor.probability}
                                        onChange={(value) => updateFactor(factor.id, { probability: value as number })}
                                        size="sm"
                                        marks={[
                                          { value: 1, label: '1' },
                                          { value: 3, label: '3' },
                                          { value: 5, label: '5' }
                                        ]}
                                      />
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  <h5 className="font-semibold text-sm mb-1">
                                    {lang === 'en' ? factor.titleEn || factor.title : factor.title}
                                  </h5>
                                  <p className="text-xs text-default-600 mb-3">
                                    {lang === 'en' ? factor.descriptionEn || factor.description : factor.description}
                                  </p>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <Chip
                                      color={getDirectionColor(factor.direction)}
                                      variant="flat"
                                      size="sm"
                                      startContent={<Icon icon={getDirectionIcon(factor.direction)} />}
                                    >
                                      {getDirectionLabel(factor.direction)}
                                    </Chip>
                                    <Chip variant="flat" size="sm">
                                      {lang === 'zh' ? '影响' : 'Impact'}: {factor.impact}/5
                                    </Chip>
                                    <Chip variant="flat" size="sm">
                                      {getTimeframeLabel(factor.timeframe)}
                                    </Chip>
                                    <Chip variant="flat" size="sm">
                                      {lang === 'zh' ? '可能性' : 'Probability'}: {factor.probability}/5
                                    </Chip>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            {isEditing && (
                              <div className="flex items-center gap-2 ml-3">
                                <Button
                                  size="sm"
                                  variant="flat"
                                  isIconOnly
                                  onPress={() => setEditingFactor(editingFactor === factor.id ? null : factor.id)}
                                >
                                  <Icon icon={editingFactor === factor.id ? 'lucide:check' : 'lucide:edit-3'} />
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
                      </CardBody>
                    </Card>
                  ))}
                  
                  {dimensionFactors.length === 0 && (
                    <div className="text-center py-8 text-default-400">
                      <Icon icon="lucide:plus-circle" className="text-2xl mb-2 mx-auto" />
                      <p className="text-sm">
                        {lang === 'zh' ? '暂无因素，点击"添加因素"开始' : 'No factors yet, click "Add Factor" to start'}
                      </p>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          );
        })}

        {/* Analysis Summary */}
        {isEditing && (
          <Card>
            <CardBody className="p-4">
              <Textarea
                label={lang === 'zh' ? '分析总结' : 'Analysis Summary'}
                placeholder={lang === 'zh' ? '输入PESTLE分析总结...' : 'Enter PESTLE analysis summary...'}
                value={lang === 'en' ? data.summaryEn || data.summary : data.summary}
                onChange={(e) => {
                  if (lang === 'en') {
                    updateData({ ...data, summaryEn: e.target.value });
                  } else {
                    updateData({ ...data, summary: e.target.value });
                  }
                }}
                minRows={3}
              />
            </CardBody>
          </Card>
        )}
      </div>
    </BaseInteractiveLayout>
  );
};

export default PestleAnalysisDiagram;