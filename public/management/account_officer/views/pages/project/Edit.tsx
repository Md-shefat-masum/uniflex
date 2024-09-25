import React, { useEffect, useState } from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import { useSelector } from 'react-redux';
import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../store';
import { details } from './config/store/async_actions/details';
import { initialState } from './config/store/inital_state';
import { Link, useParams } from 'react-router-dom';
import storeSlice from './config/store';
import { update } from './config/store/async_actions/update';
import { anyObject } from '../../../common_types/object';
import Input from './components/management_data_page/Input';
import InputImage from './components/management_data_page/InputImage';
export interface Props { }

const Edit: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(storeSlice.actions.set_item({}));
        dispatch(details({ id: params.id }) as any);
    }, []);

    useEffect(() => {
        if (state.item?.reference_info) {
            dispatch(
                storeSlice.actions.set_selected([state.item.reference_info]),
            );
        }
    }, [state.item]);

    async function handle_submit(e) {
        e.preventDefault();
        const response = await dispatch(update(new FormData(e.target)) as any);
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
    function get_reference(): anyObject[] | [] {
        try {
            if (state.item.reference_info) return [state.item.reference_info];
        } catch (error) {
            return [];
        }
        return [];
    }
    const [entries, setEntries] = useState([
        { id: Date.now(), type: 'file', file: '', url: '', description: '' },
    ]);
    const addEntry = () => {
        setEntries([
            ...entries,
            { id: Date.now(), type: 'file', file: '', url: '', description: '' },
        ]);
    };

    const removeEntry = (id) => {
        setEntries(entries.filter((entry) => entry.id !== id));
    };

    const handleChange = (id, field, value) => {
        setEntries(
            entries.map((entry) =>
                entry.id === id ? { ...entry, [field]: value } : entry,
            ),
        );
    };

    const convertAmount = (selector, event) => {
        let el = document.getElementById(selector) as HTMLInputElement;
        if (el) {
            el.value = (window as any).convertAmount(event.target.value).bn;
        }
    };
    return (
        <>
            <div className="page_content">
                <div className="explore_window fixed_size">
                    <Header page_title={setup.edit_page_title}></Header>

                    {Object.keys(state.item).length && (
                        <div className="content_body custom_scroll">
                            <form
                                onSubmit={(e) => handle_submit(e)}
                                className="mx-auto pt-3"
                            >
                                <input
                                    type="hidden"
                                    name="id"
                                    defaultValue={state.item.id}
                                />
                                <div>
                                    <h5 className="mb-4">Personal Informations</h5>
                                    <div className="form_auto_fit">
                                        {[
                                            {
                                                name: 'uid',
                                                placeholder: 'Project ID',
                                                type: 'text',
                                                label: 'Project ID',
                                            },
                                            {
                                                name: 'title',
                                                placeholder: 'Project name',
                                                type: 'text',
                                                label: 'Project Name',
                                            },
                                            {
                                                name: 'location',
                                            },
                                            {
                                                name: 'aveneue',
                                            },
                                            {
                                                name: 'plot',
                                            },
                                            {
                                                name: 'road',
                                            },
                                            
                                            {
                                                name: 'video',
                                            },
                                            {
                                                name: 'per_share_plot_cost',
                                                onchange: function () {
                                                    convertAmount('per_share_plot_cost_in_text', event);
                                                }
                                            },
                                            {
                                                name: 'per_share_plot_cost_in_text',
                                            },
                                            {
                                                name: 'per_share_flat_cost',
                                                onchange: function () {
                                                    convertAmount('per_share_flat_cost_in_text', event);
                                                }
                                            },
                                            {
                                                name: 'per_share_flat_cost_in_text',
                                            },
                                        ].map((field) => (
                                            <div
                                                className="form-group form-vertical"
                                                key={field.name}
                                            >
                                                <Input
                                                    name={field.name}
                                                    placeholder={field.placeholder}
                                                    type={field.type}
                                                    label={field.label}
                                                    value={state.item[field.name]}
                                                    onChange={field.onchange || (() => '')}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="form-group form-vertical">
                                        <label htmlFor="description">
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            className="form-control"
                                            defaultValue={state.item.description}
                                        />
                                    </div>
                                    <div className="form-group grid_full_width form-vertical">
                                        <InputImage
                                            label={'image'}
                                            name={'image'}
                                            defalut_preview={state.item.image || null}
                                        />
                                    </div>
                                </div>

                                {/* Documents Repeater */}
                                <div className="d-none">
                                    <h5 className="mb-4">Documents</h5>
                                    {entries.map((entry, index) => (
                                        <div key={entry.id}>
                                            <div>
                                                {/* Button */}
                                                {entries.length > 1 && (
                                                    <i
                                                        style={{
                                                            float: 'right',
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={() =>
                                                            removeEntry(entry.id)
                                                        }
                                                        className="fa fa-trash"
                                                        aria-hidden="true"
                                                    ></i>
                                                )}
                                            </div>
                                            <div
                                                className="repeater-group form_auto_fit"
                                            >
                                                {/* Dropdown for type */}
                                                <div className="form-group form-vertical form_elements">
                                                    <label htmlFor={`type-${entry.id}`}>
                                                        Select Input Type:
                                                    </label>
                                                    <select
                                                        style={{ "width": "100%" }}
                                                        id={`type-${entry.id}`}
                                                        name={`type-${entry.id}`}
                                                        value={entry.type}
                                                        onChange={(e) =>
                                                            handleChange(
                                                                entry.id,
                                                                'type',
                                                                e.target.value,
                                                            )
                                                        }
                                                    >
                                                        <option value="file">File</option>
                                                        <option value="url">URL</option>
                                                    </select>
                                                </div>

                                                {/* Conditional File or URL input */}
                                                {entry.type === 'file' ? (
                                                    <div className="form-group form-vertical">
                                                        <Input
                                                            name={`file-${entry.id}`}
                                                            placeholder="Upload File"
                                                            type="file"
                                                            label="Upload File"
                                                            onChange={(e) =>
                                                                handleChange(
                                                                    entry.id,
                                                                    'file',
                                                                    e?.target
                                                                        ?.files?.[0],
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="form-group form-vertical">
                                                        <Input
                                                            label="Enter URL"
                                                            type="text"
                                                            name={`url-${entry.id}`}
                                                            placeholder="Enter URL"
                                                            value={entry.url}
                                                            onChange={(e) =>
                                                                handleChange(
                                                                    entry.id,
                                                                    'url',
                                                                    e.target.value,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                )}

                                                {/* Description */}
                                                <div className="form-group form-vertical">
                                                    <Input
                                                        name={`description-${entry.id}`}
                                                        placeholder="Enter Description"
                                                        type="text"
                                                        label="Description"
                                                        value={entry.description}
                                                        onChange={(e) =>
                                                            handleChange(
                                                                entry.id,
                                                                'description',
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Add Another */}

                                    <i
                                        style={{
                                            float: 'right',
                                            cursor: 'pointer',
                                        }}
                                        onClick={addEntry}
                                        className="fa fa-plus"
                                        aria-hidden="true"
                                    ></i>
                                </div>

                                {/* ....  */}

                                <div className="form-group form-vertical">
                                    <label></label>
                                    <div className="form_elements">
                                        <button className="btn btn-outline-info">
                                            submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                    <Footer>
                        {state?.item?.id && (
                            <li>
                                <Link
                                    to={`/${setup.route_prefix}/details/${state.item?.id}`}
                                    className="outline"
                                >
                                    <span className="material-symbols-outlined fill">
                                        visibility
                                    </span>
                                    <div className="text">Details</div>
                                </Link>
                            </li>
                        )}
                    </Footer>
                </div>
            </div>
        </>
    );
};


export default Edit;
