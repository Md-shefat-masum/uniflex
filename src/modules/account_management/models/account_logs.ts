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

const tableName = 'account_logs';
const modelName = 'AccountLogModel';

type Infer = InferAttributes<DataModel>;
type InferCreation = InferCreationAttributes<DataModel>;
type status = 'active' | 'deactive' | 'block';
type transaction_type = 'income' | 'expense';

class DataModel extends Model<Infer, InferCreation> {
    declare id?: CreationOptional<number>;

    declare account_id?: number;
    declare account_number_id?: number;
    declare uid?: string;
    declare account_category_id?: number;
    declare user_id?: number;
    declare trx_id?: string;

    declare date?: string;
    declare amount?: number;
    declare amount_in_text?: string;
    declare description?: string;
    declare type?: string;
    declare is_approved?: 0|1|2; // 2 = canceled

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
            account_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            account_number_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            user_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            account_category_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            
            uid: {
                type: new DataTypes.STRING(50),
                allowNull: true,
            },
            trx_id: {
                type: new DataTypes.STRING(50),
                allowNull: true,
            },
            
            date: {
                type: new DataTypes.DATE,
                allowNull: true,
            },
            amount: {
                type: new DataTypes.FLOAT().UNSIGNED,
                allowNull: true,
            },
            amount_in_text: {
                type: new DataTypes.STRING(150),
                allowNull: true,
            },
            description: {
                type: new DataTypes.TEXT(),
                allowNull: true,
            },
            type: {
                type: new DataTypes.STRING(20),
                defaultValue: 'income',
            },
            is_approved: {
                type: new DataTypes.TINYINT().UNSIGNED,
                defaultValue: 0,
                comment: '0,1,2 | pending,ok,cancel'
            },

            creator: {
                type: new DataTypes.TINYINT(),
                allowNull: true,
                defaultValue: null,
            },

            status: {
                type: new DataTypes.ENUM('active', 'deactive', 'block'),
                defaultValue: 'active',
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
