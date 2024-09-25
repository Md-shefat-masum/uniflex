import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { projectPayment } from '../../../dummy.js';
// import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../../../store';
import { all } from './config/store/async_actions/all';
import setup from './config/setup';
import { initialState } from './config/store/inital_state';
import Header from './components/all_data_page/Header';
import TableFooter from './components/all_data_page/TableFooter';
import Paginate from '../../../../components/Paginate';
import Filter from './components/canvas/Filter';
import QuickView from './components/canvas/QuickView';
import storeSlice from './config/store';
import { anyObject } from '../../../../../common_types/object';
import SelectAll from './components/all_data_page/SelectIAll';
import TableHeading from './components/all_data_page/TableHeading';
import TableRowAction from './components/all_data_page/TableRowAction';
import SelectItem from './components/all_data_page/SelectItem';
export interface Props { }

const All: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            storeSlice.actions.set_select_fields(
                'id,project_id,user_id,reference_user_id,account_log_id,date,amount,type,status,creator',
            ),
        );
        dispatch(all({}));
    }, []);

    function quick_view(data: anyObject = {}) {
        dispatch(storeSlice.actions.set_item(data));
        dispatch(storeSlice.actions.set_show_quick_view_canvas(true));
    }

    return (
        <div className="page_content">
            <div className="explore_window fixed_size">
                <Header></Header>

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
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Project Name`}
                                            col_name={`project_name`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`Customer`}
                                            col_name={`customer_id`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`Payment Type`}
                                            col_name={`payment_type`}
                                            sort={false}
                                        />
                                        <TableHeading
                                            label={`Amount`}
                                            col_name={`amount`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Date`}
                                            col_name={`date`}
                                            sort={true}
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
                                                   
                                                    <td>
                                                        <a className="outline btn-outline-warning d-flex"
                                                            target="_blank"
                                                            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                                                e.preventDefault();
                                                                localStorage.setItem('booking', JSON.stringify(state.item))
                                                                window.open(e.currentTarget.href, '_blank')
                                                            }}
                                                            href={"/print-payment-invoice?id=" + i.id}>
                                                            <span className="material-symbols-outlined fill">print</span>
                                                            <div className="text"> {i.id} </div>
                                                        </a>
                                                    </td>
                                                    <td>
                                                        {i.project_info?.title}
                                                    </td>
                                                    <td>{i.user_info?.name}</td>
                                                    <td>{i.type}</td>
                                                    <td>{i.amount}</td>
                                                    <td>{new Date(i.date).toDateString()}</td>
                                                   
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
                            all={all}
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
