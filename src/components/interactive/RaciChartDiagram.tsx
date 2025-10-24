import React, { useState } from 'react';
import { useI18n } from '../../contexts/I18nContext';

const RaciChartDiagram: React.FC = () => {
  const { t, lang } = useI18n();

  const initialData = [
    { task: 'Design User Interface', taskEn: 'Design UI', 'UI Designer': 'R', 'Product Manager': 'A', 'Frontend Engineer': 'C', 'Marketing': 'I' },
    { task: 'Develop Backend API', taskEn: 'Develop Backend API', 'UI Designer': '', 'Product Manager': 'A', 'Frontend Engineer': 'R', 'Marketing': '' },
    { task: 'Testing & QA', taskEn: 'Testing & QA', 'UI Designer': 'C', 'Product Manager': 'A', 'Frontend Engineer': 'R', 'Marketing': 'I' },
    { task: 'Write User Documentation', taskEn: 'Write User Docs', 'UI Designer': '', 'Product Manager': 'C', 'Frontend Engineer': '', 'Marketing': 'R' },
  ];

  const [data, setData] = useState(initialData);
  const roles = {
    zh: ['UI Designer', 'Product Manager', 'Frontend Engineer', 'Marketing'],
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
