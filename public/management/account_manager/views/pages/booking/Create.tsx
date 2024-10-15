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
import CreateBookingPersonalInformatons from './helpers/CreateBookingPersonalInformatons';
import CreateBookingPropertyInformations from './helpers/CreateBookingPropertyInformations';
import CreateBookingPaymentInfo from './helpers/CreateBookingPaymentInfo';
import CreateBookingWetness from './helpers/CreateBookingWetness';
import CreateBookingBankPayment from './helpers/CreateBookingBankPayment';
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
                                    {/* <div className="form-group form-vertical">
                                        <Input
                                            name={'total_share'}
                                            placeholder={'total_share'}
                                            type={'number'}
                                            label={'total_share'}
                                            callback={set_booking_cost}
                                            value={0}
                                        />
                                    </div> */}
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
                                    {CreateBookingPersonalInformatons.map((field) => (
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
                                                "Enter nominee's phone number. (1st)",
                                            type: 'tel',
                                            label: "Nominee's Phone number. (1st)",
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
                                    {CreateBookingPropertyInformations.map((field) => (
                                        <div
                                            className="form-group form-vertical"
                                            key={field.name}
                                        >
                                            {
                                                field.type == 'text' ?
                                                    <Input
                                                        name={field.name}
                                                        placeholder={field.placeholder}
                                                        type={field.type}
                                                        label={field.label}
                                                        callback={field.callback}
                                                        value={field.value}
                                                        readonly={field.readonly}
                                                    />
                                                    :
                                                    <Select
                                                        label={field.label}
                                                        name={field.name}
                                                        values={field.values || []}
                                                    />
                                            }
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
                                                {
                                                    text: 'DOWNPAYMENT',
                                                    value: 'down_payment',
                                                },
                                                {
                                                    text: 'INSTALLMENT',
                                                    value: 'installment',
                                                },
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
                                            values={[
                                                { text: '--select--', value: '' },
                                                { text: 'YES', value: 'yes' },
                                                { text: 'NO', value: 'no' },
                                            ]}
                                        />
                                    </div>
                                </div>
                                <div className="form_auto_fit">
                                    {CreateBookingPaymentInfo().map((field) => (
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
                                            />
                                        </div>
                                    ))}
                                </div>

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
