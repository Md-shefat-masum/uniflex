import React, { useEffect, useState } from 'react';
import { anyObject } from '../../../../customer/common_types/object';
import axios from 'axios';
import { Link } from 'react-router-dom';
export interface Props { }

const AllCustomer: React.FC<Props> = (props: Props) => {
    const [customers, setCustomers] = useState<anyObject[]>([])
    useEffect(() => {
        axios.get('/api/v1/users/user-refered-customers')
            .then(res => {
                setCustomers(res.data.data);
            })
    }, [])

    return <div className="page_content">
        <div className="row">
            <div className="col-12">
                <div className="card w-100 mt-4">
                    <div className="card-header">
                        <h5>
                            Customers ( {customers.length} Persons )
                        </h5>
                        <div className="card-header-right">
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="user-status height-scroll custom-scrollbar" style={{ maxHeight: "calc(100vh - 246px)" }}>
                            <table className="table table-bordernone  table-hover">
                                <thead className="bg-dark position-sticky top-0">
                                    <tr>
                                        <th scope="col" className="pt-0">Name</th>
                                        <th scope="col" className="pt-0">Code</th>
                                        <th scope="col" className="pt-0">Phone Number</th>
                                        <th scope="col" className="pt-0">Project</th>
                                        <th scope="col" className="pt-0">Date</th>
                                        <th scope="col" className="pt-0">Have to Pay</th>
                                        <th scope="col" className="pt-0">Booking Money</th>
                                        <th scope="col" className="pt-0">Down Payment</th>
                                        <th scope="col" className="pt-0">Installment</th>
                                        <th scope="col" className="pt-0">Total</th>
                                        <th scope="col" className="pt-0">Due</th>
                                        <th scope="col" className="pt-0"></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        customers.map((item: anyObject, index) => {
                                            let project_info = item.project_customer_information?.project_info;
                                            let customer_info: anyObject = {};
                                            try {
                                                customer_info = JSON.parse(item?.project_customer_information?.customer_informations);
                                            } catch (error) {
                                                console.log({ item, index });

                                                customer_info = item?.project_customer_information?.customer_informations;
                                            }
                                            return (<tr>
                                                <td>
                                                    {item.name}
                                                </td>
                                                <td>
                                                    {item.uid}
                                                </td>
                                                <td>
                                                    <a href={"tel:" + item.phone_number}>
                                                        {item.phone_number}
                                                    </a>
                                                </td>
                                                <td>
                                                    {project_info?.title}
                                                </td>
                                                <td className="digits">
                                                    {new Date(customer_info?.date).toDateString()}
                                                </td>
                                                <td className="digits">
                                                    {customer_info?.have_to_pay_amount} TK
                                                </td>
                                                <td className="digits">
                                                    {item.total_booking_money} TK
                                                </td>
                                                <td className="digits">
                                                    {item.total_down_payment} TK
                                                </td>
                                                <td className="digits">
                                                    {item.total_installment} TK
                                                </td>
                                                <td className="digits">
                                                    {item.total_paid} TK
                                                </td>
                                                <td className="digits">
                                                    {customer_info?.have_to_pay_amount - item?.total_paid} TK
                                                </td>
                                                <td>
                                                    <Link to={`/payment-histories/${item.id}`} className="btn btn-info">
                                                        Payment Histories
                                                    </Link>
                                                </td>
                                            </tr>)

                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>;
};

export default AllCustomer;
