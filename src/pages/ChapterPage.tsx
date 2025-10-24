import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Breadcrumbs, BreadcrumbItem, Chip } from '@heroui/react';
import { useI18n } from '../contexts/I18nContext';
import { Icon } from '@iconify/react';
import { getFrameworksByChapter, getAllChapters, getChapterMeta } from '../data/frameworks';
import FrameworkCard from '../components/ui/FrameworkCard';

interface ParamTypes {
  chapterSlug: string;
}

const ChapterPage: React.FC = () => {
  const { chapterSlug } = useParams<ParamTypes>();
  const { t, lang } = useI18n();
  const frameworks = getFrameworksByChapter(chapterSlug);
  const chapters = getAllChapters();
  const currentChapter = chapters.find(c => c.id === chapterSlug);
  const chapterMeta = currentChapter ? getChapterMeta(currentChapter.id) : undefined;
  
  
  // Navigation between chapters
  const chapterIndex = chapters.findIndex(c => c.id === chapterSlug);
  const prevChapter = chapterIndex > 0 ? chapters[chapterIndex - 1] : null;
  const nextChapter = chapterIndex < chapters.length - 1 ? chapters[chapterIndex + 1] : null;
  
  if (!currentChapter) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <Icon icon="lucide:file-question" className="text-neutral-400 text-6xl mb-4" />
        <h2 className="text-2xl font-semibold mb-2">{t('chapter_not_found')}</h2>
        <p className="text-neutral-400 mb-6">{t('chapter_empty_desc')}</p>
        <Button as={Link} to="/" color="primary">
          {t('go_home')}
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <Breadcrumbs className="mb-6">
        <BreadcrumbItem as={Link} to="/">{t('nav_home')}</BreadcrumbItem>
        <BreadcrumbItem>{t('chapter_prefix', { n: currentChapter.id })}: {lang === 'en' ? (currentChapter.titleEn || currentChapter.title) : currentChapter.title}</BreadcrumbItem>
      </Breadcrumbs>
      
      {/* Chapter Header */}
      <div className="mb-8 bg-neutral-100 rounded-lg p-6">
        <h1 className="text-4xl font-bold mb-4 text-neutral-900 leading-tight">
          {t('chapter_prefix', { n: currentChapter.id })}: {lang === 'en' ? (currentChapter.titleEn || currentChapter.title) : currentChapter.title}
        </h1>
        {/* Chapter Goal & Subsections (统一架构) */}
        {chapterMeta && (
          <div className="flex flex-col gap-3">
            <div>
              <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-2">
                {lang === 'en' ? 'Goal' : '目标'}
              </h3>
              <p className="text-lg font-semibold text-neutral-900">
                {lang === 'en' ? chapterMeta.goalEn : chapterMeta.goalZh}
              </p>
            </div>
            {chapterMeta.descZh && (
              <p className="text-base text-neutral-400 leading-relaxed">
                {lang === 'en' ? (chapterMeta.descEn || '') : chapterMeta.descZh}
              </p>
            )}
            {chapterMeta.subsections && (
              <div className="flex flex-wrap gap-2">
                {chapterMeta.subsections.map((s) => (
                  <Chip key={s.id} variant="flat" size="sm" className="bg-primary-50 text-primary-700">
                    {s.id} {lang === 'en' ? s.labelEn : s.labelZh}
                  </Chip>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Frameworks Grid（按小章节排序） */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
        {frameworks
          .sort((a, b) => {
            const sa = a.subsectionId || '';
            const sb = b.subsectionId || '';
            if (sa && sb) return sa.localeCompare(sb, 'en');
            if (sa) return -1;
            if (sb) return 1;
            return a.title.localeCompare(b.title, 'zh');
          })
          .map(framework => (
          <FrameworkCard key={framework.slug} framework={framework} />
        ))}
      </div>
      
      {/* Empty State */}
      {frameworks.length === 0 && (
        <div className="text-center py-8">
          <Icon icon="lucide:book-x" className="text-neutral-400 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">{t('chapter_empty')}</h3>
          <p className="text-neutral-400 mb-6">{t('chapter_empty_desc')}</p>
          <Button 
            as={Link}
            to="/"
            color="primary" 
            variant="flat"
          >
            {t('go_home')}
          </Button>
        </div>
      )}
      
      {/* Chapter Navigation (Bottom) */}
      <div className="mt-8 flex flex-wrap justify-between">
        {prevChapter && (
          <Button 
            as={Link}
            to={`/chapters/${prevChapter.id}`}
            variant="flat"
            startContent={<Icon icon="lucide:arrow-left" />}
          >
            {t('prev')}: {lang === 'en' ? (prevChapter.titleEn || prevChapter.title) : prevChapter.title}
          </Button>
        )}
        
        <Button 
          as={Link}
          to="/"
          variant="light"
        >
          {t('go_home')}
        </Button>
        
        {nextChapter && (
          <Button 
            as={Link}
            to={`/chapters/${nextChapter.id}`}
            variant="flat"
            endContent={<Icon icon="lucide:arrow-right" />}
          >
            {t('next')}: {lang === 'en' ? (nextChapter.titleEn || nextChapter.title) : nextChapter.title}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChapterPage;