import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { getAllFrameworks, getAllChapters, Framework } from '../data/frameworks';
import FrameworkCard from '../components/ui/FrameworkCard';
import DoubleDiamondDiagram from '../components/ui/DoubleDiamondDiagram';
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
        <div className="bg-primary-50 rounded-lg p-8">
          {/* Main Title */}
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 
              className="text-2xl font-semibold text-neutral-700 mb-2"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              {t('home_main_title')}
            </h1>
            <h2 
              className="text-5xl font-bold text-neutral-900"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              {t('home_subtitle')}
            </h2>
          </motion.div>

          {/* Double Diamond Diagram - Full Width */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <DoubleDiamondDiagram />
          </motion.div>
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
          <Button 
            color="primary" 
            variant="flat"
            onPress={() => {
              setSearchQuery('');
              setSelectedTags([]);
            }}
          >
            {lang === 'en' ? 'Clear Filters' : '清除筛选'}
          </Button>
        </div>
      )}
      </div>
    </div>
  );
};

export default Home;