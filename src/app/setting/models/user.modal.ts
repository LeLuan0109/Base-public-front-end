export interface ChangePasswordInput {
  password?: string;
  passwordNew?: string;
  confirmPassword?: string;
}


export interface UpdateMeInput {
  name?: string;
  gender?: number;
  birthday?: number | Date;
  phone?: string;
  email?: string;
  fullName?: string;
}
