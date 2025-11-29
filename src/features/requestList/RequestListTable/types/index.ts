export interface IRequest {
  id: string;
  status: string;
  createdAt: string;
}

export interface IRequestListTableProps {
  requests: IRequest[] | null;
  currentPage: number;
  pageSize: number;
}
