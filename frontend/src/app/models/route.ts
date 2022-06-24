export interface RouteModel {
  id: string;
  title: string;
  path?: string;
  icon?: string;
  children?: Array<RouteModel>;
  policies?: any[];
}
