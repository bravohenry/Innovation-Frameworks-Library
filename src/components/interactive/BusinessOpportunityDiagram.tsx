import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Textarea, Chip, Input } from '@heroui/react';
import { Icon } from '@iconify/react';
import BaseInteractiveLayout from './BaseInteractiveLayout';
import { InteractiveComponentProps, OpportunityData } from './types';

// Sample data for Business Opportunity Statement
const initialOpportunityData: OpportunityData = {
  who: '25-40岁的职场人士，他们需要在繁忙的工作中保持学习和个人发展',
  whoEn: '25-40 year old working professionals who need to maintain learning and personal development while managing busy careers',
  what: '缺乏时间和个性化的学习路径，导致技能提升停滞和职业发展受阻',
  whatEn: 'Lack of time and personalized learning paths, leading to stagnant skill development and career progression obstacles',
  why: '通过AI驱动的个性化学习平台，提供碎片化时间学习和智能推荐，帮助用户高效提升职场技能',
  whyEn: 'AI-driven personalized learning platform providing micro-learning and intelligent recommendations to help users efficiently develop career skills',
  how: '月活用户超过50万，用户平均学习时长增加200%，70%的用户在6个月内获得职业晋升或加薪',
  howEn: 'Over 500K monthly active users, 200% increase in average learning time, 70% of users receive promotions or raises within 6 months',
  assumptions: [
    '目标用户愿意为个性化学习体验付费',
    'AI推荐算法能够有效提升学习效率',
    '企业用户愿意为员工学习发展买单',
    '移动端学习成为主流学习方式'
  ],
  assumptionsEn: [
    'Target users are willing to pay for personalized learning experiences',
    'AI recommendation algorithms can effectively improve learning efficiency',
    'Enterprise customers will pay for employee learning and development',
    'Mobile learning becomes the mainstream learning method'
  ],
  validationPlan: {
    '用户访谈': '深度访谈50位目标用户，了解学习痛点和付费意愿',
    '原型测试': '开发MVP产品，邀请100位用户进行为期1个月的测试',
    '市场调研': '分析竞争对手定价策略和用户评价',
    '企业试点': '与5家企业合作，测试B2B市场需求'
  },
  validationPlanEn: {
    'User Interviews': 'Conduct in-depth interviews with 50 target users to understand learning pain points and willingness to pay',
    'Prototype Testing': 'Develop MVP product and invite 100 users for 1-month testing',
    'Market Research': 'Analyze competitor pricing strategies and user reviews',
    'Enterprise Pilot': 'Partner with 5 companies to test B2B market demand'
  }
};

interface BusinessOpportunityDiagramProps extends InteractiveComponentProps {}

