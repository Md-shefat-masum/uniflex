import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import commonStore from './slices/common_slice';
import users from '../views/pages/users/config/store';
import booking from '../views/pages/booking/config/store';
import project from '../views/pages/project/config/store';
import accounts from '../views/pages/accounts/config/store';
import account_types from '../views/pages/accounts/menus/accounts/account_types/config/store';
import account_categories from '../views/pages/accounts/menus/accounts/account_categories/config/store';
import account_numbers from '../views/pages/accounts/menus/accounts/account_numbers/config/store';
import project_income from '../views/pages/accounts/menus/payments/project_income/config/store';
import internal_income from '../views/pages/accounts/menus/payments/internal_income/config/store';
import expense from '../views/pages/accounts/menus/payments/expense/config/store';
import debit_credit from '../views/pages/accounts/menus/payments/debit_credit/config/store';
// Reports 
import closing_balance from '../views/pages/reports/menus/closing_balance/config/store';
import customer_report from '../views/pages/reports/menus/customer_report/config/store';
import due_report from '../views/pages/reports/menus/due_report/config/store';
import expense_statement from '../views/pages/reports/menus/expense_statement/config/store';
import incentive_report from '../views/pages/reports/menus/incentive_report/config/store';
import income_statement from '../views/pages/reports/menus/income_statement/config/store';
import project_report from '../views/pages/reports/menus/project_report/config/store';

import assign_visit from '../views/pages/project_visit/menus/assign_visit/config/store';
import visit_history from '../views/pages/project_visit/menus/visit_history/config/store';

import project_payment from '../views/pages/project/menus/project_payment/config/store';

import contact_management_store from '../views/pages/contact_management/config/store';

import car_management_store from '../views/pages/project_visit/menus/car_management/config/store';  


const store = configureStore({
    reducer: {
        users: users.reducer,
        booking: booking.reducer,
        project: project.reducer,
        accounts: accounts.reducer,
        account_types: account_types.reducer,
        account_categories: account_categories.reducer,
        account_numbers: account_numbers.reducer,
        project_income: project_income.reducer,
        internal_income: internal_income.reducer,
        expense: expense.reducer,
        common_store: commonStore.reducer,
        debit_credit: debit_credit.reducer,
        // Reports 
        closing_balance: closing_balance.reducer,
        customer_report: customer_report.reducer,
        due_report: due_report.reducer,
        expense_statement: expense_statement.reducer,
        incentive_report: incentive_report.reducer,
        income_statement: income_statement.reducer,
        project_report: project_report.reducer,
        assign_visit: assign_visit.reducer,
        visit_history: visit_history.reducer,
        project_payment: project_payment.reducer,
        
        contact_management: contact_management_store.reducer,
        
        car_management: car_management_store.reducer,
    },
    devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export default store;
