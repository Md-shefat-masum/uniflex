import React, { useEffect, useState } from 'react';
import Input from './components/Input';
import axios from 'axios';
import { commnStoreInitialState } from '../../../store/slices/common_slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { anyObject } from '../../../common_types/object';
import useRef from 'react';

export interface Props { }

const Profile: React.FC<Props> = (props: Props) => {
    const state: typeof commnStoreInitialState = useSelector(
        (state: RootState) => state['common_store'],
    );

    const [user, setUser] = useState<anyObject>({})

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
        setUser((state.auth_user as anyObject)?.user)
    }, [state.auth_user])

    return <div className="page_content">
        <div className="row">
            <div className="col-12">
                <div className="card w-100 mt-4">
                    <div className="card-header">
                        <h3>Update Profile</h3>
                    </div>
                    {
                        (user && Object.keys(user).length) &&
                        <div className="card-body">
                            <form action="" onSubmit={submit_handler}>
                                <div className="form-group form-vertical">
                                    <h4>Name</h4>
                                    <h5>{user.name}</h5>
                                </div>
                                <div className="form-group form-vertical">
                                    <h4>Email</h4>
                                    <h5>{user.email}</h5>
                                </div>
                                <div className="form-group form-vertical">
                                    <h4>Phone Number</h4>
                                    <h5>{user.phone_number}</h5>
                                </div>
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
