import {
    // Model,
    Sequelize,
} from 'sequelize';
import * as car_booking_schedule_model from './model';
import * as car_model from '../../cars/models/model';
// import * as project_model from '../../user_admin copy/models/project_model';
require('dotenv').config();

let host = process?.env.DB_HOST || '';
let port = process?.env.DB_PORT || '';
let user = process?.env.DB_USER || '';
let pass = process?.env.DB_PASSWORD || '';
let database = process?.env.DB_DATABASE || '';
let db_string = `mysql://${user}:${pass}@${host}:${port}/${database}`;

const sequelize = new Sequelize(db_string, {
    logging: false,
    dialectOptions: {
        charset: 'utf8mb4',
    },
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_520_ci',
    },
});

interface models {
    CarBookingScheduleModel: typeof car_booking_schedule_model.DataModel;
    CarModel: typeof car_model.DataModel;
    // Project: typeof project_model.DataModel;
    sequelize: Sequelize;
}
const db = async function (): Promise<models> {
    const CarBookingScheduleModel = car_booking_schedule_model.init(sequelize);
    const CarModel = car_model.init(sequelize);
    // const Project = project_model.init(sequelize);

    await sequelize.sync();

    CarBookingScheduleModel.belongsTo(CarModel, {
        foreignKey: 'car_id',
        targetKey: 'id',
        as: 'car',
    });

    let models: models = {
        CarBookingScheduleModel,
        CarModel,
        sequelize,
    };
    return models;
};
export default db;
