import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';
import account_insentive_entry from './account_insentive_entry';

// async function details(
//     fastify_instance: FastifyInstance,
//     req: FastifyRequest,
// ): Promise<responseObject> {
//     throw new Error('500 test');
// }

async function approve_payment(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let params = req.params as any;

    try {
        let data = await models.AccountLogModel.findOne({
            where: {
                id: params.id,
            }
        });

        let project_payment = await models.ProjectPaymentModel.findOne({
            where: {
                account_log_id: params.id,
            }
        });

        if (data) {
            await data.update({
                is_approved: 1
            });
            
            if(project_payment){
                await project_payment.update({
                    is_approved: 1
                });

                /** insentive calculation */
                let user = await models.UserModel.findOne({where:{id: project_payment.user_id}});
                if(user){
                    let user_insentive_calculations = await account_insentive_entry(fastify_instance, req, {
                        project_payment_id: project_payment.id  || 1,
                        customer_id: user.id || 1,
                        mo_id: user.mo || 1,
                        agm_id: user.agm || 1,
                        gm_id: user.gm || 1,
                        ed_id: user.ed || 1,
                        date: project_payment.date,
                        amount: project_payment.amount ? +project_payment.amount : 0,
                        type: project_payment.type,
                        is_approved: 1,
                    })
                }
            }
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

export default approve_payment;
