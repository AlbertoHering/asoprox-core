import { RouteModel } from "src/app/models/route";

const childrenRoutes: Array<RouteModel> = [
  {
    id: 'users-route',
    icon: 'portrait',
    path: '/maintenance/users',
    title: 'Miembros Asociados',
    policies: ["admin"],
  },
  {
    id: 'statements-route',
    icon: 'library_books',
    path: '/maintenance/statements',
    title: 'Estado general',
    policies: ["admin"],
  },
  {
    id: 'individualstatements-route',
    icon: 'library_add',
    path: '/maintenance/individualstatements',
    title: 'Estado individual ',
    policies: ["admin"],
  },
  {
    id: 'about-route',
    icon: 'info',
    path: '/maintenance/about',
    title: 'ASOCORE',
    policies: ["admin"],
  },
];
export default childrenRoutes;