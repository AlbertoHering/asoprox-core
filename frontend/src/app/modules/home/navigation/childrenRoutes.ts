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
    title: 'Estados global',
    policies: ["public"],
  },
  /**{
    id: 'individualstatements-route',
    icon: 'library_add',
    path: '/maintenance/individualstatements',
    title: 'Estados Individual ',
    policies: ["public"],
  },*/
];
export default childrenRoutes;