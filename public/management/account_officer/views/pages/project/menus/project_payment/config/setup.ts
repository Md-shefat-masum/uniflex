import setup_type from './setup_type';

const prefix: string = 'Project Payment';
const setup: setup_type = {
    prefix,
    module_name: 'project_payment',
    route_prefix: 'project_payment',

    api_host: location.origin,
    api_prefix: 'project/payments',

    store_prefix: 'project_payment',
    layout_title: prefix + ' Management',

    all_page_title: 'All ' + prefix,
    details_page_title: 'Details ' + prefix,
    create_page_title: 'Create ' + prefix,
    edit_page_title: 'Edit ' + prefix,
};

export default setup;
