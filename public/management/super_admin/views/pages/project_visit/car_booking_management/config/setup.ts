import setup_type from './setup_type';

const prefix: string = 'Car Booking';
const setup: setup_type = {
    prefix,
    module_name: 'car_booking_management',

    route_prefix: 'car-booking',

    api_host: location.origin,
    api_prefix: 'car-bookings',

    store_prefix: 'car_booking_management',
    default_fields: 'id,title,date,seat_no,passenger_name,passenger_contact,status',

    layout_title: prefix + ' Management',

    all_page_title: 'All ' + prefix,
    details_page_title: 'Details ' + prefix,
    create_page_title: 'Create ' + prefix,
    edit_page_title: 'Edit ' + prefix,
};

export default setup;
