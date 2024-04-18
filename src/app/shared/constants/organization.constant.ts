import { OrganizationInfo } from '@shared/models/user-info.model';

export const OrganizationId: { [key: number]: string } = {
  1: 'ABP',
  2: 'T&TGroup',
  6: 'SOVICO',
};

export const ORGANIZATION_LIST: OrganizationInfo[] = [
  {
    orgId: 2,
    companyName: 'T&TGroup',
    website: null,
    phone: '0373580520',
    email: 'huongtraphung@gmail.com',
    address: 'Đường Lê Văn lương',
    taxCode: null,
    logo: 'assets/images/logos/ttgroup.png',
  },
  {
    orgId: 5,
    companyName: 'EVN',
    website: null,
    phone: '0373580520',
    email: 'evn.user@gmail.com',
    address: 'Đường Lê Văn lương',
    taxCode: null,
    logo: 'assets/images/logos/evn.png',
  },
  {
    orgId: 6,
    companyName: 'SOVICO',
    website: null,
    phone: '0373580520',
    email: 'sovico@sls.com',
    address: 'Đường Lê Văn lương',
    taxCode: null,
    logo: 'assets/images/logos/sovico.png',
  },
];
