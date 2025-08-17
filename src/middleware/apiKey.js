import crypto from 'crypto';
import config from '../config/index.js';

export function checkApiKey(req, res, next) {
    const apiKey = req.headers['authorization'] || '';
    const expectedKey = `Bearer ${config.api.key}`;

    const apiKeyBuffer = Buffer.from(apiKey);
    const expectedBuffer = Buffer.from(expectedKey);

    if (
        apiKeyBuffer.length !== expectedBuffer.length ||
        !crypto.timingSafeEqual(apiKeyBuffer, expectedBuffer)
    ) {
        return res.status(403).json({ error: 'Unauthorized: Invalid API Key' });
    }
    next();
}