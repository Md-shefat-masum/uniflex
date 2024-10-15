'use strict';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import controller from './controller';
import check_auth from './services/check_auth';

module.exports = async function (fastify: FastifyInstance) {
    let prefix: string = '/auth';
    const controllerInstance = controller(fastify);

    /** public routes */
    fastify.register(
        async (route, opts) => {
            route
                .post(`/login`, controllerInstance.login)
                .post(`/otp-verify`, controllerInstance.otp_verify)
                .post(`/register`, controllerInstance.register)
                .post(`/forget`, controllerInstance.forget);
        },
        { prefix },
    );

    /** auth routes */
    fastify.register(
        async (route, opts) => {
            route
                .addHook('preHandler', check_auth)
                .post(`/logout`, controllerInstance.logout)
                .get(`/info`, controllerInstance.auth_user);
        },
        { prefix },
    );
};
