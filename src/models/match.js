import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize.js';
import e from 'express';


class Match extends Model { }

Match.init({
    player_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    match_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    kills: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'Match',
    tableName: 'matches',
    timestamps: false,
});

export default Match;