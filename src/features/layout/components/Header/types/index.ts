export type NavItem = { id: number; label: string; href: string };

export interface IMobileMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export interface IUserData {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber: string;
  nationalId: string;
  gender: string;
  isVerified: boolean;
  userType: string;
  email?: string | null;
  birthDate?: string;
  createdAt?: string;
  merchantId?: string | null;
  address?: {
    id: string;
    cityId: string;
  };
}
