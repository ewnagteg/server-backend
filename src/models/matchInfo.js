import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize.js';

class MatchInfo extends Model { }

MatchInfo.init({
    match_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    match_date: {
        type: DataTypes.TEXT,
    },
    team1: {
        type: DataTypes.TEXT,
    },
    team2: {
        type: DataTypes.TEXT,
    }
}, {
    sequelize,
    modelName: 'MatchInfo',
    tableName: 'match_info',
    timestamps: false,
});

export default MatchInfo;