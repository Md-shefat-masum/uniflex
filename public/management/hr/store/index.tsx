import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import commonStore from './slices/common_slice';
import users from '../views/pages/users/config/store';

import assign_visit from '../views/pages/project_visit/menus/assign_visit/config/store';
import visit_history from '../views/pages/project_visit/menus/visit_history/config/store';


const store = configureStore({
    reducer: {
        users: users.reducer,
        common_store: commonStore.reducer,
        assign_visit: assign_visit.reducer,
        visit_history: visit_history.reducer,
    },
    devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export default store;
