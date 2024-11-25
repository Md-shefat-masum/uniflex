import React, { useEffect, useState } from 'react';
import { RootState, useAppDispatch } from '../../store';
import { anyObject } from '../../common_types/object';
import axios from 'axios';
import { useSelector } from 'react-redux';
export interface Props { }

const T1: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const [balance, setBalance] = useState<anyObject>({});

    const common_store = useSelector((state: RootState) => state['common_store']);
    const [user, setUser] = useState<anyObject>({})
    useEffect(() => {
        setUser((common_store as anyObject)?.auth_user)
    }, [common_store.auth_user])

    useEffect(() => {
        get_data();
    }, []);

    async function get_data() {
        let response = await axios.get('/api/v1/users/34/insentive-calculation');
        // console.log(response);
        setBalance(response.data.data)
    }

    function get_amount(key) {
        if (balance[key]) {
            return (balance[key]?.toFixed(2)) + " TK";
        }
        return '';
    }

    return <div>
        <div className="row">
            <div className="col-12">
                <div className="card mt-4 height-equal w-100 equal-height-lg" style={{ minHeight: 463.375 }}>
                    <div className="card-header">
                        <h5>
                            Todays Insentives
                        </h5>
                        <div className="card-header-right">
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="height-scroll custom-scrollbar">
                            <table className="table text-center table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col" colSpan={2} className="">Booking Money</th>
                                        <th scope="col" colSpan={2} className="">Down Payment</th>
                                        <th scope="col" colSpan={2} className="">Installment</th>
                                        <th scope="col" colSpan={2} className="">Reference</th>
                                        <th scope="col" className=""></th>
                                    </tr>
                                    <tr>
                                        <th>Previous</th>
                                        <th>Today</th>

                                        <th>Previous</th>
                                        <th>Today</th>

                                        <th>Previous</th>
                                        <th>Today</th>

                                        <th>Previous</th>
                                        <th>Today</th>

                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="digits">
                                            {get_amount('prev_booking_money')}
                                        </td>
                                        <td className="digits">
                                            {get_amount('today_booking_money')}
                                        </td>

                                        <td className="digits">
                                            {get_amount('prev_down_payment')}
                                        </td>
                                        <td className="digits">
                                            {get_amount('today_down_payment')}
                                        </td>

                                        <td className="digits">
                                            {get_amount('prev_installment')}
                                        </td>
                                        <td className="digits">
                                            {get_amount('today_installment')}
                                        </td>

                                        <td className="digits">
                                            {get_amount('prev_reference_amount')}
                                        </td>
                                        <td className="digits">
                                            {get_amount('today_reference_amount')}
                                        </td>

                                        <td className="text-right">
                                            {get_amount('total_insentive')}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={8} className="text-right">
                                            ( - ) withdraw
                                        </td>
                                        <td className="text-right">
                                            {get_amount('total_withdraw')}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={8} className="text-right">
                                            Balance
                                        </td>
                                        <td className="text-right">
                                            {get_amount('balance')}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <table className="table" style={{ maxWidth: 200, }}>
                            <tbody>
                                <tr>
                                    <td>MO</td>
                                    <td>
                                        {user?.total_mo}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Customer</td>
                                    <td>
                                        {user?.total_customer}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>;
};

export default T1;
