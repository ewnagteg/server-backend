import * as playerModel from '../models/playerModel.js';

export async function createPlayer(req, res) {
    const players = req.body.players;
    if (!Array.isArray(players)) {
        return res.status(400).json({ error: 'Expected an array of players' });
    }
    try {
        await Promise.all(players.map(({ player_id, name, cost }) =>
            playerModel.create(player_id, name, cost)
        ));
        res.json({ success: true });
    } catch (err) {
        console.error('Failed to add players:', err);
        res.status(500).json({ error: 'Failed to add players.' });
    }
}

export async function getPlayers(req, res) {    
    try {
        const players = await playerModel.findAll();
        res.json(players);
    } catch (err) {
        console.error('Failed to fetch players:', err);
        res.status(500).json({ error: 'Failed to fetch players.' });
    }
}