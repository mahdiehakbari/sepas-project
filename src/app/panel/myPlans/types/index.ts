export interface IWalletAccount {
  accountNumber: string;
  walletAccountType: string;
  balance: number;
  status: number;
  type: number;
  [key: string]: unknown;
  tag: number;
}

export interface IWalletResponse {
  data: IWalletAccount[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}
