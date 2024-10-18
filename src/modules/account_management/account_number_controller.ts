'use strict';
import fastify, {
    FastifyReply,
    FastifyRequest,
    FastifyInstance,
} from 'fastify';
import all from './services/account_numbers/all';
import details from './services/account_numbers/details';
import soft_delete from './services/account_numbers/soft_delete';
import store from './services/account_numbers/store';
import { responseObject } from '../../common_types/object';
import update from './services/account_numbers/update';
import restore from './services/account_numbers/restore';
import destroy from './services/account_numbers/destroy';
import block from './services/account_numbers/block';
import data_import from './services/account_numbers/import';
import get_all from './services/account_numbers/get_all';

export default function (fastify: FastifyInstance) {
    return {
        all: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await all(fastify, req);
            res
            .code(data.status)
            .header('Cache-Control', 'public, max-age=30') 
            .send(data);
        },
        get_all: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await get_all(fastify, req);
            res
            .code(data.status)
            .header('Cache-Control', 'public, max-age=30') 
            .send(data);
        },

        find: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await details(fastify, req);
            res.code(data.status).send(data);
        },

        store: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await store(fastify, req);
            res.code(data.status).send(data);
        },

        update: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await update(fastify, req);
            res.code(data.status).send(data);
        },

        soft_delete: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await soft_delete(fastify, req);
            res.code(data.status).send(data);
        },

        restore: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await restore(fastify, req);
            res.code(data.status).send(data);
        },

        destroy: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await destroy(fastify, req);
            res.code(data.status).send(data);
        },

        block: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await block(fastify, req);
            res.code(data.status).send(data);
        },

        import: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await data_import(fastify, req);
            res.code(data.status).send(data);
        },

        // export: async function (req: FastifyRequest, res: FastifyReply) {},
    };
}
