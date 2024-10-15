import { FastifyReply, FastifyRequest } from 'fastify';
import { anyObject } from '../../../../common_types/object';
import db from '../../user_management/models/db';
import { env } from 'process';

const check_auth_and_redirect = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
    const secretKey = env.JTI;
    const jwt = require('jsonwebtoken');
    // const token = request.headers.authorization;
    const token = request.cookies.token;
    
    // console.log({token});
    
    if (!token || !token.startsWith('Bearer ')) {
        return reply.redirect('/login');
    }

    const decoded = jwt.verify(token.slice(7), secretKey);
    let models = await db();
    let user = await models.UserModel.findByPk(decoded.id);
    
    if (user && user.token == decoded.token) {
        (request as anyObject).user = user;
        return;
    } else {
        return reply.redirect('/login');
    }
    
};

export default check_auth_and_redirect;
