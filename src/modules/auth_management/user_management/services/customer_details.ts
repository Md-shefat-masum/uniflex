import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { anyObject, responseObject } from '../../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';

// async function details(
//     fastify_instance: FastifyInstance,
//     req: FastifyRequest,
// ): Promise<responseObject> {
//     throw new Error('500 test');
// }

async function customer_details(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let params = req.params as any;
    let user_id = params.id? params.id :(req as anyObject).user.id;

    try {
        let data = await models.UserModel.findOne({
            where: {
                id: user_id,
            },
            attributes: {
                exclude: ['password', 'token', 'forget_code', 'user_agent'],
            },
            include: [
                {
                    model: models.UserModel,
                    as: "mo_info",
                    attributes: ['id','name','uid']
                },
                {
                    model: models.UserProjectCustomerInformationModel,
                    as: "project_customer_information",
                    include: [
                        {
                            model: models.ProjectModel,
                            as: 'project_info'
                        }
                    ]
                }
            ],
        });

        if (data) {
            let installment_no = 0;
            let paid = 0;
            let payable = 0;
            let customer_inforamtions: any = "";
            let total_booking_money = 0;
            let total_down_payment = 0;
            let total_installment = 0;

            total_booking_money = await models.UserProjectPaymentModel.sum('amount',{
                where:{
                    user_id: data.id,
                    type: 'booking_money',
                }
            });
            total_down_payment = await models.UserProjectPaymentModel.sum('amount',{
                where:{
                    user_id: data.id,
                    type: 'down_payment',
                }
            });
            total_installment = await models.UserProjectPaymentModel.sum('amount',{
                where:{
                    user_id: data.id,
                    type: 'installment',
                }
            });

            customer_inforamtions = (data as any).project_customer_information.customer_informations;
            try {
                customer_inforamtions = JSON.parse(customer_inforamtions);
            } catch (error) {
                
            }

            payable = customer_inforamtions.have_to_pay_amount;

            try {
                installment_no = await models.UserProjectPaymentModel.count({
                    where: {
                        user_id: data.id,
                        project_id: (data as any).project_customer_information?.project_id
                    }
                });
            } catch (error) {
                console.log(error);
            }

            try {
                paid = await models.UserProjectPaymentModel.sum( 'amount',{
                    where: {
                        user_id: data.id,
                        project_id: (data as any).project_customer_information?.project_id
                    }
                });
            } catch (error) {
                console.log(error);
            }
            
            return response(200, 'data found', {
                user: data,
                installment_no: installment_no,
                paid: paid,
                payable: +payable,
                customer_inforamtions: customer_inforamtions,
                total_booking_money: total_booking_money,
                total_down_payment: total_down_payment,
                total_installment: total_installment,
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

export default customer_details;
