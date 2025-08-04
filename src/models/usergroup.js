import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize.js';

class UserGroup extends Model {}

UserGroup.init({
  userid: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  groupid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
}, {
  sequelize,
  modelName: 'UserGroup',
  tableName: 'UserGroup',
  timestamps: false,
});

export default UserGroup;