import React from 'react';
import { NonIndexRouteObject } from 'react-router-dom';
import DashboardLayout from '../views/layouts/DashboardLayout';
import T1 from '../views/pages/T1';
import user_branch_staff_routes from '../views/pages/users/config/routes';

import assign_visit from '../views/pages/project_visit/menus/assign_visit/config/routes';
import visit_history from '../views/pages/project_visit/menus/visit_history/config/routes';


interface RouteTypes extends NonIndexRouteObject {}
const router: RouteTypes[] = [
    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            {
                path: '',
                element: <T1 />,
            },
            user_branch_staff_routes,
            assign_visit,
            visit_history,
        ],
    },
];

export default router;
