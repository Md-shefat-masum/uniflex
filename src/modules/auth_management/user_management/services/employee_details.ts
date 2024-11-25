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

async function employee_details(
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
                    model: models.UserInformationModel,
                    as: "info",
                }
            ],
        });

        let total_mo = 0;
        let total_agm = 0;
        let total_gm = 0;
        let total_ed = 0;
        let total_customer = 0;

        if (data) {
            total_mo = await models.UserModel.count({
                where: {
                    reference: data.id,
                    designation: 'mo',
                }
            });
            total_agm = await models.UserModel.count({
                where: {
                    reference: data.id,
                    designation: 'agm',
                }
            });
            total_gm = await models.UserModel.count({
                where: {
                    reference: data.id,
                    designation: 'gm',
                }
            });
            total_ed = await models.UserModel.count({
                where: {
                    reference: data.id,
                    designation: 'ed',
                }
            });
            total_customer = await models.UserModel.count({
                where: {
                    reference: data.id,
                    role: 'customer',
                }
            });

            return response(200, 'data found', {
                user: data,
                total_mo: total_mo,
                total_agm: total_agm,
                total_gm: total_gm,
                total_customer: total_customer,
                total_ed: total_ed,
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

export default employee_details;
