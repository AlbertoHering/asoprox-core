export interface Vacation {
    id: number;
    user_id: number;
    user_name: string;
    project_id: number;
    project_name: string;
    date_from: Date;
    date_to: Date;
    approved_on: Date;
    approved_by: number;
    manager_name: string;
  }
  
  export interface VacationFilters {
    name: string;
  }
  