import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import { searchFrameworks, Framework } from '../data/frameworks';
import { useI18n } from '../contexts/I18nContext';

const SearchBar: React.FC = () => {
  const { t, lang } = useI18n();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Framework[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const handleSearch = (value: string) => {
    setQuery(value);
    
    if (value.trim().length > 1) {
      const searchResults = searchFrameworks(value);
      setResults(searchResults);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleSelectFramework = (slug: string) => {
    history.push(`/frameworks/${slug}`);
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div className="w-full relative">
      <Dropdown isOpen={isOpen && results.length > 0} onOpenChange={setIsOpen}>
        <DropdownTrigger>
          <Input
            placeholder={t('search_placeholder')}
            value={query}
            onValueChange={handleSearch}
            startContent={<Icon icon="lucide:search" className="text-default-400" />}
            classNames={{
              input: "text-sm",
            }}
          />
        </DropdownTrigger>
        <DropdownMenu 
          aria-label={t('search_placeholder')} 
          className="w-full max-h-[300px] overflow-y-auto"
          onAction={(key) => handleSelectFramework(key as string)}
        >
          {results.map((framework) => (
            <DropdownItem key={framework.slug} description={lang === 'en' ? (framework.summaryEn || '') : (framework.summary || '')} textValue={lang === 'en' ? framework.englishTitle : framework.title}>
              <div className="flex flex-col gap-1">
                <p className="font-medium">{lang === 'en' ? framework.englishTitle : framework.title}</p>
                <div className="flex gap-1">
                  {(lang === 'en' ? (framework.tagsEn && framework.tagsEn.length ? framework.tagsEn : framework.tags) : framework.tags).slice(0, 2).map((tag, index) => (
                    <span key={index} className="text-xs bg-default-100 px-1 py-0.5 rounded-sm">
                      {tag}
                    </span>
                  ))}
                  {((lang === 'en' ? (framework.tagsEn && framework.tagsEn.length ? framework.tagsEn : framework.tags) : framework.tags).length > 2) && (
                    <span className="text-xs text-default-400">+{(lang === 'en' ? (framework.tagsEn && framework.tagsEn.length ? framework.tagsEn : framework.tags) : framework.tags).length - 2}</span>
                  )}
                </div>
              </div>
            </DropdownItem>
          ))}
          {results.length === 0 && query.trim().length > 1 && (
            <DropdownItem isDisabled className="text-center opacity-70">
              {t('search_no_result')}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default SearchBar;