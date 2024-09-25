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

const tableName = 'project_payments';
const modelName = 'ProjectPaymentModel';

type Infer = InferAttributes<DataModel>;
type InferCreation = InferCreationAttributes<DataModel>;
type status = 'active' | 'deactive' | 'block';
type payemnt_types = 'booking_money' | 'down_payment' | 'installment';

class DataModel extends Model<Infer, InferCreation> {
    declare id?: CreationOptional<number>;

    declare project_id?: number;
    declare user_id?: number;
    declare reference_user_id?: number;
    declare account_log_id?: number;

    declare date?: string;
    declare amount?: string;
    declare amount_in_text?: string;
    declare installment_no?: number;
    declare receipt_no?: string;
    declare type?: payemnt_types;
    declare is_approved?: 0|1|2; // pending,approved,canceled

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
            project_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            user_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            reference_user_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            account_log_id: {
                type: DataTypes.FLOAT().UNSIGNED,
                allowNull: true,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            
            amount: {
                type: DataTypes.FLOAT().UNSIGNED,
                allowNull: true,
            },
            amount_in_text: {
                type: DataTypes.STRING(200),
                allowNull: true,
            },
            receipt_no: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            installment_no: {
                type: DataTypes.INTEGER().UNSIGNED,
                allowNull: true,
            },

            type: {
                type: DataTypes.ENUM('booking_money','down_payment','installment'),
                allowNull: true,
            },

            is_approved: {
                type: DataTypes.TINYINT().UNSIGNED,
                defaultValue: 0,
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
