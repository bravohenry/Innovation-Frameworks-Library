import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Input, Select, SelectItem, Chip, Progress } from '@heroui/react';
import { Icon } from '@iconify/react';
import BaseInteractiveLayout from './BaseInteractiveLayout';
import { InteractiveComponentProps, GanttData, GanttTask } from './types';
import { format, parseISO, differenceInDays, addDays, startOfWeek, endOfWeek } from 'date-fns';

// Sample data for Gantt Chart
const initialGanttData: GanttData = {
  timeRange: {
    start: '2024-01-01',
    end: '2024-06-30'
  },
  tasks: [
    {
      id: 'task-1',
      name: 'Project Kickoff',
      nameEn: 'Project Kickoff',
      startDate: '2024-01-01',
      endDate: '2024-01-15',
      progress: 100,
      owner: 'Project Manager',
      ownerEn: 'Project Manager',
      status: 'completed',
      dependencies: [],
      type: 'milestone',
      description: 'Project kickoff meeting and initial planning',
      descriptionEn: 'Project kickoff meeting and initial planning'
    },
    {
      id: 'task-2',
      name: 'Requirements Analysis',
      nameEn: 'Requirements Analysis',
      startDate: '2024-01-16',
      endDate: '2024-02-15',
      progress: 80,
      owner: 'Product Manager',
      ownerEn: 'Product Manager',
      status: 'in-progress',
      dependencies: ['task-1'],
      type: 'task',
      description: 'Collect and analyze user requirements',
      descriptionEn: 'Collect and analyze user requirements'
    },
    {
      id: 'task-3',
      name: 'System Design',
      nameEn: 'System Design',
      startDate: '2024-02-01',
      endDate: '2024-03-01',
      progress: 60,
      owner: 'System Architect',
      ownerEn: 'Architect',
      status: 'in-progress',
      dependencies: ['task-2'],
      type: 'task',
      description: 'System architecture and technical design',
      descriptionEn: 'System architecture and technical design'
    },
    {
      id: 'task-4',
      name: 'Development Phase 1',
      nameEn: 'Development Phase 1',
      startDate: '2024-03-01',
      endDate: '2024-04-15',
      progress: 30,
      owner: 'Development Team',
      ownerEn: 'Development Team',
      status: 'pending',
      dependencies: ['task-3'],
      type: 'task',
      description: 'Core functionality development',
      descriptionEn: 'Core functionality development'
    },
    {
      id: 'task-5',
      name: 'Testing Phase',
      nameEn: 'Testing Phase',
      startDate: '2024-04-01',
      endDate: '2024-05-15',
      progress: 0,
      owner: 'QA Team',
      ownerEn: 'QA Team',
      status: 'pending',
      dependencies: ['task-4'],
      type: 'task',
      description: 'Functional testing and quality assurance',
      descriptionEn: 'Functional testing and quality assurance'
    },
    {
      id: 'task-6',
      name: 'Project Launch',
      nameEn: 'Project Launch',
      startDate: '2024-05-15',
      endDate: '2024-05-31',
      progress: 0,
      owner: 'DevOps Team',
      ownerEn: 'DevOps Team',
      status: 'pending',
      dependencies: ['task-5'],
      type: 'milestone',
      description: 'System deployment and launch',
      descriptionEn: 'System deployment and launch'
    }
  ],
  milestones: [
    {
      id: 'milestone-1',
      name: 'Requirements Confirmed',
      nameEn: 'Requirements Confirmed',
      startDate: '2024-02-15',
      endDate: '2024-02-15',
      progress: 100,
      owner: 'Project Manager',
      ownerEn: 'Project Manager',
      status: 'completed',
      dependencies: ['task-2'],
      type: 'milestone',
      description: 'Requirements analysis completed and confirmed',
      descriptionEn: 'Requirements analysis completed and confirmed'
    },
    {
      id: 'milestone-2',
      name: 'MVP Release',
      nameEn: 'MVP Release',
      startDate: '2024-04-15',
      endDate: '2024-04-15',
      progress: 0,
      owner: 'Product Manager',
      ownerEn: 'Product Manager',
      status: 'pending',
      dependencies: ['task-4'],
      type: 'milestone',
      description: 'Minimum viable product release',
      descriptionEn: 'Minimum viable product release'
    }
  ]
};

