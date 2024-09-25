import React, { useEffect, useState } from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import setup from './config/setup';
import { useAppDispatch } from '../../../store';
import { store_expense } from './config/store/async_actions/store_expense';
import Input from './components/management_data_page/Input';
import Select from './components/management_data_page/Select';
import { anyObject } from '../../../common_types/object';
import AccountNumberDropdown from './menus/accounts/account_numbers/components/dropdown/DropDown';
import AccountCategoryDropdown from './menus/accounts/account_categories/components/dropdown/DropDown';
import UserDropdown from '../users/components/dropdown/DropDown';
import moment from 'moment/moment';
export interface Props { }

const NewExpense: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const [accountNumbers, setAccountNumbers] = useState<anyObject[]>([]);

    async function handle_submit(e) {
        e.preventDefault();
        const response = await dispatch(store_expense(new FormData(e.target)) as any);
        if (!Object.prototype.hasOwnProperty.call(response, 'error')) {
            e.target.reset();
        }
    }

    return (
        <>
            <div className="page_content">
                <div className="explore_window fixed_size">
                    <Header page_title={"Entry new Expense"} back_url={'accounts/expense'}></Header>
                    <div className="content_body custom_scroll">
                        <form
                            onSubmit={(e) => handle_submit(e)}
                            className="mx-auto pt-3"
                        >
                            <div>

                                <input type="hidden" name="type" value="expense" />
                                <input type="hidden" name="account_id" value="" />

                                <div className="form_auto_fit">
                                    <div className="form-group form-vertical">
                                        <label>Select Account</label>
                                        <AccountNumberDropdown
                                            name="account_number_id"
                                            multiple={false}
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
                                            get_selected_data={(data) => {
                                                console.log(data);

                                            }}
                                        />
                                    </div>
                                    <div className="form-group form-vertical">
                                        <label htmlFor="date">Date</label>
                                        <div className="form_elements">
                                            <b className="form-control">
                                                {new Date().toDateString()}
                                            </b>
                                            <input type="hidden" placeholder="date" name="date" id="date" value={new Date().toISOString().substr(0, 10)} />
                                        </div>
                                    </div>
                                    {/* <div className="form-group form-vertical">
                                        <Input type="date" value={moment().format('YYYY-MM-DD')} name={"date"} />
                                    </div> */}

                                    <div className="form-group form-vertical">
                                        <Input name={"amount"} callback={(e) => {
                                            let el = document.querySelector('input[name="amount_in_text"]');
                                            if (el) {
                                                (el as HTMLInputElement).value = (window as any).convertAmount(e.target.value).en + " tk only";
                                            }
                                        }} />
                                    </div>
                                    <div className="form-group form-vertical">
                                        <Input name={"amount_in_text"} />
                                    </div>
                                    <div className="form-group grid-full-width form-vertical">
                                        <Input name={"expense_description"} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group form-vertical">
                                <label></label>
                                <div className="form_elements">
                                    <button className="btn btn_1 btn-outline-info">
                                        submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* <Footer></Footer> */}
                </div>
            </div>
        </>
    );
};

export default NewExpense;
