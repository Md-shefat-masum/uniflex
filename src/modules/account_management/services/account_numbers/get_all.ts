import { FindAndCountOptions, Sequelize } from 'sequelize';
import db from '../../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import response from '../../helpers/response';
import error_trace from '../../helpers/error_trace';
import custom_error from '../../helpers/custom_error';
import { validationResult, query } from 'express-validator';
import {
    anyObject,
    responseObject,
    Request,
} from '../../../../common_types/object';


async function get_all(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
   
    /** initializations */
    let models = await db();
    try {
        let data = await models.AccountNumberModel.findAll({
            include: {
                model: models.AccountModel,
                as: 'account',
                attributes: ['id','title','openning_date']
            },
        });
        return response(200, 'data fetched', data);
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.query);
        throw new custom_error('server error', 500, error.message, uid);
    }
}

export default get_all;
