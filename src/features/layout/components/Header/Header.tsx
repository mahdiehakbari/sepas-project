'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useToggleLanguage } from './hooks';
import { Button } from '@/sharedComponent/ui';

export const Header = () => {
  const { t, i18n } = useTranslation();
  const { toggleLanguage, currentLanguage } = useToggleLanguage();
  return (
    <header className='w-full border-b border-black/[.08] dark:border-white/[.145] bg-background text-foreground'>
      <div className='mx-auto max-w-6xl px-4 py-4 flex items-center justify-between'>
        <nav className='flex items-center gap-6 text-sm'>
          <Link href='/' className='hover:underline'>
            {t('home:main_page')}
          </Link>
          <Link href='/about' className='hover:underline'>
            About
          </Link>
          <Link href='/contact' className='hover:underline'>
            Contact
          </Link>
        </nav>
        <div className='flex items-center gap-3'>
          <Button>{t('home:login')}</Button>
          <button
            className='cursor-pointer border border-primary px-3 py-1 rounded'
            onClick={toggleLanguage}
          >
            {currentLanguage === 'fa' ? 'EN' : 'FA'}
          </button>
        </div>
      </div>
    </header>
  );
};
