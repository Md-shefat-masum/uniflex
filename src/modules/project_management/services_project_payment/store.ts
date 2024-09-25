import db from '../models/db';
import account_db from '../../account_management/models/db';
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
import project_payment_entry from '../../account_management/services/project_payment_entry';
import account_insentive_entry from '../../account_management/services/account_insentive_entry';

/** validation rules */
async function validate(req: Request) {
    let field:string[] = [];
    let fields = [
        'installment_no',
        'type',
        // 'receipt_no',
        'date',
        'amount',
        'amount_in_text',
        'user_id',
    ];

    for (let index = 0; index < fields.length; index++) {
        const field = fields[index];
        await body(field)
            .not()
            .isEmpty()
            .withMessage(
                `the <b>${field.replaceAll('_', ' ')}</b> field is required`,
            )
            .run(req);
    }

    
    var element = 'receipt_no';
    await body(element)
            .not()
            .isEmpty()
            .custom(async (value) => {
                let models = await db();
                let data = await models.ProjectPaymentModel.findOne({
                    where: {
                        'receipt_no': value,
                    }
                });
                if(data){

                    throw new Error(
                        `the <b>${value}</b> is taken.`,
                    );
                }
            })
            .run(req);

    let result = await validationResult(req);

    return result;
}
// async function store(
//     fastify_instance: FastifyInstance,
//     req: FastifyRequest,
// ): Promise<responseObject> {
//     throw new Error('500 test');
// }
async function store(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    /** validation */
    let validate_result = await validate(req as Request);
    if (!validate_result.isEmpty()) {
        return response(422, 'validation error', validate_result.array());
    }

    /** initializations */
    let models = await db();
    let user_model = new models.UserModels();
    let body = req.body as anyObject;

    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {

        /** store account infos */
        let account_models = await account_db();
        let category: InstanceType<typeof account_models.AccountCategoryModel> | null = null;
        let account: InstanceType<typeof account_models.AccountModel> | null = null;
        category = await account_models.AccountCategoryModel.findOne({
            where: {
                'title': body.type,
            }
        });
        account = await account_models.AccountModel.findOne({
            where: {
                'title': body.account,
            }
        });

        let category_id = 4;
        let acccount_id = 1;
        if(category && category.id) category_id = category.id;
        if(account && account.id) acccount_id = account.id;

        let log = await project_payment_entry(fastify_instance, req, {
            account_category_id: category_id,
            account_id: acccount_id,
            account_number_id: acccount_id,
            amount: body.amount,
            amount_in_text: body.amount_in_text,
            type: 'income',
            user_id: body.user_id,
            date: body.date,
            trx_id: body.receipt_no,
        });

        /*** track project payment */

        let project_payment = new models.ProjectPaymentModel();
        project_payment.project_id = body.project_id;
        project_payment.account_log_id = (log as any).id;
        project_payment.user_id = body.user_id;
        project_payment.reference_user_id = body.reference_user_id;
        project_payment.amount = body.amount;
        project_payment.amount_in_text = body.amount_in_text;
        project_payment.installment_no = body.installment_no;
        project_payment.receipt_no = body.receipt_no;
        project_payment.date = body.date;
        project_payment.type = body.type;
        await project_payment.save();

        /** insentive calculation */
        /** 
            . insentive will calculate after accounter officer approval, 
            . code applied at update_and_approve service 
         * */

        // let user_insentive_calculations = await account_insentive_entry(fastify_instance, req, {
        //     project_payment_id: project_payment.id  || 1,
        //     customer_id: body.user_id,
        //     mo_id: body.mo_id,
        //     agm_id: body.agm_id,
        //     gm_id: body.gm_id,
        //     ed_id: body.ed_id,
        //     date: body.date,
        //     amount: body.amount,
        //     type: body.type,
        // })

        return response(201, 'data created', project_payment);
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        throw new custom_error('server error', 500, error.message, uid);
        // throw error;
    }
}

export default store;
