export interface IRequest {
  id: string;
  status: number;
  createdAt: string;
}

export interface IRequestsData {
  items: IRequest[];
  totalPages: number;
  pageNumber: number;
  pageSize: number;
}
