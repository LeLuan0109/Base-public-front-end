export interface RegiterForm {
    email?: string;
    fullName?: string;
    phone?: string;
    companyName?: string;
    address?: string;
    website?: string;
    texCode?: string;
    password?: string;
    passwordConfirmation?: string;
}


export interface RegisterInput {
    username?: string;
    password?: string;
    fullName?: string;
    phone?: string;
    email?: string;
    company?: CompanyInput
}

export interface CompanyInput {
    companyName?: string;
    website?: string;
    address?: string;
    phone?: string;
    email?: string;
    texCode?: string;
}