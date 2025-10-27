import React from 'react';
import jalaali from 'jalaali-js';

interface BirthDateProps {
  birthDate: string;
}

const toPersianNumber = (str: string) =>
  str.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);

export const BirthDate: React.FC<BirthDateProps> = ({ birthDate }) => {
  const date = new Date(birthDate);

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
