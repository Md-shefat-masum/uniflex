import React from 'react';
import { createPortal } from 'react-dom';
import { RootState, useAppDispatch } from '../../../../../store';
import storeSlice from '../../config/store';
import { initialState } from '../../config/store/inital_state';
import { useSelector } from 'react-redux';
import setup from '../../config/setup';
export interface Props { }

const modalRoot = document.getElementById('filter-root');

const QuickView: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();

    function close_canvas(action: boolean = true) {
        dispatch(storeSlice.actions.set_show_quick_view_canvas(action));
    }

    function get_value(key) {
        try {
            if (state.item[key]) return state.item[key];
            if (state.item?.info[key]) return state.item?.info[key];
        } catch (error) {
            return '';
        }
        return '';
    }

    if (modalRoot && state.show_quick_view_canvas) {
        return createPortal(
            <div className="off_canvas quick_view">
                <div className="off_canvas_body">
                    <div className="header">
                        <h3 className="heading_text">Quick View</h3>
                        <button
                            className="close_button"
                            onClick={() => close_canvas(false)}
                        >
                            <span className="material-symbols-outlined fill">
                                close
                            </span>
                        </button>
                    </div>

                    <div className="data_content">
                        <table className="table quick_modal_table">
                            <tbody>
                                <tr>
                                    <td colSpan={3}>
                                        <div className="text-center">
                                            <img
                                                style={{ maxHeight: '150px', }}
                                                src={
                                                    state.item.image
                                                        ? `/${state.item.image}`
                                                        : ''
                                                }
                                            />
                                        </div>
                                    </td>
                                </tr>
                                {[
                                    {
                                        "name": "title",
                                        "label": "Project Title"
                                    },
                                    {
                                        "name": "location",
                                        "label": "Location"
                                    },
                                    {
                                        "name": "aveneue",
                                        "label": "Aveneue"
                                    },
                                    {
                                        "name": "plot",
                                        "label": "Plot"
                                    },
                                    {
                                        "name": "road",
                                        "label": "Road"
                                    },
                                    {
                                        "name": "per_share_cost",
                                        "label": "Per Share"
                                    },
                                    {
                                        "name": "description",
                                        "label": "Description"
                                    },
                                ]
                                    .map((i) => (
                                        <tr>
                                            <td>{i['label']}</td>
                                            <td>:</td>
                                            <td>{get_value(i['name'])}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="off_canvas_overlay"></div>
            </div>,
            modalRoot,
        );
    } else {
        return <></>;
    }
};

export default QuickView;
