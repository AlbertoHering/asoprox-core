import { RouteModel } from "src/app/models/route";

const childrenRoutes: Array<RouteModel> = [
  {
    id: 'users-route',
    icon: 'portrait',
    path: '/admin',
    title: 'Perfil',
    policies: ["public"],
  },
];
export default childrenRoutes;