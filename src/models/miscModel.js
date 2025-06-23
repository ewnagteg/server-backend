import db from '../database/connection.js';

export async function getNews() {
    try {
        return await db.all('SELECT * FROM News');
    } catch (err) {
        console.error('Error fetching news', err);
        throw err;
    }
}

export async function addNews(header, body, date) {
    try {
        await db.run(
            'INSERT INTO News (header, body, date) VALUES (?, ?, ?)',
            [header, body, date]
        );
    } catch (err) {
        console.error('Error inserting news:', err);
        throw err;
    }
}

export async function getChart() {
    try {
        const query = `
            SELECT 
            *
            FROM chart;
        `;
        return await db.all(query);
    } catch (err) {
        console.error('Error fetching news', err);
        throw err;
    }
}

export async function getProfile(userId) {
    try {
        const query = `SELECT * FROM profiles WHERE user_id = ?`;
        return await db.all(query, [userId]);
    } catch (err) {
        console.error('Error geting profile', err);
        throw err;
    }
}

export async function updateProfile(userId, username) {
    try {
        const query = `
        INSERT INTO profiles (user_id, username)
        VALUES (?, ?)
        ON CONFLICT(user_id) DO UPDATE SET username = excluded.username;
        `;
        return await db.run(query, [userId, username]);
    } catch (err) {
        console.error('Error updating profile', err);
        throw err;
    }
}

export async function logMatch(stats) {
    const { Tournament, Stage, Match_Type, Match_Name, Team_A, Team_B, Team_A_Score, Team_B_Score, Match_Result } = stats;
    try {
        const query = `INSERT OR IGNORE INTO allmatches 
       (Tournament, Stage, Match_Type, Match_Name, Team_A, Team_B, Team_A_Score, Team_B_Score, Match_Result)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        await db.run(query, [Tournament, Stage, Match_Type, Match_Name, Team_A, Team_B, Team_A_Score, Team_B_Score, Match_Result]);
    } catch (err) {
        console.error('Error logging match', err);
        throw err;
    }
}

export async function addMatchInfo(match_id, date, team1, team2) {
    try {
        const query =  `INSERT OR IGNORE INTO match_info (match_id, match_date, team1, team2)
         VALUES (?, ?, ?, ?)`;
        await db.run(query, [match_id, date, team1, team2]);
    } catch (err) {
        console.error('Error adding match', err);
        throw err;
    }
}

export async function addMatch(match_id, player_id, kills) {
    try {
        const query =  `INSERT INTO matches (match_id, player_id, kills)
           VALUES (?, ?, ?)`;
        await db.run(query, [match_id, player_id, kills]);
    } catch (err) {
        console.error('Error adding match', err);
        throw err;
    }
}

