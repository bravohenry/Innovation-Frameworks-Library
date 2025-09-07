import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, CardBody, Accordion, AccordionItem, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { getAllChapters, getAllFrameworks } from '../../data/frameworks';
import { useI18n } from '../../contexts/I18nContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { t, lang } = useI18n();
  const chapters = getAllChapters();
  const frameworks = getAllFrameworks();
  
  // Group frameworks by chapter
  const frameworksByChapter = chapters.reduce((acc, chapter) => {
    acc[chapter.id] = frameworks.filter(f => f.chapter === chapter.id);
    return acc;
  }, {} as Record<string, typeof frameworks>);

  return (
    <div className="w-64 h-full border-r border-divider bg-content1 hidden md:block overflow-y-auto">
      <div className="p-4">
        
        <div className="mb-4">
          <Button 
            as={Link}
            to="/"
            variant="flat"
            color="primary"
            fullWidth
            startContent={<Icon icon="lucide:home" />}
            className="justify-start"
          >
            {t('nav_home')}
          </Button>
        </div>
        
        <Accordion>
          {chapters.map((chapter) => (
            <AccordionItem 
              key={chapter.id} 
              aria-label={`${t('chapter_prefix', { n: chapter.id })}: ${chapter.title}`}
              title={
                <div className="flex flex-col leading-tight">
                  <span className="text-primary font-medium">{t('chapter_prefix', { n: chapter.id })}</span>
                  <span className="text-default-600 text-sm">{lang === 'en' ? (chapter.titleEn || chapter.title) : chapter.title}</span>
                </div>
              }
              
              className="py-1"
            >
              <div className="pl-4 space-y-1">
                {frameworksByChapter[chapter.id]?.map((framework) => (
                  <Button
                    key={framework.slug}
                    as={Link}
                    to={`/frameworks/${framework.slug}`}
                    variant="light"
                    color={location.pathname === `/frameworks/${framework.slug}` ? "primary" : "default"}
                    fullWidth
                    className="justify-start text-sm h-9"
                  >
                    {lang === 'en' ? framework.englishTitle : framework.title}
                  </Button>
                ))}
                <Button
                  as={Link}
                  to={`/chapters/${chapter.id}`}
                  variant="flat"
                  color="default"
                  size="sm"
                  fullWidth
                  className="justify-start mt-2"
                  startContent={<Icon icon="lucide:list" width={14} height={14} />}
                >
                  {t('chapter_view_all')}
                </Button>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Sidebar;