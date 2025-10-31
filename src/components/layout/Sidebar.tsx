import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, CardBody, Accordion, AccordionItem, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { getAllChapters, getAllFrameworks } from '../../data/frameworks';
import { useI18n } from '../../contexts/I18nContext';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  const { t, lang } = useI18n();
  const chapters = getAllChapters();
  const frameworks = getAllFrameworks();
  
  const frameworksByChapter = chapters.reduce((acc, chapter) => {
    acc[chapter.id] = frameworks.filter(f => f.chapter === chapter.id);
    return acc;
  }, {} as Record<string, typeof frameworks>);

  return (
    <div 
      className={`h-full border-r border-divider bg-content1 hidden md:block overflow-y-auto transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="p-4">
        <div className="mb-4 flex items-center gap-2">
          <Button 
            isIconOnly={isCollapsed}
            as={Link}
            to="/"
            variant="flat"
            color="primary"
            fullWidth={!isCollapsed}
            startContent={<Icon icon="lucide:home" />}
            className={isCollapsed ? "" : "justify-start"}
          >
            {!isCollapsed && t('nav_home')}
          </Button>
          <Button
            isIconOnly
            variant="light"
            onPress={onToggle}
            className="min-w-8 w-8 h-8"
          >
            <Icon icon={isCollapsed ? "lucide:chevron-right" : "lucide:chevron-left"} width={20} />
          </Button>
        </div>
        
        {!isCollapsed ? (
          <Accordion>
            {chapters.map((chapter) => (
              <AccordionItem 
                key={chapter.id} 
                aria-label={`${t('chapter_prefix', { n: chapter.id })}: ${chapter.title}`}
                title={
                  <Link
                    to={`/chapters/${chapter.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex flex-col leading-tight hover:opacity-90"
                  >
                    <span className="text-primary-500 font-medium">{t('chapter_prefix', { n: chapter.id })}</span>
                    <span className="text-neutral-400 text-sm">{lang === 'en' ? (chapter.titleEn || chapter.title) : chapter.title}</span>
                  </Link>
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
        ) : (
          <div className="flex flex-col gap-2">
            {chapters.map((chapter) => (
              <Button
                key={chapter.id}
                as={Link}
                to={`/chapters/${chapter.id}`}
                isIconOnly
                variant="flat"
                color="default"
                className="w-full h-12"
              >
                <span className="text-primary-500 font-bold text-lg">{chapter.id}</span>
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;