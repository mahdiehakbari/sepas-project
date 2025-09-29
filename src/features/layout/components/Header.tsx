'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fa' ? 'en' : 'fa';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.classList.remove('font-fa', 'font-en');
    document.documentElement.classList.add(
      newLang === 'fa' ? 'font-fa' : 'font-en',
    );
  };

  return (
    <header className='w-full border-b border-black/[.08] dark:border-white/[.145] bg-background text-foreground'>
      <div className='mx-auto max-w-6xl px-4 py-4 flex items-center justify-between'>
        <Link href='/' className='font-semibold tracking-tight'>
          {t('home:main_page')}
        </Link>
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

          <button
            onClick={toggleLanguage}
            className='px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-800'
          >
            {i18n.language === 'fa' ? 'EN' : 'FA'}
          </button>
        </nav>
      </div>
    </header>
  );
}
