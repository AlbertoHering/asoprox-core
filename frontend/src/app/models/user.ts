export interface User {
  member_id: number;
  full_name: string;
  email: string;
  personal_email: string;
  initial_date: Date;
  id: number;
  account_access: boolean;
  admin_id: number;
  type: string;
  inactive: boolean;
  read_only?: boolean;
  user_edit?: boolean;
}

export interface UserFilters {
  member_id?: number;
  full_name: string;
}

export interface UserLogin {
  full_name: string;
  email: string;
  token: string;
  policies?: any[];
}

export interface UserType {
  admin_id: number;
  type: string;
}