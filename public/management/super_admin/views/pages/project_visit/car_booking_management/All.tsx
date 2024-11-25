import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../../store';
import { all } from './config/store/async_actions/all';
import setup from './config/setup';
import { initialState } from './config/store/inital_state';
import Header from './components/all_data_page/Header';
import TableFooter from './components/all_data_page/TableFooter';
import Paginate from '../../../components/Paginate';
import Filter from './components/canvas/Filter';
import QuickView from './components/canvas/QuickView';
import storeSlice from './config/store';
import TableRowAction from './components/all_data_page/TableRowAction';
import SelectItem from './components/all_data_page/SelectItem';
import SelectAll from './components/all_data_page/SelectIAll';
import TableHeading from './components/all_data_page/TableHeading';
import { useSearchParams } from 'react-router-dom';
import { anyObject } from '../../../../common_types/object';
import moment from 'moment/moment';
import Car from './CarComponent/Car';
import DateEl from '../../../components/DateEl';

export interface Props { }

const All: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();
    let [searchParams] = useSearchParams();

    useEffect(() => {
        dispatch(storeSlice.actions.set_role('all'));

        dispatch(
            storeSlice.actions.set_select_fields(
                'id,title,date,passenger_name,passenger_contact,status',
            ),
        );
        dispatch(all({}));
    }, [searchParams]);

    function quick_view(data: anyObject = {}) {
        dispatch(storeSlice.actions.set_item(data));
        dispatch(storeSlice.actions.set_show_quick_view_canvas(true));
    }

    return (
        <div className="page_content">
            <div className="explore_window fixed_size car_booking_body">
                <Header>
                    <DateEl name='date' 
                        value={moment().format('YYYY-MM-DD')} 
                        handler={() => ''} />
                </Header>

                <div className="content_body">
                    <div className="data_list">
                        <div className="table_responsive custom_scroll">
                            <div className="car_list">
                                <Car car_title="toyota 001" />
                                <Car car_title="toyota 002" />
                                <Car car_title="toyota 003" />
                                <Car car_title="toyota 004" />
                                <Car car_title="toyota 005" />
                            </div>
                        </div>
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
