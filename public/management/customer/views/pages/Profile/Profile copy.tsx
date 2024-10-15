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
    reference_info
} from "./porifle_fields"

export interface Props { }

const ProfileCopy: React.FC<Props> = (props: Props) => {
    const state: typeof commnStoreInitialState = useSelector(
        (state: RootState) => state['common_store'],
    );

    const [user, setUser] = useState<anyObject>({});
    const [information_data, set_information_data] = useState<any>(<></>);

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
        make_table_body((state.auth_user as anyObject)?.customer_inforamtions);
    }, [state.auth_user])

    function make_table_body(infos) {
        // console.log(infos);
        if (infos) {
            let tbody = Object.keys(infos).map((item, index) => {
                if (item.includes('photo')) {
                    return (
                        <tr key={index}>
                            <td style={{ width: 130, }}>
                                {item.replace(/_/g, " ")}
                            </td>
                            <td style={{ width: 2, }}>:</td>
                            <td>
                                <img src={`/${infos[item]}`} style={{ width: 80 }} />
                            </td>
                        </tr>
                    )
                }
                return (
                    item.includes('_id') ?
                        <></>
                        :
                        <tr key={index}>
                            <td style={{ width: 130, }}>
                                {item.replace(/_/g, " ")}
                            </td>
                            <td style={{ width: 2, }}>:</td>
                            <td>
                                {infos[item]}
                            </td>
                        </tr>
                )
            });
            set_information_data(tbody);
        }
    }

    return <div className="page_content">
        <div className="row">
            <div className="col-12">
                <div className="card w-100 mt-4">
                    <div className="card-header">
                        <h3>Update Password</h3>
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

        <div className="row">
            <div className="col-12">
                <div className="card w-100 mt-4">
                    <div className="card-header">
                        <h3>
                            Personal Informations
                        </h3>
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
                                            
                                        </td>
                                    </tr>)
                                })
                            }
                        </table>
                    </div>

                    {
                        (user && Object.keys(user).length) &&
                        <div className="card-body">
                            <table className="table">
                                <tr>
                                    <td style={{ width: 130, }}>
                                        Photo
                                    </td>
                                    <td style={{ width: 2, }}>:</td>
                                    <td>
                                        <img src={`/${user.image}`} style={{ width: 80, }} />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: 130, }}>
                                        ID
                                    </td>
                                    <td style={{ width: 2, }}>:</td>
                                    <td>
                                        {user.uid}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: 130, }}>
                                        Name
                                    </td>
                                    <td style={{ width: 2, }}>:</td>
                                    <td>
                                        {user.name}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: 130, }}>
                                        Contact Number
                                    </td>
                                    <td style={{ width: 2, }}>:</td>
                                    <td>
                                        {user.phone_number}
                                    </td>
                                </tr>
                                {
                                    information_data
                                }
                            </table>
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>;


};

export default ProfileCopy;
