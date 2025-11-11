export interface IRequestItem {
  amount: number;
  createdAt: string;
  customerId: string;
  description: string;
  id: string;
  merchantId: string;
  merchantName: string;
  status: string;
}

export interface IRequestsData {
  items: IRequestItem[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}
