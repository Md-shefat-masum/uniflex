import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
export interface Props { }

const WithdrawRequest: React.FC<Props> = (props: Props) => {
    const [payments, setPayments] = useState<any>({});
    const [numbers, setNumbers] = useState<any>([]);
    const [selected_item, set_selected_item] = useState<any>(false);

    useEffect(() => {
        get_data();
        axios.get('/api/v1/account/numbers/all')
            .then(res => {
                setNumbers(res.data.data);
            });
    }, []);

    function get_data() {
        axios.get('/api/v1/account/logs/user-payout-history?get_all=1')
            .then(res => {
                setPayments(res.data.data);
            });
    }

    function search_handler(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        let params: any = {};
        formData.forEach((value, key) => {
            params[key] = value;
        });
        params.get_all = 1;
        axios.get('/api/v1/account/logs/user-payout-history', { params })
            .then(res => {
                setPayments(res.data.data);
            });
    }

    async function update_status(e) {
        e.preventDefault();
        let id = selected_item.id;
        let is_approved = "approved";
        let account_id = e.target.account_number_id.selectedOptions[0].dataset.account_id;
        let account_number_id = e.target.account_number_id.value;
        let amount_in_text = e.target.amount_in_text.value;
        let data = {
            id,
            is_approved,
            account_id,
            account_number_id,
            amount_in_text,
        }
        let con = await (window as any).s_confirm('confirm ' + 'approval');
        if (con) {
            axios.post('/api/v1/account/logs/update-payment-request', data)
                .then(res => {
                    (window as any).toaster('data ' + 'approved');
                    set_selected_item(false);
                    get_data();
                });
        }
    }

    async function cancel_request(id, is_approved) {
        let data = {
            id,
            is_approved,
        }
        let con = await (window as any).s_confirm('confirm ' + 'cancelation');
        if (con) {
            axios.post('/api/v1/account/logs/update-payment-request', data)
                .then(res => {
                    (window as any).toaster('data ' + 'canceled');
                });
        }
    }

    return <div className="page_content">
        <div className="row mt-5">
            <div className="col-12">
                {
                    selected_item &&
                    <div className="card" style={{ maxWidth: 360, position: 'absolute', top: 0, left: "50%", transform: "translateX(-50%)", zIndex: '999', border: "1px solid white" }}>
                        <div className="card-body">
                            <form onSubmit={(e) => update_status(e)}>
                                <div className="form-group">
                                    <label>Select Account</label>
                                    <select name='account_number_id' id="account_number_id" className='form-control'>
                                        {
                                            numbers.map((i, index) => {
                                                return <option selected={index === 0} key={i.id} data-account_id={i.account.id} value={i.id}>
                                                    {i.account.title}
                                                    &nbsp;-&nbsp;
                                                    {i.number}
                                                </option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>User</label>
                                    <h4>
                                        {selected_item?.user?.name}
                                    </h4>
                                </div>
                                <div className="form-group">
                                    <label>Amount</label>
                                    <input type="hidden" name="amount_in_text" value={(window as any).convertAmount(selected_item?.amount).bn} />
                                    <h4>
                                        {selected_item?.amount} <br />
                                        {
                                            (window as any).convertAmount(selected_item?.amount).bn
                                        } টাকা মাত্র <br />
                                    </h4>
                                </div>
                                <div>
                                    <button className="btn btn-info mr-2">
                                        Pay Insentive
                                    </button>
                                    <button type='button' onClick={() => set_selected_item(false)} className="btn btn-danger">
                                        Close
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                }

                <div className="card-header-right mb-4">
                    <form onSubmit={search_handler} className="d-flex align-items-center gap-2">
                        <input name='start_date' className="form-control" type="date" />
                        <span>To</span>
                        <input name='end_date' className="form-control" type="date" />
                        <select name="is_approved" className="form-control">
                            <option value={"pending"}> pending </option>
                            <option value={"approved"}> approved </option>
                            <option value={"canceled"}> canceled </option>
                        </select>
                        <button className="btn btn-info">Submit</button>
                    </form>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="card w-100" style={{ minHeight: 463.375 }}>
                    <div className="card-header">
                        <h5>
                            Payment Histories
                        </h5>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordernone">
                                <thead>
                                    <tr>
                                        <th scope="col" className="pt-0">Name</th>
                                        <th scope="col" className="pt-0">Date</th>
                                        <th scope="col" className="pt-0">Amount</th>
                                        <th scope="col" className="pt-0">Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        payments?.data?.map(el => {

                                            return (<tr>
                                                <td>
                                                    {el?.user?.name} - {el?.user?.uid}
                                                </td>
                                                <td className="digits">
                                                    {new Date(el.date).toDateString()}
                                                </td>
                                                <td className="digits">{el.amount} TK</td>
                                                <td>
                                                    {el.is_approved}
                                                </td>

                                                <td style={{ width: 120 }}>
                                                    {
                                                        el.is_approved == 'pending' && <div>
                                                            <button onClick={() => set_selected_item(el)} className='btn btn-info mr-2'>
                                                                Approve
                                                            </button>
                                                            <button onClick={() => cancel_request(el.id, 'canceled')} className="btn btn-danger">
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    }
                                                </td>

                                                {/* <td>
                                                    <a href={`/print-customer-payment-invoice?id=${el.id}`} target="_blank" className="btn btn-info">
                                                        Print
                                                    </a>
                                                </td> */}
                                            </tr>)
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default WithdrawRequest;
