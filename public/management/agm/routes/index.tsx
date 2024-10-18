import React from 'react';
import { NonIndexRouteObject } from 'react-router-dom';
import DashboardLayout from '../views/layouts/DashboardLayout';
import T1 from '../views/pages/T1';

import Payment from "../views/pages/Payment/Payment";
import Profile from "../views/pages/Profile/Profile";

import BusinessModel from "../views/pages/BusinessModel/BusinessModel";
import ProfileDetails from '../views/pages/Profile/ProfileDetails';

import AllCustomer from '../views/pages/Customer/AllCustomer';
import WithdrawRequest from '../views/pages/Payment/WithdrawRequest';
import PayoutHistory from '../views/pages/Payment/PayoutHistory';
import CustomerPaymentHistory from '../views/pages/Payment/CustomerPaymentHistory';

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
                path: 'payment-histories/:customer_id',
                element: <CustomerPaymentHistory />,
            },
            {
                path: 'customers',
                element: <AllCustomer />,
            },
            {
                path: 'payout-request',
                element: <WithdrawRequest />,
            },
            {
                path: 'payout-history',
                element: <PayoutHistory />,
            },
        ],
    },
];

export default router;
