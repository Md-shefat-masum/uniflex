import React, { useEffect, useState } from 'react'
import axios from 'axios';

function DebitCredit() {

    const [logs, setLog] = useState<any>({})

    useEffect(() => {
        axios.get('/api/v1/account/logs/debit-credit')
            .then(res => {
                setLog(res.data.data)
            })
    }, []);

    function search_handler(e) {
        e.preventDefault();
        let start_date = e.target.start_date.value;
        let end_date = e.target.end_date.value;
        axios.get('/api/v1/account/logs/debit-credit?' + 'start_date=' + start_date + '&end_date=' + end_date)
            .then(res => {
                setLog(res.data.data)
            })
    }

    let final_amount = 0;
    let final_debit = 0;
    let final_credit = 0;

    function get_final_amount(item) {

        if (final_credit == 0) final_credit = logs.prev_credit;
        if (final_debit == 0) final_debit = logs.prev_debit || 0;
        if (final_amount == 0) final_amount = (logs.prev_credit - logs.prev_debit) || 0;

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
                <div className="action_bar">
                    <div className="navigation">
                        <form onSubmit={search_handler} className="d-flex gap-2 align-items-center">
                            <input type="date" id="start_date" name="start_date" className="form-control" />
                                TO
                            <input type="date" id="end_date" name="end_date" className="form-control" />
                            <button className="btn btn-sm btn-outline-info">
                                <i className="fa fa-search"></i>
                            </button>
                        </form>
                    </div>
                    <div className="title no_move">
                        <h5>Debit Credit</h5>
                    </div>
                    <div className="control"></div>
                </div>

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
                                        <td>{logs.prev_debit} </td>
                                        <td>{logs.prev_credit} </td>
                                        <td>{logs.prev_credit - logs.prev_debit} </td>
                                    </tr>
                                    {logs?.data?.map((log: { [key: string]: any }) => {
                                        return (
                                            <tr>
                                                <td></td>
                                                <td>{log.id}</td>
                                                <td>{log.category.title}</td>
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

                        {/* <Paginate
                            set_url={storeSlice.actions.set_url}
                            set_paginate={storeSlice.actions.set_paginate}
                            set_page={storeSlice.actions.set_page}
                            all={all}
                            data={state.all as any}
                            selected_paginate={state.paginate}
                        ></Paginate> */}
                    </div>
                </div>
                {/* <TableFooter></TableFooter> */}
            </div>

            {/* <Filter></Filter>
            <QuickView></QuickView> */}
        </div>
    );
}

export default DebitCredit