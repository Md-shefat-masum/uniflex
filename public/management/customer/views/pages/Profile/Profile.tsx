import React, { useEffect, useState } from 'react';
import Input from './components/Input';
import axios from 'axios';
import { commnStoreInitialState } from '../../../store/slices/common_slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { anyObject } from '../../../common_types/object';
import useRef from 'react';
import {
    personal_information,
    land_info,
    nominee_info,
    witness_1_info,
    witness_2_info,
    reference_info,
    nominee_2_info
} from "./porifle_fields"

export interface Props { }

const Profile: React.FC<Props> = (props: Props) => {
    const state: typeof commnStoreInitialState = useSelector(
        (state: RootState) => state['common_store'],
    );

    const [user, setUser] = useState<anyObject>({});
    const [customer_information, set_customer_information] = useState<any>({});

    function submit_handler(e) {
        e.preventDefault();
        let form_data = new FormData(e.target);
        axios.post('/api/v1/users/update-profile', form_data)
            .then(res => {
                // console.log(res);
                (window as any).toaster('Profile Information updated');
            })
    }

    useEffect(() => {
        setUser((state.auth_user as anyObject)?.user);
        set_customer_information((state.auth_user as anyObject)?.customer_inforamtions);
    }, [state.auth_user])

    function get_information(key) {
        try {
            if (key == 'project_name') {
                return user?.project_customer_information?.project_info?.title;
            }
            if (key == 'uid') {
                return user?.uid;
            }
            if (key == 'mo_id') {
                return user?.mo_info?.name + ' ( ' + user?.mo_info?.uid + " ) ";
            }
            if (key == 'plot_description') {
                return `
                    Plot No: ${customer_information.property_no},
                    Road: ${customer_information.road_no},
                    Block: ${customer_information.block_no},
                    Sector: ${customer_information.sector_no},
                `;
            }
            return customer_information[key];
        } catch (error) {
            return '';
        }
    }

    return <div className="page_content text-capitalize">
        <div className="row">
            <div className="col-12">
                <div className="text-center mt-3">
                    <img src={'/' + (user?.image || 'avatar.png')} className="img-thumbnail" style={{maxHeight: 130,}} />
                </div>
                <div className="card w-100 mt-4">
                    <div className="card-header py-0">
                        <h4>
                            Personal Informations
                        </h4>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            {
                                personal_information.map(i => {
                                    return (<tr>
                                        <td style={{ width: 130, }}>
                                            {i.label}
                                        </td>
                                        <td style={{ width: 2, }}>:</td>
                                        <td>
                                            {get_information(i.field)}
                                        </td>
                                    </tr>)
                                })
                            }
                        </table>
                    </div>
                </div>

                <div className="card w-100 mt-4">
                    <div className="card-header py-0">
                        <h4>
                            Nominee 1 Informations
                        </h4>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            {
                                nominee_info.map(i => {
                                    return (<tr>
                                        <td style={{ width: 130, }}>
                                            {i.label}
                                        </td>
                                        <td style={{ width: 2, }}>:</td>
                                        <td>
                                            {
                                                i.type && i.type == 'image' ?
                                                    <img style={{ height: 60, }} src={'/' + get_information(i.field)} />
                                                    :
                                                    get_information(i.field)
                                            }
                                        </td>
                                    </tr>)
                                })
                            }
                        </table>
                    </div>
                </div>

                <div className="card w-100 mt-4">
                    <div className="card-header py-0">
                        <h4>
                            Nominee 2 Informations
                        </h4>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            {
                                nominee_2_info.map(i => {
                                    return (<tr>
                                        <td style={{ width: 130, }}>
                                            {i.label}
                                        </td>
                                        <td style={{ width: 2, }}>:</td>
                                        <td>
                                            {
                                                i.type && i.type == 'image' ?
                                                    <img style={{ height: 60, }} src={'/' + get_information(i.field)} />
                                                    :
                                                    get_information(i.field)
                                            }
                                        </td>
                                    </tr>)
                                })
                            }
                        </table>
                    </div>
                </div>

                <div className="card w-100 mt-4">
                    <div className="card-header py-0">
                        <h4>
                            Land Informations
                        </h4>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            {
                                land_info.map(i => {
                                    return (<tr>
                                        <td style={{ width: 130, }}>
                                            {i.label}
                                        </td>
                                        <td style={{ width: 2, }}>:</td>
                                        <td>
                                            {get_information(i.field)}
                                        </td>
                                    </tr>)
                                })
                            }
                        </table>
                    </div>
                </div>

                <div className="card w-100 mt-4">
                    <div className="card-header py-0">
                        <h4>
                            Witness 1 Informations
                        </h4>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            {
                                witness_1_info.map(i => {
                                    return (<tr>
                                        <td style={{ width: 130, }}>
                                            {i.label}
                                        </td>
                                        <td style={{ width: 2, }}>:</td>
                                        <td>
                                            {
                                                i.type && i.type == 'image' ?
                                                    <img style={{ height: 60, }} src={'/' + get_information(i.field)} />
                                                    :
                                                    get_information(i.field)
                                            }
                                        </td>
                                    </tr>)
                                })
                            }
                        </table>
                    </div>
                </div>

                <div className="card w-100 mt-4">
                    <div className="card-header py-0">
                        <h4>
                            Witness 2 Informations
                        </h4>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            {
                                witness_2_info.map(i => {
                                    return (<tr>
                                        <td style={{ width: 130, }}>
                                            {i.label}
                                        </td>
                                        <td style={{ width: 2, }}>:</td>
                                        <td>
                                            {
                                                i.type && i.type == 'image' ?
                                                    <img style={{ height: 60, }} src={'/' + get_information(i.field)} />
                                                    :
                                                    get_information(i.field)
                                            }
                                        </td>
                                    </tr>)
                                })
                            }
                        </table>
                    </div>
                </div>

                <div className="card w-100 mt-4">
                    <div className="card-header py-0">
                        <h4>
                            Reference
                        </h4>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            {
                                reference_info.map(i => {
                                    return (<tr>
                                        <td style={{ width: 130, }}>
                                            {i.label}
                                        </td>
                                        <td style={{ width: 2, }}>:</td>
                                        <td>
                                            {get_information(i.field)}
                                        </td>
                                    </tr>)
                                })
                            }
                        </table>
                    </div>
                </div>

            </div>
        </div>

        <div className="row">
            <div className="col-12">
                <div className="card w-100 mt-4">
                    <div className="card-header py-0">
                        <h4>Update Password</h4>
                    </div>
                    {
                        (user && Object.keys(user).length) &&
                        <div className="card-body">
                            <form action="" onSubmit={submit_handler}>
                                {/* <div className="form-group form-vertical">
                                    <Input
                                        name={'name'}
                                        label="Name"
                                        value={user.name}
                                    />
                                </div> */}
                                {/* <div className="form-group form-vertical">
                                    <Input
                                        name={'email'}
                                        label="Email"
                                        value={user.email}
                                    />
                                </div> */}
                                {/* <div className="form-group form-vertical">
                                    <Input
                                        name={'phone_number'}
                                        label="Phone Number"
                                        value={user.phone_number}
                                    />
                                </div> */}
                                <div className="form-group form-vertical">
                                    <Input
                                        name={'password'}
                                        label="Password"
                                    />
                                </div>
                                <div className="form-group form-vertical">
                                    <button className="btn btn-info">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </div>

    </div>;


};

export default Profile;
