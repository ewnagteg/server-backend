import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize.js';

class Player extends Model {}

Player.init({
    player_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Player',
    tableName: 'Players',
    timestamps: false,
});

export default Player;