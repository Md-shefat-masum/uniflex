import setup_type from './setup_type';

const prefix: string = 'Accounts';
const setup: setup_type = {
    prefix,
    module_name: 'accounts',

    route_prefix: 'accounts',

    api_host: location.origin,
    api_prefix: 'account/logs',

    store_prefix: 'accounts',
    layout_title: prefix + ' Management',

    all_page_title: 'All ' + prefix,
    details_page_title: 'Details ' + prefix,
    create_page_title: 'Create ' + prefix,
    edit_page_title: 'Edit ' + prefix,
    payment_page_title: "Payment Details"
};

export default setup;
