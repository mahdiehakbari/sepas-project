export const toPersianNumber = (num: string | number) => {
  const numStr = num.toString();
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return numStr.replace(/\d/g, (d) => persianDigits[parseInt(d)]);
};

export const formatPersianNumberWithSeparator = (num: string | number) => {
  const numberValue =
    typeof num === 'number'
      ? num
      : parseFloat(num.toString().replace(/,/g, ''));

  const withThousandsSeparator = numberValue.toLocaleString('en-US');

  return toPersianNumber(withThousandsSeparator);
};
