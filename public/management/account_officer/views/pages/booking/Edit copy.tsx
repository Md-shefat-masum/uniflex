import React, { useEffect } from 'react';
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
export interface Props {}

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
                            {/* Booking type  */}
                            <div>
                                <div className="form_auto_fit">
                                    <div className="form-group form-vertical">
                                        <Select
                                            label="Booking Type"
                                            name="booking_type"
                                            values={[
                                                { text: 'FLAT', value: 'flat' },
                                                { text: 'PLOT', value: 'plot' },
                                            ]}
                                        />
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
                                            type: 'number',
                                            label: 'Customer ID',
                                        },
                                        {
                                            name: 'project_name',
                                            placeholder: 'Enter project name',
                                            type: 'text',
                                            label: 'Project Name',
                                        },
                                        {
                                            name: 'application_date',
                                            placeholder:
                                                'Enter application date',
                                            type: 'date',
                                            label: 'Application Date',
                                        },
                                        {
                                            name: 'applicant_name_bengali',
                                            placeholder:
                                                "Enter applicant's name in Bengali",
                                            type: 'text',
                                            label: "Applicant's Name (Bengali)",
                                        },
                                        {
                                            name: 'applicant_name_english',
                                            placeholder:
                                                "Enter applicant's name in English",
                                            type: 'text',
                                            label: "Applicant's Name (English)",
                                        },
                                        {
                                            name: 'father_name_bengali',
                                            placeholder:
                                                "Enter father's name in Bengali",
                                            type: 'text',
                                            label: "Father's Name (Bengali)",
                                        },
                                        {
                                            name: 'father_name_english',
                                            placeholder:
                                                "Enter father's name in English",
                                            type: 'text',
                                            label: "Father's Name (English)",
                                        },
                                        {
                                            name: 'mother_name_bengali',
                                            placeholder:
                                                "Enter mother's name in Bengali",
                                            type: 'text',
                                            label: "Mother's Name (Bengali)",
                                        },
                                        {
                                            name: 'mother_name_english',
                                            placeholder:
                                                "Enter mother's name in English",
                                            type: 'text',
                                            label: "Mother's Name (English)",
                                        },
                                        {
                                            name: 'husband_wife_name_bengali',
                                            placeholder:
                                                "Enter husband/wife's name in Bengali",
                                            type: 'text',
                                            label: "Husband/Wife's Name (Bengali)",
                                        },
                                        {
                                            name: 'husband_wife_name_english',
                                            placeholder:
                                                "Enter husband/wife's name in English",
                                            type: 'text',
                                            label: "Husband/Wife's Name (English)",
                                        },
                                        {
                                            name: 'email',
                                            placeholder: 'Enter email',
                                            type: 'email',
                                            label: 'Email',
                                        },
                                        {
                                            name: 'current_address_bengali',
                                            placeholder:
                                                'Enter current address in Bengali',
                                            type: 'text',
                                            label: 'Current Address (Bengali)',
                                        },
                                        {
                                            name: 'current_address_english',
                                            placeholder:
                                                'Enter current address in English',
                                            type: 'text',
                                            label: 'Current Address (English)',
                                        },
                                        {
                                            name: 'permanent_address_bengali',
                                            placeholder:
                                                'Enter permanent address in Bengali',
                                            type: 'text',
                                            label: 'Permanent Address (Bengali)',
                                        },
                                        {
                                            name: 'permanent_address_english',
                                            placeholder:
                                                'Enter permanent address in English',
                                            type: 'text',
                                            label: 'Permanent Address (English)',
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
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Property Details  */}
                            <div>
                                <h5 className="mb-4">Property Details</h5>
                                <div className="form_auto_fit">
                                    {[
                                        {
                                            name: 'property_location',
                                            placeholder:
                                                'Enter property location',
                                            type: 'text',
                                            label: 'Property Location',
                                        },
                                        {
                                            name: 'file_id_no',
                                            placeholder: 'Enter file / ID no.',
                                            type: 'text',
                                            label: 'File / ID No.',
                                        },
                                        {
                                            name: 'property_no',
                                            placeholder: 'Enter property no.',
                                            type: 'text',
                                            label: 'Property No.',
                                        },
                                        {
                                            name: 'road_no',
                                            placeholder: 'Enter road no.',
                                            type: 'text',
                                            label: 'Road No.',
                                        },
                                        {
                                            name: 'block_no',
                                            placeholder: 'Enter block no.',
                                            type: 'text',
                                            label: 'Block No.',
                                        },
                                        {
                                            name: 'sector_no',
                                            placeholder: 'Enter sector no.',
                                            type: 'text',
                                            label: 'Sector No.',
                                        },
                                        {
                                            name: 'property_type',
                                            placeholder: 'Enter property type',
                                            type: 'text',
                                            label: 'Property Type',
                                        },
                                        {
                                            name: 'size_of_property_katha',
                                            placeholder:
                                                'Size Of Property (Katha)',
                                            type: 'number',
                                            label: 'Size Of Property (Katha)',
                                        },
                                        {
                                            name: 'size_Of_property_land_percentage',
                                            placeholder:
                                                'Size Of Property Land (Percentage)',
                                            type: 'number',
                                            label: 'Size Of Property Land (Percentage)',
                                        },
                                        {
                                            name: 'property_price_digit',
                                            placeholder:
                                                'Enter property price (digit)',
                                            type: 'number',
                                            label: 'Property Price (Digit)',
                                        },
                                        {
                                            name: 'property_price_text',
                                            placeholder:
                                                'Enter property price (text)',
                                            type: 'text',
                                            label: 'Property Price (Text)',
                                        },
                                        {
                                            name: 'payment_type',
                                            placeholder: 'Enter payment type',
                                            type: 'text',
                                            label: 'Payment Type (Booking/Down/Full)',
                                        },
                                        {
                                            name: 'payment_digit',
                                            placeholder:
                                                'Enter payment (digit)',
                                            type: 'number',
                                            label: 'Payment (Digit)',
                                        },
                                        {
                                            name: 'payment_text',
                                            placeholder: 'Enter payment (text)',
                                            type: 'text',
                                            label: 'Payment (Text)',
                                        },
                                        {
                                            name: 'check_cash_po_dd_no',
                                            placeholder:
                                                'Enter check / cash / P.O. / D.D. no.',
                                            type: 'text',
                                            label: 'Check / Cash / P.O. / D.D. No.',
                                        },
                                        {
                                            name: 'branch',
                                            placeholder: 'Enter branch',
                                            type: 'text',
                                            label: 'Branch',
                                        },
                                        {
                                            name: 'bank',
                                            placeholder: 'Enter bank',
                                            type: 'text',
                                            label: 'Bank',
                                        },
                                        {
                                            name: 'date',
                                            placeholder: 'Enter date',
                                            type: 'date',
                                            label: 'Date',
                                        },
                                        {
                                            name: 'swift_code_routing_no',
                                            placeholder:
                                                'Enter swift code / routing no.',
                                            type: 'text',
                                            label: 'Swift Code / Routing No.',
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
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Proof Of Payment  */}
                            <div>
                                <h5 className="mb-4">Proof Of Payment</h5>
                                <div className="form-group form-vertical">
                                    <Select
                                        label="Payment Method"
                                        name="payment_method"
                                        values={[
                                            {
                                                text: 'INSTALLMENT',
                                                value: 'installment',
                                            },
                                            {
                                                text: 'DOWNPAYMENT',
                                                value: 'downpayment',
                                            },
                                            {
                                                text: 'ONE TIME',
                                                value: 'onetime',
                                            },
                                        ]}
                                    />
                                </div>
                                <div className="form-group form-vertical">
                                    <Select
                                        label="Are you a loan recipient?"
                                        name="r_u_a_loan_recipient"
                                        values={[
                                            { text: 'YES', value: 'yes' },
                                            { text: 'NO', value: 'no' },
                                        ]}
                                    />
                                </div>
                                <div className="form_auto_fit">
                                    {[
                                        {
                                            name: 'date',
                                            placeholder: 'Select date',
                                            type: 'date',
                                            label: 'Date',
                                        },
                                        {
                                            name: 'witness_name_1',
                                            placeholder:
                                                "Enter witness's name (1st)",
                                            type: 'text',
                                            label: "Witness's Name (1st)",
                                        },
                                        {
                                            name: 'witness_mobile_number_1',
                                            placeholder:
                                                "Enter witness's mobile number (1st)",
                                            type: 'tel',
                                            label: "Witness's Mobile Number (1st)",
                                        },
                                        {
                                            name: 'witness_address_1',
                                            placeholder:
                                                "Enter witness's address (1st)",
                                            type: 'text',
                                            label: "Witness's Address (1st)",
                                        },
                                        {
                                            name: 'witness_name_2',
                                            placeholder:
                                                "Enter witness's name (2nd)",
                                            type: 'text',
                                            label: "Witness's Name (2nd)",
                                        },
                                        {
                                            name: 'witness_mobile_number_2',
                                            placeholder:
                                                "Enter witness's mobile number (2nd)",
                                            type: 'tel',
                                            label: "Witness's Mobile Number (2nd)",
                                        },
                                        {
                                            name: 'witness_address_2',
                                            placeholder:
                                                "Enter witness's address (2nd)",
                                            type: 'text',
                                            label: "Witness's Address (2nd)",
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
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Office Space Requirements Only  */}
                            <div>
                                <h5 className="mb-4">
                                    Office Space Requirements Only
                                </h5>
                                <div className="form_auto_fit">
                                    {[
                                        {
                                            name: 'office_only_booking',
                                            placeholder: 'Booking',
                                            type: 'text',
                                            label: 'Booking',
                                        },
                                        {
                                            name: 'office_only_booking_others',
                                            placeholder: 'Others',
                                            type: 'text',
                                            label: 'Others',
                                        },
                                        {
                                            name: 'office_only_property_no',
                                            placeholder: 'Enter property no.',
                                            type: 'text',
                                            label: 'Property No.',
                                        },
                                        {
                                            name: 'office_only_road_no',
                                            placeholder: 'Enter road no.',
                                            type: 'text',
                                            label: 'Road No.',
                                        },
                                        {
                                            name: 'office_only_block_no',
                                            placeholder: 'Enter block no.',
                                            type: 'text',
                                            label: 'Block No.',
                                        },
                                        {
                                            name: 'office_only_sector_no',
                                            placeholder: 'Enter sector no.',
                                            type: 'text',
                                            label: 'Sector No.',
                                        },
                                        {
                                            name: 'office_only_property_type',
                                            placeholder: 'Enter property type',
                                            type: 'text',
                                            label: 'Property Type',
                                        },
                                        {
                                            name: 'office_only_size_of_property_katha',
                                            placeholder:
                                                'Enter size of property (Katha)',
                                            type: 'number',
                                            label: 'Size of Property (Katha)',
                                        },
                                        {
                                            name: 'office_only_size_of_property_land_percentage',
                                            placeholder:
                                                'Enter size of property land (Percentage)',
                                            type: 'number',
                                            label: 'Size of Property Land (Percentage)',
                                        },
                                        {
                                            name: 'office_only_money_receipt_no',
                                            placeholder:
                                                'Enter money receipt no.',
                                            type: 'text',
                                            label: 'Money Receipt No.',
                                        },
                                        {
                                            name: 'office_only_booking_chart_making',
                                            placeholder:
                                                'Enter booking chart making',
                                            type: 'text',
                                            label: 'Booking Chart Making',
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