const BusinessOpportunityDiagram: React.FC<BusinessOpportunityDiagramProps> = ({
  lang = 'zh',
  data: initialData,
  onDataChange,
  onExport,
  readOnly = false,
  showExportButtons = true,
  className = ''
}) => {
  const [data, setData] = useState<OpportunityData>(initialData || initialOpportunityData);
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  const updateData = (newData: OpportunityData) => {
    setData(newData);
    onDataChange?.(newData);
  };

  const addAssumption = () => {
    const newAssumption = lang === 'zh' ? '新假设' : 'New Assumption';
    if (lang === 'en') {
      updateData({
        ...data,
        assumptionsEn: [...(data.assumptionsEn || []), newAssumption]
      });
    } else {
      updateData({
        ...data,
        assumptions: [...data.assumptions, newAssumption]
      });
    }
  };

  const updateAssumption = (index: number, value: string) => {
    if (lang === 'en') {
      const newAssumptions = [...(data.assumptionsEn || [])];
      newAssumptions[index] = value;
      updateData({ ...data, assumptionsEn: newAssumptions });
    } else {
      const newAssumptions = [...data.assumptions];
      newAssumptions[index] = value;
      updateData({ ...data, assumptions: newAssumptions });
    }
  };

  const removeAssumption = (index: number) => {
    if (lang === 'en') {
      const newAssumptions = [...(data.assumptionsEn || [])];
      newAssumptions.splice(index, 1);
      updateData({ ...data, assumptionsEn: newAssumptions });
    } else {
      const newAssumptions = [...data.assumptions];
      newAssumptions.splice(index, 1);
      updateData({ ...data, assumptions: newAssumptions });
    }
  };

  const updateValidationPlan = (key: string, value: string) => {
    if (lang === 'en') {
      updateData({
        ...data,
        validationPlanEn: { ...data.validationPlanEn, [key]: value }
      });
    } else {
      updateData({
        ...data,
        validationPlan: { ...data.validationPlan, [key]: value }
      });
    }
  };

  const addValidationItem = () => {
    const newKey = lang === 'zh' ? '新验证项' : 'New Validation Item';
    const newValue = lang === 'zh' ? '描述验证方法...' : 'Describe validation method...';
    
    if (lang === 'en') {
      updateData({
        ...data,
        validationPlanEn: { ...data.validationPlanEn, [newKey]: newValue }
      });
    } else {
      updateData({
        ...data,
        validationPlan: { ...data.validationPlan, [newKey]: newValue }
      });
    }
  };

  const removeValidationItem = (key: string) => {
    if (lang === 'en') {
      const newPlan = { ...data.validationPlanEn };
      delete newPlan[key];
      updateData({ ...data, validationPlanEn: newPlan });
    } else {
      const newPlan = { ...data.validationPlan };
      delete newPlan[key];
      updateData({ ...data, validationPlan: newPlan });
    }
  };

  const handleExportData = (type: 'png' | 'csv') => {
    if (type === 'csv') {
      const csvData = [
        {
          Section: 'Who',
          Content: lang === 'en' ? data.whoEn || data.who : data.who
        },
        {
          Section: 'What',
          Content: lang === 'en' ? data.whatEn || data.what : data.what
        },
        {
          Section: 'Why',
          Content: lang === 'en' ? data.whyEn || data.why : data.why
        },
        {
          Section: 'How',
          Content: lang === 'en' ? data.howEn || data.how : data.how
        },
        ...((lang === 'en' ? data.assumptionsEn || data.assumptions : data.assumptions) || []).map((assumption, index) => ({
          Section: `Assumption ${index + 1}`,
          Content: assumption
        })),
        ...Object.entries(lang === 'en' ? data.validationPlanEn || data.validationPlan : data.validationPlan).map(([key, value]) => ({
          Section: `Validation: ${key}`,
          Content: value
        }))
      ];
      onExport?.(type, csvData);
    } else {
      onExport?.(type, data);
    }
  };

  const opportunitySections = [
    {
      key: 'who',
      title: lang === 'zh' ? '谁 (WHO)' : 'WHO',
      subtitle: lang === 'zh' ? '目标客户是谁？' : 'Who is the target customer?',
      value: lang === 'en' ? data.whoEn || data.who : data.who,
      placeholder: lang === 'zh' ? '描述你的目标客户群体...' : 'Describe your target customer segment...',
      icon: 'lucide:users',
      color: 'primary'
    },
    {
      key: 'what',
      title: lang === 'zh' ? '什么 (WHAT)' : 'WHAT',
      subtitle: lang === 'zh' ? '核心痛点是什么？' : 'What is the core pain point?',
      value: lang === 'en' ? data.whatEn || data.what : data.what,
      placeholder: lang === 'zh' ? '描述客户面临的主要问题...' : 'Describe the main problem customers face...',
      icon: 'lucide:target',
      color: 'danger'
    },
    {
      key: 'why',
      title: lang === 'zh' ? '为什么 (WHY)' : 'WHY',
      subtitle: lang === 'zh' ? '你的解决方案价值主张？' : 'What is your solution\'s value proposition?',
      value: lang === 'en' ? data.whyEn || data.why : data.why,
      placeholder: lang === 'zh' ? '描述你的解决方案和独特价值...' : 'Describe your solution and unique value...',
      icon: 'lucide:lightbulb',
      color: 'warning'
    },
    {
      key: 'how',
      title: lang === 'zh' ? '如何 (HOW)' : 'HOW',
      subtitle: lang === 'zh' ? '成功的衡量标准？' : 'What are the success metrics?',
      value: lang === 'en' ? data.howEn || data.how : data.how,
      placeholder: lang === 'zh' ? '定义成功的关键指标和目标...' : 'Define key success metrics and targets...',
      icon: 'lucide:trending-up',
      color: 'success'
    }
  ];

  const controls = !readOnly && (
    <Button
      size="sm"
      variant={isEditing ? 'solid' : 'flat'}
      color={isEditing ? 'primary' : 'default'}
      startContent={<Icon icon={isEditing ? 'lucide:check' : 'lucide:edit-3'} />}
      onPress={() => {
        setIsEditing(!isEditing);
        setActiveSection(null);
      }}
    >
      {isEditing ? (lang === 'zh' ? '完成' : 'Done') : (lang === 'zh' ? '编辑' : 'Edit')}
    </Button>
  );

  return (
    <BaseInteractiveLayout
      title="商业机会陈述"
      titleEn="Business Opportunity Statement"
      lang={lang}
      onExport={handleExportData}
      showExportButtons={showExportButtons}
      controls={controls}
      className={className}
      data={data}
      pathLabels={{
        chapter: lang === 'zh' ? '第1章' : 'Chapter 1',
        subsection: lang === 'zh' ? '1.3 机会空间' : '1.3 Opportunity Space'
      }}
    >
      <div className="space-y-6" id="business-opportunity-diagram">
        {/* Main Opportunity Canvas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {opportunitySections.map((section) => (
            <Card 
              key={section.key}
              isPressable={isEditing}
              className={`transition-all h-full ${
                activeSection === section.key ? `ring-2 ring-${section.color}` : ''
              }`}
              onPress={() => isEditing && setActiveSection(activeSection === section.key ? null : section.key)}
            >
              <CardBody className="p-4 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <Icon
                    icon={section.icon}
                    className={`text-xl text-${section.color}`}
                  />
                  <div>
                    <h4 className="text-lg font-semibold">{section.title}</h4>
                    <p className="text-xs text-default-500">{section.subtitle}</p>
                  </div>
                  {isEditing && activeSection === section.key && (
                    <Chip color={section.color} variant="flat" size="sm">
                      {lang === 'zh' ? '编辑中' : 'Editing'}
                    </Chip>
                  )}
                </div>
                
                <div className="flex-1">
                  {isEditing && activeSection === section.key ? (
                    <Textarea
                      value={section.value}
                      onChange={(e) => {
                        const key = section.key as keyof OpportunityData;
                        if (lang === 'en') {
                          const enKey = `${key}En` as keyof OpportunityData;
                          updateData({ ...data, [enKey]: e.target.value });
                        } else {
                          updateData({ ...data, [key]: e.target.value });
                        }
                      }}
                      placeholder={section.placeholder}
                      minRows={4}
                      className="h-full"
                    />
                  ) : (
                    <div className="bg-default-50 rounded-lg p-3 h-full flex items-center">
                      <p className="text-sm text-default-700 leading-relaxed">
                        {section.value || (lang === 'zh' ? '点击编辑添加内容...' : 'Click edit to add content...')}
                      </p>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Key Assumptions */}
        <Card>
          <CardBody className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <Icon icon="lucide:help-circle" className="text-warning" />
                {lang === 'zh' ? '关键假设' : 'Key Assumptions'}
              </h4>
              {isEditing && (
                <Button
                  size="sm"
                  variant="flat"
                  color="warning"
                  startContent={<Icon icon="lucide:plus" />}
                  onPress={addAssumption}
                >
                  {lang === 'zh' ? '添加假设' : 'Add Assumption'}
                </Button>
              )}
            </div>

            <div className="space-y-3">
              {(lang === 'en' ? data.assumptionsEn || data.assumptions : data.assumptions).map((assumption, index) => (
                <Card key={index} className="border">
                  <CardBody className="p-3">
                    <div className="flex items-start gap-3">
                      <Chip color="warning" variant="flat" size="sm">
                        {index + 1}
                      </Chip>
                      <div className="flex-1">
                        {isEditing ? (
                          <Input
                            value={assumption}
                            onChange={(e) => updateAssumption(index, e.target.value)}
                            placeholder={lang === 'zh' ? '输入关键假设...' : 'Enter key assumption...'}
                            size="sm"
                          />
                        ) : (
                          <p className="text-sm text-default-700">{assumption}</p>
                        )}
                      </div>
                      {isEditing && (
                        <Button
                          size="sm"
                          variant="flat"
                          color="danger"
                          isIconOnly
                          onPress={() => removeAssumption(index)}
                        >
                          <Icon icon="lucide:x" />
                        </Button>
                      )}
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Validation Plan */}
        <Card>
          <CardBody className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <Icon icon="lucide:check-circle" className="text-success" />
                {lang === 'zh' ? '验证计划' : 'Validation Plan'}
              </h4>
              {isEditing && (
                <Button
                  size="sm"
                  variant="flat"
                  color="success"
                  startContent={<Icon icon="lucide:plus" />}
                  onPress={addValidationItem}
                >
                  {lang === 'zh' ? '添加验证项' : 'Add Validation Item'}
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(lang === 'en' ? data.validationPlanEn || data.validationPlan : data.validationPlan).map(([key, value]) => (
                <Card key={key} className="border">
                  <CardBody className="p-3">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h5 className="font-semibold text-sm flex items-center gap-2">
                          <Icon icon="lucide:clipboard-check" className="text-success" />
                          {isEditing ? (
                            <Input
                              value={key}
                              onChange={(e) => {
                                // Remove old key and add new one
                                const oldPlan = lang === 'en' ? data.validationPlanEn || data.validationPlan : data.validationPlan;
                                const newPlan = { ...oldPlan };
                                delete newPlan[key];
                                newPlan[e.target.value] = value;
                                
                                if (lang === 'en') {
                                  updateData({ ...data, validationPlanEn: newPlan });
                                } else {
                                  updateData({ ...data, validationPlan: newPlan });
                                }
                              }}
                              size="sm"
                              className="max-w-32"
                            />
                          ) : (
                            key
                          )}
                        </h5>
                        {isEditing && (
                          <Button
                            size="sm"
                            variant="flat"
                            color="danger"
                            isIconOnly
                            onPress={() => removeValidationItem(key)}
                          >
                            <Icon icon="lucide:trash" />
                          </Button>
                        )}
                      </div>
                      
                      {isEditing ? (
                        <Textarea
                          value={value}
                          onChange={(e) => updateValidationPlan(key, e.target.value)}
                          placeholder={lang === 'zh' ? '描述验证方法...' : 'Describe validation method...'}
                          minRows={2}
                          size="sm"
                        />
                      ) : (
                        <p className="text-xs text-default-600">{value}</p>
                      )}
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Summary Export Preview */}
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardBody className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Icon icon="lucide:file-text" className="text-primary" />
              <h4 className="text-lg font-semibold">
                {lang === 'zh' ? '机会陈述摘要' : 'Opportunity Statement Summary'}
              </h4>
            </div>
            <div className="bg-background/50 rounded-lg p-4">
              <p className="text-sm text-default-700 leading-relaxed">
                <strong>{lang === 'zh' ? '目标客户：' : 'Target Customer: '}</strong>
                {lang === 'en' ? data.whoEn || data.who : data.who}
                <br /><br />
                <strong>{lang === 'zh' ? '核心痛点：' : 'Core Pain Point: '}</strong>
                {lang === 'en' ? data.whatEn || data.what : data.what}
                <br /><br />
                <strong>{lang === 'zh' ? '解决方案：' : 'Solution: '}</strong>
                {lang === 'en' ? data.whyEn || data.why : data.why}
                <br /><br />
                <strong>{lang === 'zh' ? '成功指标：' : 'Success Metrics: '}</strong>
                {lang === 'en' ? data.howEn || data.how : data.how}
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </BaseInteractiveLayout>
  );
};

export default BusinessOpportunityDiagram;