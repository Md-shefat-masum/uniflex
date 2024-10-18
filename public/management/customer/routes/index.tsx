import React from 'react';
import { NonIndexRouteObject } from 'react-router-dom';
import DashboardLayout from '../views/layouts/DashboardLayout';
import T1 from '../views/pages/T1';

import Profile from '../views/pages/Profile/Profile';

import Payment from '../views/pages/Payment/Payment';
import PaymentHistory from '../views/pages/Payment/PaymentHistory';
import PaymentResponse from '../views/pages/Payment/PaymentResponse';


interface RouteTypes extends NonIndexRouteObject { }
const router: RouteTypes[] = [
    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            {
                path: '',
                element: <T1 />,
            },
            {
                path: 'profile',
                element: <Profile />,
            },
            
            {
                path: 'payment',
                element: <Payment />,
            },
            {
                path: 'payment-histories',
                element: <PaymentHistory />,
            },
            {
                path: 'payment-response',
                element: <PaymentResponse />,
            },
        ],
    },
];

export default router;
