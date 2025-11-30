export const toPersianNumber = (num: string | number) => {
  const numStr = num.toString();
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return numStr.replace(/\d/g, (d) => persianDigits[parseInt(d)]);
};
