import React from 'react'
import { useNavigate } from "react-router-dom";
import { anyObject } from '../../../../../common_types/object';

interface Props {
    title: String;
    passenger_name: String;
    passenger_contact: String;
    seat_no: number;
}

const CarSeat: React.FC<Props> = (props: Props) => {
    const navigate = useNavigate();

    let is_booked = Math.random() > 0.5;

    function goto_create() {
        navigate('/car-booking/create', {state: {
            seat_no: props.seat_no,
        }});
    }

    return (
        <div 
            onClick={() => goto_create()}
            className={'car_seat' + " " + (is_booked ? '' : 'booked')}>
            <div className="text-center">
                {
                    is_booked ?
                        <img src="/assets/dashboard/images/free.png" />
                        :
                        <img src="/assets/dashboard/images/success.png" />
                }
            </div>

            <div className="text-center">
                {props.title} {props.seat_no}
            </div>
            <div className="text-center">
                {props.passenger_name}
            </div>
            <div className="text-center">
                {props.passenger_contact}
            </div>
        </div>
    )
}

export default CarSeat