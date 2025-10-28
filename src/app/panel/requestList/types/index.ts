interface IRequestItem {
  id: string;
  requestedAmount: number;
  subscriptionFee: number;
  feePercentage: number;
  status: number;
  statusDescription: string;
  errorMessage: string | null;
  completedAt: string | null;
  description: string;
  createdAt: string;
}

export interface IRequestsData {
  items: IRequestItem[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}
