import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Input, Textarea, Chip, Slider, Progress } from '@heroui/react';
import { Icon } from '@iconify/react';
import BaseInteractiveLayout from './BaseInteractiveLayout';
import { InteractiveComponentProps, TeamDysfunctionData, Dysfunction } from './types';

// Sample data for Five Dysfunctions
const initialDysfunctionData: TeamDysfunctionData = {
  teamName: '产品开发团队',
  teamNameEn: 'Product Development Team',
  assessmentDate: new Date().toISOString().split('T')[0],
  dysfunctions: [
    {
      id: 'trust',
      level: 1,
      labelZh: '缺乏信任',
      labelEn: 'Absence of Trust',
      descriptionZh: '团队成员不愿意展露弱点和错误',
      descriptionEn: 'Team members are reluctant to be vulnerable with one another',
      score: 3,
      symptoms: [
        '会议中保持沉默',
        '避免寻求帮助',
        '不承认错误',
        '互相猜疑'
      ],
      symptomsEn: [
        'Remain silent in meetings',
        'Avoid asking for help',
        'Don\'t admit mistakes',
        'Mutual suspicion'
      ],
      solutions: [
        '分享个人背景和经历',
        '定期团队建设活动',
        '鼓励公开讨论失败',
        '领导者以身作则'
      ],
      solutionsEn: [
        'Share personal backgrounds',
        'Regular team building',
        'Encourage discussing failures',
        'Leader sets example'
      ]
    },
    {
      id: 'conflict',
      level: 2,
      labelZh: '惧怕冲突',
      labelEn: 'Fear of Conflict',
      descriptionZh: '团队避免有益的辩论和争论',
      descriptionEn: 'Teams avoid productive debates and disagreements',
      score: 4,
      symptoms: [
        '人为和谐',
        '避免争议话题',
        '会后私下抱怨',
        '决策缺乏深度讨论'
      ],
      symptomsEn: [
        'Artificial harmony',
        'Avoid controversial topics',
        'Complain privately after meetings',
        'Lack deep discussion in decisions'
      ],
      solutions: [
        '鼓励健康辩论',
        '设立"恶魔代言人"角色',
        '明确冲突规则',
        '庆祝有益的争论'
      ],
      solutionsEn: [
        'Encourage healthy debate',
        'Assign devil\'s advocate role',
        'Establish conflict rules',
        'Celebrate productive arguments'
      ]
    },
    {
      id: 'commitment',
      level: 3,
      labelZh: '缺乏承诺',
      labelEn: 'Lack of Commitment',
      descriptionZh: '团队成员不能全力投入决策和计划',
      descriptionEn: 'Team members don\'t fully commit to decisions and plans',
      score: 2,
      symptoms: [
        '模糊的方向和优先级',
        '无休止的分析和讨论',
        '对决策不确定',
        '错过机会和截止日期'
      ],
      symptomsEn: [
        'Unclear direction and priorities',
        'Endless analysis and discussion',
        'Uncertainty about decisions',
        'Miss opportunities and deadlines'
      ],
      solutions: [
        '明确决策流程',
        '设定具体截止日期',
        '总结会议决定',
        '定期回顾承诺'
      ],
      solutionsEn: [
        'Clear decision process',
        'Set specific deadlines',
        'Summarize meeting decisions',
        'Regular commitment reviews'
      ]
    },
    {
      id: 'accountability',
      level: 4,
      labelZh: '逃避责任',
      labelEn: 'Avoidance of Accountability',
      descriptionZh: '团队成员不愿意互相问责',
      descriptionEn: 'Team members are reluctant to hold each other accountable',
      score: 3,
      symptoms: [
        '低标准和低期望',
        '错过截止日期',
        '团队中的怨恨',
        '鼓励平庸'
      ],
      symptomsEn: [
        'Low standards and expectations',
        'Miss deadlines',
        'Resentment among team',
        'Encourage mediocrity'
      ],
      solutions: [
        '明确团队标准',
        '定期进度审查',
        '同级问责制',
        '庆祝高绩效'
      ],
      solutionsEn: [
        'Clear team standards',
        'Regular progress reviews',
        'Peer accountability',
        'Celebrate high performance'
      ]
    },
    {
      id: 'results',
      level: 5,
      labelZh: '忽视结果',
      labelEn: 'Inattention to Results',
      descriptionZh: '团队成员把个人需求置于集体目标之上',
      descriptionEn: 'Team members put individual needs above collective goals',
      score: 2,
      symptoms: [
        '团队士气低落',
        '个人目标优先',
        '失去成就导向的员工',
        '很难实现目标'
      ],
      symptomsEn: [
        'Low team morale',
        'Individual goals prioritized',
        'Lose achievement-oriented employees',
        'Difficulty achieving goals'
      ],
      solutions: [
        '明确团队目标',
        '公开跟踪结果',
        '奖励集体成就',
        '定期庆祝成功'
      ],
      solutionsEn: [
        'Clear team objectives',
        'Publicly track results',
        'Reward collective achievements',
        'Regular success celebrations'
      ]
    }
  ],
  overallScore: 2.8
};

