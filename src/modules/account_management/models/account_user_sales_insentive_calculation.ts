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

const tableName = 'account_user_sales_insentive_calculations';
const modelName = 'AccountUserSalesInsentiveCalculationModel';

type Infer = InferAttributes<DataModel>;
type InferCreation = InferCreationAttributes<DataModel>;
type status = 'active' | 'deactive' | 'block';

class DataModel extends Model<Infer, InferCreation> {
    declare id?: CreationOptional<number>;

    declare project_payment_id?: number;
    declare customer_id?: number;
    declare mo_id?: number;
    declare agm_id?: number;
    declare gm_id?: number;
    declare ed_id?: number;
    declare reference_id?: number;

    declare date?: string;
    declare type?: 'booking_money' | 'down_payment' | 'installment' | 'reference_commision';
    declare amount?: number;
    declare on_amount?: number;
    declare is_approved?: 0 | 1 | 2; // pending,approved,canceled
    
    declare status?: status;
    declare creator?: number;

    declare created_at?: CreationOptional<Date>;
    declare updated_at?: CreationOptional<Date>;
}

function init(sequelize: Sequelize) {
    DataModel.init(
        {
            id: {
                type: DataTypes.BIGINT().UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            project_payment_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            customer_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            mo_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            agm_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },

            gm_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            ed_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            reference_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            date: {
                type: new DataTypes.DATE(),
                allowNull: true,
            },
            amount: {
                type: new DataTypes.FLOAT().UNSIGNED,
                allowNull: true,
            },
            on_amount: {
                type: new DataTypes.FLOAT().UNSIGNED,
                allowNull: true,
            },
            is_approved: {
                type: new DataTypes.TINYINT().UNSIGNED,
                defaultValue: 0,
            },
            type: {
                type: new DataTypes.ENUM('booking_money', 'down_payment', 'installment', 'reference_commision'),
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
