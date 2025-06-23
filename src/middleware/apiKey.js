import config from '../config/index.js';

export function checkApiKey(req, res, next) {
    const apiKey = req.headers['authorization'];
    const expectedKey = `Bearer ${config.api.key}`;
    if (!apiKey || apiKey !== expectedKey) {
        return res.status(403).json({ error: 'Unauthorized: Invalid API Key' });
    }

    next();
}