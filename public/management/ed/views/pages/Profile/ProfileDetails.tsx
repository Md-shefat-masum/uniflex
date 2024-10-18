import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { commnStoreInitialState } from '../../../store/slices/common_slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { anyObject } from '../../../common_types/object';
import useRef from 'react';

function ProfileDetails() {
    const state: typeof commnStoreInitialState = useSelector(
        (state: RootState) => state['common_store'],
    );

    const [user, setUser] = useState<anyObject>({})

    useEffect(() => {
        setUser((state.auth_user as anyObject)?.user || {})
        console.log(state.auth_user);
        
    }, [state.auth_user])

    if(user && !Object.keys(user).length){
        return <></>;
    }
    
    return <div className="page_content">
        <div className="row">
            <div className="col-12">
                <div className="card w-100 mt-4">
                    <div className="card-header py-3">
                        <h4>Personal Informations</h4>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>
                                        {user.name}
                                    </td>
                                </tr>
                                <tr>
                                    <th>ID</th>
                                    <td>
                                        {user.uid}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Role</th>
                                    <td>
                                        {user.role}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Designation</th>
                                    <td>
                                        {user.designation}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>
                                        {user.email}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Phone Number</th>
                                    <td>
                                        {user.phone_number}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Father Name</th>
                                    <td>
                                        {user.info?.father_name}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Mother Name</th>
                                    <td>
                                        {user.info?.mother_name}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Husband / Spouse</th>
                                    <td>
                                        {user.info?.husband_spouse}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Permanent Address</th>
                                    <td>
                                        {user.info?.permanent_address}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Present Address</th>
                                    <td>
                                        {user.info?.present_address}
                                    </td>
                                </tr>
                                <tr>
                                    <th>NID</th>
                                    <td>
                                        {user.info?.nid}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Education</th>
                                    <td>
                                        {user.info?.education}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Bank AC NO</th>
                                    <td>
                                        {user.info?.bank_account_no}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Bank Name</th>
                                    <td>
                                        {user.info?.bank_name}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Branch</th>
                                    <td>
                                        {user.info?.branch_name}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Routing No</th>
                                    <td>
                                        {user.info?.bank_routing_no}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>;
}

export default ProfileDetails