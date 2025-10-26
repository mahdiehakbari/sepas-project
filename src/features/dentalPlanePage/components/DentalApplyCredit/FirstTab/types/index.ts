export interface IFeeConfiguration {
  id: string;
  minAmount: number;
  maxAmount: number;
  feePercentage: number;
  isActive: boolean;
  description?: string;
  createdAt?: string;
  modifiedAt?: string | null;
}
