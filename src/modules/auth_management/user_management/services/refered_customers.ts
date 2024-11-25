import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { anyObject, responseObject } from '../../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';
import { Sequelize } from 'sequelize';

// async function details(
//     fastify_instance: FastifyInstance,
//     req: FastifyRequest,
// ): Promise<responseObject> {
//     throw new Error('500 test');
// }

async function refered_customers(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let params = req.params as any;
    let user_id = params.id? params.id :(req as anyObject).user.id;

    let designation = (req as anyObject).user.designation;
    try {
        let data = await models.UserModel.findAll({
            logging: true,
            where: {
                [designation]: user_id,
                role: 'customer',
            },
            // attributes: {
            //     exclude: ['password', 'token', 'forget_code', 'user_agent'],
            // },
            attributes: [
                'id','name','uid','phone_number','email',
                [
                    Sequelize.literal(`(
                                SELECT SUM(logs.amount)
                                FROM project_payments AS logs
                                WHERE
                                    logs.user_id = UserModels.id
                                    AND
                                    logs.type = "booking_money"
                            )`),
                    'total_booking_money',
                ],
                [
                    Sequelize.literal(`(
                                SELECT SUM(logs.amount)
                                FROM project_payments AS logs
                                WHERE
                                    logs.user_id = UserModels.id
                                    AND
                                    logs.type = "down_payment"
                            )`),
                    'total_down_payment',
                ],
                [
                    Sequelize.literal(`(
                                SELECT SUM(logs.amount)
                                FROM project_payments AS logs
                                WHERE
                                    logs.user_id = UserModels.id
                                    AND
                                    logs.type = "installment"
                            )`),
                    'total_installment',
                ],
                [
                    Sequelize.literal(`(
                                SELECT SUM(logs.amount)
                                FROM project_payments AS logs
                                WHERE
                                    logs.user_id = UserModels.id
                            )`),
                    'total_paid',
                ],
            ],
            include: [
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

export default refered_customers;
