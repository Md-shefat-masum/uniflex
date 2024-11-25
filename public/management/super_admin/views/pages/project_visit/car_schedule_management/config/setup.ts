import setup_type from './setup_type';

const prefix: string = 'Car Booking schedule';
const setup: setup_type = {
    prefix,
    module_name: 'car_schedule_management',

    route_prefix: 'car-booking-schedules',

    api_host: location.origin,
    api_prefix: 'car-booking-schedules',

    store_prefix: 'car_schedule_management',
    default_fields: 'id,title,date,location,total_seat,total_booked,status',

    layout_title: prefix + ' Management',

    all_page_title: 'All ' + prefix,
    details_page_title: 'Details ' + prefix,
    create_page_title: 'Create ' + prefix,
    edit_page_title: 'Edit ' + prefix,
};

export default setup;
