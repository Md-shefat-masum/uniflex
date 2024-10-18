import React, { useEffect, useState } from 'react';
import Input from './components/Input';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { anyObject } from '../../../common_types/object';
export interface Props { }

const CustomerPaymentHistory: React.FC<Props> = (props: Props) => {
    let param = useParams();
    const [payments, setPayments] = useState<any>([]);

    useEffect(() => {
        axios.get('/api/v1/project/payments/customer/' + param.customer_id)
            .then(res => {
                setPayments(res.data.data);
            })
    }, []);

    function search_handler(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        let params:any = {};
        formData.forEach((value, key) => {
            params[key] = value;
        });
        axios.get('/api/v1/project/payments/customer/'+ param.customer_id,{params})
            .then(res => {
                setPayments(res.data.data);
            });
    }

    return <div className="page_content">
        <div className="row mt-5">
            <div className="col-12">
                <div className="card-header-right mb-4">
                    <form onSubmit={search_handler} className="d-flex align-items-center gap-2">
                        <input name='start_date' className="form-control" type="date" />
                        <span>To</span>
                        <input name='end_date' className="form-control" type="date" />
                        <button className="btn btn-info">Submit</button>
                    </form>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="card w-100" style={{ minHeight: 463.375 }}>
                    <div className="card-header">
                        <h5>
                            Customers Payment History
                        </h5>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordernone">
                                <thead>
                                    <tr>
                                        <th scope="col" className="pt-0">Date</th>
                                        <th scope="col" className="pt-0">Amount</th>
                                        {/* <th></th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        payments?.map(el => {

                                            return (<tr>
                                                <td className="digits">
                                                    {new Date(el.date).toDateString()}
                                                </td>
                                                <td className="digits">{el.amount} TK</td>
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

export default CustomerPaymentHistory;
