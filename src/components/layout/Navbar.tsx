import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Navbar as HeroNavbar, NavbarBrand, NavbarContent, Button, NavbarItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { useI18n } from '../../contexts/I18nContext';
import SearchBar from '../SearchBar';

const Navbar: React.FC = () => {
  const { t, lang, setLang } = useI18n();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <HeroNavbar maxWidth="full" className="border-b border-divider">
      <NavbarBrand as={RouterLink} to="/" className="gap-2">
        <Icon icon="lucide:book-open" className="text-primary-500 text-2xl" />
        <p className="font-semibold text-inherit">{t('app_title')}</p>
      </NavbarBrand>

      <NavbarContent justify="end" className="gap-3">
        <NavbarItem className="hidden sm:flex w-full max-w-xs">
          <SearchBar />
        </NavbarItem>
        
        <NavbarItem className="hidden md:flex">
          <Button 
            as="a" 
            href="https://github.com/yourusername/genesis-playbook" 
            target="_blank"
            variant="flat"
            startContent={<Icon icon="lucide:github" />}
          >
            {t('nav_github')}
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="flat" startContent={<Icon icon="mdi:translate" />}>
                {lang === 'zh' ? '中文' : 'English'}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="language">
              <DropdownItem key="zh" onPress={() => setLang('zh')}>中文</DropdownItem>
              <DropdownItem key="en" onPress={() => setLang('en')}>English</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </HeroNavbar>
  );
};

export default Navbar;