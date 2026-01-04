export interface ISkill {
  skillId: string;
  description: string;
}

export interface IDentist {
  id: string;
  userId: string;
  phoneNumber: string;
  nationalId: string;
  businessName: string;
  fullName: string;
  cityId: string;
  cityName: string;
  address: string;
  email: string;
  medicalCertificateNumber: string;
  professionalTitle: string | null;
  educationLevel: number;
  workPlacePhoneNumber: string;
  iban: string;
  isVerified: boolean;
  createdAt: string;
  availableBalance: number;
  skills?: ISkill[] | undefined;
  bannerImageFilePath: string;
  bio: string;
}
export interface IDentistListResponse {
  items: IDentist[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ICity {
  id: string;
  name: string;
  provinceName: string;
}