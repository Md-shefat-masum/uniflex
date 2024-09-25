import React, { useEffect } from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import { useSelector } from 'react-redux';
import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../../../store';
import { details } from './config/store/async_actions/details';
import { initialState } from './config/store/inital_state';
import { Link, useParams } from 'react-router-dom';
import storeSlice from './config/store';
export interface Props { }

const Details: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(storeSlice.actions.set_item({}));
        dispatch(details({ id: params.id }) as any);
    }, []);

    function get_value(key) {
        try {
            if (state.item[key]) return state.item[key];
        } catch (error) {
            return '';
        }
        return '';
    }

    return (
        <>
            <div className="page_content">
                <div className="explore_window fixed_size">
                    <Header page_title={setup.details_page_title}></Header>

                    {Object.keys(state.item).length && (
                        <div className="content_body custom_scroll">
                            <table className="table quick_modal_table table-hover">
                                <tbody>
                                    <tr>
                                        <td>customer</td>
                                        <td>:</td>
                                        <td>{state.item.user_info?.name}</td>
                                    </tr>
                                    <tr>
                                        <td>reference</td>
                                        <td>:</td>
                                        <td>{state.item.reference_info?.name}</td>
                                    </tr>
                                    <tr>
                                        <td>project</td>
                                        <td>:</td>
                                        <td>{state.item.project_info?.title}</td>
                                    </tr>
                                    <tr>
                                        <td>amount</td>
                                        <td>:</td>
                                        <td>{state.item?.amount}</td>
                                    </tr>
                                    <tr>
                                        <td>amount</td>
                                        <td>:</td>
                                        <td>
                                            {(window as any).convertAmount(state.item.amount).bn}
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    )}

                    <Footer>
                        {state.item?.id && (
                            <li>
                                <a className="outline btn-outline-warning"
                                    target="_blank"
                                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                        e.preventDefault();
                                        localStorage.setItem('booking', JSON.stringify(state.item))
                                        window.open(e.currentTarget.href, '_blank')
                                    }}
                                    href={"/print-payment-invoice?id=" + state.item.id}>
                                    <span className="material-symbols-outlined fill">print</span>
                                    <div className="text">Print</div>
                                </a>
                            </li>
                        )}
                    </Footer>
                </div>
            </div>
        </>
    );
};

export default Details;
