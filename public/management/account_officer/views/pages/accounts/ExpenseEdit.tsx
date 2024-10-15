import React, { useEffect, useState } from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../store';
import { store } from './config/store/async_actions/store';
import Input from './components/management_data_page/Input';
import ProjectDropdown from '../project/components/dropdown/DropDown';
import AccountNumberDropdown from './menus/accounts/account_numbers/components/dropdown/DropDown';
import AccountCategoryDropdown from './menus/accounts/account_categories/components/dropdown/DropDown';
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
import { update_and_approve_expense } from './config/store/async_actions/update_and_approve_expense';

export interface Props { }

const ExpenseEdit: React.FC<Props> = (props: Props) => {
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

        const response = await dispatch(update_and_approve_expense(new FormData(e.target)) as any);
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

    return (
        <>
            {
                Object.keys(state.item).length &&
                <div className="page_content">
                    <div className="explore_window fixed_size">
                        <Header page_title={"Expense Correction"}></Header>
                        <div className="content_body custom_scroll">
                            <form
                                onSubmit={(e) => handle_submit(e)}
                                className="mx-auto pt-3"
                            >
                                <div>

                                    <input type="hidden" name="id" value={get_value('id')} />
                                    <input type="hidden" name="type" value="expense" />
                                    <input type="hidden" name="account_id" value={get_value('account_id')} />

                                    <div className="form_auto_fit">
                                        <div className="form-group form-vertical">
                                            <label>Select Account</label>
                                            <AccountNumberDropdown
                                                name="account_number_id"
                                                multiple={false}
                                                default_value={[get_value('account_number')]}

                                                get_selected_data={(data) => {
                                                    // console.log(data);
                                                    let el = document.querySelector('input[name="account_id"]');
                                                    if (el && data.selectedList.length) {
                                                        (el as HTMLInputElement).value = data.selectedList[0].account_id;
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="form-group form-vertical">
                                            <label>Select Category</label>
                                            <AccountCategoryDropdown
                                                name="account_category_id"
                                                multiple={false}
                                                default_value={[get_value('category')]}
                                                get_selected_data={(data) => {
                                                    // console.log(data);

                                                }}
                                            />
                                        </div>
                                        <div className="form-group form-vertical">
                                            <label>Select User</label>
                                            <UserDropdown
                                                name="user_id"
                                                multiple={false}
                                                default_value={[get_value('user')]}
                                                get_selected_data={(data) => {
                                                    console.log(data);

                                                }}
                                            />
                                        </div>
                                        <div className="form-group form-vertical">
                                            <label htmlFor="date">Date</label>
                                            <div className="form_elements">
                                                <b className="form-control">
                                                    {new Date(get_value('date')).toDateString()}
                                                </b>
                                                <input type="hidden" placeholder="date" name="date" id="date"
                                                    value={get_value('date')} />
                                            </div>
                                        </div>
                                        {/* <div className="form-group form-vertical">
                                            <Input type="date" value={moment().format('YYYY-MM-DD')} name={"date"} />
                                        </div> */}

                                        <div className="form-group form-vertical">
                                            <Input name={"amount"}
                                                value={get_value('amount')}
                                                callback={(e) => {
                                                    let el = document.querySelector('input[name="amount_in_text"]');
                                                    if (el) {
                                                        (el as HTMLInputElement).value = (window as any).convertAmount(e.target.value).en + " tk only";
                                                    }
                                                }} />
                                        </div>
                                        <div className="form-group form-vertical">
                                            <Input name={"amount_in_text"} value={(window as any).convertAmount(get_value('amount')).en + " tk only"} />
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
                                    <div className="form-group grid-full-width form-vertical">
                                        <Input name={"expense_description"} value={get_value('description')} />
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

export default ExpenseEdit;
