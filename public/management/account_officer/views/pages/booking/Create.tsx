import React, { useState } from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import setup from './config/setup';
import { useAppDispatch } from '../../../store';
import { store } from './config/store/async_actions/store';
import DropDown from './components/dropdown/DropDown';
import ProjectDropDown from '../project/components/dropdown/DropDown';
import UserDropDown from '../users/components/dropdown/DropDown';
import Input from './components/management_data_page/Input';
import Select from './components/management_data_page/Select';
import InputImage from './components/management_data_page/InputImage';
import { useNavigate } from 'react-router-dom';
import { details } from './config/store/async_actions/details';
import { anyObject } from '../../../common_types/object';
export interface Props { }

const Create: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [moInfo, setMoInfo] = useState<anyObject>({});

    const [project, setProject] = useState<anyObject>({});
    const [bookingType, setBookingType] = useState<string>("plot");
    const [totalShare, setTotalShare] = useState<number>(0);

    async function handle_submit(e) {
        e.preventDefault();
        let have_to_pay_amount = document.getElementById('have_to_pay_amount') as HTMLInputElement;
        let payment_digit = document.getElementById('payment_digit') as HTMLInputElement;

        let confirm = await (window as any).s_confirm(`
                পেমেন্ট করতে হবেঃ\n 
                ( ${have_to_pay_amount.value} ) \n
                ${(window as any).convertAmount(have_to_pay_amount.value || 0).bn} টাকা \n

                পেমেন্ট করেছেনঃ\n 
                ( ${payment_digit.value} ) \n
                ${(window as any).convertAmount(payment_digit.value || 0).bn} টাকা \n
            `);

        if (!confirm) return;

        const response = await dispatch(store(new FormData(e.target)) as any);
        if (!Object.prototype.hasOwnProperty.call(response, 'error')) {
            e.target.reset();
            let id = response.payload.data.data.id;
            navigate(`/booking/edit/${id}`);
        }
    }

    function get_selected_project({ ids, selectedList }) {
        if (selectedList.length) {
            setProject(selectedList[0]);
        } else {
            setProject({});
        }
    }

    function set_booking_cost(e) {
        let total_share = e?.target.value;
        setTotalShare(total_share);

        if (!project.title) {
            e.target.value = 0;
            return window.alert('no project is selected.');
        };

        let property_price_digit = document.getElementById('property_price_digit') as HTMLInputElement;
        let property_price_text = document.getElementById('property_price_text') as HTMLInputElement;
        let property_price_text_bangla = document.getElementById('property_price_text_bangla') as HTMLInputElement;
        let have_to_pay_amount = document.getElementById('have_to_pay_amount') as HTMLInputElement;
        let have_to_pay_amount_text = document.getElementById('have_to_pay_amount_text') as HTMLInputElement;

        let cost = project[`per_share_${bookingType}_cost`];
        let have_to_pay = cost * total_share;

        property_price_digit.value = cost.toString();
        property_price_text.value = (window as any).convertAmount(cost).en;
        property_price_text_bangla.value = (window as any).convertAmount(cost).bn;

        have_to_pay_amount.value = have_to_pay.toString();
        have_to_pay_amount_text.value = (window as any).convertAmount(have_to_pay).en;

        // console.log(cost, project);

    }

    return (
        <>
            <div className="page_content">
                <div className="explore_window fixed_size">
                    <Header page_title={setup.create_page_title}></Header>
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
                                            callback={(e) => setBookingType(e.target.value)}
                                            label="Booking Type"
                                            name="booking_type"
                                            value={'plot'}
                                            values={[
                                                { text: '--select--', value: '' },
                                                { text: 'FLAT', value: 'flat' },
                                                { text: 'PLOT', value: 'plot' },
                                            ]}
                                        />
                                    </div>
                                    <div className="form-group form-vertical">
                                        <label>Project</label>
                                        <ProjectDropDown
                                            get_selected_data={get_selected_project}
                                            multiple={false}
                                            name={"project_id"} />
                                    </div>
                                    <div className="form-group form-vertical">
                                        <Input
                                            name={'total_share'}
                                            placeholder={'total_share'}
                                            type={'number'}
                                            label={'total_share'}
                                            callback={set_booking_cost}
                                            value={0}
                                        />
                                    </div>
                                    <div className="form-group form-vertical">
                                        <label>Reference</label>
                                        <UserDropDown multiple={false} name={"reference_user_id"} />
                                    </div>
                                    <div className="form-group form-vertical">
                                        <label>MO</label>
                                        <UserDropDown multiple={false} name={"mo_id"} get_selected_data={(data) => {
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
                                        <input type="hidden" name="agm_id" value={`[${moInfo.agm_info?.id}]`} />
                                        {/* <UserDropDown multiple={false} name={"agm_id"} /> */}
                                    </div>
                                    <div className="form-group form-vertical">
                                        <label>GM</label>
                                        <div className="form-control">
                                            {moInfo.gm_info?.uid} -
                                            {moInfo.gm_info?.name}
                                        </div>
                                        <input type="hidden" name="gm_id" value={`[${moInfo.gm_info?.id}]`} />
                                        {/* <UserDropDown multiple={false} name={"gm_id"} /> */}
                                    </div>
                                    <div className="form-group form-vertical">
                                        <label>ED</label>
                                        <div className="form-control">
                                            {moInfo.ed_info?.uid} -
                                            {moInfo.ed_info?.name}
                                        </div>
                                        <input type="hidden" name="ed_id" value={`[${moInfo.ed_info?.id}]`} />
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
                                <h5 className="mb-4">
                                    Property Details
                                </h5>
                                <div className="form_auto_fit">
                                    {[
                                        // {
                                        //     name: 'property_location',
                                        //     placeholder:
                                        //         'Enter plot location',
                                        //     type: 'text',
                                        //     label: 'Property Location',
                                        // },
                                        {
                                            name: 'file_id_no',
                                            placeholder: 'Enter file / ID no.',
                                            type: 'text',
                                            label: 'File / ID No.',
                                        },
                                        {
                                            name: 'property_no',
                                            placeholder: 'Enter plot/flat no.',
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
                                        // {
                                        //     name: 'property_type',
                                        //     placeholder: 'Enter plot type',
                                        //     type: 'text',
                                        //     label: 'Property Type',
                                        // },
                                        {
                                            name: 'size_of_property_katha',
                                            placeholder:
                                                'Size Of Plot/Flat (Katha)',
                                            type: 'number',
                                            label: 'Size Of Property (Katha)',
                                        },
                                        {
                                            name: 'size_of_property_land_percentage',
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
                                            value: project.hasOwnProperty(`per_share_${bookingType}_cost`) ? project[`per_share_${bookingType}_cost`] : '',
                                            callback: function (e, value) {
                                                let el = document.querySelector('#property_price_text') as HTMLInputElement | null;
                                                let el2 = document.querySelector('#property_price_text_bangla') as HTMLInputElement | null;
                                                if (el && el2) {
                                                    el.value = (window as any).convertAmount(value).en + ` taka only`;
                                                    el2.value = (window as any).convertAmount(value).bn + ` টাকা মাত্র`;
                                                }
                                            }
                                        },
                                        {
                                            name: 'property_price_text',
                                            placeholder:
                                                'Enter property price (text)',
                                            type: 'text',
                                            label: 'Property Price (Text)',
                                        },
                                        {
                                            name: 'property_price_text_bangla',
                                            placeholder:
                                                'Enter property price (bangla text)',
                                            type: 'text',
                                            label: 'Property Price (Bangla Text)',
                                        },
                                        // {
                                        //     name: 'payment_type',
                                        //     placeholder: 'Enter payment type',
                                        //     type: 'text',
                                        //     label: 'Payment Type (Booking/Down/Full)',
                                        // },
                                        {
                                            name: 'payment_digit',
                                            placeholder:
                                                'Enter payment (digit)',
                                            type: 'number',
                                            label: 'Payment (Digit)',
                                            callback: function (e, value) {
                                                let el = document.querySelector('#payment_text') as HTMLInputElement | null;
                                                let el2 = document.querySelector('#payment_text_bangla') as HTMLInputElement | null;
                                                if (el && el2) {
                                                    el.value = (window as any).convertAmount(value).en + ` taka only`;
                                                    el2.value = (window as any).convertAmount(value).bn + ` টাকা মাত্র`;
                                                }
                                            }
                                        },
                                        {
                                            name: 'payment_text',
                                            placeholder: 'Enter payment (text)',
                                            type: 'text',
                                            label: 'Payment (Text)',
                                        },
                                        {
                                            name: 'payment_text_bangla',
                                            placeholder: 'Enter payment (bangla text)',
                                            type: 'text',
                                            label: 'Payment ( Bangla Text)',
                                        },
                                        // {
                                        //     name: 'check_cash_po_dd_no',
                                        //     placeholder:
                                        //         'Enter check / cash / P.O. / D.D. no.',
                                        //     type: 'text',
                                        //     label: 'Check / Cash / P.O. / D.D. No.',
                                        // },
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
                                            readonly: true,
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
                                                callback={field.callback}
                                                value={field.value}
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
                                            name="payment_method"
                                            value={"booking_money"}
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
                                            name="check_cash_po_dd_no"
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
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-vertical">
                                    <Select
                                        label="Are you a loan recipient?"
                                        name="r_u_a_loan_recipient"
                                        values={[
                                            { text: '--select--', value: '' },
                                            { text: 'YES', value: 'yes' },
                                            { text: 'NO', value: 'no' },
                                        ]}
                                    />
                                </div>
                                <div className="form_auto_fit">
                                    {[
                                        {
                                            name: 'payment_date',
                                            placeholder: 'Select date',
                                            type: 'date',
                                            label: 'Payment Date',
                                            readonly: true,
                                        },
                                        {
                                            name: 'have_to_pay_amount',
                                            placeholder: 'Have to pay amount',
                                            type: 'text',
                                            label: 'Have to pay amount',
                                            callback: function (e, value) {
                                                let el = document.querySelector('#have_to_pay_amount_text') as HTMLInputElement | null;
                                                if (el) {
                                                    el.value = (window as any).convertAmount(value).en + ` taka only`;
                                                }
                                            }
                                        },
                                        {
                                            name: 'have_to_pay_amount_text',
                                            placeholder: 'Have to pay amount in text',
                                            type: 'text',
                                            label: 'Have to pay amount in text',
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
                                                callback={field.callback}
                                                readonly={field.readonly}
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
                                        // {
                                        //     name: 'office_only_booking',
                                        //     placeholder: 'Booking',
                                        //     type: 'text',
                                        //     label: 'Booking',
                                        // },
                                        // {
                                        //     name: 'office_only_property_no',
                                        //     placeholder: 'Enter property no.',
                                        //     type: 'text',
                                        //     label: 'Property No.',
                                        // },
                                        // {
                                        //     name: 'office_only_road_no',
                                        //     placeholder: 'Enter road no.',
                                        //     type: 'text',
                                        //     label: 'Road No.',
                                        // },
                                        // {
                                        //     name: 'office_only_block_no',
                                        //     placeholder: 'Enter block no.',
                                        //     type: 'text',
                                        //     label: 'Block No.',
                                        // },
                                        // {
                                        //     name: 'office_only_sector_no',
                                        //     placeholder: 'Enter sector no.',
                                        //     type: 'text',
                                        //     label: 'Sector No.',
                                        // },
                                        // {
                                        //     name: 'office_only_property_type',
                                        //     placeholder: 'Enter property type',
                                        //     type: 'text',
                                        //     label: 'Property Type',
                                        // },
                                        // {
                                        //     name: 'office_only_size_of_property_katha',
                                        //     placeholder:
                                        //         'Enter size of property (Katha)',
                                        //     type: 'number',
                                        //     label: 'Size of Property (Katha)',
                                        // },
                                        // {
                                        //     name: 'office_only_size_of_property_land_percentage',
                                        //     placeholder:
                                        //         'Enter size of property land (Percentage)',
                                        //     type: 'number',
                                        //     label: 'Size of Property Land (Percentage)',
                                        // },
                                        {
                                            name: 'office_only_booking_others',
                                            placeholder: 'Others',
                                            type: 'text',
                                            label: 'Others',
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
                                    <button className="btn btn_1 btn-outline-info">
                                        submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        </>
    );
};

export default Create;
