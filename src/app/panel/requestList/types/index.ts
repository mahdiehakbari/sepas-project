export interface IRequest {
  id: string;
  status: number;
  createdAt: string;
  requestedAmount: number;
  referenceNumber: number;
  creditLineBalanceBeforeRequest: number;
}

export interface IRequestsData {
  items: IRequest[];
  totalPages: number;
  pageNumber: number;
  pageSize: number;
}

export interface IPaymentDetail {
  rrn: string;
  refNum: string;
  maskedPan: string;
  terminalNumber: number;
  originalAmount: number;
  affectiveAmount: number;
  straceDate: string;
  straceNo: string;
  status: number;
  errorCode: string;
  errorDesc: string;
  resultCode: number;
  resultDescription: string;
  success: boolean;
  createdAt: string;
}

export interface IPaymentDetailProps {
  detailData: IPaymentDetail;
}
