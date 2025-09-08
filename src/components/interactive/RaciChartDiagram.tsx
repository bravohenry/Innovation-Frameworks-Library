import React, { useState } from 'react';
import { useI18n } from '../../contexts/I18nContext';

const RaciChartDiagram: React.FC = () => {
  const { t, lang } = useI18n();

  const initialData = [
    { task: t('raci_task1_title', '设计用户界面'), taskEn: 'Design UI', 'UI Designer': 'R', 'Product Manager': 'A', 'Frontend Engineer': 'C', 'Marketing': 'I' },
    { task: t('raci_task2_title', '开发后端 API'), taskEn: 'Develop Backend API', 'UI Designer': '', 'Product Manager': 'A', 'Frontend Engineer': 'R', 'Marketing': '' },
    { task: t('raci_task3_title', '测试与品控'), taskEn: 'Testing & QA', 'UI Designer': 'C', 'Product Manager': 'A', 'Frontend Engineer': 'R', 'Marketing': 'I' },
    { task: t('raci_task4_title', '撰写用户文档'), taskEn: 'Write User Docs', 'UI Designer': '', 'Product Manager': 'C', 'Frontend Engineer': '', 'Marketing': 'R' },
  ];

  const [data, setData] = useState(initialData);
  const roles = {
    zh: ['UI 设计师', '产品经理', '前端工程师', '市场部'],
    en: ['UI Designer', 'Product Manager', 'Frontend Engineer', 'Marketing'],
  };

  const handleCellChange = (task: string, role: string, value: string) => {
    setData(data.map(row => row.task === task ? { ...row, [role]: value } : row));
  };

  const currentRoles = lang === 'en' ? roles.en : roles.zh;

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">{t('raci_task_header', '任务')}</th>
              {currentRoles.map(role => <th key={role} scope="col" className="px-6 py-3">{role}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.task} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{lang === 'en' ? row.taskEn : row.task}</th>
                {currentRoles.map(role => (
                  <td 
                    key={role} 
                    className="px-6 py-4"
                    contentEditable
                    onBlur={(e) => handleCellChange(row.task, role, e.currentTarget.textContent || '')}
                    suppressContentEditableWarning={true}
                  >
                    {row[role as keyof typeof row]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RaciChartDiagram;
