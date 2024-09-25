import React from 'react';
import { NonIndexRouteObject } from 'react-router-dom';
import DashboardLayout from '../views/layouts/DashboardLayout';
import T1 from '../views/pages/T1';

import users from '../views/pages/users/config/routes';

import accounts from '../views/pages/accounts/config/routes';
import account_types from '../views/pages/accounts/menus/accounts/account_types/config/routes';
import account_categories from '../views/pages/accounts/menus/accounts/account_categories/config/routes';
import account_numbers from '../views/pages/accounts/menus/accounts/account_numbers/config/routes';
import project_income from '../views/pages/accounts/menus/payments/project_income/config/routes';
import internal_income from '../views/pages/accounts/menus/payments/internal_income/config/routes';
import expense from '../views/pages/accounts/menus/payments/expense/config/routes';
import debit_credit from '../views/pages/accounts/menus/payments/debit_credit/config/routes';

import projects from "../views/pages/project/config/routes";
import project_payment from "../views/pages/project/menus/project_payment/config/routes";
import booking from "../views/pages/booking/config/routes";

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

            booking,
            projects,
            project_payment,
            
            accounts,
            account_types,
            account_categories,
            account_numbers,
            project_income,
            internal_income,
            expense,
            debit_credit,
            
            users,
        ],
    },
];

export default router;
