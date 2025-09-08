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
    name: t('nsm_root', '总听歌时长'),
    nameEn: 'Total Listening Time',
    children: [
      { 
        name: t('nsm_driver1', '月活跃用户数'),
        nameEn: 'Monthly Active Users',
        children: [
          { name: t('nsm_sub_driver1_1', '新用户注册数'), nameEn: 'New User Registrations' },
          { name: t('nsm_sub_driver1_2', '用户留存率'), nameEn: 'User Retention Rate' },
        ]
      },
      { 
        name: t('nsm_driver2', '每次会话听歌时长'),
        nameEn: 'Listening Time per Session',
        children: [
          { name: t('nsm_sub_driver2_1', '播放列表创建数'), nameEn: 'Playlists Created' },
          { name: t('nsm_sub_driver2_2', '歌曲分享数'), nameEn: 'Songs Shared' },
        ]
      },
      { 
        name: t('nsm_driver3', '推荐点击率'),
        nameEn: 'Recommendation CTR',
        children: [
          { name: t('nsm_sub_driver3_1', '算法准确率'), nameEn: 'Algorithm Accuracy' },
          { name: t('nsm_sub_driver3_2', 'UI 呈现优化'), nameEn: 'UI Presentation Optimization' },
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
