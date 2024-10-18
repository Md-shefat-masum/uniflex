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
        'type',
        'account_id',
        'account_number_id',
        'account_category_id',
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

async function update_and_approve_expense(
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
            let user_id = 1;
            try {
                user_id = JSON.parse(body.user_id)[0];
            } catch (error) {
                user_id = body.user_id;
            }
            
            await data.update({
                account_id: body.account_id,
                account_number_id: body.account_number_id,
                user_id: user_id,
                account_category_id: body.category_id,
                type: 'expense',
                trx_id: body.receipt_no,
                date: body.date,
                amount: body.amount,
                amount_in_text: body.amount_in_text,
                is_approved: body.is_approved,
                description: body.description,
            });

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

export default update_and_approve_expense;