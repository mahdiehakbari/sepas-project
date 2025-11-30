interface IRequestItem {
  amount: number;
  createdAt: string;
  customerId: string;
  description: string;
  id: string;
  merchantId: string;
  merchantName: string;
  status: string;
  referenceNumber: number;
}
export interface ITransactionListTableProps {
  transactions: IRequestItem[];
  currentPage: number;
  pageSize: number;
}
