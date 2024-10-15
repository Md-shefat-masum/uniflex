import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../../../../store';
import { all } from './config/store/async_actions/all';
import setup from './config/setup';
import { initialState } from './config/store/inital_state';
import Header from './components/all_data_page/Header';
import TableFooter from './components/all_data_page/TableFooter';
import Paginate from '../../../../../components/Paginate';
import Filter from './components/canvas/Filter';
import QuickView from './components/canvas/QuickView';
import storeSlice from './config/store';
import { anyObject } from '../../../../../../common_types/object';
import SelectAll from './components/all_data_page/SelectIAll';
import TableHeading from './components/all_data_page/TableHeading';
import axios from 'axios';

export interface Props { }

const All: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();

    const [logs, setLog] = useState<anyObject[]>([])

    useEffect(() => {
        // dispatch(
        //     storeSlice.actions.set_select_fields(
        //         'id, name, email, image, status',
        //     ),
        // );
        // dispatch(all({}));
        axios.get('/api/v1/account/logs/debit-credit')
            .then(res => {
                setLog(res.data.data)
            })
    }, []);

    function quick_view(data: anyObject = {}) {
        dispatch(storeSlice.actions.set_item(data));
        dispatch(storeSlice.actions.set_show_quick_view_canvas(true));
    }

    interface data {
        [key: string]: any;
    }

    let final_amount = 0;
    let final_debit = 0;
    let final_credit = 0;

    function get_final_amount(item) {
        if (item.type == 'income') {
            final_amount += item.amount;
            final_credit += item.amount
        } else {
            final_amount -= item.amount;
            final_debit += item.amount
        }
        return final_amount;
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
                                        <th></th>
                                        <th>Serial</th>
                                        <th>Purpose</th>
                                        <th>Name</th>
                                        <th>Date</th>
                                        <th>Amount in Text</th>
                                        <th>Debit</th>
                                        <th>Credit</th>
                                        <th>Balance</th>
                                    </tr>
                                </thead>
                                <tbody id="all_list">
                                    <tr>
                                        <td colSpan={5}></td>
                                        <td>Closing Balance</td>
                                        <td>{final_debit} </td>
                                        <td>{final_credit} </td>
                                        <td>{final_amount} </td>
                                    </tr>
                                    {logs?.map((log: { [key: string]: any }) => {
                                        return (
                                            <tr>
                                                <td></td>
                                                <td>{log.id}</td>
                                                <td>{log.category?.title}</td>
                                                <td>{log.user?.name}</td>
                                                <td>{new Date(log.date).toDateString()}</td>
                                                <td>{log.amount_in_text}</td>
                                                <td>
                                                    {
                                                        log.type == 'expense' ?
                                                            log.amount :
                                                            0
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        log.type == 'income' ?
                                                            log.amount :
                                                            0
                                                    }
                                                </td>
                                                <td>
                                                    {get_final_amount(log)}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    <tr>
                                        <td colSpan={5}></td>
                                        <td>Total:</td>
                                        <td>dbt : {final_debit} </td>
                                        <td>Cr : {final_credit} </td>
                                        <td>Bal : {final_amount} </td>
                                    </tr>
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
