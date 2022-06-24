export interface Userproject {
  id: number;
  user_id: number;
  user_name: string;
  job_title_id: number;
  job_title_name: string;
  project_id: number;
  project_name: string;
}

export interface UserprojectFilters {
  user_name: string;
  job_title_name: string;
  project_name: string;
}