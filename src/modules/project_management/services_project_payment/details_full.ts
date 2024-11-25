import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { anyObject, responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';

// async function details(
//     fastify_instance: FastifyInstance,
//     req: FastifyRequest,
// ): Promise<responseObject> {
//     throw new Error('500 test');
// }

async function details_full(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let params = req.params as any;

    try {
        let select_fields = ['id', 'uid', 'name' ];
        let data = await models.ProjectPaymentModel.findOne({
            where: {
                id: params.id,
            },
            attributes: [
                'id',
                'project_id',
                'user_id',
                'date',
                'amount',
                'amount_in_text',
                'receipt_no',
                'type',
                'account_log_id',
            ],
            include: [
                {
                    model: models.UserModels,
                    as: 'user_info',
                    include: [
                        {
                            model: models.ProjectCustomerInfomationModel,
                            as: 'project_customer_information',
                        }
                    ],
                    attributes: select_fields,
                },
                {
                    model: models.UserModels,
                    as: 'reference_info',
                    attributes: select_fields,
                },
                {
                    model: models.ProjectModel,
                    as: 'project_info',
                    attributes: [
                        'id',
                        'uid',
                        'title',
                    ]
                }
            ]
        });

        let total_payment = await models.ProjectPaymentModel.sum('amount',{
            where: {
                user_id: data?.user_id
            }
        });
        
        if (data) {
            return response(200, 'data found', {
                data,
                total_payment,
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

export default details_full;
