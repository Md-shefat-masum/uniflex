import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../store';
import { all } from './config/store/async_actions/all';
import setup from './config/setup';
import { initialState } from './config/store/inital_state';
import Header from './components/all_data_page/Header';
import TableFooter from './components/all_data_page/TableFooter';
import Paginate from '../../components/Paginate';
import Filter from './components/canvas/Filter';
import QuickView from './components/canvas/QuickView';
import storeSlice from './config/store';
import { anyObject } from '../../../common_types/object';
import TableRowAction from './components/all_data_page/TableRowAction';
import SelectItem from './components/all_data_page/SelectItem';
import SelectAll from './components/all_data_page/SelectIAll';
import TableHeading from './components/all_data_page/TableHeading';

export interface Props {}

const All: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            storeSlice.actions.set_select_fields(
                'id, name, image',
            ),
        );
        dispatch(all({}));
    }, []);

    function quick_view(data: anyObject = {}) {
        dispatch(storeSlice.actions.set_item(data));
        dispatch(storeSlice.actions.set_show_quick_view_canvas(true));
    }

    return (
        <div className="page_content">
            <div className="explore_window fixed_size">
                <Header></Header>

                <div className="content_body">
                    <div className="data_list">
                        <div className="table_responsive custom_scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th />
                                        <th>
                                            <SelectAll />
                                        </th>
                                        <TableHeading
                                            label={`ID`}
                                            col_name={`id`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Customer ID`}
                                            col_name={`uid`}
                                            sort={true}
                                        />
                                        <th>Image</th>
                                        <TableHeading
                                            label={`Name`}
                                            col_name={`name`}
                                            sort={true}
                                        />
                                         <TableHeading
                                            label={`Project Name`}
                                            col_name={`project_name`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Share`}
                                            col_name={`share`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Payable Amount`}
                                            col_name={`payable_amount`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Paid`}
                                            col_name={`paid`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Due`}
                                            col_name={`Due`}
                                            sort={true}
                                        />
                                    </tr>
                                </thead>
                                <tbody id="all_list">
                                    {/* {(state.all as any)?.data?.map( */}
                                    {[
                                        {
                                            id: 1,
                                            
                                        }
                                    ].map(
                                        (i: { [key: string]: any }) => {
                                            return (
                                                <tr
                                                    key={i.id}
                                                    className={`table_rows table_row_${i.id}`}
                                                >
                                                    <td>
                                                        <TableRowAction
                                                            item={i}
                                                        />
                                                    </td>
                                                    <td>
                                                        <SelectItem item={i} />
                                                    </td>
                                                    {/* ID  */}
                                                    <td>{i.id}</td>
                                                    {/* Customer ID  */}
                                                    <td>{i.id}</td>
                                                    {/* Image  */}
                                                    <td>
                                                        <img
                                                            src={
                                                                i.image
                                                                    ? `/${i.image}`
                                                                    : '/assets/dashboard/images/avatar.png'
                                                            }
                                                            alt=""
                                                            style={{
                                                                height: 30,
                                                            }}
                                                        />
                                                    </td>
                                                    {/* Name  */}
                                                    <td>
                                                        <span
                                                            // className="quick_view_trigger"
                                                            // onClick={() =>
                                                            //     quick_view(i)
                                                            // }
                                                        >
                                                           Raseal Dunel
                                                        </span>
                                                    </td>
                                                    {/* Project Name  */}
                                                     <td>
                                                        <span
                                                            // className="quick_view_trigger"
                                                        >
                                                           Bashundhara Residential Area
                                                        </span>
                                                    </td>
                                                    {/* Share  */}
                                                     <td>
                                                        {Math.round(
                                                            Math.random() *
                                                                10000,
                                                        )}
                                                        /-
                                                    </td>
                                                    {/* Payabale Amount  */}
                                                     <td>
                                                        {Math.round(
                                                            Math.random() *
                                                                10000,
                                                        )}
                                                        /-
                                                    </td>
                                                    {/* Paid  */}
                                                     <td>
                                                        {Math.round(
                                                            Math.random() *
                                                                10000,
                                                        )}
                                                        /-
                                                    </td>
                                                    {/* Due  */}
                                                     <td>
                                                        {Math.round(
                                                            Math.random() *
                                                                10000,
                                                        )}
                                                        /-
                                                    </td>
                                                </tr>
                                            );
                                        },
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <Paginate
                            set_url={storeSlice.actions.set_url}
                            set_paginate={storeSlice.actions.set_paginate}
                            set_page={storeSlice.actions.set_page}
                            all={all}
                            data={state.all as any}
                            selected_paginate={state.paginate}
                        ></Paginate>
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
