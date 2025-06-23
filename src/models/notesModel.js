import db from '../database/connection.js';

export async function addNotes(userId, notes, edges) {
    const query = `
      INSERT INTO Nodes (user_id, nodes, edges)
      VALUES (?, ?, ?)
      ON CONFLICT(user_id) DO UPDATE SET nodes=excluded.nodes, edges=excluded.edges;`;
    try {
        await db.run(query, [userId, notes, edges]);
    } catch (err) {
        console.error('Error inserting notes:', err);
        throw err;
    }
}

export async function getNotes(userId) {
    const query = 'SELECT * FROM Nodes WHERE user_id=?;'
    try {
        return await db.get(query, [userId]);
    } catch (err) {
        console.error('Error fetching notes:', err);
        throw err;
    }
}