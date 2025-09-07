import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter, Chip } from '@heroui/react';
import { Framework } from '../../data/frameworks';
import { useI18n } from '../../contexts/I18nContext';

interface FrameworkCardProps {
  framework: Framework;
}

const FrameworkCard: React.FC<FrameworkCardProps> = ({ framework }) => {
  const { lang } = useI18n();
  return (
    <Card 
      isPressable 
      as={Link} 
      to={`/frameworks/${framework.slug}`}
      className="framework-card h-full"
      disableRipple
    >
      <CardBody className="p-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-default-500">{lang === 'zh' ? `第${framework.chapter}章` : `Chapter ${framework.chapter}`}</span>
            <span className="text-xs text-default-400">•</span>
            <span className="text-xs text-default-500">{lang === 'zh' ? framework.englishTitle : framework.englishTitle}</span>
          </div>
          <h3 className="text-lg font-semibold">{lang === 'zh' ? framework.title : framework.englishTitle}</h3>
          <p className="text-default-600 text-sm line-clamp-3">{lang === 'zh' ? framework.summary : (framework.summaryEn || framework.summary)}</p>
        </div>
      </CardBody>
      <CardFooter className="gap-2 flex-wrap">
        {(lang === 'en' ? (framework.tagsEn && framework.tagsEn.length ? framework.tagsEn : framework.tags) : framework.tags).map((tag, index) => (
          <Chip key={index} size="sm" variant="flat" color="default">
            {tag}
          </Chip>
        ))}
      </CardFooter>
    </Card>
  );
};

export default FrameworkCard;