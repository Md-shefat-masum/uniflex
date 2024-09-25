import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { body, validationResult } from 'express-validator';
import {
    anyObject,
    responseObject,
    Request,
} from '../../../common_types/object';
import response from '../helpers/response';
import { InferCreationAttributes } from 'sequelize';
import custom_error from '../helpers/custom_error';
import error_trace from '../helpers/error_trace';
import moment from 'moment';


export const generateUID = function() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Add 1 to month since it's zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    const uid = `${year}${month}${day}-${randomNum}`;
    return uid;
}

async function account_insentive_entry(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
    param: {
        project_payment_id: number,
        customer_id: number,
        mo_id: number,
        agm_id: number,
        gm_id: number,
        ed_id: number,

        date?: string,
        amount: number,
        type?: 'booking_money'| 'down_payment'| 'installment'| 'reference_commision',
        is_approved?: number,
    }
): Promise<object> {

    /** initializations */
    let models = await db();
    let data = new models.AccountUserSalesInsentiveCalculationModel();
    
    /** destroy previous insetives related to the payment_id */
    await models.AccountUserSalesInsentiveCalculationModel.destroy({
        where: {
            project_payment_id: param.project_payment_id,
        }
    });

    if(param.is_approved != 1) return {};

    /** store data into database */
    try {

        let mo_amount = 0;
        let agm_amount = 0;
        let gm_amount = 0;
        let ed_amount = 0;

        let base_amount = +param.amount;

        if(param.type == 'booking_money'){
            mo_amount = base_amount * .40;
            agm_amount = base_amount * .15;
            gm_amount = base_amount * .10;
            ed_amount = base_amount * .05;
        }
        
        if(param.type == 'down_payment'){
            mo_amount = base_amount * .15;
            agm_amount = base_amount * .07;
            gm_amount = base_amount * .05;
            ed_amount = base_amount * .03;
        }
        
        if(param.type == 'installment'){
            mo_amount = base_amount * .08;
            agm_amount = base_amount * .05;
            gm_amount = base_amount * .04;
            ed_amount = base_amount * .03;
        }

        async function insert_data(
            project_payment_id:any,
            customer_id:any,
            mo_id:any = null,
            agm_id:any = null,
            gm_id:any = null,
            ed_id:any = null,
            reference_id:any = null,
    
            date:any,
            amount:any,
            type:any,
            on_amount = param.amount,
        ){
            await models.AccountUserSalesInsentiveCalculationModel.create({
                project_payment_id: project_payment_id,
                customer_id: customer_id,
                mo_id: mo_id,
                agm_id: agm_id,
                gm_id: gm_id,
                ed_id: ed_id,
                reference_id: reference_id,
        
                date: date,
                type: type,
                amount: amount,
                on_amount: on_amount,
                is_approved: 1,
            });

            let user_id = mo_id || agm_id || gm_id || ed_id;
            if(user_id){
                let user = await models.UserModel.findOne({
                    where: {
                        id: user_id,
                    }
                });

                /** reference input */
                await insert_data(
                    param.project_payment_id,
                    param.customer_id,
                    null,
                    null,
                    null,
                    null,
                    user?.reference,
                    param.date, 
                    amount * .1, 
                    param.type
                );

            }
        }

        /** inert mo commision */
        await insert_data(
            param.project_payment_id, 
            param.customer_id, 
            param.mo_id, 
            null,
            null,
            null,
            null,
            param.date, 
            mo_amount, 
            param.type
        );

        /** inert agm commision */
        await insert_data(
            param.project_payment_id, 
            param.customer_id, 
            null, 
            param.agm_id,
            null,
            null,
            null,
            param.date, 
            agm_amount, 
            param.type
        );

        /** inert gm commision */
        await insert_data(
            param.project_payment_id, 
            param.customer_id, 
            null, 
            null,
            param.gm_id,
            null,
            null,
            param.date, 
            gm_amount, 
            param.type
        );

        /** inert ed commision */
        await insert_data(
            param.project_payment_id, 
            param.customer_id, 
            null, 
            null,
            null,
            param.ed_id,
            null,
            param.date, 
            ed_amount, 
            param.type
        );


        /** reference commisions */
        // await insert_data(
        //     param.project_payment_id, 
        //     param.customer_id, 
        //     null, 
        //     null,
        //     null,
        //     null,
        //     null,
        //     param.date, 
        //     ed_amount, 
        //     param.type
        // );

        return data;
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        throw new custom_error('server error', 500, error.message, uid);
        // throw error;
    }
}

export default account_insentive_entry;
