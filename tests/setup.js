import '../src/config/loadEnv.js';
import { jest } from '@jest/globals';

process.env.UPLOAD_API_KEY = 'test-api-key';


jest.unstable_mockModule('../src/middleware/auth.js', () => ({
  checkJwt: (req, res, next) => {
    req.auth = { sub: 'mock-user-id' };
    next();
  }
}));

jest.unstable_mockModule('../src/middleware/apiKey.js', () => ({
  checkApiKey: (req, res, next) => {
    next();
  }
}));