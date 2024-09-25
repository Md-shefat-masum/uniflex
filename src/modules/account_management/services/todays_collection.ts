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

async function todays_collection(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let params = req.query as any;
    
    let start_date = moment().subtract(0, 'days').format('YYYY-MM-DD');
    let end_date = moment().add(1, 'days').format('YYYY-MM-DD');

    if(params.start_date && params.end_date){
        start_date = params.start_date;
        end_date = moment(params.end_date).add(1, 'days').format('YYYY-MM-DD');
    }

    try {
        async function get_amount(type="", is_approved=1){
            let data = await models.ProjectPaymentModel.sum('amount',{
                where: {
                    date: {
                        [Op.gte]: start_date, // Start of today
                        [Op.lte]: end_date,
                    },
                    type: type,
                    is_approved: is_approved,
                },
            });

            return data;
        }

        let booking_money = await get_amount('booking_money');
        let down_payment = await get_amount('down_payment');
        let installment = await get_amount('installment');
        
        let not_approped_booking_money = await get_amount('booking_money',0);
        let not_approped_down_payment = await get_amount('down_payment',0);
        let not_approped_installment = await get_amount('installment',0);

        return response(200, 'data found', {
            booking_money: booking_money,
            down_payment: down_payment,
            installment: installment,

            not_approped_booking_money: not_approped_booking_money,
            not_approped_down_payment: not_approped_down_payment,
            not_approped_installment: not_approped_installment,
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

export default todays_collection;
