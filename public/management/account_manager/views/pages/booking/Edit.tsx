import React, { useEffect, useState } from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import setup from './config/setup';
import { useAppDispatch, RootState } from '../../../store';
import { store } from './config/store/async_actions/store';
import DropDown from './components/dropdown/DropDown';
import { Link, useParams } from 'react-router-dom';
import ProjectDropDown from '../project/components/dropdown/DropDown';
import UserDropDown from '../users/components/dropdown/DropDown';
import Input from './components/management_data_page/Input';
import Select from './components/management_data_page/Select';
import InputImage from './components/management_data_page/InputImage';
import { useSelector } from 'react-redux';
import { initialState } from './config/store/inital_state';
import { details } from './config/store/async_actions/details';
import storeSlice from './config/store';
import { update } from './config/store/async_actions/update';
import { anyObject } from '../../../common_types/object';
import CreateBookingPropertyInformations from './helpers/CreateBookingPropertyInformations';
import CreateBookingPaymentInfo from './helpers/CreateBookingPaymentInfo';
import CreateBookingBankPayment from './helpers/CreateBookingBankPayment';
import CreateBookingWetness from './helpers/CreateBookingWetness';
export interface Props { }

const Create: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );
    const [moInfo, setMoInfo] = useState<anyObject>({});
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
        let customer_information = {};
        try {
            customer_information = JSON.parse(state.item?.details.customer_informations);
        } catch (error) {
            // console.error(error);
            customer_information = state.item?.details.customer_informations;
        }

        try {
            if (state.item[key]) {
                return state.item[key];
            }
            else if (state.item?.customer[key]) {
                return state.item?.customer[key];
            }
            else if (customer_information[key]) {
                return customer_information[key];
            };
        } catch (error) {
            console.error(key, error, state.item);
            return '';
        }
        return '';
    }

    function get_relation(key): anyObject[] | [] {
        try {
            if (state.item[key]) return [state.item[key]];
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
                                <input type="hidden" name="id" defaultValue={state.item.id} />
                                {/* Booking type  */}
                                <div>
                                    <div className="form_auto_fit">
                                        <div className="form-group form-vertical">
                                            <Select
                                                label="Booking Type"
                                                name="booking_type"
                                                value={get_value('booking_type')}
                                                values={[
                                                    { text: '--select--', value: '' },
                                                    { text: 'FLAT', value: 'flat' },
                                                    { text: 'PLOT', value: 'plot' },
                                                ]}
                                            />
                                        </div>
                                        <div className="form-group form-vertical">
                                            <label>Project</label>
                                            <ProjectDropDown default_value={get_relation('project')} multiple={false} name={"project_id"} />
                                        </div>
                                        <div className="form-group form-vertical">
                                            <label>Reference</label>
                                            <UserDropDown default_value={get_relation('reference')} multiple={false} name={"reference_user_id"} />
                                        </div>
                                        <div className="form-group form-vertical">
                                            <label>MO</label>
                                            <UserDropDown default_value={get_relation('mo')} multiple={false} name={"mo_id"} get_selected_data={(data) => {
                                                // console.log(data);
                                                data.selectedList.length &&
                                                    setMoInfo(data.selectedList[0]);
                                            }} />
                                        </div>
                                        <div className="form-group form-vertical">
                                            <label>AGM</label>
                                            <div className="form-control">
                                                {moInfo.agm_info?.uid} -
                                                {moInfo.agm_info?.name}
                                            </div>
                                            <input type="hidden" name="agm_id" value={`[${moInfo.agm}]`} />
                                            {/* <UserDropDown multiple={false} name={"agm_id"} /> */}
                                        </div>
                                        <div className="form-group form-vertical">
                                            <label>GM</label>
                                            <div className="form-control">
                                                {moInfo.gm_info?.uid} -
                                                {moInfo.gm_info?.name}
                                            </div>
                                            <input type="hidden" name="gm_id" value={`[${moInfo.gm}]`} />
                                            {/* <UserDropDown multiple={false} name={"gm_id"} /> */}
                                        </div>
                                        <div className="form-group form-vertical">
                                            <label>ED</label>
                                            <div className="form-control">
                                                {moInfo.ed_info?.uid} -
                                                {moInfo.ed_info?.name}
                                            </div>
                                            <input type="hidden" name="ed_id" value={`[${moInfo.ed}]`} />
                                            {/* <UserDropDown multiple={false} name={"ed_id"} /> */}
                                        </div>
                                    </div>
                                </div>
                                {/* Personal Information  */}
                                <div>
                                    <h5 className="mb-4">Personal Informations</h5>
                                    <div className="form_auto_fit">
                                        {[
                                            {
                                                name: 'customer_id',
                                                placeholder: 'Customer ID',
                                                type: 'text',
                                                label: 'Customer ID',
                                            },
                                            {
                                                name: 'customer_password',
                                                placeholder: 'Customer Login Password',
                                                label: 'Customer Login Password',
                                                type: 'text',
                                            },

                                            {
                                                name: 'application_date',
                                                placeholder:
                                                    'Enter application date',
                                                type: 'date',
                                                label: 'Application Date',
                                            },
                                            {
                                                name: 'applicant_name_english',
                                                placeholder:
                                                    "Enter applicant's name in English",
                                                type: 'text',
                                                label: "Applicant's Name",
                                            },
                                            {
                                                name: 'father_name_english',
                                                placeholder:
                                                    "Enter father's name",
                                                type: 'text',
                                                label: "Father's Name",
                                            },
                                            {
                                                name: 'mother_name_english',
                                                placeholder:
                                                    "Enter mother's name",
                                                type: 'text',
                                                label: "Mother's Name",
                                            },
                                            {
                                                name: 'husband_wife_name_english',
                                                placeholder:
                                                    "Enter husband/wife's name",
                                                type: 'text',
                                                label: "Husband/Wife's Name",
                                            },
                                            {
                                                name: 'email',
                                                placeholder: 'Enter email',
                                                type: 'email',
                                                label: 'Email',
                                            },
                                            {
                                                name: 'current_address_english',
                                                placeholder:
                                                    'Enter current address in English',
                                                type: 'text',
                                                label: 'Current Address',
                                            },
                                            {
                                                name: 'permanent_address_english',
                                                placeholder:
                                                    'Enter permanent address in English',
                                                type: 'text',
                                                label: 'Permanent Address',
                                            },
                                            {
                                                name: 'date_of_birth',
                                                placeholder: 'Enter date of birth',
                                                type: 'date',
                                                label: 'Date of Birth',
                                            },
                                            {
                                                name: 'mobile',
                                                placeholder: 'Enter mobile number',
                                                type: 'tel',
                                                label: 'Mobile',
                                            },
                                            {
                                                name: 'national_id_passport_no',
                                                placeholder:
                                                    'Enter national ID No. / Passport No.',
                                                type: 'text',
                                                label: 'National ID No. / Passport No.',
                                            },
                                            {
                                                name: 'emergency_mobile_no',
                                                placeholder:
                                                    'Enter emergency mobile number',
                                                type: 'tel',
                                                label: 'Emergency Mobile No.',
                                            },
                                            {
                                                name: 'nationality',
                                                placeholder: 'Enter nationality',
                                                type: 'text',
                                                label: 'Nationality',
                                            },
                                            {
                                                name: 'religion',
                                                placeholder: 'Enter religion',
                                                type: 'text',
                                                label: 'Religion',
                                            },
                                            {
                                                name: 'tin_no',
                                                placeholder: 'Enter TIN No.',
                                                type: 'text',
                                                label: 'TIN No.',
                                            },
                                            {
                                                name: 'profession',
                                                placeholder: 'Enter profession',
                                                type: 'text',
                                                label: 'Profession',
                                            },
                                            {
                                                name: 'customer_image',
                                                placeholder: 'Customer photo',
                                                type: 'file',
                                                label: 'Customer photo',
                                                value_key: 'image'
                                            },
                                            {
                                                name: 'customer_signature',
                                                placeholder: 'Customer Signature',
                                                type: 'file',
                                                label: 'Customer Signature',
                                                value_key: 'customer_signature'
                                            },
                                        ].map((field: anyObject) => (
                                            <div
                                                className="form-group form-vertical"
                                                key={field.name}
                                            >
                                                <Input
                                                    name={field.name}
                                                    placeholder={field.placeholder}
                                                    type={field.type}
                                                    label={field.label}
                                                    value={get_value(field.value_key || field.name)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Nominee's Information  */}
                                <div>
                                    <h5 className="mb-4">Nominee's Information</h5>
                                    {/* 1st  */}
                                    <div className="form_auto_fit">
                                        {[
                                            {
                                                name: 'nominee_name_1',
                                                placeholder:
                                                    "Enter nominee's name (1st)",
                                                type: 'text',
                                                label: "Nominee's Name (1st)",
                                            },
                                            {
                                                name: 'relationship_with_applicant_1',
                                                placeholder:
                                                    'Enter relationship with applicant (1st)',
                                                type: 'text',
                                                label: 'Relationship with Applicant (1st)',
                                            },
                                            {
                                                name: 'nominee_telephone_no_1',
                                                placeholder:
                                                    "Enter nominee's telephone no. (1st)",
                                                type: 'tel',
                                                label: "Nominee's Telephone No. (1st)",
                                            },
                                            {
                                                name: 'nominee_share_1',
                                                placeholder:
                                                    "Enter nominee's share (1st)",
                                                type: 'text',
                                                label: "Nominee's Share (1st)",
                                            },
                                            {
                                                name: 'nominee_photo_1',
                                                placeholder:
                                                    "Upload nominee's photo (1st)",
                                                type: 'file',
                                                label: "Nominee's Photo (1st)",
                                            },
                                        ].map((field: anyObject) => (
                                            <div
                                                className="form-group form-vertical"
                                                key={field.name}
                                            >
                                                <Input
                                                    name={field.name}
                                                    placeholder={field.placeholder}
                                                    type={field.type}
                                                    label={field.label}
                                                    value={get_value(field.name)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    {/* 2nd  */}
                                    <div className="form_auto_fit">
                                        {[
                                            {
                                                name: 'nominee_name_2',
                                                placeholder:
                                                    "Enter nominee's name (2nd)",
                                                type: 'text',
                                                label: "Nominee's Name (2nd)",
                                            },
                                            {
                                                name: 'relationship_with_applicant_2',
                                                placeholder:
                                                    'Enter relationship with applicant (2nd)',
                                                type: 'text',
                                                label: 'Relationship with Applicant (2nd)',
                                            },
                                            {
                                                name: 'nominee_telephone_no_2',
                                                placeholder:
                                                    "Enter nominee's telephone no. (2nd)",
                                                type: 'tel',
                                                label: "Nominee's Telephone No. (2nd)",
                                            },
                                            {
                                                name: 'nominee_share_2',
                                                placeholder:
                                                    "Enter nominee's share (2nd)",
                                                type: 'text',
                                                label: "Nominee's Share (2nd)",
                                            },
                                            {
                                                name: 'nominee_photo_2',
                                                placeholder:
                                                    "Upload nominee's photo (2nd)",
                                                type: 'file',
                                                label: "Nominee's Photo (2nd)",
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
                                                    value={get_value(field.name)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Property Details  */}
                                <div>
                                    <h5 className="mb-4">Property Details</h5>
                                    <div className="form_auto_fit">
                                        {CreateBookingPropertyInformations.map((field) => (
                                            <div
                                                className="form-group form-vertical"
                                                key={field.name}
                                            >
                                                <Input
                                                    name={field.name}
                                                    placeholder={field.placeholder}
                                                    type={field.type}
                                                    label={field.label}
                                                    value={get_value(field.name)}
                                                    callback={field.callback}
                                                    readonly={field.readonly}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Proof Of Payment  */}
                                <div>
                                    <h5 className="mb-4">Proof Of Payment</h5>
                                    <div className="form_auto_fit">
                                        <div className="form-group form-vertical">
                                            <Select
                                                label="Payment Method"
                                                value={get_value('payment_method')}
                                                name="payment_method"
                                                readonly={true}
                                                values={[
                                                    {
                                                        text: '--select--',
                                                        value: '',
                                                    },
                                                    {
                                                        text: 'BOOKING MONEY',
                                                        value: 'booking_money',
                                                    },
                                                    // {
                                                    //     text: 'DOWNPAYMENT',
                                                    //     value: 'down_payment',
                                                    // },
                                                    // {
                                                    //     text: 'INSTALLMENT',
                                                    //     value: 'installment',
                                                    // },
                                                ]}
                                            />
                                        </div>
                                        <div className="form-group form-vertical">
                                            <Select
                                                label="Payment By"
                                                value={get_value('check_cash_po_dd_no')}
                                                name="check_cash_po_dd_no"
                                                readonly={true}
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
                                                callback={function (e, value) {
                                                    let el = document.getElementById('bank_payment_block');
                                                    if (el && value == 'bank') {
                                                        el.classList.remove('d-none');
                                                    } else if (el) {
                                                        el.classList.add('d-none');
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="form-group form-vertical">
                                            <Select
                                                label="Are you a loan recipient?"
                                                name="r_u_a_loan_recipient"
                                                value={get_value('r_u_a_loan_recipient')}
                                                values={[
                                                    { text: '--select--', value: '' },
                                                    { text: 'YES', value: 'yes' },
                                                    { text: 'NO', value: 'no' },
                                                ]}
                                            />
                                        </div>
                                    </div>

                                    <div className="form_auto_fit">
                                        {CreateBookingPaymentInfo({readonly: true}).map((field) => (
                                            <div
                                                className="form-group form-vertical"
                                                key={field.name}
                                            >
                                                <Input
                                                    name={field.name}
                                                    placeholder={field.placeholder}
                                                    type={field.type}
                                                    label={field.label}
                                                    callback={field.callback}
                                                    readonly={field.readonly}
                                                    value={get_value(field.name)}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* if payment processor is bank */}
                                    <div className="form_auto_fit d-none" id="bank_payment_block">
                                        {CreateBookingBankPayment.map((field) => (
                                            <div
                                                className="form-group form-vertical"
                                                key={field.name}
                                            >
                                                <Input
                                                    name={field.name}
                                                    placeholder={field.placeholder}
                                                    type={field.type}
                                                    label={field.label}
                                                    callback={field.callback}
                                                    readonly={field.readonly}
                                                    value={get_value(field.name)}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div>
                                        <h5 className="mb-4">Witness</h5>
                                        <div className="form_auto_fit">
                                            {CreateBookingWetness.map((field) => (
                                                <div
                                                    className="form-group form-vertical"
                                                    key={field.name}
                                                >
                                                    <Input
                                                        name={field.name}
                                                        placeholder={field.placeholder}
                                                        type={field.type}
                                                        label={field.label}
                                                        callback={field.callback}
                                                        readonly={field.readonly}
                                                        value={get_value(field.name)}
                                                    />
                                                </div>
                                            ))}
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
                    )}
                    <Footer>
                        <li>
                            <a className="outline btn-outline-warning"
                                target="_blank"
                                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                    e.preventDefault();
                                    localStorage.setItem('booking', JSON.stringify(state.item))
                                    window.open(e.currentTarget.href, '_blank')
                                }}
                                href={"/print-invoice?" + state.item.id}>
                                <span className="material-symbols-outlined fill">print</span>
                                <div className="text">Print</div>
                            </a>
                        </li>

                    </Footer>
                </div>
            </div>
        </>
    );
};

export default Create;
