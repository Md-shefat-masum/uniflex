import React from 'react';
import { NonIndexRouteObject } from 'react-router-dom';
import DashboardLayout from '../views/layouts/DashboardLayout';
import T1 from '../views/pages/T1';

import Payment from "../views/pages/Payment/Payment";
import PaymentHistory from "../views/pages/Payment/PaymentHistory";
import Profile from "../views/pages/Profile/Profile";

import BusinessModel from "../views/pages/BusinessModel/BusinessModel";
import ProfileDetails from '../views/pages/Profile/ProfileDetails';

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
            {
                path: 'payment',
                element: <Payment />,
            },
            {
                path: 'payment-histories',
                element: <PaymentHistory />,
            },
            {
                path: 'profile',
                element: <Profile />,
            },
            {
                path: 'profile-details',
                element: <ProfileDetails />,
            },
            {
                path: 'business-model',
                element: <BusinessModel />,
            },
        ],
    },
];

export default router;
