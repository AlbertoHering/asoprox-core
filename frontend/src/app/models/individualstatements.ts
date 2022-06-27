export interface IndividualStatement {
  statement_id: number;
  member_id: string;
  full_name: string;
  entry_date: string;
  entry_amount: number;
  entry_amount_formatted: string;
  company_match_amount: number;
  company_match_amount_formatted: string;
  total_amount_formatted: string;
  date_updated: Date;
  date_created: Date;
  inactive: boolean;
  read_only?: boolean;
}

export interface IndividualStatementFilters {
  full_name: string;
}