import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { getAllFrameworks, getAllChapters, Framework } from '../data/frameworks';
import FrameworkCard from '../components/ui/FrameworkCard';
import { useI18n } from '../contexts/I18nContext';

const Home: React.FC = () => {
  const { t, lang } = useI18n();
  const frameworks = getAllFrameworks();
  const chapters = getAllChapters();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Extract all unique tags
  const allTags = Array.from(
    new Set(frameworks.flatMap(framework => (lang === 'en' ? (framework.tagsEn && framework.tagsEn.length ? framework.tagsEn : framework.tags) : framework.tags)))
  ).sort();
  
  // Filter frameworks based on search query and selected tags
  const filteredFrameworks = frameworks.filter(framework => {
    const matchesSearch = searchQuery === '' || 
      framework.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      framework.englishTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      framework.summary.toLowerCase().includes(searchQuery.toLowerCase());
    
    const tagSource = lang === 'en' ? (framework.tagsEn && framework.tagsEn.length ? framework.tagsEn : framework.tags) : framework.tags;
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => tagSource.includes(tag));
    
    return matchesSearch && matchesTags;
  });
  
  // Group frameworks by chapter
  const frameworksByChapter = chapters.reduce((acc, chapter) => {
    acc[chapter.id] = filteredFrameworks.filter(f => f.chapter === chapter.id);
    return acc;
  }, {} as Record<string, Framework[]>);
  
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="mb-8">
        <div className="bg-primary-50 rounded-lg p-6">
          <h1 className="text-4xl font-bold text-neutral-900 mb-3 leading-tight">{t('home_hero_title')}</h1>
          
          {/* Three Value Points */}
          <ul className="flex flex-col gap-2 mb-6 max-w-3xl">
            <li className="flex items-start gap-2">
              <Icon icon="lucide:check-circle" className="text-primary-500 text-lg mt-1 flex-shrink-0" />
              <span className="text-base text-neutral-900 font-medium">{t('home_value_1')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon="lucide:check-circle" className="text-primary-500 text-lg mt-1 flex-shrink-0" />
              <span className="text-base text-neutral-900 font-medium">{t('home_value_2')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon="lucide:check-circle" className="text-primary-500 text-lg mt-1 flex-shrink-0" />
              <span className="text-base text-neutral-900 font-medium">{t('home_value_3')}</span>
            </li>
          </ul>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button 
              color="primary" 
              size="lg"
              endContent={<Icon icon="lucide:arrow-right" />}
              as="a"
              href="#frameworks"
            >
              {t('home_start')}
            </Button>
            <Button 
              variant="flat" 
              size="lg"
              as="a"
              href="/templates"
            >
              {t('home_browse_all')}
            </Button>
          </div>
        </div>
      </section>
      
      {/* Search and Filter */}
      <section className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <Input
            placeholder={t('search_placeholder')}
            value={searchQuery}
            onValueChange={setSearchQuery}
            startContent={<Icon icon="lucide:search" className="text-neutral-400" />}
            className="w-full md:w-80"
          />
          <div className="flex-1 overflow-x-auto pb-2">
            <div className="flex gap-2 flex-nowrap min-w-max">
              {allTags.map(tag => (
                <Chip 
                  key={tag}
                  color={selectedTags.includes(tag) ? "primary" : "default"}
                  variant={selectedTags.includes(tag) ? "solid" : "flat"}
                  onClick={() => toggleTag(tag)}
                  className="cursor-pointer"
                >
                  {tag}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Frameworks by Chapter */}
      <div id="frameworks">
      {chapters.map(chapter => {
        const chapterFrameworks = frameworksByChapter[chapter.id] || [];
        if (chapterFrameworks.length === 0) return null;
        
        return (
          <section key={chapter.id} className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-neutral-900">
                {t('chapter_prefix', { n: chapter.id })}: {lang === 'en' ? (chapter.titleEn || chapter.title) : chapter.title}
              </h2>
              <Button 
                as={Link}
                to={`/chapters/${chapter.id}`}
                variant="light"
                color="primary"
                size="sm"
                endContent={<Icon icon="lucide:chevron-right" />}
              >
                {t('chapter_view_all')}
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
              {chapterFrameworks.slice(0, 3).map(framework => (
                <FrameworkCard key={framework.slug} framework={framework} />
              ))}
            </div>
          </section>
        );
      })}
      
      {/* No Results */}
      {Object.values(frameworksByChapter).every(arr => arr.length === 0) && (
        <div className="text-center py-8">
          <Icon icon="lucide:search-x" className="text-neutral-400 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">{t('search_no_result')}</h3>
          <p className="text-neutral-400 mb-6">{t('home_browse_all')}</p>
          <Button 
            color="primary" 
            variant="flat"
            onPress={() => {
              setSearchQuery('');
              setSelectedTags([]);
            }}
          >
            {t('home_browse_all')}
          </Button>
        </div>
      )}
      </div>
    </div>
  );
};

export default Home;