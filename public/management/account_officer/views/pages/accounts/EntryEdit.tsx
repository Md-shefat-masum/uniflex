import React, { useEffect, useState } from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../store';
import { store } from './config/store/async_actions/store';
import Input from './components/management_data_page/Input';
import ProjectDropdown from '../project/components/dropdown/DropDown';
import UserDropdown from '../users/components/dropdown/DropDown';
import Select from './components/management_data_page/Select';
import numberToWords from 'number-to-words'
import axios from 'axios';
import moment from 'moment/moment';
import storeSlice from './config/store';
import { payment_entry_details } from './config/store/async_actions/payment_entry_details';
import { useParams } from 'react-router-dom';
import { initialState } from './config/store/inital_state';
import { useSelector } from 'react-redux';
import { update_and_approve } from './config/store/async_actions/update_and_approve';

export interface Props { }

const EntryEdit: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const [userDetails, setUserDetails] = useState<Record<string, any>>({});
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const params = useParams();

    useEffect(() => {
        dispatch(storeSlice.actions.set_item({}));
        dispatch(payment_entry_details({ id: params.id }) as any);
    }, []);

    async function handle_submit(e) {
        e.preventDefault();

        let conf = await (window as any).s_confirm("confirm and approve");
        if (!conf) return;

        const response = await dispatch(update_and_approve(new FormData(e.target)) as any);
        if (!Object.prototype.hasOwnProperty.call(response, 'error')) {
            // e.target.reset();
            // localStorage.setItem('booking', JSON.stringify(response.payload.data))
            // window.open("/print-payment-invoice?id=" + response.payload.data?.id, '_blank')
        }
    }

    function get_value(path: string, obj: any = state.item): any {
        try {
            return path.split('.').reduce((acc, key) => acc && acc[key], obj) || '';
        } catch (error) {
            return '';
        }
    }

    function set_amount_to_text(e) {
        if (e.target.value) {
            let amountInText = numberToWords.toWords(e.target.value);
            let el = document.querySelector('input[name="amount_in_text"') as HTMLInputElement;
            let el2 = document.querySelector('input[name="amount_in_text_bangla"') as HTMLInputElement;
            if (el) {
                el.value = amountInText + " TK only";
            }
            if (el2) {
                el2.value = (window as any).convertAmount(e.target.value).bn + " টাকা মাত্র";
            }
        }
    }

    function get_selected_user(data) {
        // console.log(data);
        if (data.ids) {
            axios.get('/api/v1/users/customer/' + data.ids)
                .then(res => {
                    // console.log(res.data);
                    setUserDetails(res.data.data);
                });
        }
    }

    return (
        <>
            {
                Object.keys(state.item).length &&
                <div className="page_content">
                    <div className="explore_window fixed_size">
                        <Header page_title={"Entry Correction"}></Header>
                        <div className="content_body custom_scroll">
                            <form
                                onSubmit={(e) => handle_submit(e)}
                                className="mx-auto pt-3"
                            >
                                {/* Project Information */}
                                <div>
                                    <h5 className="mb-4">Payment</h5>
                                    <div className="form_auto_fit">
                                        <div className="form-group form-vertical grid_full_width">
                                            <label>Customer</label>
                                            <UserDropdown
                                                name={"user_ids"}
                                                multiple={false}
                                                get_selected_data={get_selected_user}
                                                default_value={[get_value('user')]}
                                            />
                                        </div>
                                        <div className="grid_full_width pb-3">
                                            <table className="mb">
                                                <tbody>
                                                    <tr>
                                                        <th>Installment</th>
                                                        <td>
                                                            : {userDetails.installment_no}
                                                            <input type="hidden" name="id" value={params.id} />
                                                            <input type="hidden" name="installment_no" value={userDetails.installment_no} />
                                                            <input type="hidden" name="user_id" value={userDetails.user?.id} />
                                                            <input type="hidden" name="reference_user_id" value={userDetails.user?.mo} />
                                                            <input type="hidden" name="project_id" value={userDetails.user?.project_customer_information?.project_id} />
                                                            <input type="hidden" name="mo_id" value={userDetails.user?.mo} />
                                                            <input type="hidden" name="agm_id" value={userDetails.user?.agm} />
                                                            <input type="hidden" name="gm_id" value={userDetails.user?.gm} />
                                                            <input type="hidden" name="ed_id" value={userDetails.user?.ed} />
                                                            <input type="hidden" name="transaction_type" value={'income'} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Have To Pay</th>
                                                        <td>
                                                            : {userDetails.payable}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Total Paid</th>
                                                        <td>
                                                            : {userDetails.paid}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="form-group form-vertical">
                                            <Select
                                                label="Income Type"
                                                name="type"
                                                value={get_value('project_payment.type')}
                                                values={[
                                                    { text: '--select--', value: '' },
                                                    { text: 'Booking Money', value: 'booking_money' },
                                                    { text: 'Down Payments', value: 'down_payment' },
                                                    { text: 'Installment', value: 'installment' },
                                                ]}
                                            />
                                        </div>

                                        <div className="form-group form-vertical">
                                            <Select
                                                label="Payment By"
                                                name="account"
                                                value={get_value('account.title')}
                                                values={[
                                                    {
                                                        text: '--select--',
                                                        value: '',
                                                    },
                                                    {
                                                        text: 'Bank',
                                                        value: 'bank',
                                                    },
                                                    {
                                                        text: 'Cash',
                                                        value: 'cash',
                                                    },
                                                    {
                                                        text: 'Gateway',
                                                        value: 'surjopay',
                                                    },
                                                ]}
                                            />
                                        </div>

                                        <div className="form-group form-vertical" >
                                            <Input
                                                name={"receipt_no"}
                                                placeholder={""}
                                                type={"text"}
                                                label={"Payment Receipt"}
                                                value={get_value('project_payment.receipt_no')}
                                            />
                                        </div>
                                        <div className="form-group form-vertical">
                                            <label htmlFor="date">Payment Date</label>
                                            <div className="form_elements">
                                                <b className="form-control">
                                                    {new Date(get_value('date')).toDateString()}
                                                </b>
                                                <input type="hidden"
                                                    placeholder="date" name="date" id="date"
                                                    value={moment(get_value('date')).format('YYYY-MM-DD')} />
                                            </div>
                                        </div>
                                        {/* 
                                       

                                        <div className="form-group form-vertical" >
                                        <Input
                                            name={"date"}
                                            placeholder={""}
                                            type={"date"}
                                            label={"Payment Date"}
                                            value={new Date().toISOString().substr(0, 10)}
                                        />
                                    </div> */}
                                        <div className="form-group form-vertical" >
                                            <Input
                                                name={"amount"}
                                                placeholder={"payment amount"}
                                                type={"amount"}
                                                label={"Payment Amount"}
                                                value={get_value('amount')}
                                                callback={set_amount_to_text}
                                            />
                                        </div>

                                        <div className="form-group form-vertical">
                                            <Input
                                                name={'amount_in_text'}
                                                placeholder={'Amount In Text'}
                                                type={'text'}
                                                value={(window as any).convertAmount(get_value('amount')).en + " TK Only"}
                                                label={'Amount In Text'}
                                            />
                                        </div>

                                        <div className="form-group form-vertical">
                                            <Input
                                                name={'amount_in_text_bangla'}
                                                placeholder={'Amount In Bangla'}
                                                type={'text'}
                                                value={(window as any).convertAmount(get_value('amount')).bn + " টাকা মাত্র"}
                                                label={'Amount In Bangla'}
                                            />
                                        </div>

                                        <div className="form-group form-vertical">
                                            <Select
                                                label="Approval Status"
                                                name="is_approved"
                                                value={get_value('is_approved')}
                                                values={[
                                                    {
                                                        text: 'Pending',
                                                        value: '0',
                                                    },
                                                    {
                                                        text: 'Approved',
                                                        value: '1',
                                                    },
                                                    {
                                                        text: 'Cancel',
                                                        value: '2',
                                                    },
                                                ]}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group form-vertical">
                                        <label htmlFor="description">
                                            Description:
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows={5}
                                            cols={50}
                                        />
                                    </div>
                                </div>

                                <div className="form-group form-vertical">
                                    <div className="form_elements">
                                        <button className="btn btn_1 btn-outline-info">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <Footer></Footer>
                    </div>
                </div>
            }
        </>
    );
};

export default EntryEdit;
