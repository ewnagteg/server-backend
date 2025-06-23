import { jest } from '@jest/globals';

process.env.UPLOAD_API_KEY = 'test-api-key';



jest.mock('../src/middleware/auth.js', () => ({
    checkJwt: (req, res, next) => next()
}));

jest.mock('../src/middleware/apiKey.js', () => ({
    checkApiKey: (req, res, next) => next()
}));