import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Input, Textarea, Chip, Slider, Select, SelectItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import BaseInteractiveLayout from './BaseInteractiveLayout';
import { InteractiveComponentProps, PorterData, ForceData } from './types';

// Sample data for Porter's Five Forces
const initialPorterData: PorterData = {
  forces: [
    {
      key: 'rivalry',
      labelZh: '现有竞争者竞争',
      labelEn: 'Competitive Rivalry',
      weight: 3,
      description: '现有企业间的竞争强度',
      descriptionEn: 'Intensity of competition among existing players',
      factors: ['竞争者数量', '产品差异化', '转换成本', '退出壁垒'],
      factorsEn: ['Number of competitors', 'Product differentiation', 'Switching costs', 'Exit barriers']
    },
    {
      key: 'suppliers',
      labelZh: '供应商议价能力',
      labelEn: 'Supplier Power',
      weight: 2,
      description: '供应商对价格和条款的控制力',
      descriptionEn: 'Suppliers\' control over pricing and terms',
      factors: ['供应商集中度', '替代投入品', '前向整合威胁', '行业重要性'],
      factorsEn: ['Supplier concentration', 'Substitute inputs', 'Forward integration threat', 'Industry importance']
    },
    {
      key: 'buyers',
      labelZh: '买方议价能力',
      labelEn: 'Buyer Power',
      weight: 4,
      description: '客户对价格和条款的议价能力',
      descriptionEn: 'Customers\' bargaining power over prices and terms',
      factors: ['买方集中度', '购买量', '产品标准化', '后向整合威胁'],
      factorsEn: ['Buyer concentration', 'Purchase volume', 'Product standardization', 'Backward integration threat']
    },
    {
      key: 'substitutes',
      labelZh: '替代品威胁',
      labelEn: 'Threat of Substitutes',
      weight: 3,
      description: '替代产品或服务的威胁程度',
      descriptionEn: 'Threat level from alternative products or services',
      factors: ['替代品性能', '价格优势', '转换成本', '客户偏好'],
      factorsEn: ['Substitute performance', 'Price advantage', 'Switching costs', 'Customer preference']
    },
    {
      key: 'entrants',
      labelZh: '新进入者威胁',
      labelEn: 'Threat of New Entrants',
      weight: 2,
      description: '新竞争者进入市场的可能性',
      descriptionEn: 'Likelihood of new competitors entering the market',
      factors: ['进入壁垒', '规模经济', '资本需求', '政府政策'],
      factorsEn: ['Entry barriers', 'Economies of scale', 'Capital requirements', 'Government policy']
    }
  ],
  overallRating: 2.8,
  summary: '该行业竞争激烈，买方议价能力较强，但进入壁垒相对较高。',
  summaryEn: 'The industry is highly competitive with strong buyer power, but entry barriers are relatively high.'
};

interface PortersFiveForcesDiagramProps extends InteractiveComponentProps {}

