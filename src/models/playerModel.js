import db from '../database/connection.js';

// for valorant players in VL app eg not users
export async function create(playerId, name, cost) {
    try {
        await db.run(
            'INSERT INTO Players (player_id, name, cost) VALUES (?, ?, ?)',
            [playerId, name, cost]
        );
    } catch (err) {
        console.error('Error inserting player:', err);
        throw err;
    }
}

export async function getCost(userId) {
    try {
        const row = await db.get('SELECT cost FROM Players WHERE player_id = ?;', [userId]);
        return row.cost || 0;
    } catch (err) {
        console.error('Error fetching player cost:', err);
        throw err;
    }
}

export async function findAll() {
    try {
        const rows = await db.all('SELECT * FROM Players');
        return rows;
    } catch (err) {
        console.error('Error fetching players:', err);
        throw err;
    }
}