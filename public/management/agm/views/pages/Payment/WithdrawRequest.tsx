import React, { useEffect, useState } from 'react';
import { RootState, useAppDispatch } from '../../../store';
import { anyObject } from '../../../common_types/object';
import axios from 'axios';
import { commnStoreInitialState } from '../../../store/slices/common_slice';
import { useSelector } from 'react-redux';
export interface Props { }

const WithdrawRequest: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const [balance, setBalance] = useState<anyObject>({});
    const state: typeof commnStoreInitialState = useSelector(
        (state: RootState) => state['common_store'],
    );

    useEffect(() => {
        get_data();
    }, []);

    async function get_data() {
        let user_id = (state.auth_user as any)?.user?.id;
        let response = await axios.get('/api/v1/users/'+user_id+'/insentive-calculation');
        // console.log(response);
        setBalance(response.data.data)
    }

    function get_amount(key) {
        if (balance[key]) {
            return (balance[key]?.toFixed(2)) + " TK";
        }
        return '';
    }
   
    function get_amount_number(key) {
        if (balance[key]) {
            return +(balance[key]);
        }
        return 0;
    }

    let available_amount = function(){
        let amount:any = get_amount_number('balance');
        amount = amount - get_amount_number('withdraw_pending');
        return amount;
    }

    function validate(e) {
        let amount:any = e.target.value;
        amount = +amount.replace(/\D/g, '');

        if(amount < 0 ){
            amount = 0;
        }
        if(amount > available_amount()){
            amount = available_amount();
        }

        e.target.value = amount;
    }

    async function submit_handler(e){
        e.preventDefault();
        let form_data = new FormData(e.target);
        form_data.append('user_id', (state.auth_user as any)?.user?.id);
        let res = await axios.post('/api/v1/account/logs/store-payment-request', form_data);
        get_data();
        (window as any).toaster('request submitted');
        e.target.reset();
    }

    return <div>
        <div className="row">
            <div className="col-12 mt-3">
                <div className="card height-equal w-100 equal-height-lg" style={{ minHeight: 463.375 }}>
                    <div className="card-header">
                        <h5>
                            Insentives
                        </h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={submit_handler} action="" className="mb-5">
                            <label>Enter Payout Amount</label>
                            <input onKeyUp={validate} onFocus={(e)=>e.target.value = available_amount()} type="text" className="form-control mb-2" name="amount" />
                            <button className="btn btn-info">Request</button>
                        </form>

                        <div className="height-scroll custom-scrollbar table-responsive">
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
                                    <tr>
                                        <td colSpan={8} className="text-right">
                                            Payment Request
                                        </td>
                                        <td className="text-right">
                                            {get_amount('withdraw_pending')}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>;
};
export default WithdrawRequest