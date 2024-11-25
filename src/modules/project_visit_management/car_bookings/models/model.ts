import {
    // Association,
    DataTypes,
    // HasManyAddAssociationMixin,
    // HasManyCountAssociationsMixin,
    // HasManyCreateAssociationMixin,
    // HasManyGetAssociationsMixin,
    // HasManyHasAssociationMixin,
    // HasManySetAssociationsMixin,
    // HasManyAddAssociationsMixin,
    // HasManyHasAssociationsMixin,
    // HasManyRemoveAssociationMixin,
    // HasManyRemoveAssociationsMixin,
    Model,
    // ModelDefined,
    // Optional,
    Sequelize,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';

const tableName = 'car_bookings';
const modelName = 'CarBookingModel';

type Infer = InferAttributes<DataModel>;
type InferCreation = InferCreationAttributes<DataModel>;
type status = 'active' | 'deactive' | 'block';

class DataModel extends Model<Infer, InferCreation> {
    declare id?: CreationOptional<number>;

    declare car_booking_schedule_id: number;
    declare car_id: number;
    declare title: string;
    declare seat_no: number;
    declare date: string;
    declare passenger_name: string;
    declare passenger_contact: string;

    declare status?: status;
    declare creator?: number;

    declare created_at?: CreationOptional<Date>;
    declare updated_at?: CreationOptional<Date>;
}

function init(sequelize: Sequelize) {
    DataModel.init(
        {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },

            car_booking_schedule_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
            },

            car_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
            },

            title: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
           
            seat_no: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: true,
            },

            date: {
                type: DataTypes.DATE,
                allowNull: true,
            },

            passenger_name: {
                type: DataTypes.STRING(150),
                allowNull: true,
            },
            
            passenger_contact: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },
          
            status: {
                type: new DataTypes.ENUM('active', 'deactive', 'block'),
                defaultValue: 'active',
            },
            creator: {
                type: new DataTypes.TINYINT(),
                allowNull: true,
                defaultValue: null,
            },

            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        {
            tableName: tableName,
            modelName: modelName,
            sequelize, // passing the `sequelize` instance is required
            underscored: true,
        },
    );

    return DataModel;
}

export { init, DataModel };
