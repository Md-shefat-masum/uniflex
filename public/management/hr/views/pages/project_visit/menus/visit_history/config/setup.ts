import setup_type from './setup_type';

const prefix: string = 'visit_history';
const setup: setup_type = {
    prefix,
    module_name: 'visit_history',

    route_prefix: 'visit_history',

    api_host: location.origin,
    api_prefix: 'users',

    store_prefix: 'visit_history',
    layout_title: prefix + ' Management',

    all_page_title: 'All ' + prefix,
    details_page_title: 'Details ' + prefix,
    create_page_title: 'Create ' + prefix,
    edit_page_title: 'Edit ' + prefix,
};

export default setup;
