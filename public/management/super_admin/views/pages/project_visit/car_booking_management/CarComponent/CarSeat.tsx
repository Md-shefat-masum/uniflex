import React from 'react'

interface Props {
    title: String;
    passenger_name: String;
    passenger_contact: String;
    seat_no: number;
}

const CarSeat: React.FC<Props> = (props: Props) => {
    return (
        <div className={'car_seat' + " " + (Math.random() > 0.5 ? '' : 'booked')}>
            <div>
                {props.title} {props.seat_no}
            </div>
            <div>
                {props.passenger_name}
            </div>
            <div>
                {props.passenger_contact}
            </div>
        </div>
    )
}

export default CarSeat