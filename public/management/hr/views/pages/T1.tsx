import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { anyObject } from '../../common_types/object';
import moment from 'moment/moment';
export interface Props { }

const T1: React.FC<Props> = (props: Props) => {
    const [collections, setCollections] = useState<anyObject>({});

    useEffect(() => {
        
    }, [])

    return <div className="container">
        <div className="row my-4">
            <div className="col-12">
                <h3>HRM Management</h3>
            </div>
        </div>
    </div>;
};

export default T1;
