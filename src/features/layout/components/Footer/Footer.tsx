import Image from 'next/image';
import { Fragment } from 'react';
import { SiteRights } from './SiteRights';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <Fragment>
      <footer className='w-full bg-secondary'>
        <div className='mx-auto max-w-6xl flex  flex-col md:flex-row items-center justify-between py-6'>
          <div>
            <Image
              src='/assets/icons/logo.svg'
              alt='logo'
              width={78}
              height={42}
              className='cursor-pointer hover:opacity-80'
            />

            <p className='text-[14px] font-[400] text-text-black pb-4 md:pb-0'>
              {t('home:credit_bnpl')}
            </p>
          </div>
        </div>
      </footer>
      <SiteRights />
    </Fragment>
  );
}
