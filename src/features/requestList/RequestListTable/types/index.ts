export interface IRequest {
  id: string;
  status: number;
  createdAt: string;
}

export interface IRequestListTableProps {
  requests: IRequest[];
  currentPage: number;
  pageSize: number;
}
