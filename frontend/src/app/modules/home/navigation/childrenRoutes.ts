import { RouteModel } from "src/app/models/route";

const childrenRoutes: Array<RouteModel> = [
  {
    id: 'users-route',
    icon: 'portrait',
    path: '/maintenance/users',
    title: 'Asociados',
    policies: ["public"],
  },
];
export default childrenRoutes;