import { PageSpinner } from '@/sharedComponent/ui';
import { useTranslation } from 'react-i18next';

export const ModalLoading = () => {
  const { t } = useTranslation();
  return (
    <div className='flex flex-col items-center justify-center  bg-white py-10 md:w-[700px]'>
      <PageSpinner />
    </div>
  );
};
