import { RouteModel } from "src/app/models/route";

const childrenRoutes: Array<RouteModel> = [
  {
    id: 'users-route',
    icon: 'portrait',
    path: '/maintenance/users',
    title: 'Miembros Asociados',
    policies: ["public"],
  },
  {
    id: 'statements-route',
    icon: 'library_books',
    path: '/maintenance/statements',
    title: 'Estados general',
    policies: ["public"],
  },
  {
    id: 'individualstatements-route',
    icon: 'library_add',
    path: '/maintenance/individualstatements',
    title: 'Estado individual ',
    policies: ["public"],
  },
];
export default childrenRoutes;