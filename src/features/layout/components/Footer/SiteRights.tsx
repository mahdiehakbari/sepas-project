'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { socialIcons } from './constants/socialIcons';

export const SiteRights = () => {
  const { t } = useTranslation();
  return (
    <div className='bg-primary'>
      <div className='mx-auto max-w-4xl flex  flex-col md:flex-row items-center py-4 justify-between  px-6 xl:px-0'>
        <div>
          <p className='text-[14px] font-[500] text-white pb-4 md:pb-0'>
            {t('home:all_rights')}
          </p>

          <div className='flex items-center gap-[11px] mt-3'>
            {socialIcons.map((icon) => (
              <a
                key={icon.alt}
                href={icon.href}
                target='_blank'
                rel='noopener noreferrer'
              >
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  width={20}
                  height={20}
                  className='cursor-pointer hover:opacity-80'
                />
              </a>
            ))}
          </div>
        </div>

        <a
          referrerPolicy='origin'
          target='_blank'
          href='https://trustseal.enamad.ir/?id=657485&Code=avnjPcnHRVDRJRWU5o1BGCbZrB6apxGh'
        >
          <Image
            src='https://trustseal.enamad.ir/logo.aspx?id=657485&Code=avnjPcnHRVDRJRWU5o1BGCbZrB6apxGh'
            alt=''
            width={64}
            height={64}
            className='rounded-[8px] cursor-pointer'
            referrerPolicy='origin'
          />
        </a>
      </div>
    </div>
  );
};
