export interface IFilterParams {
  pageNumber: number;
  pageSize: number;
  createdFrom?: string;
  createdTo?: string;
  customerIds?: string[];
  merchantIds?: string[];
}
