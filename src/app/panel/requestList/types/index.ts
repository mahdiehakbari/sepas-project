export interface IRequest {
  id: string;
  status: number;
  createdAt: string;
}

export interface IRequestsData {
  items: IRequest[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}
