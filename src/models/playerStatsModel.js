import db from '../database/connection.js';

// /api/log-player-stats
export async function addPlayerStats(stats) {
    const {
        Tournament, Stage, Match_Type, Player, Teams, Agents,
        Rounds_Played, Rating, Average_Combat_Score, Kills_Deaths,
        KAST_Percent, Average_Damage_Per_Round, Kills_Per_Round,
        Assists_Per_Round, First_Kills_Per_Round, First_Deaths_Per_Round,
        Headshot_Percent, Clutch_Success_Percent, Clutches_Won_Played,
        Maximum_Kills_Single_Map, Kills, Deaths, Assists, First_Kills,
        First_Deaths, Match_ID, date
    } = stats;

    try {
        await db.run(`
            INSERT OR REPLACE INTO playerstats (
              Tournament, Stage, Match_Type, Player, Teams, Agents,
              Rounds_Played, Rating, Average_Combat_Score, Kills_Deaths,
              KAST_Percent, Average_Damage_Per_Round, Kills_Per_Round,
              Assists_Per_Round, First_Kills_Per_Round, First_Deaths_Per_Round,
              Headshot_Percent, Clutch_Success_Percent, Clutches_Won_Played,
              Maximum_Kills_Single_Map, Kills, Deaths, Assists, First_Kills, 
              First_Deaths, Match_ID, date
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                Tournament, Stage, Match_Type, Player, Teams, Agents,
                Rounds_Played, Rating, Average_Combat_Score, Kills_Deaths,
                KAST_Percent, Average_Damage_Per_Round, Kills_Per_Round,
                Assists_Per_Round, First_Kills_Per_Round, First_Deaths_Per_Round,
                Headshot_Percent, Clutch_Success_Percent, Clutches_Won_Played,
                Maximum_Kills_Single_Map, Kills, Deaths, Assists, First_Kills,
                First_Deaths, Match_ID, date
            ]
        );
    } catch (err) {
        console.error('Error creating player stats:', err);
        throw err;
    }
}

export async function getPlayerStatsTable() {
    try {
        const rows = await db.all(`
            SELECT * FROM playerstats
        `);
        return rows;
    } catch (err) {
        console.error('Error fetching player stats table:', err);
        throw err;
    }
}

export async function getPlayerStats(playerId) {
    try {
        return await db.all('SELECT * FROM playerstats WHERE Player = ?', [playerId]);
    } catch (err) {
        console.error('Error fetching player stats:', err);
        throw err;
    }
}