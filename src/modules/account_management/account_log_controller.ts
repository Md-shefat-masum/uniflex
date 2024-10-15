'use strict';
import fastify, {
    FastifyReply,
    FastifyRequest,
    FastifyInstance,
} from 'fastify';
import all from './services/all';
import details from './services/details';
import soft_delete from './services/soft_delete';
import store from './services/store';
import { responseObject } from '../../common_types/object';
import update from './services/update';
import restore from './services/restore';
import destroy from './services/destroy';
import block from './services/block';
import data_import from './services/import';
import payment_entry from './services/payment_entry';
import all_incomes from './services/all_incomes';
import all_expense from './services/all_expense';
import store_expense from './services/store_expense';
import store_gateway_payment from './services/store_gateway_payment';
import debit_credit from './services/debit_credit';
import todays_collection from './services/todays_collection';
import seven_days_collection from './services/seven_days_collection';
import update_and_approve from './services/update_and_approve';
import approve_payment from './services/approve_payment';
import update_and_approve_expense from './services/update_and_approve_expense';

export default function (fastify: FastifyInstance) {
    return {
        all: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await all(fastify, req);
            res
            .code(data.status)
            .header('Cache-Control', 'public, max-age=30') 
            .send(data);
        },
        all_incomes: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await all_incomes(fastify, req);
            res
            .code(data.status)
            // .header('Cache-Control', 'public, max-age=30') 
            .send(data);
        },
        all_expense: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await all_expense(fastify, req);
            res
            .code(data.status)
            // .header('Cache-Control', 'public, max-age=30') 
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

        store_expense: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await store_expense(fastify, req);
            res.code(data.status).send(data);
        },

        details: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await details(fastify, req);
            res.code(data.status).send(data);
        },

        debit_credit: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await debit_credit(fastify, req);
            res.code(data.status).send(data);
        },

        todays_collection: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await todays_collection(fastify, req);
            res.code(data.status).send(data);
        },

        seven_days_collection: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await seven_days_collection(fastify, req);
            res.code(data.status).send(data);
        },

        store_gateway_payment: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await store_gateway_payment(fastify, req);
            res.code(data.status).send(data);
        },

        payment_entry: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await payment_entry(fastify, req);
            res.code(data.status).send(data);
        },

        update: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await update(fastify, req);
            res.code(data.status).send(data);
        },

        update_and_approve: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await update_and_approve(fastify, req);
            res.code(data.status).send(data);
        },

        update_and_approve_expense: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await update_and_approve_expense(fastify, req);
            res.code(data.status).send(data);
        },
       
        approve_payment: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await approve_payment(fastify, req);
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
