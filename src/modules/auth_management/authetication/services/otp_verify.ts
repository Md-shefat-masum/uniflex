import { FindAndCountOptions, Model, Op } from 'sequelize';
import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import response from '../helpers/response';
var bcrypt = require('bcrypt');
import { body, validationResult } from 'express-validator';

import {
    anyObject,
    responseObject,
    Request,
} from '../../../../common_types/object';
import { env } from 'process';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';
import send_otp from './send_otp';

async function validate(req: Request) {
    await body('email')
        .not()
        .isEmpty()
        .withMessage('the email field is required')
        .run(req);

    await body('otp')
        .not()
        .isEmpty()
        .withMessage('the otp field is required')
        .run(req);

    let result = await validationResult(req);

    return result;
}

async function otp_verify(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    /** validation */
    let validate_result = await validate(req as Request);
    if (!validate_result.isEmpty()) {
        return response(422, 'validation error', validate_result.array());
    }

    let models = await db();
    let body: anyObject = req.body as anyObject;

    try {
        let data: anyObject | null = {};
        let token: anyObject = {};
        if (body) {
            data = await models.User.findOne({
                where: {
                    // email: body.email,
                    [Op.or]: [
                        { phone_number: `${body.email}` },
                        { email: `${body.email}` },
                        { uid: `${body.email}` },
                        // { id: { [Op.like]: `%${body.email}%` } },
                    ],
                },
                
            });

            if (!data) {
                return response(422, 'wrong email', [
                    {
                        type: 'field',
                        value: '',
                        msg: 'the given email is incorrect',
                        path: 'email',
                        location: 'body',
                    },
                ]);
            }

            if (data) {
                
                let check_otp = data.forget_code == body.otp;

                if (check_otp) {
                    let jwt = require('jsonwebtoken');
                    const secretKey = env.JTI;
                    const user_agent = req.headers['user-agent'];
                    let secret = Math.random().toString(36).substring(2, 10);
                    token = await jwt.sign(
                        { id: data.id, token: secret, user_agent },
                        secretKey,
                    );
                    data.forget_token = null;
                    data.token = secret;
                    await data.save();
                } else {
                    return response(422, 'wrong otp', [
                        {
                            type: 'field',
                            value: '',
                            msg: 'the given otp is incorrect',
                            path: 'otp',
                            location: 'body',
                        },
                    ]);
                }
                
            }
        }
        return response(201, 'authentication success', { 
            token, 
            role: data.role, 
            designation: data.designation,
            stage: 'login successfull',
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

export default otp_verify;
