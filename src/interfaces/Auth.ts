export interface RegisterUserData {
  code: string;
  email: string;
  store_name: string;
  password: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

export interface ChangePasswordData {
  username: string;
  password: string;
  // add other fields as needed
}