import React, { useEffect, useState } from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import setup from './config/setup';
import { useAppDispatch } from '../../../../store';
import { store } from './config/store/async_actions/store';
import Input from './components/management_data_page/Input';
import Select from './components/management_data_page/Select';
import InputImage from './components/management_data_page/InputImage';
import { anyObject } from '../../../../common_types/object';
import CarDropDown from '../car_management/components/dropdown/DropDown';

export interface Props { }


const Create: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const [car, setCar] = useState<anyObject>({});

    async function handle_submit(e) {
        e.preventDefault();
        let form_data = new FormData(e.target);
        const response = await dispatch(store(form_data) as any);
        if (!Object.prototype.hasOwnProperty.call(response, 'error')) {
            e.target.reset();
        }
    }

    return (
        <>
            <div className="page_content">
                <div className="explore_window fixed_size">
                    <Header page_title={setup.create_page_title}></Header>
                    <div className="content_body custom_scroll">
                        <form
                            onSubmit={(e) => handle_submit(e)}
                            className="mx-auto pt-3"
                        >
                            <div>
                                <h5 className="mb-4">Car Informations</h5>
                                <div className="mb-4">
                                    <label>Select Car</label>
                                    <div>
                                        <CarDropDown 
                                            name={"car_ids"}
                                            multiple={false}
                                            get_selected_data={({ids, selectedList}) => {
                                                let car = selectedList.length? selectedList[0] : {};
                                                setCar(car);
                                            }} />
                                    </div>
                                </div>
                                <input type="hidden" name="car_id" defaultValue={car.id} />
                                <input type="hidden" name="title" defaultValue={car.title} />
                                <input type="hidden" name="total_seat" defaultValue={car.total_seat} />

                                <div className="form_auto_fit">

                                    <div className="form-group form-vertical">
                                        <Input name={"date"} label="Date" type="date" />
                                    </div>

                                    <div className="form-group form-vertical">
                                        <Input name={"time"} label="time" type="time" />
                                    </div>

                                    <div className="form-group form-vertical">
                                        <Input name={"location"} type="text" />
                                    </div>
                                    
                                </div>
                            </div>

                            <div className="form-group form-vertical">
                                <label></label>
                                <div className="form_elements">
                                    <button className="btn btn_1 btn-outline-info">
                                        submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        </>
    );
};

export default Create;
