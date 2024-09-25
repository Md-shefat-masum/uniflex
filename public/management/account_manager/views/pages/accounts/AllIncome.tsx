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
import { all_incomes } from './config/store/async_actions/all_incomes';

export interface Props { }

const All: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            storeSlice.actions.set_select_fields(
                'account_id, is_approved, account_number_id, user_id, account_category_id, uid, date, type, amount, creator, status, created_at, updated_at',
            ),
        );
        dispatch(all_incomes({}));
    }, []);

    function quick_view(data: anyObject = {}) {
        dispatch(storeSlice.actions.set_item(data));
        dispatch(storeSlice.actions.set_show_quick_view_canvas(true));
    }

    return (
        <div className="page_content">
            <div className="explore_window fixed_size">
                <Header title={"All Incomes"}></Header>

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
                                            label={`Amount`}
                                            col_name={`amount`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Customer ID`}
                                            col_name={`uid`}
                                            sort={false}
                                        />
                                        <th>Image</th>
                                        <TableHeading
                                            label={`Name`}
                                            col_name={`name`}
                                            sort={false}
                                        />
                                        
                                        <TableHeading
                                            label={`Account`}
                                            col_name={`account_id`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`Number`}
                                            col_name={`account_number_id`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`Project`}
                                            col_name={`project_id`}
                                            sort={false}
                                        />
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
                                                        />
                                                    </td>
                                                    <td>
                                                        <SelectItem item={i} />
                                                    </td>
                                                    {/* ID  */}
                                                    <td>{i.id}</td>
                                                    <td>
                                                        {
                                                            i.is_approved ?
                                                                <span className="border-success text-success border p-1">Approved</span>
                                                                : <span className="border-warning text-danger border p-1">Pending</span>
                                                        }
                                                    </td>
                                                    <td>
                                                        {i.amount} /-
                                                    </td>
                                                    {/* Customer ID  */}
                                                    <td>{i.user?.uid}</td>
                                                    {/* Image  */}
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
                                                    {/* Name  */}
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
                                                    
                                                    <td>
                                                        {i.account?.title}
                                                    </td>
                                                    <td>
                                                        {i.account_number?.number}
                                                    </td>
                                                    <td>
                                                        {i.project_payment?.project.title}
                                                    </td>

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
                            all={all_incomes}
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

export default All;
