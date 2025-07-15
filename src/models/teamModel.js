import db from '../database/connection.js';
import config from '../config/index.js';

export async function insertTeamPlayer(userId, playerId) {
    try {
        await db.run(
            'INSERT INTO team_players (user_id, player_id) VALUES (?, ?);',
            [userId, playerId]
        );
    } catch (err) {
        console.error('Error adding players:', err);
        throw err;
    }
}

export async function getCost(userId) {
    try {
        const result = await db.get(`
                SELECT COALESCE(SUM(Players.cost), 0) AS totalCost
                FROM team_players
                INNER JOIN Players ON team_players.player_id = Players.player_id
                WHERE team_players.user_id = ?;
            `, [userId]);
        return result.totalCost || 0;
    } catch (err) {
        console.error('Error fetching team cost:', err);
        throw err;
    }
}

export async function getStats(userId) {
    const query = `
      SELECT 
        profiles.username,
        match_info.match_date,
        matches.match_id,
        UserGroup.groupid,
        SUM(matches.kills) AS total_kills
      FROM team_players
      JOIN matches ON team_players.player_id = matches.player_id
      JOIN match_info ON matches.match_id = match_info.match_id
      JOIN profiles ON team_players.user_id = profiles.user_id
      JOIN UserGroup ON UserGroup.userid = team_players.user_id
        WHERE UserGroup.userid = ?
      GROUP BY profiles.username, match_info.match_date, matches.match_id, UserGroup.groupid;
    `;
    try {
        const rows = await db.all(query, [userId]);
        return rows;
    } catch (err) {
        console.error('Failed to fetch team stats:', err);
        throw err;
    }
}

export async function getTeamStats(userId) {
    const query = `
        SELECT 
            profiles.username,
            Players.name,
            team_players.player_id,
        COALESCE(SUM(matches.kills), 0) AS total_kills
        FROM team_players
        JOIN Players ON Players.player_id = team_players.player_id
        LEFT JOIN matches ON team_players.player_id = matches.player_id
        JOIN profiles ON team_players.user_id = profiles.user_id
        JOIN UserGroup ON UserGroup.userid = team_players.user_id
        WHERE UserGroup.userid = ?
        GROUP BY profiles.username, team_players.player_id;
    `;
    try {
        const rows = await db.all(query, [userId]);
        return rows;
    } catch (err) {
        console.error('Failed to fetch team stats:', err);
        throw err;
    }
}

export async function deletePlayer(userId, player_id) {
    if (config.vl.lockTeams)
        throw new Error('Teams are locked');
    try {
        await db.run(
            'DELETE FROM team_players WHERE user_id = ? AND player_id = ?;',
            [userId, player_id]
        );
    } catch (err) {
        console.error('Error deleting players:', err);
        throw err;
    }
}

export async function getTeam(userId) {
    const query = `
      SELECT team_players.player_id, name, cost
      FROM team_players JOIN Players on team_players.player_id=Players.player_id
      WHERE user_id = ?;
    `;
    try {
        return await db.all(query, [userId]);
    } catch (err) {
        console.error('Error fetching team:', err);
        throw err;
    }
}

export async function findAll() {
    try {
        const rows = await db.all(`
                SELECT username, name FROM team_players 
                inner join Players 
                    on team_players.player_id=Players.player_id 
                inner join profiles 
                    on team_players.user_id=profiles.user_id;
            `);
        return rows;
    } catch (err) {
        console.error('Error fetching players:', err);
        throw err;
    }
}