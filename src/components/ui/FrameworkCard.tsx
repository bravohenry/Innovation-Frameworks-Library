import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Chip } from '@heroui/react';
import { Framework, getChapterMeta } from '../../data/frameworks';
import { useI18n } from '../../contexts/I18nContext';

interface FrameworkCardProps {
  framework: Framework;
}

const FrameworkCard: React.FC<FrameworkCardProps> = ({ framework }) => {
  const { lang, t } = useI18n();
  const meta = getChapterMeta(framework.chapter);
  const subsection = meta?.subsections?.find(s => s.id === framework.subsectionId);
  
  const oneLineDef = lang === 'zh' ? framework.oneLineDef : (framework.oneLineDefEn || framework.oneLineDef);
  const coreSteps = lang === 'zh' ? framework.coreSteps : (framework.coreStepsEn || framework.coreSteps);
  const tags = lang === 'en' ? (framework.tagsEn && framework.tagsEn.length ? framework.tagsEn : framework.tags) : framework.tags;
  
  const displayTags = tags.slice(0, 3);
  const stepsPreview = coreSteps ? coreSteps.slice(0, 3) : [];
  
  return (
    <Link to={`/frameworks/${framework.slug}`} className="block w-full h-full">
      <Card 
        isPressable
        className="framework-card w-full h-full border-none shadow-none bg-neutral-100 hover:bg-primary-50 transition-colors flex flex-col"
      >
        <CardBody className="p-4 flex flex-col gap-3 h-full">
          <div className="flex items-center gap-2 flex-wrap">
            <Chip size="sm" variant="flat" className="bg-primary-50 text-primary-700">
              {lang === 'zh' ? `第${framework.chapter}章` : `Ch.${framework.chapter}`}
            </Chip>
            {displayTags.slice(0, 2).map((tag, index) => (
              <Chip key={index} size="sm" variant="flat" className="bg-neutral-100 text-neutral-900">
                {tag}
              </Chip>
            ))}
          </div>
          
          <div className="flex flex-col gap-2 flex-1">
            <h3 className="text-xl font-bold text-neutral-900 leading-tight">
              {lang === 'zh' ? framework.title : framework.englishTitle}
            </h3>
            
            {oneLineDef && (
              <p className="text-xs text-neutral-400 italic leading-relaxed">
                {oneLineDef}
              </p>
            )}
            
            {stepsPreview.length > 0 && (
              <div className="flex flex-col gap-2 mt-2">
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  {lang === 'zh' ? '核心步骤' : 'Core Steps'}
                </p>
                <ul className="text-xs text-neutral-900 flex flex-col gap-1">
                  {stepsPreview.map((step, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary-500 font-bold flex-shrink-0">{index + 1}.</span>
                      <span className="line-clamp-1 leading-relaxed">{step}</span>
                    </li>
                  ))}
                  {coreSteps && coreSteps.length > 3 && (
                    <li className="text-xs text-neutral-400 italic mt-1">
                      {lang === 'zh' ? `+${coreSteps.length - 3}个步骤` : `+${coreSteps.length - 3} more`}
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
          
          <div className="w-full text-left text-primary-700 text-sm font-medium underline underline-offset-2 mt-auto">
            {lang === 'zh' ? '查看详情' : 'View Details'}
          </div>
        </CardBody>
      </Card>
    </Link>
  );
};

export default FrameworkCard;
