import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';

// async function details(
//     fastify_instance: FastifyInstance,
//     req: FastifyRequest,
// ): Promise<responseObject> {
//     throw new Error('500 test');
// }

async function details(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let params = req.params as any;

    try {
        let data = await models.AccountLogModel.findOne({
            where: {
                id: params.id,
            },
            include: [
                {
                    model: models.ProjectPaymentModel,
                    as: 'project_payment'
                },
                {
                    model: models.UserModel,
                    as: 'user',
                },
                {
                    model: models.AccountModel,
                    as: 'account',
                },
                {
                    model: models.AccountNumberModel,
                    as: 'account_number',
                },
                {
                    model: models.AccountCategoryModel,
                    as: 'category',
                },
            ]
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

export default details;
