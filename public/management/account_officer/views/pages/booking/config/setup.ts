import setup_type from './setup_type';

const prefix: string = 'Booking';
const setup: setup_type = {
    prefix,
    module_name: 'booking',

    route_prefix: 'booking',

    api_host: location.origin,
    api_prefix: 'project/bookings',

    store_prefix: 'booking',
    layout_title: prefix + ' Management',

    all_page_title: 'All ' + prefix,
    details_page_title: 'Details ' + prefix,
    create_page_title: 'Create ' + prefix,
    edit_page_title: 'Edit ' + prefix,
    payment_page_title: "Payment Details"
};

export default setup;
