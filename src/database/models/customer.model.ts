/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
import * as db from '../database.connector';
import { DataTypes } from 'sequelize';
const sequelize = db.default.sequelize;

////////////////////////////////////////////////////////////////////////

export class CustomerModel {
    static TableName = 'customers';

    static ModelName = 'Customer';

    static Schema = {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        FirstName: {
            type: DataTypes.STRING(256),
            allowNull: true,
        },
        LastName: {
            type: DataTypes.STRING(256),
            allowNull: true,
        },
        Email: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        Address: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        Phone: {
            type: DataTypes.STRING(16),
            allowNull: true,
        },
        Password: {
            type: DataTypes.STRING(512),
            allowNull: true,
        },
        CreatedAt: DataTypes.DATE,
        UpdatedAt: DataTypes.DATE,
        DeletedAt: DataTypes.DATE,
    };

    static Model: any = sequelize.define(CustomerModel.ModelName, CustomerModel.Schema, {
        createdAt: 'CreatedAt',
        updatedAt: 'UpdatedAt',
        deletedAt: 'DeletedAt',
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
        tableName: CustomerModel.TableName,
    });

    static associate = (models) => {
        //Add associations here...
        // models.Customer.belongsTo(models.User, {
        //     sourceKey : 'OwnerUserId',
        //     targetKey : 'id',
        //     as        : 'OwnerUser'
        // });
    };
}
