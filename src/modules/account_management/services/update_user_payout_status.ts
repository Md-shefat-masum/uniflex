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
import { generateUID } from './store_expense';

/** validation rules */
async function validate(req: Request) {
    let field = '';
    let fields = [
        'id',
        'is_approved',
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
// async function store(
//     fastify_instance: FastifyInstance,
//     req: FastifyRequest,
// ): Promise<responseObject> {
//     throw new Error('500 test');
// }
async function update_payment_request(
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
    

    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        let data = await models.payout_request_model.findOne({
            where: {
                id: body.id
            }
        });

        let ac_log = {};

        if(data && data?.is_approved == 'pending'){
            data.is_approved = body.is_approved;
            await data?.save();

            if(body.is_approved == 'approved'){
                ac_log = await models.AccountLogModel.create({
                    user_id: data.user_id,
                    amount: data.amount,
                    account_category_id: 4,
                    trx_id: moment().format("YYYYMMDDhhmmss"+data.id),

                    account_id: body.account_id,
                    account_number_id: body.account_number_id,
                    date: moment().toString(),
                    amount_in_text: body.amount_in_text,
                    description: "insentive payout",
                    type: 'expense',
                    uid: generateUID(),
                });
            }
        }

        return response(201, 'data updated', {
            data,
            ac_log,
        });
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        throw new custom_error('server error', 500, error.message, uid);
        // throw error;
    }
}

export default update_payment_request;
