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


export const generateUID = function() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Add 1 to month since it's zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    const uid = `${year}${month}${day}${randomNum}`;
    return uid;
}

async function project_payment_entry(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
    param: {
        account_id: number,
        account_number_id: number,
        user_id: number,
        account_category_id: number,
        type: 'income' | 'expense',
        trx_id?: string,
        date?: string,
        amount: number,
        amount_in_text?: string,
        description?: string,
    }
): Promise<object> {

    /** initializations */
    let models = await db();
    let data = new models.AccountLogModel();

    let inputs: InferCreationAttributes<typeof data> = {
        uid: generateUID(),
        account_id: param.account_id,
        account_number_id: param.account_number_id,
        user_id: param.user_id,
        account_category_id: param.account_category_id,
        type: param.type,
        trx_id: param.trx_id,
        // date: moment(param.date).format('YYYY-MM-DD HH:mm:ss'),
        date: param.date,
        amount: param.amount,
        amount_in_text: param.amount_in_text,
        description: param.description,
    };
    
    /** store data into database */
    try {
        (await data.update(inputs)).save();
        return data;
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        throw new custom_error('server error', 500, error.message, uid);
        // throw error;
    }
}

export default project_payment_entry;
