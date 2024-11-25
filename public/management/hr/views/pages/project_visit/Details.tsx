import React, { useEffect } from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../store';
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
            if (state.item?.info[key]) return state.item?.info[key];
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
                            <div className="details_page_profile_image">
                                <img
                                    src={
                                        state.item.image
                                            ? `/${state.item.image}`
                                            : '/assets/dashboard/images/avatar.png'
                                    }
                                />
                            </div>
                            <table className="table quick_modal_table table-hover">
                                <tbody>
                                    {[
                                        {
                                            "name": "booking_type",
                                            "label": "Booking Type"
                                        },
                                        {
                                            "name": "customer_id",
                                            "label": "Customer ID"
                                        },
                                        {
                                            "name": "project_name",
                                            "label": "Project Name"
                                        },
                                        {
                                            "name": "application_date",
                                            "label": "Application Date"
                                        },
                                        {
                                            "name": "applicant_name_bengali",
                                            "label": "Applicant's Name (Bengali)"
                                        },
                                        {
                                            "name": "applicant_name_english",
                                            "label": "Applicant's Name (English)"
                                        },
                                        {
                                            "name": "father_name_bengali",
                                            "label": "Father's Name (Bengali)"
                                        },
                                        {
                                            "name": "father_name_english",
                                            "label": "Father's Name (English)"
                                        },
                                        {
                                            "name": "mother_name_bengali",
                                            "label": "Mother's Name (Bengali)"
                                        },
                                        {
                                            "name": "mother_name_english",
                                            "label": "Mother's Name (English)"
                                        },
                                        {
                                            "name": "husband_wife_name_bengali",
                                            "label": "Husband/Wife's Name (Bengali)"
                                        },
                                        {
                                            "name": "husband_wife_name_english",
                                            "label": "Husband/Wife's Name (English)"
                                        },
                                        {
                                            "name": "email",
                                            "label": "Email"
                                        },
                                        {
                                            "name": "current_address_bengali",
                                            "label": "Current Address (Bengali)"
                                        },
                                        {
                                            "name": "current_address_english",
                                            "label": "Current Address (English)"
                                        },
                                        {
                                            "name": "permanent_address_bengali",
                                            "label": "Permanent Address (Bengali)"
                                        },
                                        {
                                            "name": "permanent_address_english",
                                            "label": "Permanent Address (English)"
                                        },
                                        {
                                            "name": "date_of_birth",
                                            "label": "Date of Birth"
                                        },
                                        {
                                            "name": "mobile",
                                            "label": "Mobile"
                                        },
                                        {
                                            "name": "national_id_passport_no",
                                            "label": "National ID No. / Passport No."
                                        },
                                        {
                                            "name": "emergency_mobile_no",
                                            "label": "Emergency Mobile No."
                                        },
                                        {
                                            "name": "nationality",
                                            "label": "Nationality"
                                        },
                                        {
                                            "name": "religion",
                                            "label": "Religion"
                                        },
                                        {
                                            "name": "tin_no",
                                            "label": "TIN No."
                                        },
                                        {
                                            "name": "profession",
                                            "label": "Profession"
                                        },
                                        {
                                            "name": "customer_image",
                                            "label": "Customer photo"
                                        },
                                        {
                                            "name": "nominee_name_1",
                                            "label": "Nominee's Name (1st)"
                                        },
                                        {
                                            "name": "relationship_with_applicant_1",
                                            "label": "Relationship with Applicant (1st)"
                                        },
                                        {
                                            "name": "nominee_telephone_no_1",
                                            "label": "Nominee's Telephone No. (1st)"
                                        },
                                        {
                                            "name": "nominee_share_1",
                                            "label": "Nominee's Share (1st)"
                                        },
                                        {
                                            "name": "nominee_photo_1",
                                            "label": "Nominee's Photo (1st)"
                                        },
                                        {
                                            "name": "nominee_name_2",
                                            "label": "Nominee's Name (2nd)"
                                        },
                                        {
                                            "name": "relationship_with_applicant_2",
                                            "label": "Relationship with Applicant (2nd)"
                                        },
                                        {
                                            "name": "nominee_telephone_no_2",
                                            "label": "Nominee's Telephone No. (2nd)"
                                        },
                                        {
                                            "name": "nominee_share_2",
                                            "label": "Nominee's Share (2nd)"
                                        },
                                        {
                                            "name": "nominee_photo_2",
                                            "label": "Nominee's Photo (2nd)"
                                        },
                                        {
                                            "name": "property_location",
                                            "label": "Property Location"
                                        },
                                        {
                                            "name": "file_id_no",
                                            "label": "File / ID No."
                                        },
                                        {
                                            "name": "property_no",
                                            "label": "Property No."
                                        },
                                        {
                                            "name": "road_no",
                                            "label": "Road No."
                                        },
                                        {
                                            "name": "block_no",
                                            "label": "Block No."
                                        },
                                        {
                                            "name": "sector_no",
                                            "label": "Sector No."
                                        },
                                        {
                                            "name": "property_type",
                                            "label": "Property Type"
                                        },
                                        {
                                            "name": "size_of_property_katha",
                                            "label": "Size Of Property (Katha)"
                                        },
                                        {
                                            "name": "size_Of_property_land_percentage",
                                            "label": "Size Of Property Land (Percentage)"
                                        },
                                        {
                                            "name": "property_price_digit",
                                            "label": "Property Price (Digit)"
                                        },
                                        {
                                            "name": "property_price_text",
                                            "label": "Property Price (Text)"
                                        },
                                        {
                                            "name": "payment_type",
                                            "label": "Payment Type (Booking/Down/Full)"
                                        },
                                        {
                                            "name": "payment_digit",
                                            "label": "Payment (Digit)"
                                        },
                                        {
                                            "name": "payment_text",
                                            "label": "Payment (Text)"
                                        },
                                        {
                                            "name": "check_cash_po_dd_no",
                                            "label": "Check / Cash / P.O. / D.D. No."
                                        },
                                        {
                                            "name": "branch",
                                            "label": "Branch"
                                        },
                                        {
                                            "name": "bank",
                                            "label": "Bank"
                                        },
                                        {
                                            "name": "date",
                                            "label": "Date"
                                        },
                                        {
                                            "name": "swift_code_routing_no",
                                            "label": "Swift Code / Routing No."
                                        },
                                        {
                                            "name": "payment_method",
                                            "label": "Payment Method"
                                        },
                                        {
                                            "name": "r_u_a_loan_recipient",
                                            "label": "Are you a loan recipient?"
                                        },
                                        {
                                            "name": "witness_name_1",
                                            "label": "Witness's Name (1st)"
                                        },
                                        {
                                            "name": "witness_mobile_number_1",
                                            "label": "Witness's Mobile Number (1st)"
                                        },
                                        {
                                            "name": "witness_address_1",
                                            "label": "Witness's Address (1st)"
                                        },
                                        {
                                            "name": "witness_name_2",
                                            "label": "Witness's Name (2nd)"
                                        },
                                        {
                                            "name": "witness_mobile_number_2",
                                            "label": "Witness's Mobile Number (2nd)"
                                        },
                                        {
                                            "name": "witness_address_2",
                                            "label": "Witness's Address (2nd)"
                                        },
                                        {
                                            "name": "office_only_booking",
                                            "label": "Booking"
                                        },
                                        {
                                            "name": "office_only_booking_others",
                                            "label": "Others"
                                        },
                                        {
                                            "name": "office_only_property_no",
                                            "label": "Property No."
                                        },
                                        {
                                            "name": "office_only_road_no",
                                            "label": "Road No."
                                        },
                                        {
                                            "name": "office_only_block_no",
                                            "label": "Block No."
                                        },
                                        {
                                            "name": "office_only_sector_no",
                                            "label": "Sector No."
                                        },
                                        {
                                            "name": "office_only_property_type",
                                            "label": "Property Type"
                                        },
                                        {
                                            "name": "office_only_size_of_property_katha",
                                            "label": "Size of Property (Katha)"
                                        },
                                        {
                                            "name": "office_only_size_of_property_land_percentage",
                                            "label": "Size of Property Land (Percentage)"
                                        },
                                        {
                                            "name": "office_only_money_receipt_no",
                                            "label": "Money Receipt No."
                                        },
                                        {
                                            "name": "office_only_booking_chart_making",
                                            "label": "Booking Chart Making"
                                        }
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
                    )}

                    <Footer>
                        {state.item?.id && (
                            <li>
                                <Link
                                    to={`/${setup.route_prefix}/edit/${state.item.id}`}
                                    className="btn-outline-info outline"
                                >
                                    <span className="material-symbols-outlined fill">
                                        edit_square
                                    </span>
                                    <div className="text">Edit</div>
                                </Link>
                            </li>
                        )}
                    </Footer>
                </div>
            </div>
        </>
    );
};

export default Details;
