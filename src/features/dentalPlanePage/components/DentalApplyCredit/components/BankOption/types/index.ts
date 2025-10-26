export interface IBankOptionProps {
  value: string;
  label: string;
  logo: string;
  selectedBank: string;
  setSelectedBank: (value: string) => void;
}
