export interface IRequest {
  id: string;
  status: number;
  createdAt: string;
  requestedAmount: number;
  referenceNumber: number;
}

export interface IRequestListTableProps {
  requests: IRequest[] | null;
  currentPage: number;
  pageSize: number;
}
