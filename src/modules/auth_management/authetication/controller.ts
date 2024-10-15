'use strict';
import { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';
import { responseObject } from '../../../common_types/object';
import login from './services/login';
import register from './services/register';
import forget from './services/forget';
import auth_user from './services/auth_user';
import logout from './services/logout';
import otp_verify from './services/otp_verify';
const { serialize, parse } = require('@fastify/cookie');

export default function (fastify: FastifyInstance) {
    return {
        login: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await login(fastify, req);
            const cookie = serialize('token', 'Bearer ' + data.data.token, {
                maxAge: 60_000,
                path: '/',
            });
            res.header('Set-Cookie', cookie);
            res.code(data.status).send(data);
        },

        otp_verify: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await otp_verify(fastify, req);
            const cookie = serialize('token', 'Bearer ' + data.data.token, {
                maxAge: 60_000,
                path: '/',
            });
            res.header('Set-Cookie', cookie);
            res.code(data.status).send(data);
        },

        logout: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await logout(fastify, req);
            res.clearCookie('token');
            res.code(data.status).send(data);
        },

        auth_user: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await auth_user(fastify, req);
            res.code(200).send(data);
        },

        forget: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await forget(fastify, req);
            res.code(data.status).send(data);
        },

        register: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await register(fastify, req);
            res.code(data.status).send(data);
        },

        
    };
}
