import { FastifyReply, FastifyRequest } from 'fastify';
import { anyObject } from '../../../../common_types/object';
import db from '../../user_management/models/db';
import { env } from 'process';

const check_is_loged_in = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
    const secretKey = env.JTI;
    const jwt = require('jsonwebtoken');
    // const token = request.headers.authorization;
    const token = request.cookies.token;

    if (!token || !token.startsWith('Bearer ')) {
        return;
    }

    try {
        const decoded = jwt.verify(token.slice(7), secretKey);
        let models = await db();
        let user = await models.UserModel.findByPk(decoded.id);
    
        if (user && user.token == decoded.token) {
            (request as anyObject).user = user;
            if(user.role == 'customer'){
                return reply.redirect('/customer');
            }
            else if(user.role == 'admin'){
                return reply.redirect('/management');
            }
            else if(user.role == 'super_admin'){
                return reply.redirect('/management');
            }
            else if(user.designation == 'mo'){
                return reply.redirect('/mo');
            }
            else if(user.designation == 'agm'){
                return reply.redirect('/agm');
            }
            else if(user.designation == 'gm'){
                return reply.redirect('/gm');
            }
            else if(user.designation == 'ed'){
                return reply.redirect('/ed');
            }
        } else {
            return;
        }
    } catch (error) {
        console.log(error);
        return;
    }    
};

export default check_is_loged_in;
