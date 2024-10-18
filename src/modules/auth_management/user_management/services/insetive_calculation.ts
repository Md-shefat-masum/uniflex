import db from '../models/db';
import account_db from '../../../account_management/models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { anyObject, responseObject } from '../../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';
import { Op } from 'sequelize';
import moment from 'moment';

// async function details(
//     fastify_instance: FastifyInstance,
//     req: FastifyRequest,
// ): Promise<responseObject> {
//     throw new Error('500 test');
// }

async function insetive_calculation(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let account_models = await account_db();
    let params = req.params as any;

    let auth_user_id = (req as anyObject).user.id;
    // console.log(auth_user_id);
    let designation = (req as anyObject).user.designation;
    try {
        let data = await models.UserModel.findOne({
            where: {
                id: auth_user_id,
            },
            attributes: {
                exclude: ['password', 'token', 'forget_code', 'user_agent'],
            },
        });

        async function get_prev_money(type=""){
            let prev_money = await account_models.AccountUserSalesInsentiveCalculationModel.sum('amount',{
                where: {
                    type: type,
                    [designation+"_id"]: auth_user_id,
                    date: {
                        [Op.lte]: moment().subtract(1,'days').format('YYYY-MM-DD'),  // End of today
                    } ,
                }
            });

            return prev_money;
        }
        
        async function get_today_money(type=""){
            let today_money = await account_models.AccountUserSalesInsentiveCalculationModel.sum('amount',{
                where: {
                    type: type,
                    [designation+"_id"]: auth_user_id,
                    date: {
                        [Op.gte]: moment().subtract(0,'days').format('YYYY-MM-DD'), // Start of today
                        [Op.lte]: moment().add(1,'days').format('YYYY-MM-DD')    // End of today
                    }
                }
            });

            return today_money;
        }

        async function get_total_money(type=""){
            let total_money = await account_models.AccountUserSalesInsentiveCalculationModel.sum('amount',{
                where: {
                    type: type,
                    [designation+"_id"]: auth_user_id,
                }
            });

            return total_money;
        }

        async function get_reference_money(){
            let prev = await account_models.AccountUserSalesInsentiveCalculationModel.sum('amount',{
                where: {
                    reference_id: auth_user_id,
                    date: {
                        [Op.lte]: moment().subtract(1,'days').format('YYYY-MM-DD'),  // End of today
                    },
                }
            });
            let today = await account_models.AccountUserSalesInsentiveCalculationModel.sum('amount',{
                where: {
                    reference_id: auth_user_id,
                    date: {
                        [Op.gte]: moment().subtract(0,'days').format('YYYY-MM-DD'), // Start of today
                        [Op.lte]: moment().add(1,'days').format('YYYY-MM-DD') 
                    },
                }
            });
            let total = prev + today;
            return {prev, today, total};
        }

        let total_withdraw = await account_models.AccountLogModel.sum('amount',{
            where: {
                user_id: auth_user_id,
                account_category_id: 4, // insentive_withdraw
            }
        });
       
        let withdraw_pending = await account_models.payout_request_model.sum('amount',{
            where: {
                user_id: auth_user_id,
                is_approved: 'pending', // insentive_withdraw
            }
        });

        let prev_booking_money = await get_prev_money('booking_money');
        let today_booking_money = await get_today_money('booking_money');
        let total_booking_money = await get_total_money('booking_money');

        let prev_down_payment = await get_prev_money('down_payment');
        let today_down_payment = await get_today_money('down_payment');
        let total_down_payment = await get_total_money('down_payment');

        let prev_installment = await get_prev_money('installment');
        let today_installment = await get_today_money('installment');
        let total_installment = await get_total_money('installment');

        let reference_amount = await get_reference_money();
        let prev_reference_amount = reference_amount.prev;
        let today_reference_amount = reference_amount.today;
        let total_reference_amount = reference_amount.total;

        let total_insentive = total_booking_money + total_down_payment + total_installment + total_reference_amount;
        if (data) {
            // console.log((req as anyObject).user);
            
            return response(200, 'data found', {
                data:data,
                
                prev_booking_money: prev_booking_money,
                today_booking_money: today_booking_money,
                total_booking_money: total_booking_money,

                prev_down_payment: prev_down_payment,
                today_down_payment: today_down_payment,
                total_down_payment: total_down_payment,

                prev_installment: prev_installment,
                today_installment: today_installment,
                total_installment: total_installment,

                prev_reference_amount: prev_reference_amount,
                today_reference_amount: today_reference_amount,
                total_reference_amount: total_reference_amount,

                total_insentive: total_insentive,
                total_withdraw: total_withdraw,
                balance: total_insentive - total_withdraw,

                withdraw_pending: withdraw_pending,

                prev: moment().subtract(1,'days').format('YYYY-MM-DD'),
                today: moment().subtract(0,'days').format('YYYY-MM-DD'),
            });

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

export default insetive_calculation;
