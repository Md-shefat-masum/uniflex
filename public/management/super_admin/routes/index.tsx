import React from 'react';
import { NonIndexRouteObject } from 'react-router-dom';
import DashboardLayout from '../views/layouts/DashboardLayout';
import T1 from '../views/pages/T1';
import user_branch_staff_routes from '../views/pages/users/config/routes';
import booking from '../views/pages/booking/config/routes';
import project from '../views/pages/project/config/routes';

import accounts from '../views/pages/accounts/config/routes';
import account_types from '../views/pages/accounts/menus/accounts/account_types/config/routes';
import account_categories from '../views/pages/accounts/menus/accounts/account_categories/config/routes';
import account_numbers from '../views/pages/accounts/menus/accounts/account_numbers/config/routes';
import project_income from '../views/pages/accounts/menus/payments/project_income/config/routes';
import internal_income from '../views/pages/accounts/menus/payments/internal_income/config/routes';
import expense from '../views/pages/accounts/menus/payments/expense/config/routes';
import debit_credit from '../views/pages/accounts/menus/payments/debit_credit/config/routes';
import closing_balance from '../views/pages/reports/menus/closing_balance/config/routes';

import customer_report from '../views/pages/reports/menus/customer_report/config/routes';
import due_report from '../views/pages/reports/menus/due_report/config/routes';
import expense_statement from '../views/pages/reports/menus/expense_statement/config/routes';
import incentive_report from '../views/pages/reports/menus/incentive_report/config/routes';
import income_statement from '../views/pages/reports/menus/income_statement/config/routes';
import project_report from '../views/pages/reports/menus/project_report/config/routes';

import project_payment from '../views/pages/project/menus/project_payment/config/routes';

import contact_management_routes from '../views/pages/contact_management/config/routes';

/** car management */
import car_management from '../views/pages/project_visit/car_management/config/routes';

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
            booking,
            project,
            accounts,
            account_types,
            account_categories,
            account_numbers,
            project_income,
            internal_income,
            expense,
            debit_credit,
            closing_balance,
            customer_report,
            due_report,
            expense_statement,
            incentive_report,
            income_statement,
            project_report,

            project_payment,
            contact_management_routes,

            car_management,
        ],
    },
];

export default router;
