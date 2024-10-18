import {
    // Model,
    Sequelize,
} from 'sequelize';
import * as user_model from './user_model';
import * as project_model from './project_model';
import * as project_payment_model from './project_payment';
import * as account_logs_model from './account_logs';
import * as account_numbers_model from './account_numbers';
import * as account_report_approval_docs_model from './account_report_approval_docs';
import * as account_report_approvals_model from './account_report_approvals';
import * as accounts_model from './accounts';
import * as account_category_model from './account_categories';
import * as account_user_sales_insentive_model from './account_user_sales_insentive';
import * as account_user_sales_insentive_calculation_model from './account_user_sales_insentive_calculation';
import * as payout_request from './payout_request_model';
import { app_config } from '../../../configs/app.config';
require('dotenv').config();

const sequelize = new Sequelize(app_config.DB_string, {
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
    UserModel: typeof user_model.DataModel;
    ProjectModel: typeof project_model.DataModel;
    ProjectPaymentModel: typeof project_payment_model.DataModel;
    AccountLogModel: typeof account_logs_model.DataModel;
    AccountNumberModel: typeof account_numbers_model.DataModel;
    AccountReportApprovalDocModel: typeof account_report_approval_docs_model.DataModel;
    AccountReportApprovalModel: typeof account_report_approvals_model.DataModel;
    AccountModel: typeof accounts_model.DataModel;
    AccountCategoryModel: typeof account_category_model.DataModel;
    AccountUserSalesInsentiveModel: typeof account_user_sales_insentive_model.DataModel;
    AccountUserSalesInsentiveCalculationModel: typeof account_user_sales_insentive_calculation_model.DataModel;
    payout_request_model: typeof payout_request.DataModel;
    // Project: typeof project_model.DataModel;
    sequelize: Sequelize;
}
const db = async function (): Promise<models> {
    const UserModel = user_model.init(sequelize);
    const ProjectPaymentModel = project_payment_model.init(sequelize);
    const ProjectModel = project_model.init(sequelize);
    const AccountLogModel = account_logs_model.init(sequelize);
    const AccountNumberModel = account_numbers_model.init(sequelize);
    const AccountReportApprovalDocModel = account_report_approval_docs_model.init(sequelize);
    const AccountReportApprovalModel = account_report_approvals_model.init(sequelize);
    const AccountModel = accounts_model.init(sequelize);
    const AccountCategoryModel = account_category_model.init(sequelize);
    const AccountUserSalesInsentiveModel = account_user_sales_insentive_model.init(sequelize);
    const AccountUserSalesInsentiveCalculationModel = account_user_sales_insentive_calculation_model.init(sequelize);
    const payout_request_model = payout_request.init(sequelize);

    // await sequelize.sync({
    // //    force: true,
    // });

    AccountNumberModel.belongsTo(AccountModel,{
        foreignKey: 'account_id',
        targetKey: 'id',
        as: 'account'
    });

    AccountNumberModel.hasMany(AccountLogModel,{
        foreignKey: 'account_number_id',
        sourceKey: 'id',
        as: 'log'
    });

    /** account log relations */

    AccountLogModel.belongsTo(AccountModel,{
        foreignKey: 'account_id',
        targetKey: 'id',
        as: 'account'
    });
    AccountLogModel.belongsTo(AccountNumberModel,{
        foreignKey: 'account_number_id',
        targetKey: 'id',
        as: 'account_number'
    });
    AccountLogModel.belongsTo(UserModel,{
        foreignKey: 'user_id',
        targetKey: 'id',
        as: 'user'
    });
    AccountLogModel.belongsTo(AccountCategoryModel,{
        foreignKey: 'account_category_id',
        targetKey: 'id',
        as: 'category'
    });
    AccountLogModel.hasOne(ProjectPaymentModel,{
        foreignKey: 'account_log_id',
        sourceKey: 'id',
        as: 'project_payment',
    });

    ProjectPaymentModel.belongsTo(ProjectModel,{
        foreignKey: 'project_id',
        targetKey: 'id',
        as: 'project'
    });

    payout_request_model.belongsTo(UserModel,{
        foreignKey: 'user_id',
        targetKey: 'id',
        as: 'user'
    });

    // User.hasMany(Project, {
    //     sourceKey: 'id',
    //     foreignKey: 'user_id',
    //     as: 'projects',
    // });

    // User.hasOne(Project, {
    //     sourceKey: 'id',
    //     foreignKey: 'user_id',
    //     as: 'project',
    // });

    // Project.belongsToMany(User, {
    //     through: 'project_user',
    // });
    // User.belongsToMany(Project, {
    //     through: 'project_user',
    // });

    let models: models = {
        UserModel,
        ProjectPaymentModel,
        ProjectModel,
        AccountLogModel,
        AccountNumberModel,
        AccountReportApprovalDocModel,
        AccountReportApprovalModel,
        AccountModel,
        AccountCategoryModel,
        AccountUserSalesInsentiveModel,
        AccountUserSalesInsentiveCalculationModel,
        payout_request_model,
        // Project,
        sequelize,
    };
    return models;
};
export default db;
