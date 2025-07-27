import Match from '../models/match.js';
import MatchInfo from '../models/matchInfo.js';
import '../models/associations.js';
import cache from '../cache.js';

export async function getMatch(req, res) {
    try {
        const { matchId } = req.params;
        const cacheKey = `getMatch: ${matchId}`;
        const cached = cache.get(cacheKey);
        if (cached) return res.json(cached);


        const match = await Match.findAll({
            include: [{
                model: MatchInfo,
                required: false
            }],
            where: { match_id: matchId }
        });

        if (!match) {
            return res.status(404).json({ success: false, error: "Match not found" });
        }
        res.json({ success: true, match: match });

    } catch (err) {
        console.error('Match not found:', err);
        res.status(500).json({ error: 'Match not found.' });
    }
}

export async function getMatches(req, res) {
    try {
        const cacheKey = `getMatches`;
        const cached = cache.get(cacheKey);
        if (cached) return res.json(cached);

        const matches = await Match.findAll({
            include: [{
                model: MatchInfo,
                required: false
            }]
        });

        res.json({ success: true, matches: matches });

    } catch (err) {
        console.error('Failed to fetch matches:', err);
        res.status(500).json({ error: 'Failed to fetch matches.' });
    }
}

// used by python script to check if matches were uploaded
// hence dont cache this
export async function getMatchesData(req, res) {
    try {

        const matches = await Match.findAll({
        });

        res.json({ success: true, matches: matches });

    } catch (err) {
        console.error('Failed to fetch matches:', err);
        res.status(500).json({ error: 'Failed to fetch matches.' });
    }
}

export async function getPlayerMatches(req, res) {
    try {
        const { playerId } = req.params;
        const cacheKey = `getPlayerMatches: ${playerId}`;
        const cached = cache.get(cacheKey);
        if (cached) return res.json(cached);

        const matches = await Match.findAll({
            where: { player_id: playerId }
        });

        if (!matches || matches.length === 0) {
            return res.status(404).json({ success: false, error: "No matches found for this player" });
        }

        res.json({ success: true, matches: matches });
    } catch (err) {
        console.error('Failed to fetch player matches:', err);
        res.status(500).json({ error: 'Failed to fetch player matches.' });
    }
}