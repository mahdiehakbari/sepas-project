'use client';
import Image from 'next/image';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BannerItems } from './constants/BannerItems';
import 'swiper/css';
import 'swiper/css/pagination';
import { Button } from '@/sharedComponent/ui';

export const BannerSection = () => {
  return (
    <div className='mb-12'>
      <div className='max-w-4xl mx-auto py-4 px-12 rounded-2xl bg-gradient-to-r from-first-gradient to-second-gradient mb-4'>
        <h1 className='sr-only'>عنوان اصلی صفحه یا اسلایدر</h1>
        <Swiper
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: '.custom-pagination',
          }}
          spaceBetween={20}
          slidesPerView={1}
          grabCursor={true}
          className='overflow-hidden'
        >
          {BannerItems.map((item, index) => (
            <SwiperSlide key={item.id}>
              <div className='flex justify-between items-center'>
                <div>
                  <h2 className='text-white font-[700] text-[32px] mb-4'>
                    {item.title}
                  </h2>

                  <p className='text-white font-[400] text-[20px] mb-6'>
                    {item.description}
                  </p>

                  <div className='flex justify-between'>
                    <Button>hiii</Button>
                  </div>
                </div>
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={262}
                  height={262}
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className='custom-pagination mt-4 flex justify-center'></div>
    </div>
  );
};
