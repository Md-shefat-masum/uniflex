import React from 'react';
import { NonIndexRouteObject } from 'react-router-dom';
import DashboardLayout from '../views/layouts/DashboardLayout';
import T1 from '../views/pages/T1';

import Payment from "../views/pages/Payment/Payment";
import PaymentHistory from "../views/pages/Payment/PaymentHistory";
import Profile from "../views/pages/Profile/Profile";

import AllCustomer from "../views/pages/Customer/AllCustomer";
import BusinessModel from "../views/pages/BusinessModel/BusinessModel";
import ProfileDetails from '../views/pages/Profile/ProfileDetails';
import WithdrawRequest from '../views/pages/Payment/WithdrawRequest';

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
                path: 'customers',
                element: <AllCustomer />,
            },
            {
                path: 'payment',
                element: <Payment />,
            },
            {
                path: 'payment-histories/:customer_id',
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
            {
                path: 'payout-request',
                element: <WithdrawRequest />,
            },
            {
                path: 'payout-history',
                element: <PaymentHistory />,
            },
        ],
    },
];

export default router;
