interface DataAction {
  id: string;
  icon: {
    name: string;
    color?: string;
  };
  label?: string;
  openDialog?: 'dialog' | 'popover';
  policies?: any[];
}

export interface Column {
  field: string;
  title: string;
  class?: string;
  actions?: Array<DataAction>;
  boolRow?: (is_bool: boolean) => string;
  dateRow?: any;
}
