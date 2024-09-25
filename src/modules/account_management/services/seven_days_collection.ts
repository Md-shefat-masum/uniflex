import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { responseObject } from '../../../common_types/object';
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

async function seven_days_collection(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let params = req.query as any;
    
    let start_date = moment().subtract(7, 'days').format('YYYY-MM-DD');
    let end_date = moment().add(1, 'days').format('YYYY-MM-DD');

    if(params.start_date && params.end_date){
        start_date = params.start_date;
        end_date = moment(params.end_date).add(1, 'days').format('YYYY-MM-DD');
    }

    let diff = moment(end_date).diff(moment(start_date),'days');

    try {
        async function get_amount(type=""){
            let data:any[] = [];
            for (let index = 0; index < diff; index++) {
                let start = moment(start_date).add(index,'days').format('YYYY-MM-DD');
                let end = moment(start_date).add(index+1,'days').format('YYYY-MM-DD');
                let value = await models.ProjectPaymentModel.sum('amount',{
                    where: {
                        date: {
                            [Op.gte]: start,
                            [Op.lte]: end,
                        },
                        type: type,
                        is_approved: 1,
                    },
                });
                data.push({
                    meta: type.replace('_',' '),
                    value: value || 0,
                });
            }

            return data;
        }

        let labels = [];
        for (let index = 0; index < diff; index++) labels.push(moment(start_date).add(index,'days').format('DD/ddd'))

        let booking_money = await get_amount('booking_money');
        let down_payment = await get_amount('down_payment');
        let installment = await get_amount('installment');

        return response(200, 'data found', {
            booking_money: booking_money,
            down_payment: down_payment,
            installment: installment,
            labels: labels,
        });
        
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

export default seven_days_collection;
