import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useI18n } from '../../contexts/I18nContext';

interface TreeNode {
  name: string;
  nameEn: string;
  children?: TreeNode[];
}

const Node: React.FC<{ node: TreeNode; level: number }> = ({ node, level }) => {
  const { lang } = useI18n();
  const [isExpanded, setIsExpanded] = useState(level < 2);

  return (
    <div style={{ marginLeft: level * 20 }}>
      <div className="flex items-center py-1">
        {node.children && (
          <Icon 
            icon={isExpanded ? 'lucide:chevron-down' : 'lucide:chevron-right'} 
            className="cursor-pointer mr-1" 
            onClick={() => setIsExpanded(!isExpanded)} 
          />
        )}
        <span className={`px-2 py-1 rounded ${level === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
          {lang === 'en' ? node.nameEn : node.name}
        </span>
      </div>
      {isExpanded && node.children && (
        <div>
          {node.children.map((child, index) => (
            <Node key={index} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const NorthStarFrameworkDiagram: React.FC = () => {
  const { t } = useI18n();

  const initialData: TreeNode = {
    name: 'Total Listening Time',
    nameEn: 'Total Listening Time',
    children: [
      { 
        name: 'Monthly Active Users',
        nameEn: 'Monthly Active Users',
        children: [
          { name: 'New User Registrations', nameEn: 'New User Registrations' },
          { name: 'User Retention Rate', nameEn: 'User Retention Rate' },
        ]
      },
      { 
        name: 'Listening Time per Session',
        nameEn: 'Listening Time per Session',
        children: [
          { name: 'Playlists Created', nameEn: 'Playlists Created' },
          { name: 'Songs Shared', nameEn: 'Songs Shared' },
        ]
      },
      { 
        name: 'Recommendation CTR',
        nameEn: 'Recommendation CTR',
        children: [
          { name: 'Algorithm Accuracy', nameEn: 'Algorithm Accuracy' },
          { name: 'UI Presentation Optimization', nameEn: 'UI Presentation Optimization' },
        ]
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{t('nsm_diagram_title', '北极星指标树（可折叠）')}</h2>
      <Node node={initialData} level={0} />
    </div>
  );
};

export default NorthStarFrameworkDiagram;
