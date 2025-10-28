import { useTranslation } from 'next-i18next';

export const useStatusInfo = () => {
  const { t } = useTranslation();

  const getStatusInfo = (status: number) => {
    const green = [9];
    const blue = [8];
    const red = [1, 5, 10, 11];
    const yellow = [0, 2, 3, 4, 6, 7];

    let className = 'bg-gray-100 text-gray-700';
    if (green.includes(status)) className = 'bg-green-100 text-green-700';
    else if (blue.includes(status)) className = 'bg-blue-100 text-blue-700';
    else if (red.includes(status)) className = 'bg-red-100 text-red-700';
    else if (yellow.includes(status))
      className = 'bg-yellow-100 text-yellow-700';

    return {
      label: t(`status:${String(status)}`),
      className,
    };
  };

  return { getStatusInfo };
};
