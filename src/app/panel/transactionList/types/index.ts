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
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ISelectOption {
  label: string;
  value: string;
}
export interface IAcceptorData {
  firstName: string;
  id: string;
  lastName: string;
  nationalId: string;
}

export interface IMerchantData {
  businessName: string;
  firstName: string;
  id: string;
  lastName: string;
  nationalId: string;
}
