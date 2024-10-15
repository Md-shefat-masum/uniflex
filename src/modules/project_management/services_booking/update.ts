import db from '../models/db';
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

/** validation rules */
async function validate(req: Request) {
    let field:string[] = [];
    let fields = [
        'id',
        'booking_type',
        'customer_id',
        'customer_password',
        'applicant_name_english',
        'application_date',
        'mobile',
        // 'payment_digit',
        // 'payment_text',
        'have_to_pay_amount',
        // 'office_only_money_receipt_no',
        // 'check_cash_po_dd_no',
        // 'payment_method',
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

// async function update(
//     fastify_instance: FastifyInstance,
//     req: FastifyRequest,
// ): Promise<responseObject> {
//     throw new Error('500 test');
// }

async function update(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    /** validation */
    let validate_result = await validate(req as Request);
    if (!validate_result.isEmpty()) {
        return response(422, 'validation error', validate_result.array());
    }

    /** initializations */
    /** initializations */
    let models = await db();
    let body = req.body as anyObject;
    let user_model: InstanceType<typeof models.UserModels> | null = null;
    let project_customer_info: InstanceType<typeof models.ProjectCustomerInfomationModel> | null = null;
    let customer_informations: any = {};

    let data = await models.ProjectCustomerModel.findOne({
        where: {
            "id": body.id,
        }
    });

    if(data){
        user_model = await models.UserModels.findOne({
            where: {
                id: data.user_id,
            }
        });

        project_customer_info = await models.ProjectCustomerInfomationModel.findOne({
            where: {
                "project_customer_id": data.id,
            }
        });

        if(project_customer_info && project_customer_info.customer_informations){
            customer_informations = project_customer_info.customer_informations;
            try {
                customer_informations = JSON.parse(project_customer_info.customer_informations);
            } catch (error) {
                
            }
        }
    }
    
    let image_path = customer_informations.customer_image;
    let nominee_photo_1 = customer_informations.nominee_photo_1;
    let nominee_photo_2 = customer_informations.nominee_photo_2;
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
    
    let project_id = data?.project_id;
    let reference_user_id = data?.reference_user_id;
    let mo_id = data?.mo_id;
    let agm_id = data?.agm_id;
    let gm_id = data?.gm_id;
    let ed_id = data?.ed_id;
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

    let user_model_type = new models.UserModels();
    let user_inputs: InferCreationAttributes<typeof user_model_type> = {
        name: body.applicant_name_english,
        uid: body.customer_id,
        email: body.email,
        phone_number: body.mobile,
        image: image_path,
        reference: reference_user_id,
        mo: mo_id,
        agm: agm_id,
        gm: gm_id,
        ed: ed_id,
    };

    if(body.customer_password){
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        let password = await bcrypt.hash(body.customer_password, saltRounds);
        user_inputs.password = password;
    }

    let project_customer_model_data_type = new models.ProjectCustomerModel();
    let inputs: InferCreationAttributes<typeof project_customer_model_data_type> = {
        project_id: project_id || 0,
        reference_user_id: reference_user_id || 0,
        mo_id: mo_id || 0,
        agm_id: agm_id || 0,
        gm_id: gm_id || 0,
        ed_id: ed_id || 0,
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
        },
    };
    project_customer_info_inputs.customer_informations = Object.keys(obj).reduce((acc:anyObject, key) => {
        if (!keysToRemove.includes(key)) {
            acc[key] = obj[key];
        }
        return acc;
    }, {});
    project_customer_info_inputs.customer_informations.nominee_photo_1 = nominee_photo_1;
    project_customer_info_inputs.customer_informations.nominee_photo_2 = nominee_photo_2;
    project_customer_info_inputs.customer_informations.customer_signature = customer_signature;
    
    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        if (data) {
            // console.log(data, user_model);
            
            if(user_model){
                (await user_model.update(user_inputs)).save();
                if(user_model.id){
                    inputs.user_id = user_model.id;
                }
                (await data.update(inputs)).save();
            }

            if(data.id && project_customer_info){
                project_customer_info_inputs.project_id = data.project_id;
                project_customer_info_inputs.user_id = data.user_id;
                project_customer_info_inputs.reference_user_id = data.reference_user_id;
                project_customer_info_inputs.project_customer_id = data.id;

                (await project_customer_info.update(project_customer_info_inputs)).save();
            }

            return response(201, 'data updated', { data });
        } else {
            throw new custom_error(
                'data not found',
                404,
                'operation not possible',
            );
        }
        return response(201, 'data updated', { data });
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        if (error instanceof custom_error) {
            error.uid = uid;
        } else {
            throw new custom_error('server error', 500, error.message, uid);
        }
        throw error;
    }
}

export default update;
