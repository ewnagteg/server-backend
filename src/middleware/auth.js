import jwksRsa from 'jwks-rsa';
import config from '../config/index.js';
import { expressjwt as jwt } from 'express-jwt';

export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: config.auth.jwksUri
  }),
  audience: config.auth.audience,
  issuer: config.auth.issuer,
  algorithms: ['RS256']
});