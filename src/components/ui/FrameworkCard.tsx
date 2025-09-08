import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter, Chip } from '@heroui/react';
import { Framework, getChapterMeta } from '../../data/frameworks';
import { useI18n } from '../../contexts/I18nContext';

interface FrameworkCardProps {
  framework: Framework;
}

const FrameworkCard: React.FC<FrameworkCardProps> = ({ framework }) => {
  const { lang } = useI18n();
  const meta = getChapterMeta(framework.chapter);
  const subsection = meta?.subsections?.find(s => s.id === framework.subsectionId);
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
            <Chip size="sm" variant="flat" color="default">
              {lang === 'zh' ? `第${framework.chapter}章` : `Chapter ${framework.chapter}`}
            </Chip>
            {(framework.subsectionId || subsection) && (
              <Chip size="sm" variant="flat" color="default">
                {framework.subsectionId} {lang === 'en' ? (subsection?.labelEn || '') : (subsection?.labelZh || '')}
              </Chip>
            )}
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