const STATUS_CONFIG = {
  pending: { 
    labelZh: '待开始', 
    labelEn: 'Pending', 
    color: 'default',
    icon: 'lucide:clock'
  },
  'in-progress': { 
    labelZh: '进行中', 
    labelEn: 'In Progress', 
    color: 'primary',
    icon: 'lucide:play'
  },
  completed: { 
    labelZh: '已完成', 
    labelEn: 'Completed', 
    color: 'success',
    icon: 'lucide:check'
  },
  blocked: { 
    labelZh: '被阻塞', 
    labelEn: 'Blocked', 
    color: 'danger',
    icon: 'lucide:alert-circle'
  }
} as const;

interface GanttChartDiagramProps extends InteractiveComponentProps {}

const GanttChartDiagram: React.FC<GanttChartDiagramProps> = ({
  lang = 'zh',
  data: initialData,
  onDataChange,
  onExport,
  readOnly = false,
  showExportButtons = true,
  className = ''
}) => {
  const [data, setData] = useState<GanttData>(initialData || initialGanttData);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  const updateData = (newData: GanttData) => {
    setData(newData);
    onDataChange?.(newData);
  };

  const addTask = () => {
    const newTask: GanttTask = {
      id: `task-${Date.now()}`,
      name: lang === 'zh' ? '新任务' : 'New Task',
      nameEn: 'New Task',
      startDate: format(new Date(), 'yyyy-MM-dd'),
      endDate: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
      progress: 0,
      owner: lang === 'zh' ? '待分配' : 'Unassigned',
      ownerEn: 'Unassigned',
      status: 'pending',
      dependencies: [],
      type: 'task',
      description: '',
      descriptionEn: ''
    };
    
    updateData({
      ...data,
      tasks: [...data.tasks, newTask]
    });
    setSelectedTask(newTask.id);
  };

  const updateTask = (taskId: string, updates: Partial<GanttTask>) => {
    updateData({
      ...data,
      tasks: data.tasks.map(t => t.id === taskId ? { ...t, ...updates } : t)
    });
  };

  const deleteTask = (taskId: string) => {
    updateData({
      ...data,
      tasks: data.tasks.filter(t => t.id !== taskId),
      milestones: data.milestones.filter(m => m.id !== taskId)
    });
  };

  const handleExportData = (type: 'png' | 'csv') => {
    if (type === 'csv') {
      const csvData = [...data.tasks, ...data.milestones].map(task => ({
        Name: lang === 'en' ? task.nameEn || task.name : task.name,
        Type: task.type,
        StartDate: task.startDate,
        EndDate: task.endDate,
        Progress: `${task.progress}%`,
        Owner: lang === 'en' ? task.ownerEn || task.owner : task.owner,
        Status: lang === 'en' ? STATUS_CONFIG[task.status].labelEn : STATUS_CONFIG[task.status].labelZh,
        Dependencies: task.dependencies.join(', '),
        Description: lang === 'en' ? task.descriptionEn || task.description : task.description
      }));
      onExport?.(type, csvData);
    } else {
      onExport?.(type, data);
    }
  };

  // Calculate timeline
  const startDate = parseISO(data.timeRange.start);
  const endDate = parseISO(data.timeRange.end);
  const totalDays = differenceInDays(endDate, startDate);
  
  // Generate timeline markers
  const getTimelineMarkers = () => {
    const markers = [];
    let current = viewMode === 'week' ? startOfWeek(startDate) : startDate;
    
    while (current <= endDate) {
      markers.push(current);
      current = addDays(current, viewMode === 'week' ? 7 : 30);
    }
    
    return markers;
  };

  const getTaskPosition = (task: GanttTask) => {
    const taskStart = parseISO(task.startDate);
    const taskEnd = parseISO(task.endDate);
    const startOffset = differenceInDays(taskStart, startDate);
    const taskDuration = differenceInDays(taskEnd, taskStart);
    
    return {
      left: `${(startOffset / totalDays) * 100}%`,
      width: `${(taskDuration / totalDays) * 100}%`
    };
  };

  const allTasks = [...data.tasks, ...data.milestones].sort((a, b) => 
    parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime()
  );

  const controls = !readOnly && (
    <div className="flex items-center gap-2">
      <Select
        selectedKeys={[viewMode]}
        onSelectionChange={(keys) => setViewMode(Array.from(keys)[0] as 'month' | 'week')}
        size="sm"
        className="w-32"
      >
        <SelectItem key="month">{lang === 'zh' ? '月视图' : 'Month View'}</SelectItem>
        <SelectItem key="week">{lang === 'zh' ? '周视图' : 'Week View'}</SelectItem>
      </Select>
      <Button
        size="sm"
        variant="flat"
        color="primary"
        startContent={<Icon icon="lucide:plus" />}
        onPress={addTask}
      >
        {lang === 'zh' ? '添加任务' : 'Add Task'}
      </Button>
      <Button
        size="sm"
        variant={isEditing ? 'solid' : 'flat'}
        color={isEditing ? 'primary' : 'default'}
        startContent={<Icon icon={isEditing ? 'lucide:check' : 'lucide:edit-3'} />}
        onPress={() => {
          setIsEditing(!isEditing);
          setSelectedTask(null);
        }}
      >
        {isEditing ? (lang === 'zh' ? '完成' : 'Done') : (lang === 'zh' ? '编辑' : 'Edit')}
      </Button>
    </div>
  );

  return (
    <BaseInteractiveLayout
      title="甘特图"
      titleEn="Gantt Chart"
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
      <div className="space-y-6" id="gantt-chart-diagram">
        {/* Project Summary */}
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardBody className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{allTasks.length}</div>
                <div className="text-xs text-default-500">{lang === 'zh' ? '总任务数' : 'Total Tasks'}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">
                  {allTasks.filter(t => t.status === 'completed').length}
                </div>
                <div className="text-xs text-default-500">{lang === 'zh' ? '已完成' : 'Completed'}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">
                  {allTasks.filter(t => t.status === 'in-progress').length}
                </div>
                <div className="text-xs text-default-500">{lang === 'zh' ? '进行中' : 'In Progress'}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-default-400">
                  {Math.round(allTasks.reduce((sum, t) => sum + t.progress, 0) / allTasks.length)}%
                </div>
                <div className="text-xs text-default-500">{lang === 'zh' ? '整体进度' : 'Overall Progress'}</div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Gantt Chart Visualization */}
        <Card>
          <CardBody className="p-0">
            <div className="overflow-x-auto">
              {/* Timeline Header */}
              <div className="flex bg-default-50 border-b min-w-max">
                <div className="w-64 p-3 border-r bg-background">
                  <h5 className="font-semibold text-sm">
                    {lang === 'zh' ? '任务名称' : 'Task Name'}
                  </h5>
                </div>
                <div className="flex-1 relative" style={{ minWidth: '800px' }}>
                  <div className="flex h-12 items-center">
                    {getTimelineMarkers().map((date, index) => (
                      <div 
                        key={index}
                        className="border-r px-2 text-xs text-center flex-1"
                        style={{ 
                          minWidth: viewMode === 'week' ? '80px' : '100px'
                        }}
                      >
                        <div className="font-medium">
                          {format(date, lang === 'zh' ? 'MM月' : 'MMM')}
                        </div>
                        <div className="text-default-500">
                          {format(date, viewMode === 'week' ? 'dd' : 'yyyy')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Task Rows */}
              <div className="min-w-max">
                {allTasks.map((task) => (
                  <div key={task.id} className="flex border-b hover:bg-default-50">
                    {/* Task Info */}
                    <div className="w-64 p-3 border-r bg-background">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Icon 
                            icon={task.type === 'milestone' ? 'lucide:flag' : 'lucide:square'} 
                            className={`text-sm ${task.type === 'milestone' ? 'text-warning' : 'text-primary'}`}
                          />
                          <span className="font-medium text-sm truncate">
                            {lang === 'en' ? task.nameEn || task.name : task.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Chip
                            color={STATUS_CONFIG[task.status].color}
                            variant="flat"
                            size="sm"
                            startContent={<Icon icon={STATUS_CONFIG[task.status].icon} />}
                          >
                            {lang === 'en' ? STATUS_CONFIG[task.status].labelEn : STATUS_CONFIG[task.status].labelZh}
                          </Chip>
                          {task.progress > 0 && (
                            <span className="text-xs text-default-500">{task.progress}%</span>
                          )}
                        </div>
                        <div className="text-xs text-default-500">
                          {lang === 'en' ? task.ownerEn || task.owner : task.owner}
                        </div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="flex-1 relative p-2" style={{ minWidth: '800px', height: '80px' }}>
                      {/* Task Bar */}
                      <div
                        className={`absolute top-1/2 transform -translate-y-1/2 h-6 rounded flex items-center px-2 ${
                          task.type === 'milestone'
                            ? 'bg-warning/20 border-2 border-warning'
                            : task.status === 'completed'
                            ? 'bg-success/20 border border-success'
                            : task.status === 'in-progress'
                            ? 'bg-primary/20 border border-primary'
                            : 'bg-default-200 border border-default-300'
                        }`}
                        style={getTaskPosition(task)}
                      >
                        {/* Progress Bar */}
                        {task.progress > 0 && task.type !== 'milestone' && (
                          <div
                            className={`absolute left-0 top-0 h-full rounded-l ${
                              task.status === 'completed' ? 'bg-success' :
                              task.status === 'in-progress' ? 'bg-primary' : 'bg-default-400'
                            }`}
                            style={{ width: `${task.progress}%` }}
                          />
                        )}
                        
                        {/* Task Label */}
                        <span className="text-xs font-medium text-default-700 relative z-10">
                          {task.type === 'milestone' ? '◆' : format(parseISO(task.startDate), 'MM/dd')}
                        </span>
                      </div>

                      {/* Dependencies Lines */}
                      {task.dependencies.map((depId) => {
                        const depTask = allTasks.find(t => t.id === depId);
                        if (!depTask) return null;
                        
                        return (
                          <div
                            key={depId}
                            className="absolute top-1/2 h-0.5 bg-default-300"
                            style={{
                              left: `${(differenceInDays(parseISO(depTask.endDate), startDate) / totalDays) * 100}%`,
                              width: `${(differenceInDays(parseISO(task.startDate), parseISO(depTask.endDate)) / totalDays) * 100}%`,
                              transform: 'translateY(-50%)'
                            }}
                          />
                        );
                      })}
                    </div>

                    {/* Actions */}
                    {isEditing && (
                      <div className="w-16 p-2 border-l flex flex-col gap-1">
                        <Button
                          size="sm"
                          variant="flat"
                          isIconOnly
                          onPress={() => setSelectedTask(selectedTask === task.id ? null : task.id)}
                        >
                          <Icon icon="lucide:edit-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="flat"
                          color="danger"
                          isIconOnly
                          onPress={() => deleteTask(task.id)}
                        >
                          <Icon icon="lucide:trash" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Task Editor */}
        {isEditing && selectedTask && (
          <Card>
            <CardBody className="p-4">
              {(() => {
                const task = allTasks.find(t => t.id === selectedTask);
                if (!task) return null;
                
                return (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold flex items-center gap-2">
                      <Icon icon="lucide:edit-3" className="text-primary" />
                      {lang === 'zh' ? '编辑任务' : 'Edit Task'}
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label={lang === 'zh' ? '任务名称' : 'Task Name'}
                        value={lang === 'en' ? task.nameEn || task.name : task.name}
                        onChange={(e) => {
                          if (lang === 'en') {
                            updateTask(task.id, { nameEn: e.target.value });
                          } else {
                            updateTask(task.id, { name: e.target.value });
                          }
                        }}
                        size="sm"
                      />
                      
                      <Input
                        label={lang === 'zh' ? '负责人' : 'Owner'}
                        value={lang === 'en' ? task.ownerEn || task.owner : task.owner}
                        onChange={(e) => {
                          if (lang === 'en') {
                            updateTask(task.id, { ownerEn: e.target.value });
                          } else {
                            updateTask(task.id, { owner: e.target.value });
                          }
                        }}
                        size="sm"
                      />
                      
                      <Input
                        label={lang === 'zh' ? '开始日期' : 'Start Date'}
                        type="date"
                        value={task.startDate}
                        onChange={(e) => updateTask(task.id, { startDate: e.target.value })}
                        size="sm"
                      />
                      
                      <Input
                        label={lang === 'zh' ? '结束日期' : 'End Date'}
                        type="date"
                        value={task.endDate}
                        onChange={(e) => updateTask(task.id, { endDate: e.target.value })}
                        size="sm"
                      />
                      
                      <Select
                        label={lang === 'zh' ? '状态' : 'Status'}
                        selectedKeys={[task.status]}
                        onSelectionChange={(keys) => {
                          const status = Array.from(keys)[0] as string;
                          updateTask(task.id, { status: status as any });
                        }}
                        size="sm"
                      >
                        {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                          <SelectItem key={key}>
                            {lang === 'en' ? config.labelEn : config.labelZh}
                          </SelectItem>
                        ))}
                      </Select>
                      
                      <Input
                        label={lang === 'zh' ? '进度 (%)' : 'Progress (%)'}
                        type="number"
                        min={0}
                        max={100}
                        value={task.progress.toString()}
                        onChange={(e) => updateTask(task.id, { progress: parseInt(e.target.value) || 0 })}
                        size="sm"
                      />
                    </div>
                  </div>
                );
              })()}
            </CardBody>
          </Card>
        )}
      </div>
    </BaseInteractiveLayout>
  );
};

export default GanttChartDiagram;