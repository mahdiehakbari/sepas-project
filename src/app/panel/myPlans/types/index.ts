export interface IWalletAccount {
  totalAmountSuccessfulPurchaseRequests: number;
  totalAmountSuccessfulCustomerCreditRequests: number;
  totalAmountDeduction: number;
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
