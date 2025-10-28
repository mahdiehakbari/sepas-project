export const getStatusColor = (status: number): string => {
  const green = [9];
  const blue = [8];
  const red = [1, 5, 10, 11];
  const yellow = [0, 2, 3, 4, 6, 7];

  if (green.includes(status)) return 'bg-green-100 text-green-700';
  if (blue.includes(status)) return 'bg-blue-100 text-blue-700';
  if (red.includes(status)) return 'bg-red-100 text-red-700';
  if (yellow.includes(status)) return 'bg-yellow-100 text-yellow-700';

  return 'bg-gray-100 text-gray-700'; // مقدار پیش‌فرض
};
