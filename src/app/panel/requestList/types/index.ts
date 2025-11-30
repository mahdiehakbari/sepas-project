export interface IRequest {
  id: string;
  status: number;
  createdAt: string;
  requestedAmount: number;
  referenceNumber: number;
}

export interface IRequestsData {
  items: IRequest[];
  totalPages: number;
  pageNumber: number;
  pageSize: number;
}
