export interface User {
  id: number;
  full_name: string;
  email: string;
  personal_email?: string;
  initial_date: Date;
  employee_type_id: number;
  employee_type_name?: string;
  country_id: string;
  dob: Date;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  emergency_contact_relationship?: string;
  employee_status: boolean;
  employee_status_reason?: string;
  partner_id: number;
  job_title_id: number;
  report_to: number;
  inactive: boolean;
  read_only?: boolean;
}

export interface UserFilters {
  full_name: string;
  statuses: Array<boolean>;
  employees_type: Array<number>;
}

export interface UserLogin {
  full_name: string;
  email: string;
  token: string;
  policies?: any[];
}
