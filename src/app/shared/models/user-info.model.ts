export interface UserInfo {
  id?: number;
  username?: string;
  avatar?: string;
  email?: string;
  address?: string;
  fullName?: string;
  phone?: string;
  gender?: number;
  birthday?: number;
  admin?: boolean;
  roles?: string;
  status?: number;
  organization?: OrganizationInfo[];
}

export interface OrganizationInfo {
  companyName?: string;
  website?: string | null | undefined;
  phone?: string | null | undefined;
  email?: string | null | undefined;
  address?: string | null | undefined;
  taxCode?: string | null | undefined;
  logo?: string | null | undefined;
  orgId?: number;
}
