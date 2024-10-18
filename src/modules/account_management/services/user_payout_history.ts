import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { body, validationResult } from 'express-validator';
import {
    anyObject,
    responseObject,
    Request,
} from '../../../common_types/object';
import response from '../helpers/response';
import { InferCreationAttributes, Op } from 'sequelize';
import custom_error from '../helpers/custom_error';
import error_trace from '../helpers/error_trace';
import moment from 'moment';


// async function store(
//     fastify_instance: FastifyInstance,
//     req: FastifyRequest,
// ): Promise<responseObject> {
//     throw new Error('500 test');
// }
async function user_payout_history(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    /** validation */
    let params = req.query as any;

    /** initializations */
    let models = await db();
    
    /** print request data into console */
    // console.clear();

    /** store data into database */
    try {
        let start_date = moment().subtract(30, 'days').format('YYYY-MM-DD');
        let end_date = moment().add(2, 'days').format('YYYY-MM-DD');

        if(params.start_date && params.end_date){
            start_date = params.start_date;
            end_date = moment(params.end_date).add(1, 'days').format('YYYY-MM-DD');
        }

        let condition:any = {
            user_id: (req as any).user.id,
            date: {
                [Op.gte]: start_date,
                [Op.lte]: end_date,
            },
        };

        if(params.get_all){
            condition = {
                date: {
                    [Op.gte]: start_date,
                    [Op.lte]: end_date,
                },
            };
        }

        if(params.is_approved){
            condition.is_approved = params.is_approved;
        }

        let data = await models.payout_request_model.findAll({
            where: condition,
            include: [
                {
                    model: models.UserModel,
                    as: 'user',
                    attributes: ['id', 'name', 'uid'],
                }
            ]
        });

        return response(200, 'data list', {
            data,
        });
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        throw new custom_error('server error', 500, error.message, uid);
        // throw error;
    }
}

export default user_payout_history;
