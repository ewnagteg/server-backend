import * as miscModel from '../models/miscModel.js';

export async function getNews(req, res) {
    try {
        const news = await miscModel.getNews();
        res.json(news);
    } catch (err) {
        console.error('Failed to fetch news:', err);
        res.status(500).json({ error: 'Failed to fetch news.' });
    }
}

export async function addNews(req, res) {
    const { header, body, date } = req.body;
    try {
        await miscModel.addNews(header, body, date);
        res.json({ success: true });
    } catch (err) {
        console.error('Failed add news:', err);
        res.status(400).json({ error: err.message });
    }
}

export async function getChart(req, res) {
    try {
        const chart = await miscModel.getChart();
        res.json(chart);
    } catch (err) {
        console.error('Failed to fetch chart:', err);
        res.status(500).json({ error: 'Failed to fetch chart.' });
    }
}

export async function getProfile(req, res) {
    const userId = req.auth.sub;
    try {
        const profile = await miscModel.getProfile(userId);
        res.json(profile);
    } catch (err) {
        console.error('Failed to fetch profile:', err);
        res.status(500).json({ error: 'Failed to fetch profile.' });
    }
}

export async function updateProfile(req, res) {
    const userId = req.auth.sub;
    const { username } = req.body;
    try {
        await miscModel.updateProfile(userId, username);
        res.json({ success: true });
    } catch (err) {
        console.error('Failed to update profile:', err);
        res.status(400).json({ error: err.message });
    }
}

// hacked in for testing purposes
export async function getProbs(req, res) {
    res.status(200).json(
        {
            "hvgn": 0.965,
            "ewn": 0.0,
            "bryan": 0.0,
            "KNightinJail": 0.032,
            "fiighting_fate": 0.003,
            "platchat": 0.0
        }
    );
}

export async function logMatch(req, res) {
    const stats = req.body;
    try {
        await miscModel.logMatch(stats);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to log match and players.' });
    }
}

export async function addMatch(req, res) {
    const playerdata = req.body.players_data;
    const matchinfo = req.body.matchinfo;
    const date = matchinfo.date;
    const team1 = matchinfo.team1;
    const team2 = matchinfo.team2;
    const match_id = matchinfo.match_id
    try {
        await miscModel.addMatchInfo(match_id, date, team1, team2);
        for (const player of playerdata) {
            await miscModel.addMatch(player.match_id, player.player_id, player.kills);
        }
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to log match and players.' });
    }
}