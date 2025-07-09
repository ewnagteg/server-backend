import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize.js';

class Groups extends Model { }

Groups.init({
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    owner: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING,
    },
    inviteNumber: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    modelName: 'Groups',
    tableName: 'Groups',
    timestamps: false,
});

export default Groups;