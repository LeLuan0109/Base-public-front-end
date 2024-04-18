export interface AccountInfo {
    id?: number;
    username?: string;
    avatar?: string;
    email?: string;
    address?: string;
    fullName?: string;
    phone?: string;
    gender?: number;
    birthday?: number;
    admin: Boolean
    roles?: string;
    status?: number;
    created?: number;
    organization?: OrganizationInfo
}

export interface  OrganizationInfo {
    companyName?: string;
    website?: string;
    phone?: string;
    email?: string;
    address?: string;
    taxCode?: string;
}

export interface AccountInput {
    username?: string;
    fullName?: string;
    password?: string;
    passwordConfirmation?: string;
    userId?: number;
    roles?: any;
}

export interface AccountUpdateInput {
    username?: string;
    userId?: number;
}

export interface FilterAccountInput{
    username?: string;
    creator?: string;
    updated?: number;
    status?: number;
    userId?: number;
}

export interface ChangePasswordInput {
    password?: string;
    passwordNew?: string;
}