const PortersFiveForcesDiagram: React.FC<PortersFiveForcesDiagramProps> = ({
  lang = 'zh',
  data: initialData,
  onDataChange,
  onExport,
  readOnly = false,
  showExportButtons = true,
  className = ''
}) => {
  const [data, setData] = useState<PorterData>(initialData || initialPorterData);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedForce, setSelectedForce] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  const updateData = (newData: PorterData) => {
    setData(newData);
    onDataChange?.(newData);
  };

  const updateForce = (forceKey: string, updates: Partial<ForceData>) => {
    const newData = {
      ...data,
      forces: data.forces.map(force =>
        force.key === forceKey ? { ...force, ...updates } : force
      )
    };
    
    // Recalculate overall rating
    const avgWeight = newData.forces.reduce((sum, f) => sum + f.weight, 0) / newData.forces.length;
    newData.overallRating = Math.round(avgWeight * 10) / 10;
    
    updateData(newData);
  };

  const handleExportData = (type: 'png' | 'csv') => {
    if (type === 'csv') {
      const csvData = data.forces.map(force => ({
        Force: lang === 'en' ? force.labelEn : force.labelZh,
        Weight: force.weight,
        Description: lang === 'en' ? force.descriptionEn || force.description : force.description,
        Factors: (lang === 'en' ? force.factorsEn || force.factors : force.factors)?.join('; ')
      }));
      onExport?.(type, csvData);
    } else {
      onExport?.(type, data);
    }
  };

  const getForceColor = (weight: number) => {
    if (weight >= 4) return 'danger';
    if (weight >= 3) return 'warning';
    return 'success';
  };

  const getIntensityLabel = (weight: number) => {
    if (weight >= 4) return lang === 'zh' ? '高威胁' : 'High Threat';
    if (weight >= 3) return lang === 'zh' ? '中威胁' : 'Medium Threat';
    return lang === 'zh' ? '低威胁' : 'Low Threat';
  };

  const controls = !readOnly && (
    <Button
      size="sm"
      variant={isEditing ? 'solid' : 'flat'}
      color={isEditing ? 'primary' : 'default'}
      startContent={<Icon icon={isEditing ? 'lucide:check' : 'lucide:edit-3'} />}
      onPress={() => setIsEditing(!isEditing)}
    >
      {isEditing ? (lang === 'zh' ? '完成' : 'Done') : (lang === 'zh' ? '编辑' : 'Edit')}
    </Button>
  );

  return (
    <BaseInteractiveLayout
      title="波特五力分析"
      titleEn="Porter's Five Forces Analysis"
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
      <div className="space-y-6">
        {/* Overall Assessment */}
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardBody className="p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h4 className="text-lg font-semibold mb-2">
                  {lang === 'zh' ? '整体行业吸引力' : 'Overall Industry Attractiveness'}
                </h4>
                <p className="text-sm text-default-600">
                  {lang === 'en' ? data.summaryEn || data.summary : data.summary}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{data.overallRating}</div>
                  <div className="text-xs text-default-500">{lang === 'zh' ? '平均分' : 'Average'}</div>
                </div>
                <Chip
                  color={getForceColor(data.overallRating || 0)}
                  variant="flat"
                  size="sm"
                >
                  {getIntensityLabel(data.overallRating || 0)}
                </Chip>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Forces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.forces.map((force) => (
            <Card 
              key={force.key} 
              isPressable={isEditing}
              className={`transition-all ${selectedForce === force.key ? 'ring-2 ring-primary' : ''}`}
              onPress={() => isEditing && setSelectedForce(selectedForce === force.key ? null : force.key)}
            >
              <CardBody className="p-4">
                <div className="space-y-4">
                  {/* Force Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h5 className="font-semibold text-sm mb-1">
                        {lang === 'en' ? force.labelEn : force.labelZh}
                      </h5>
                      <p className="text-xs text-default-500 line-clamp-2">
                        {lang === 'en' ? force.descriptionEn || force.description : force.description}
                      </p>
                    </div>
                    <Chip
                      color={getForceColor(force.weight)}
                      variant="flat"
                      size="sm"
                      className="ml-2"
                    >
                      {force.weight}
                    </Chip>
                  </div>

                  {/* Weight Slider */}
                  {isEditing && selectedForce === force.key ? (
                    <div className="space-y-3">
                      <Slider
                        label={lang === 'zh' ? '威胁程度' : 'Threat Level'}
                        step={1}
                        maxValue={5}
                        minValue={1}
                        value={force.weight}
                        onChange={(value) => updateForce(force.key, { weight: value as number })}
                        className="max-w-md"
                        color={getForceColor(force.weight)}
                        marks={[
                          { value: 1, label: '1' },
                          { value: 2, label: '2' },
                          { value: 3, label: '3' },
                          { value: 4, label: '4' },
                          { value: 5, label: '5' }
                        ]}
                      />
                      <Textarea
                        label={lang === 'zh' ? '关键因素' : 'Key Factors'}
                        placeholder={lang === 'zh' ? '输入影响因素...' : 'Enter influencing factors...'}
                        value={(lang === 'en' ? force.factorsEn || force.factors : force.factors)?.join('\n')}
                        onChange={(e) => {
                          const factors = e.target.value.split('\n').filter(f => f.trim());
                          if (lang === 'en') {
                            updateForce(force.key, { factorsEn: factors });
                          } else {
                            updateForce(force.key, { factors });
                          }
                        }}
                        minRows={3}
                        size="sm"
                      />
                    </div>
                  ) : (
                    <div>
                      {/* Factors List */}
                      <div className="space-y-1">
                        {(lang === 'en' ? force.factorsEn || force.factors : force.factors)?.slice(0, 3).map((factor, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs">
                            <Icon icon="lucide:dot" className="text-default-400" />
                            <span className="text-default-600">{factor}</span>
                          </div>
                        ))}
                        {((lang === 'en' ? force.factorsEn || force.factors : force.factors)?.length || 0) > 3 && (
                          <div className="text-xs text-default-400">
                            +{((lang === 'en' ? force.factorsEn || force.factors : force.factors)?.length || 0) - 3} {lang === 'zh' ? '更多' : 'more'}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Radar Chart Visualization */}
        <Card>
          <CardBody className="p-6">
            <h4 className="text-lg font-semibold mb-4">
              {lang === 'zh' ? '五力雷达图' : 'Five Forces Radar'}
            </h4>
            <div className="flex items-center justify-center h-64 bg-default-50 rounded-lg">
              <div className="text-center space-y-2">
                <Icon icon="lucide:radar" className="text-4xl text-default-300 mx-auto" />
                <p className="text-default-500">
                  {lang === 'zh' ? '雷达图可视化' : 'Radar Chart Visualization'}
                </p>
                <p className="text-xs text-default-400">
                  {lang === 'zh' ? '集成图表库后显示' : 'Shows when chart library integrated'}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Analysis Summary */}
        {isEditing && (
          <Card>
            <CardBody className="p-4">
              <Textarea
                label={lang === 'zh' ? '分析总结' : 'Analysis Summary'}
                placeholder={lang === 'zh' ? '输入行业分析总结...' : 'Enter industry analysis summary...'}
                value={lang === 'en' ? data.summaryEn || data.summary : data.summary}
                onChange={(e) => {
                  if (lang === 'en') {
                    updateData({ ...data, summaryEn: e.target.value });
                  } else {
                    updateData({ ...data, summary: e.target.value });
                  }
                }}
                minRows={2}
              />
            </CardBody>
          </Card>
        )}
      </div>
    </BaseInteractiveLayout>
  );
};

export default PortersFiveForcesDiagram;