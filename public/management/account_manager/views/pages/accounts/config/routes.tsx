import React from 'react';
import setup from './setup';
import Layout from '../Layout';
import AllIncome from '../AllIncome';
import AllExpense from '../AllExpense';
import Create from '../Create';
import Details from '../Details';
import Edit from '../Edit';
import History from '../History';
import NewExpense from '../NewExpense';
import DebitCredit from '../DebitCredit';
import WithdrawRequest from '../WithdrawRequest';


// export { default as DashboardCounterAll} from "./All.jsx";

export default {
    path: setup.route_prefix,
    element: <Layout />,
    children: [
        {
            path: 'incomes',
            element: <AllIncome />,
        },
        {
            path: 'expense',
            element: <AllExpense />,
        },
        {
            path: 'history',
            element: <History />,
        },
        {
            path: 'withdraw-request',
            element: <WithdrawRequest />,
        },
        {
            path: 'create',
            element: <Create />,
        },
        {
            path: 'new-expense',
            element: <NewExpense />,
        },
        {
            path: 'debit-credit',
            element: <DebitCredit />,
        },
        {
            path: 'edit/:id',
            element: <Edit />,
        },
        {
            path: 'details/:id',
            element: <Details />,
        },

    ],
};
