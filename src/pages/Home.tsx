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
      <section className="mb-12">
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('home_hero_title')}</h1>
          <p className="text-lg md:text-xl text-default-700 mb-6 max-w-3xl">{t('home_hero_desc')}</p>
          <div className="flex flex-wrap gap-3">
            <Button 
              color="primary" 
              size="lg"
              startContent={<Icon icon="lucide:book-open" />}
              as={Link}
              to={`/chapters/${chapters[0]?.id || '1'}`}
            >
              {t('home_start')}
            </Button>
            <Button 
              variant="flat" 
              size="lg"
              startContent={<Icon icon="lucide:search" />}
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
            startContent={<Icon icon="lucide:search" className="text-default-400" />}
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
      {chapters.map(chapter => {
        const chapterFrameworks = frameworksByChapter[chapter.id] || [];
        if (chapterFrameworks.length === 0) return null;
        
        return (
          <section key={chapter.id} className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {t('chapter_prefix', { n: chapter.id })}: {lang === 'en' ? (chapter.titleEn || chapter.title) : chapter.title}
              </h2>
              <Button 
                as={Link}
                to={`/chapters/${chapter.id}`}
                variant="light"
                color="primary"
                endContent={<Icon icon="lucide:chevron-right" />}
              >
                {t('chapter_view_all')}
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {chapterFrameworks.slice(0, 3).map(framework => (
                <FrameworkCard key={framework.slug} framework={framework} />
              ))}
            </div>
          </section>
        );
      })}
      
      {/* No Results */}
      {Object.values(frameworksByChapter).every(arr => arr.length === 0) && (
        <div className="text-center py-12">
          <Icon icon="lucide:search-x" className="text-default-300 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">{t('search_no_result')}</h3>
          <p className="text-default-500 mb-6">{t('home_browse_all')}</p>
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
  );
};

export default Home;