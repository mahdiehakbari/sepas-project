'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useToggleLanguage } from './hooks';
import { Button } from '@/sharedComponent/ui';
import { getNavItems } from './constants';
import Image from 'next/image';
import { useState } from 'react';
import { MobileMenu } from './MobileMenu';

export const Header = () => {
  const { t } = useTranslation();
  const { toggleLanguage, currentLanguage } = useToggleLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='w-full sticky top-0 z-50 shadow-[0px_-3px_10px_-4px_#32323214,0px_4px_6px_-2px_#32323208] bg-background mb-14'>
      <div className='mx-auto max-w-7xl px-4 py-2.5 flex items-center justify-between'>
        <div className='flex items-center gap-[50px]'>
          <Image
            src='assets/icons/logo.svg'
            alt='logo'
            width={78}
            height={42}
            className='cursor-pointer hover:opacity-80'
          />

          {/* Desktop nav */}
          <nav className='hidden md:flex items-center gap-6 text-sm'>
            {getNavItems().map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className='flex items-center duration-300 no-underline'
              >
                <p className='font-medium hover:text-primary transition-all duration-300'>
                  {item.label}
                </p>
              </Link>
            ))}
          </nav>
        </div>

        <div className='flex items-center gap-3'>
          <Button>{t('home:login')}</Button>

          <button
            className='cursor-pointer border border-primary px-3 py-1 rounded'
            onClick={toggleLanguage}
          >
            {currentLanguage === 'fa' ? 'EN' : 'FA'}
          </button>

          {/* Hamburger button */}
          <button
            className='md:hidden flex flex-col justify-center items-center w-8 h-8 relative'
            onClick={() => setIsOpen(!isOpen)}
          >
            <span
              className={`block h-0.5 w-6 bg-black my-1 transition-transform ${
                isOpen ? 'rotate-50 translate-y-3' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-black my-1 transition-opacity ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-black my-1 transition-transform ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};
