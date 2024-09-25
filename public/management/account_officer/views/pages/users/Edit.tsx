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
import Input from './components/management_data_page/Input';
import InputImage from './components/management_data_page/InputImage';
import DropDown from './components/dropdown/DropDown';
import Select from './components/management_data_page/Select';
import { anyObject } from '../../../common_types/object';
import { NomineeType, set_nominee } from './helpers/nominee_helpers';
import Nominee from './components/Nominee';
export interface Props { }

const Edit: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );
    const [FormPageNominees, setFromPageNominees] = useState<NomineeType[]>([]);

    const dispatch = useAppDispatch();
    const params = useParams();

    useEffect(() => {
        init_nominee()
        dispatch(storeSlice.actions.set_item({}));
        dispatch(details({ id: params.id }) as any);
    }, []);

    function init_nominee() {
        setFromPageNominees([
            set_nominee(),
            set_nominee(),
        ]);
    }

    useEffect(() => {
        if (state.item?.reference_info) {
            dispatch(
                storeSlice.actions.set_selected([state.item.reference_info]),
            );
        }
        // console.log(state.item);
        if (state.item?.nominee_infos && state.item?.nominee_infos?.length) {
            setFromPageNominees(state.item?.nominee_infos.map(i => ({
                name: i.name,
                relation: i.relation,
                age: i.age,
                percentage: i.percentage,
                mobile_number: i.mobile_number,
            })));
        }
    }, [state.item]);

    async function handle_submit(e) {
        e.preventDefault();
        let form_data = new FormData(e.target);
        form_data.append('nominees', JSON.stringify(FormPageNominees));

        const response = await dispatch(update(form_data) as any);
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
    function get_relation_info(title): anyObject[] | [] {
        try {
            if (state.item[title]) return [state.item[title]];
        } catch (error) {
            return [];
        }
        return [];
    }

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
                                    defaultValue={get_value(`id`)}
                                />

                                <div>
                                    <h5 className="mb-4">
                                        Personal Informations
                                    </h5>
                                    <div className="form_auto_fit">
                                        <div className="form-group form-vertical">
                                            <Select
                                                label="Role"
                                                name="role"
                                                value={state.item.role}
                                                values={[
                                                    { text: 'Marketing', value: 'marketing' },
                                                    { text: 'Staff', value: 'staff' },
                                                    { text: 'Accountant', value: 'accountant' },
                                                    { text: 'HRM', value: 'hrm' },
                                                    { text: 'Management', value: 'management' },
                                                ]}
                                            />
                                        </div>
                                        <div className="form-group form-vertical">
                                            <Input
                                                name={'uid'}
                                                label="Employee ID"
                                                value={get_value("uid")}
                                            />
                                        </div>
                                        {[
                                            'name',
                                            'email',
                                            'father_name',
                                            'mother_name',
                                            'husband_spouse',
                                            'phone_number',
                                            'nid',
                                            'education',
                                            'permanent_address',
                                            'present_address',
                                        ].map((i) => (
                                            <div className="form-group form-vertical">
                                                <Input
                                                    name={i}
                                                    value={get_value(i)}
                                                />
                                            </div>
                                        ))}

                                        {/* <div className="form-group form-vertical">
                                            <Select
                                                value={state.item.designation}
                                                label="Designation"
                                                name="designation"
                                                values={[
                                                    { text: 'ED', value: 'ed' },
                                                    { text: 'GM', value: 'gm' },
                                                    {
                                                        text: 'AGM',
                                                        value: 'agm',
                                                    },
                                                    { text: 'MO', value: 'mo' },
                                                ]}
                                            />
                                        </div> */}

                                        <div className="form-group form-vertical">
                                            <Input name={'password'} />
                                        </div>

                                        <div className="form-group grid_full_width form-vertical">
                                            <InputImage
                                                label={'image'}
                                                name={'image'}
                                                defalut_preview={get_value("image")}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="mb-4">Nominee Informations</h5>
                                    {
                                        FormPageNominees.map((i, key) => (
                                            <div key={key}>
                                                <h6>Nominee {key + 1}</h6>
                                                <Nominee
                                                    FormPageNominees={FormPageNominees}
                                                    setFromPageNominees={setFromPageNominees}
                                                    nominee_index={key} />
                                            </div>

                                        ))
                                    }
                                </div>

                                <div>
                                    <h5 className="mb-4">Agent Positions</h5>
                                    <div className="form_auto_fit">

                                        <div className="form-group form-vertical">
                                            <Select
                                                label="Designation"
                                                name="designation"
                                                value={state.item.designation}
                                                values={[
                                                    { text: 'ED', value: 'ed' },
                                                    { text: 'GM', value: 'gm' },
                                                    { text: 'AGM', value: 'agm' },
                                                    { text: 'MO', value: 'mo' },
                                                ]}
                                            />
                                        </div>

                                        <div className="form-group form-vertical">
                                            <label>Joining Reference</label>
                                            <div className="form_elements">
                                                <DropDown
                                                    multiple={false}
                                                    get_selected_data={(result) => ''}
                                                    name={`reference`}
                                                    default_value={get_relation_info('reference_info')}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group form-vertical">
                                            <label>
                                                MO
                                            </label>
                                            <div className="form_elements">
                                                <DropDown
                                                    multiple={false}
                                                    get_selected_data={(result) => ''}
                                                    name={`mo`}
                                                    default_value={get_relation_info('mo_info')}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group form-vertical">
                                            <label>
                                                AGM
                                            </label>
                                            <div className="form_elements">
                                                <DropDown
                                                    multiple={false}
                                                    get_selected_data={(result) => ''}
                                                    name={`agm`}
                                                    default_value={get_relation_info('agm_info')}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group form-vertical">
                                            <label>
                                                GM
                                            </label>
                                            <div className="form_elements">
                                                <DropDown
                                                    multiple={false}
                                                    get_selected_data={(result) => ''}
                                                    name={`gm`}
                                                    default_value={get_relation_info('gm_info')}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group form-vertical">
                                            <label>
                                                ED
                                            </label>
                                            <div className="form_elements">
                                                <DropDown
                                                    multiple={false}
                                                    get_selected_data={(result) => ''}
                                                    name={`ed`}
                                                    default_value={get_relation_info('ed_info')}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="mb-4">Bank Informations</h5>
                                    <div className="form_auto_fit">
                                        {[
                                            'bank_name',
                                            'branch_name',
                                            'bank_account_no',
                                            'bank_routing_no',
                                            'mobile_banking_portal',
                                            'mobile_banking_ac_no',
                                        ].map((i) => (
                                            <div className="form-group form-vertical">
                                                <Input
                                                    name={i}
                                                    value={get_value(i)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

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
