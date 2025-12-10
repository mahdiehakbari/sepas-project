import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

export const formatJalaliDateTime = (isoDate: string | undefined | null) => {
  if (!isoDate) return '';
  const miladiDate = new Date(isoDate);
  const dateObj = new DateObject(miladiDate);
  const jalali = dateObj.convert(persian, persian_fa);
  return `${jalali.format('HH:mm')} ${jalali.format('YYYY/MM/DD')} `;
};
