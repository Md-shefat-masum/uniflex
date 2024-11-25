import setup_type from './setup_type';

const prefix: string = 'car management';
const setup: setup_type = {
    prefix,
    module_name: 'car_management',

    route_prefix: 'car-management',

    api_host: location.origin,
    api_prefix: 'cars',

    store_prefix: 'car_management',
    layout_title: prefix + ' Management',

    all_page_title: 'All ' + prefix,
    details_page_title: 'Details ' + prefix,
    create_page_title: 'Create ' + prefix,
    edit_page_title: 'Edit ' + prefix,
};

export default setup;
