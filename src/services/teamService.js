import * as teamModel from '../models/teamModel.js';
import * as playerModel from '../models/playerModel.js';
import config from '../config/index.js';

const budget = config.vl.budget;

export async function addPlayerToTeam(userId, playerId) {
    if (config.vl.lockTeams) {
        throw new Error('Teams Locked');
    }

    const currentCost= await teamModel.getCost(userId);
    const playerCost = await playerModel.getCost(playerId);

    if (playerCost == null || currentCost == null) {
        throw new Error('Player not found');
    }

    if (currentCost + playerCost > budget) {
        throw new Error('Exceeds Budget');
    }

    return teamModel.insertTeamPlayer(userId, playerId);
}