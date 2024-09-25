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
import account_insentive_entry from './account_insentive_entry';

/** validation rules */
async function validate(req: Request) {
    let field = '';
    let fields = [
        'installment_no',
        'type',
        'account',
        // 'receipt_no',
        'date',
        'amount',
        'amount_in_text',
        'user_id',
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

    let result = await validationResult(req);

    return result;
}

// async function update(
//     fastify_instance: FastifyInstance,
//     req: FastifyRequest,
// ): Promise<responseObject> {
//     throw new Error('500 test');
// }

async function update_and_approve(
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
    let user_model = new models.AccountLogModel();

    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        let data = await models.AccountLogModel.findByPk(body.id);
        if (data) {
            let category: InstanceType<typeof models.AccountCategoryModel> | null = null;
            let account: InstanceType<typeof models.AccountModel> | null = null;
            category = await models.AccountCategoryModel.findOne({
                where: {
                    'title': body.type,
                }
            });
            account = await models.AccountModel.findOne({
                where: {
                    'title': body.account,
                }
            });
            
            let user_id = body.user_id;
            let category_id = 4;
            let account_id = 1;
            if(category && category.id) category_id = category.id;
            if(account && account.id) account_id = account.id;
            
            await data.update({
                account_id: account_id,
                account_number_id: account_id,
                user_id: user_id,
                account_category_id: category_id,
                type: body.transaction_type,
                trx_id: body.receipt_no,
                date: body.date,
                amount: body.amount,
                amount_in_text: body.amount_in_text,
                is_approved: body.is_approved,
                description: body.description,
            });

            let project_payment = await models.ProjectPaymentModel.findOne({
                where: {
                    account_log_id: data.id,
                }
            });

            if(project_payment){
                project_payment.project_id = body.project_id;
                project_payment.account_log_id = data.id;
                project_payment.user_id = body.user_id;
                project_payment.reference_user_id = body.reference_user_id;
                project_payment.amount = body.amount;
                project_payment.amount_in_text = body.amount_in_text;
                project_payment.installment_no = body.installment_no;
                project_payment.receipt_no = body.receipt_no;
                project_payment.date = body.date;
                project_payment.type = body.type;
                project_payment.is_approved = body.is_approved;
                await project_payment.save();
                
                /** insentive calculation */
                let user_insentive_calculations = await account_insentive_entry(fastify_instance, req, {
                    project_payment_id: project_payment.id  || 1,
                    customer_id: body.user_id,
                    mo_id: body.mo_id,
                    agm_id: body.agm_id,
                    gm_id: body.gm_id,
                    ed_id: body.ed_id,
                    date: body.date,
                    amount: body.amount,
                    type: body.type,
                    is_approved: body.is_approved,
                })
                
            }

            return response(201, 'data updated', data);
        } else {
            throw new custom_error(
                'data not found',
                404,
                'operation not possible',
            );
        }

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

export default update_and_approve;
