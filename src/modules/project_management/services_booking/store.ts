import db from '../models/db';
import account_db from '../../account_management/models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { body, validationResult } from 'express-validator';
import {
    anyObject,
    responseObject,
    Request,
} from '../../../common_types/object';
import response from '../helpers/response';
import { InferCreationAttributes } from 'sequelize';
import custom_error from '../helpers/custom_error';
import error_trace from '../helpers/error_trace';
import moment from 'moment';
import project_payment_entry from '../../account_management/services/project_payment_entry';
import account_insentive_entry from '../../account_management/services/account_insentive_entry';

/** validation rules */
function incrementString(str:string) {
    let numPart = str.match(/\d+/);
    let nonNumPart = str.replace(/\d+/g, '');
    
    if (numPart) {
        let num = parseInt(numPart[0], 10);
        num++;
        return nonNumPart + num.toString().padStart(5,'0'); 
    }
    return str;
}
async function validate(req: Request) {
    let field:string[] = [];
    let fields = [
        'booking_type',
        'customer_id',
        'customer_password',
        'applicant_name_english',
        'application_date',
        'mobile',

        'size_of_property_land_percentage',
        'size_of_property_katha',
        'property_price_text',

        'payment_digit',
        'payment_text',

        'property_price_digit',
        'have_to_pay_amount',

        'office_only_money_receipt_no',
        'check_cash_po_dd_no',
        'payment_method',
    ];

    for (let index = 0; index < fields.length; index++) {
        const field = fields[index];
        await body(field)
            .not()
            .isEmpty()
            .withMessage(
                `the <b>${field.replaceAll('_', ' ')}</b> field is required`,
            )
            .run(req);
    }

    var element = 'customer_id';
    await body(element)
            .not()
            .isEmpty()
            .custom(async (value) => {
                let models = await db();
                let user = await models.UserModels.findOne({
                    where: {
                        'uid': value,
                    }
                });

                if(user){
                    let user = await models.UserModels.findOne({
                        where: {
                            'role': 'customer',
                        },
                        order: [['id','DESC']],
                    });

                    let latest = user?.uid;

                    throw new Error(
                        `the <b>${value}</b> is taken. use ${incrementString(latest || 'uc00001')}`,
                    );
                }
            })
            // .withMessage(
            //     `the <b>UID </b> is taken`,
            // )
            .run(req);

    field = [
        'project_id', 
        'reference_user_id',
        'mo_id',
        'agm_id',
        'gm_id',
        'ed_id',
    ];
    for (let index = 0; index < field.length; index++) {
        const element = field[index];
        await body(element)
            .not()
            .isEmpty()
            .custom(async (value) => {
                const length = value.length;
                if (length <= 2) {
                    throw new Error(
                        `the <b>${element.replaceAll('_', ' ')}</b> field is required`,
                    );
                }
            })
            .withMessage(
                `the <b>${element.replaceAll('_', ' ')}</b> field is required`,
            )
            .run(req);
    }

    let result = await validationResult(req);

    return result;
}
// async function store(
//     fastify_instance: FastifyInstance,
//     req: FastifyRequest,
// ): Promise<responseObject> {
//     throw new Error('500 test');
// }
async function store(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    /** validation */
    let validate_result = await validate(req as Request);
    if (!validate_result.isEmpty()) {
        return response(422, 'validation error', validate_result.array());
    }

    /** initializations */
    let models = await db();
    let body = req.body as anyObject;
    let user_model = new models.UserModels();
    let data = new models.ProjectCustomerModel();
    let project_customer_info = new models.ProjectCustomerInfomationModel();

    let image_path = "";
    let nominee_photo_1 = "";
    let nominee_photo_2 = "";
    let customer_signature = "";

    if(body['customer_image']?.ext){
        image_path =
            'uploads/projects/' +
            moment().format('YYYYMMDDHHmmss1') +
            body['customer_image'].ext;
        await (fastify_instance as any).upload(body['customer_image'], image_path);
    }
    
    if(body['nominee_photo_1']?.ext){
        nominee_photo_1 =
            'uploads/projects/' +
            moment().format('YYYYMMDDHHmmss2') +
            body['nominee_photo_1'].ext;
        await (fastify_instance as any).upload(body['nominee_photo_1'], nominee_photo_1);
    }
    
    if(body['nominee_photo_2']?.ext){
        nominee_photo_2 =
            'uploads/projects/' +
            moment().format('YYYYMMDDHHmmss3') +
            body['nominee_photo_2'].ext;
        await (fastify_instance as any).upload(body['nominee_photo_2'], nominee_photo_2);
    }
    
    if(body['customer_signature']?.ext){
        customer_signature =
            'uploads/projects/' +
            moment().format('YYYYMMDDHHmmss4') +
            body['customer_signature'].ext;
        await (fastify_instance as any).upload(body['customer_signature'], customer_signature);
    }

    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    let password = await bcrypt.hash(body.customer_password, saltRounds);
    
    let project_id = null;
    let reference_user_id = null;
    let mo_id = null;
    let agm_id = null;
    let gm_id = null;
    let ed_id = null;
    if(body.project_id){
        project_id = JSON.parse(body.project_id)[0];
    }
    if(body.reference_user_id){
        reference_user_id = JSON.parse(body.reference_user_id)[0];
    }
    if(body.mo_id){
        mo_id = JSON.parse(body.mo_id)[0];
    }
    if(body.agm_id){
        agm_id = JSON.parse(body.agm_id)[0];
    }
    if(body.gm_id){
        gm_id = JSON.parse(body.gm_id)[0];
    }
    if(body.ed_id){
        ed_id = JSON.parse(body.ed_id)[0];
    }

    let user_inputs: InferCreationAttributes<typeof user_model> = {
        name: body.applicant_name_english,
        uid: body.customer_id,
        email: body.email,
        phone_number: body.mobile,
        password: password,
        image: image_path,
        reference: reference_user_id,
        mo: mo_id,
        agm: agm_id,
        gm: gm_id,
        ed: ed_id,
    };

    let inputs: InferCreationAttributes<typeof data> = {
        project_id: project_id,
        reference_user_id: reference_user_id,
        mo_id: mo_id,
        agm_id: agm_id,
        gm_id: gm_id,
        ed_id: ed_id,
        user_id: 0,
        have_to_pay_amount: body.have_to_pay_amount,
        date: body.application_date,
        paid: body.payment_digit,
        total_share: body.total_share,
    };

    let keysToRemove = [
        'customer_image',
        'nominee_photo_1', 
        'nominee_photo_2',
    ];

    let obj = body;
    let project_customer_info_inputs: anyObject = {
        customer_informations: {
            nominee_photo_1: '',
            nominee_photo_2: '',
            customer_image: '',
        },
    };

    /** sort keys */
    obj = Object.keys(obj)
        .sort()
        .reduce((acc:anyObject, key) => {
            acc[key] = obj[key];
            return acc;
        }, {});
    
    /** set values */
    project_customer_info_inputs.customer_informations = Object.keys(obj)
        .reduce((acc:anyObject, key) => {
        if (!keysToRemove.includes(key)) {
            acc[key] = obj[key];
        }
        return acc;
    }, {});

    project_customer_info_inputs.customer_informations.nominee_photo_1 = nominee_photo_1;
    project_customer_info_inputs.customer_informations.nominee_photo_2 = nominee_photo_2;
    project_customer_info_inputs.customer_informations.customer_image = image_path;
    project_customer_info_inputs.customer_informations.customer_signature = customer_signature;
    
    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        (await user_model.update(user_inputs)).save();

        if(user_model.id){
            inputs.user_id = user_model.id;
        }

        (await data.update(inputs)).save();

        if(data.id){
            /** store customer information */
            project_customer_info_inputs.project_id = data.project_id;
            project_customer_info_inputs.project_customer_id = data.id;
            project_customer_info_inputs.user_id = data.user_id;
            project_customer_info_inputs.reference_user_id = data.reference_user_id;
            project_customer_info_inputs.mo_id = data.mo_id;
            project_customer_info_inputs.agm_id = data.agm_id;
            project_customer_info_inputs.gm_id = data.gm_id;
            project_customer_info_inputs.ed_id = data.ed_id;

            (await project_customer_info.update(project_customer_info_inputs)).save();

            /** store account infos */
            let account_models = await account_db();
            let category: InstanceType<typeof account_models.AccountCategoryModel> | null = null;
            let account: InstanceType<typeof account_models.AccountModel> | null = null;
            category = await account_models.AccountCategoryModel.findOne({
                where: {
                    'title': body.payment_method,
                }
            });
            account = await account_models.AccountModel.findOne({
                where: {
                    'title': body.check_cash_po_dd_no,
                }
            });

            let category_id = 1;
            let acccount_id = 1;
            let user_id = 0;
            if(category && category.id) category_id = category.id;
            if(account && account.id) acccount_id = account.id;
            if(user_model && user_model.id) user_id = user_model.id;

            let log = await project_payment_entry(fastify_instance, req, {
                account_category_id: category_id,
                account_id: acccount_id,
                account_number_id: acccount_id,
                amount: body.payment_digit,
                type: 'income',
                user_id: user_id,
                date: body.payment_date,
            });

            /*** track project payment */
            let installment_no = await models.ProjectPaymentModel.count({
                where:{
                    project_id: project_id,
                    user_id: user_id,
                }
            })
            let project_payment = new models.ProjectPaymentModel();
            project_payment.project_id = project_id;
            project_payment.account_log_id = (log as any).id;
            project_payment.user_id = user_id;
            project_payment.reference_user_id = data.reference_user_id;
            project_payment.amount = body.payment_digit;
            project_payment.amount_in_text = body.payment_text;
            project_payment.installment_no = installment_no + 1;
            project_payment.receipt_no = body.office_only_money_receipt_no;
            project_payment.date = moment(body.payment_date).format('YYYY-MM-DD');
            project_payment.type = body.payment_method;
            await project_payment.save();

            /** insentive calculation */
            let user_insentive_calculations = account_insentive_entry(fastify_instance, req, {
                project_payment_id: project_payment.id  || 1,
                customer_id: user_id,
                mo_id: mo_id,
                agm_id: agm_id,
                gm_id: gm_id,
                ed_id: ed_id,
                date: moment(body.payment_date).format('YYYY-MM-DD'),
                amount: body.payment_digit,
                type: body.payment_method,
            });

        }

        return response(201, 'data created', {
            data,
        });
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        throw new custom_error('server error', 500, error.message, uid);
        // throw error;
    }
}

export default store;
