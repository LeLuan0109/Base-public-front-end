export interface UserInfo {
    id?: number;
    avatar?: string;
    email?: string;
    address?: string;
    fullName?: string;
    phone?: string;
    userType?: number;
    status?: number;
    userGroup?: {
        id?: number;
        name?: string;
    }
    account?: {
        id?: number;
        username?: string;
    }
    roles?: string
}

export interface UserInput {
    avatar?: string;
    email?: string;
    address?: string;
    fullName?: string;
    phone?: string;
    userType?: number;
    userGroupId?: number;
    roles?: string;
}

export interface FilterUserInput{
    email?: string;
    address?: string;
    fullName?: string;
    phone?: string;
    userType?: number;
    status?: number;
    userGroupId?: number;
}

export interface UpdateMeInput {
    avatar?: string;
    email?: string;
    address?: string;
    fullName?: string;
    businessUrl?: string;
    phone?: string;
    displayName?: string;
}