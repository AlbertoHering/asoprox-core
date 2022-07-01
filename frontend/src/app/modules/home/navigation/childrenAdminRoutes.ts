import { RouteModel } from "src/app/models/route";

const childrenRoutes: Array<RouteModel> = [
  {
    id: 'users-route',
    icon: 'portrait',
    path: '/admin',
    title: 'Perfil',
    policies: ["public"],
  },
  {
    id: 'statement-route',
    icon: 'library_books',
    path: '/statement',
    title: 'Estado de cuenta',
    policies: ["public"],
  },
];
export default childrenRoutes;