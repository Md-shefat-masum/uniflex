import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import commonStore from './slices/common_slice';

import accounts from '../views/pages/accounts/config/store';
import account_types from '../views/pages/accounts/menus/accounts/account_types/config/store';
import account_categories from '../views/pages/accounts/menus/accounts/account_categories/config/store';
import account_numbers from '../views/pages/accounts/menus/accounts/account_numbers/config/store';
import project_income from '../views/pages/accounts/menus/payments/project_income/config/store';
import internal_income from '../views/pages/accounts/menus/payments/internal_income/config/store';
import expense from '../views/pages/accounts/menus/payments/expense/config/store';
import debit_credit from '../views/pages/accounts/menus/payments/debit_credit/config/store';

import booking from '../views/pages/booking/config/store';
import project from '../views/pages/project/config/store';
import project_payment from '../views/pages/project/menus/project_payment/config/store';

import users from '../views/pages/users/config/store';


const store = configureStore({
    reducer: {
        accounts: accounts.reducer,
        account_types: account_types.reducer,
        account_categories: account_categories.reducer,
        account_numbers: account_numbers.reducer,
        project_income: project_income.reducer,
        internal_income: internal_income.reducer,
        expense: expense.reducer,
        common_store: commonStore.reducer,
        debit_credit: debit_credit.reducer,

        booking: booking.reducer,
        project: project.reducer,
        project_payment: project_payment.reducer,

        users: users.reducer,
    },
    devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export default store;
