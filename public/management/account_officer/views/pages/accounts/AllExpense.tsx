import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../store';
import { all } from './config/store/async_actions/all';
import setup from './config/setup';
import { initialState } from './config/store/inital_state';
import Header from './components/all_data_page/Header';
import TableFooter from './components/all_data_page/TableFooter';
import Paginate from '../../components/Paginate';
import Filter from './components/canvas/Filter';
import QuickView from './components/canvas/QuickView';
import storeSlice from './config/store';
import { anyObject } from '../../../common_types/object';
import TableRowAction from './components/all_data_page/TableRowAction';
import SelectItem from './components/all_data_page/SelectItem';
import SelectAll from './components/all_data_page/SelectIAll';
import TableHeading from './components/all_data_page/TableHeading';
import { all_expenses } from './config/store/async_actions/all_expenses';
import { approve_payment } from './config/store/async_actions/approve_payment';
import { all_incomes } from './config/store/async_actions/all_incomes';
import { Link } from 'react-router-dom';

export interface Props {}

const AllExpense: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            storeSlice.actions.set_select_fields(
                'id, account_id, account_number_id, user_id, account_category_id, uid, date, type, amount, status',
            ),
        );
        dispatch(all_expenses({}));
    }, []);

    function quick_view(data: anyObject = {}) {
        dispatch(storeSlice.actions.set_item(data));
        dispatch(storeSlice.actions.set_show_quick_view_canvas(true));
    }

    async function approve_payment_handler(i) {
        let conf = await (window as any).s_confirm('approve payment ' + i.amount);
        if (!conf) return;
        await dispatch(approve_payment({ id: i.id }) as any);
        await dispatch(storeSlice.actions.set_only_latest_data(true));
        await dispatch(all_expenses({}));
    }

    return (
        <div className="page_content">
            <div className="explore_window fixed_size">
                <Header title='All Expenses'></Header>

                <div className="content_body">
                    <div className="data_list">
                        <div className="table_responsive custom_scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th />
                                        <th>
                                            <SelectAll />
                                        </th>
                                        <TableHeading
                                            label={`ID`}
                                            col_name={`id`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`Status`}
                                            col_name={`is_approved`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`action`}
                                            col_name={`action`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`Amount`}
                                            col_name={`amount`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Amount Text`}
                                            col_name={`amount_in_text`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`Account`}
                                            col_name={`account_id`}
                                            sort={false}
                                        />
                                        {/* <TableHeading
                                            label={`Number`}
                                            col_name={`account_number_id`}
                                            sort={false}
                                        /> */}
                                        <TableHeading
                                            label={`User ID`}
                                            col_name={`uid`}
                                            sort={false}
                                        />
                                        <th>Image</th>
                                        <TableHeading
                                            label={`Name`}
                                            col_name={`name`}
                                            sort={false}
                                        />
                                        
                                        {/* <TableHeading
                                            label={`Project`}
                                            col_name={`project_id`}
                                            sort={false}
                                        /> */}
                                    </tr>
                                </thead>
                                <tbody id="all_list">
                                    {(state.all as any)?.data?.map(
                                        (i: { [key: string]: any }) => {
                                            return (
                                                <tr
                                                    key={i.id}
                                                    className={`table_rows table_row_${i.id}`}
                                                >
                                                    <td>
                                                        <TableRowAction
                                                            item={i}
                                                        >
                                                            <li>
                                                                <Link to={`/${setup.route_prefix}/edit-expense/${i.id}`}>
                                                                    Edit And Approve
                                                                </Link>
                                                            </li>   
                                                        </TableRowAction>
                                                    </td>
                                                    <td>
                                                        <SelectItem item={i} />
                                                    </td>
                                                    {/* ID  */}
                                                    <td>{i.id}</td>
                                                    <td>
                                                        {
                                                            i.is_approved == 0 ? <span className="border-warning text-warning border p-1">Pending</span> : ''
                                                        }
                                                        {
                                                            i.is_approved == 1 ? <span className="border-info text-info border p-1">Approved</span> : ''
                                                        }
                                                        {
                                                            i.is_approved == 2 ? <span className="border-danger text-danger border p-1">Canceled</span> : ''
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            i.is_approved == 0 ?
                                                                <button onClick={() => approve_payment_handler(i)} className="btn btn-sm btn-outline-info">
                                                                    Approve
                                                                </button>
                                                                : ""
                                                        }
                                                    </td>
                                                    <td>
                                                        {i.amount}
                                                    </td>
                                                    <td>
                                                        {i.amount_in_text}
                                                    </td>
                                                    <td>
                                                        {i.account?.title}
                                                    </td>
                                                    {/* <td>
                                                        {i.account_number?.number}
                                                    </td> */}

                                                    <td>{i.user?.uid}</td>
                                                    
                                                    <td>
                                                        <img
                                                            src={
                                                                i.user?.image
                                                                    ? `/${i.user?.image}`
                                                                    : '/assets/dashboard/images/avatar.png'
                                                            }
                                                            alt=""
                                                            style={{
                                                                height: 30,
                                                            }}
                                                        />
                                                    </td>
                                                    
                                                    <td>
                                                        <span
                                                            // className="quick_view_trigger"
                                                            // onClick={() =>
                                                            //     quick_view(i)
                                                            // }
                                                        >
                                                           {i.user?.name}
                                                        </span>
                                                    </td>
                                                    
                                                    {/* <td>
                                                        {i.project_payment?.project.title}
                                                    </td> */}
                                                    
                                                </tr>
                                            );
                                        },
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <Paginate
                            set_url={storeSlice.actions.set_url}
                            set_paginate={storeSlice.actions.set_paginate}
                            set_page={storeSlice.actions.set_page}
                            all={all_expenses}
                            data={state.all as any}
                            selected_paginate={state.paginate}
                        ></Paginate>
                    </div>
                </div>
                <TableFooter></TableFooter>
            </div>

            <Filter></Filter>
            <QuickView></QuickView>
        </div>
    );
};

export default AllExpense;
