import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { body, validationResult } from 'express-validator';
import {
    anyObject,
    responseObject,
    Request,
} from '../../../../common_types/object';
import response from '../helpers/response';
import { InferCreationAttributes } from 'sequelize';
import custom_error from '../helpers/custom_error';
import error_trace from '../helpers/error_trace';
import moment from 'moment';

function incrementString(str:string) {
    let numPart = str.match(/\d+/);
    let nonNumPart = str.replace(/\d+/g, '');
    
    if (numPart) {
        let num = parseInt(numPart[0], 10);
        num++;
        return nonNumPart + num.toString().padStart(5,'0'); 
    }
    return str;
}

/** validation rules */
async function validate(req: Request) {
    let field = '';
    let fields = [
        'designation',
        'uid',
        'name',
        'nid',
        'phone_number',
        'password',
        
        // 'reference',
        // 'mo',
        // 'agm',
        // 'gm',
        // 'ed',

        // 'email',
        // 'father_name',
        // 'mother_name',
        // 'husband_spouse',
        // 'education',
        // 'permanent_address',
        // 'present_address',

        // 'bank_name',
        // 'branch_name',
        // 'bank_account_no',
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

    var element = 'uid';
    await body(element)
            .not()
            .isEmpty()
            .custom(async (value) => {
                let models = await db();
                let user = await models.UserModel.findOne({
                    where: {
                        'uid': value,
                    }
                });

                if(user){
                    let user = await models.UserModel.findOne({
                        where: {
                            'designation': req.body?.designation,
                        },
                        order: [['id','DESC']],
                    });

                    let latest = user?.uid;

                    throw new Error(
                        `the <b>${value}</b> is taken. use ${incrementString(latest || 'uc00001')}`,
                    );
                }
            })
            // .withMessage(
            //     `the <b>UID </b> is taken`,
            // )
            .run(req);

    let check_array:any = [
        // 'reference',
        // 'ed',
        // 'mo',
        // 'agm',
        // 'gm'
    ];
    for (let index = 0; index < check_array.length; index++) {
        const field = check_array[index];
        await body(field)
            .not()
            .isEmpty()
            .custom(async (value) => {
                const length = value.length;
                if (length <= 2) {
                    throw new Error(
                        `the <b>${field.replaceAll('_', ' ')}</b> field is required`,
                    );
                }
            })
            .withMessage(
                `the <b>${field.replaceAll('_', ' ')}</b> field is required`,
            )
            .run(req);
    }

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
    let body = req.body as anyObject;
    let data = new models.UserModel();
    let user_information = new models.UserInformationModel();
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    let password = await bcrypt.hash(body.password, saltRounds);
    let image_path = "avatar.png";

    if(body['image']?.ext){
        image_path =
            'uploads/users/' +
            moment().format('YYYYMMDDHHmmss') +
            body['image'].ext;
        await (fastify_instance as any).upload(body['image'], image_path);
    }

    let reference = JSON.parse(body.reference)[0];

    let mo = null;
    let agm = null;
    let gm = null;
    let ed = null;
    let nominees = [];

    if(body.mo){
        mo = JSON.parse(body.mo)[0];
    }
    if(body.agm){
        agm = JSON.parse(body.agm)[0];
    }
    if(body.gm){
        gm = JSON.parse(body.gm)[0];
    }
    if(body.ed){
        ed = JSON.parse(body.ed)[0];
    }
    if(body.nominees){
        try {
            nominees = JSON.parse(body.nominees);
        } catch (error) {
            
        }
    }
    
    let inputs: InferCreationAttributes<typeof data> = {
        uid: body.uid,
        name: body.name,
        email: body.email,
        role: body.role,
        phone_number: body.phone_number,
        image: image_path,
        password: password,

        designation: body.designation,
        reference: reference,
        mo: mo,
        agm: agm,
        gm: gm,
        ed: ed,
    };

    let user_information_inputs: InferCreationAttributes<
        typeof user_information
    > = {
        user_id: 0,
        father_name: body.father_name,
        mother_name: body.mother_name,
        husband_spouse: body.husband_spouse,
        nid: body.nid,
        education: body.education,
        permanent_address: body.permanent_address,
        present_address: body.present_address,

        bank_name: body.bank_name,
        branch_name: body.branch_name,
        bank_account_no: body.bank_account_no,
        bank_routing_no: body.bank_routing_no,
        mobile_banking_portal: body.mobile_banking_portal,
        mobile_banking_ac_no: body.mobile_banking_ac_no,
    };

    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        (await data.update(inputs)).save();
        if (data) {
            user_information_inputs.user_id = data.id || 1;
            (await user_information.update(user_information_inputs)).save();

            let nominee_instance = new models.UserNomineeModel();
            type NomineeType = InferCreationAttributes< typeof nominee_instance >
            
            for (let index = 0; index < nominees.length; index++) {
                const nominee = nominees[index] as NomineeType;
                let user_nominee = new models.UserNomineeModel();
                user_nominee.user_id = data.id || 1;
                user_nominee.name = nominee.name;
                user_nominee.relation = nominee.relation;
                user_nominee.age = nominee.age;
                user_nominee.mobile_number = nominee.mobile_number;
                user_nominee.percentage = nominee.percentage;
                await user_nominee.save();
            }
        }

        return response(201, 'data created', {
            data,
            user_information,
        });
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        throw new custom_error('server error', 500, error.message, uid);
        // throw error;
    }
}

export default store;
