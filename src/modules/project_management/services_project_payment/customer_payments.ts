import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { anyObject, responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';
import moment from 'moment';
import { Op } from 'sequelize';

// async function details(
//     fastify_instance: FastifyInstance,
//     req: FastifyRequest,
// ): Promise<responseObject> {
//     throw new Error('500 test');
// }

async function customer_payments(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let params = req.params as any;
    let query = req.query as any;

    try {
        let start_date = moment().subtract(30, 'days').format('YYYY-MM-DD');
        let end_date = moment().add(2, 'days').format('YYYY-MM-DD');

        if(query.start_date && query.end_date){
            start_date = query.start_date;
            end_date = moment(query.end_date).add(1, 'days').format('YYYY-MM-DD');
        }

        let data = await models.ProjectPaymentModel.findAll({
            where: {
                user_id: params.id,
                date: {
                    [Op.gte]: start_date,
                    [Op.lte]: end_date,
                },
            },
            order: [['id','DESC']],
            attributes: ['id','user_id','amount','type','date'],
        });
        
        if (data) {
            return response(200, 'data found', data);
        } else {
            throw new custom_error('not found', 404, 'data not found');
        }
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.params);
        if (error instanceof custom_error) {
            error.uid = uid;
        } else {
            throw new custom_error('server error', 500, error.message, uid);
        }
        throw error;
    }
}

export default customer_payments;