interface FiveDysfunctionsDiagramProps extends InteractiveComponentProps {}

const FiveDysfunctionsDiagram: React.FC<FiveDysfunctionsDiagramProps> = ({
  lang = 'zh',
  data: initialData,
  onDataChange,
  onExport,
  readOnly = false,
  showExportButtons = true,
  className = ''
}) => {
  const [data, setData] = useState<TeamDysfunctionData>(initialData || initialDysfunctionData);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedDysfunction, setExpandedDysfunction] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  const updateData = (newData: TeamDysfunctionData) => {
    setData(newData);
    onDataChange?.(newData);
  };

  const updateDysfunction = (dysfunctionId: string, updates: Partial<Dysfunction>) => {
    const newData = {
      ...data,
      dysfunctions: data.dysfunctions.map(d =>
        d.id === dysfunctionId ? { ...d, ...updates } : d
      )
    };
    
    // Recalculate overall score
    const avgScore = newData.dysfunctions.reduce((sum, d) => sum + d.score, 0) / newData.dysfunctions.length;
    newData.overallScore = Math.round(avgScore * 10) / 10;
    
    updateData(newData);
  };

  const handleExportData = (type: 'png' | 'csv') => {
    if (type === 'csv') {
      const csvData = data.dysfunctions.map(dysfunction => ({
        Level: dysfunction.level,
        Dysfunction: lang === 'en' ? dysfunction.labelEn : dysfunction.labelZh,
        Score: dysfunction.score,
        Description: lang === 'en' ? dysfunction.descriptionEn : dysfunction.descriptionZh,
        Symptoms: (lang === 'en' ? dysfunction.symptomsEn || dysfunction.symptoms : dysfunction.symptoms)?.join('; '),
        Solutions: (lang === 'en' ? dysfunction.solutionsEn || dysfunction.solutions : dysfunction.solutions)?.join('; ')
      }));
      onExport?.(type, csvData);
    } else {
      onExport?.(type, data);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 4) return 'success';
    if (score >= 3) return 'warning';
    return 'danger';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 4) return lang === 'zh' ? '良好' : 'Good';
    if (score >= 3) return lang === 'zh' ? '一般' : 'Fair';
    return lang === 'zh' ? '需改进' : 'Needs Improvement';
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
      title="团队五大障碍"
      titleEn="Five Dysfunctions of a Team"
      lang={lang}
      onExport={handleExportData}
      showExportButtons={showExportButtons}
      controls={controls}
      className={className}
      data={data}
      pathLabels={{
        chapter: lang === 'zh' ? '第1章' : 'Chapter 1',
        subsection: lang === 'zh' ? '1.1 团队与使命' : '1.1 Team & Mission'
      }}
    >
      <div className="space-y-6" id="five-dysfunctions-diagram">
        {/* Team Information */}
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardBody className="p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <Input
                      label={lang === 'zh' ? '团队名称' : 'Team Name'}
                      value={lang === 'en' ? data.teamNameEn || data.teamName : data.teamName}
                      onChange={(e) => {
                        if (lang === 'en') {
                          updateData({ ...data, teamNameEn: e.target.value });
                        } else {
                          updateData({ ...data, teamName: e.target.value });
                        }
                      }}
                      size="sm"
                    />
                    <Input
                      label={lang === 'zh' ? '评估日期' : 'Assessment Date'}
                      type="date"
                      value={data.assessmentDate}
                      onChange={(e) => updateData({ ...data, assessmentDate: e.target.value })}
                      size="sm"
                    />
                  </div>
                ) : (
                  <div>
                    <h4 className="text-lg font-semibold mb-1">
                      {lang === 'en' ? data.teamNameEn || data.teamName : data.teamName}
                    </h4>
                    <p className="text-sm text-default-600">
                      {lang === 'zh' ? '评估日期: ' : 'Assessment Date: '}{data.assessmentDate}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{data.overallScore}</div>
                  <div className="text-xs text-default-500">{lang === 'zh' ? '总分' : 'Overall'}</div>
                </div>
                <Chip
                  color={getScoreColor(data.overallScore || 0)}
                  variant="flat"
                  size="sm"
                >
                  {getScoreLabel(data.overallScore || 0)}
                </Chip>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Pyramid Visualization */}
        <Card>
          <CardBody className="p-6">
            <h4 className="text-lg font-semibold mb-4">
              {lang === 'zh' ? '团队障碍金字塔' : 'Team Dysfunction Pyramid'}
            </h4>
            <div className="space-y-3">
              {data.dysfunctions.sort((a, b) => b.level - a.level).map((dysfunction, index) => {
                const isExpanded = expandedDysfunction === dysfunction.id;
                const pyramidWidth = `${100 - (index * 15)}%`;
                
                return (
                  <div key={dysfunction.id} className="space-y-2">
                    <Card 
                      isPressable
                      className={`transition-all ${isExpanded ? 'ring-2 ring-primary' : ''}`}
                      style={{ width: pyramidWidth, margin: '0 auto' }}
                      onPress={() => setExpandedDysfunction(isExpanded ? null : dysfunction.id)}
                    >
                      <CardBody className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Chip 
                              color="primary" 
                              variant="flat" 
                              size="sm"
                            >
                              {dysfunction.level}
                            </Chip>
                            <div>
                              <h5 className="font-semibold text-sm">
                                {lang === 'en' ? dysfunction.labelEn : dysfunction.labelZh}
                              </h5>
                              <p className="text-xs text-default-500">
                                {lang === 'en' ? dysfunction.descriptionEn : dysfunction.descriptionZh}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Chip
                              color={getScoreColor(dysfunction.score)}
                              variant="flat"
                              size="sm"
                            >
                              {dysfunction.score}
                            </Chip>
                            <Icon 
                              icon={isExpanded ? 'lucide:chevron-up' : 'lucide:chevron-down'} 
                              className="text-default-400"
                            />
                          </div>
                        </div>
                        
                        {isExpanded && (
                          <div className="mt-4 space-y-4 border-t border-default-200 pt-4">
                            {isEditing && (
                              <Slider
                                label={lang === 'zh' ? '评分' : 'Score'}
                                step={1}
                                maxValue={5}
                                minValue={1}
                                value={dysfunction.score}
                                onChange={(value) => updateDysfunction(dysfunction.id, { score: value as number })}
                                className="max-w-md"
                                color={getScoreColor(dysfunction.score)}
                                marks={[
                                  { value: 1, label: '1' },
                                  { value: 2, label: '2' },
                                  { value: 3, label: '3' },
                                  { value: 4, label: '4' },
                                  { value: 5, label: '5' }
                                ]}
                              />
                            )}
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h6 className="font-medium text-sm mb-2 flex items-center gap-2">
                                  <Icon icon="lucide:alert-triangle" className="text-warning" />
                                  {lang === 'zh' ? '症状表现' : 'Symptoms'}
                                </h6>
                                <div className="space-y-1">
                                  {(lang === 'en' ? dysfunction.symptomsEn || dysfunction.symptoms : dysfunction.symptoms)?.map((symptom, idx) => (
                                    <div key={idx} className="flex items-start gap-2 text-xs">
                                      <Icon icon="lucide:dot" className="text-warning mt-1" />
                                      <span className="text-default-600">{symptom}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <h6 className="font-medium text-sm mb-2 flex items-center gap-2">
                                  <Icon icon="lucide:lightbulb" className="text-success" />
                                  {lang === 'zh' ? '解决方案' : 'Solutions'}
                                </h6>
                                <div className="space-y-1">
                                  {(lang === 'en' ? dysfunction.solutionsEn || dysfunction.solutions : dysfunction.solutions)?.map((solution, idx) => (
                                    <div key={idx} className="flex items-start gap-2 text-xs">
                                      <Icon icon="lucide:check" className="text-success mt-1" />
                                      <span className="text-default-600">{solution}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardBody>
                    </Card>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>

        {/* Progress Overview */}
        <Card>
          <CardBody className="p-4">
            <h4 className="text-lg font-semibold mb-4">
              {lang === 'zh' ? '团队健康度概览' : 'Team Health Overview'}
            </h4>
            <div className="space-y-4">
              {data.dysfunctions.map((dysfunction) => (
                <div key={dysfunction.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      {lang === 'en' ? dysfunction.labelEn : dysfunction.labelZh}
                    </span>
                    <span className="text-sm text-default-500">
                      {dysfunction.score}/5
                    </span>
                  </div>
                  <Progress
                    value={(dysfunction.score / 5) * 100}
                    color={getScoreColor(dysfunction.score)}
                    size="sm"
                    className="max-w-full"
                  />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </BaseInteractiveLayout>
  );
};

export default FiveDysfunctionsDiagram;