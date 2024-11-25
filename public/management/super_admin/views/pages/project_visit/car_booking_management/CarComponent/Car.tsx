import React, { useState } from 'react'
import CarSeat from './CarSeat';

type Props = {
    car_title: string,
}

const Car: React.FC<Props> = function (props: Props) {
    const [seat_amount, set_seat_amount] = useState<Number>(15);

    return (
        <div>
            <h5 className="car_title">
                {props.car_title} - 02:00 PM
            </h5>
            <div className="car_item">
                {
                    [...Array(seat_amount).keys()].map((i) => (
                        <CarSeat
                            seat_no={i + 1}
                            title={'seat'}
                            passenger_name={'mr customer ' + i}
                            passenger_contact={'01' + i + '989742' + i}
                            key={i} />
                    ))
                }
            </div>
        </div>
    )
}

export default Car