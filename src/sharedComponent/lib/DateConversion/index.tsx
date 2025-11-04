import React from 'react';
import jalaali from 'jalaali-js';

interface BirthDateProps {
  birthDate?: string | null;
}

const toPersianNumber = (str: string) =>
  str.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);

export const BirthDate: React.FC<BirthDateProps> = ({ birthDate }) => {
  if (!birthDate) return <span>تاریخ نامعتبر</span>;

  const date = new Date(birthDate);

  if (isNaN(date.getTime())) {
    console.error('تاریخ نامعتبر:', birthDate);
    return <span>تاریخ نامعتبر</span>;
  }

  const jDate = jalaali.toJalaali(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  );

  const formatted = `${jDate.jy}/${String(jDate.jm).padStart(2, '0')}/${String(
    jDate.jd,
  ).padStart(2, '0')}`;

  const persianFormatted = toPersianNumber(formatted);

  return <span>{persianFormatted}</span>;
};
