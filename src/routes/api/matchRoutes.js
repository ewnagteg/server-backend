import express from 'express';
import { checkJwt } from '../../middleware/auth.js';
import * as matchController from '../../controllers/matchController.js';
import { checkApiKey } from '../../middleware/apiKey.js';

const router = express.Router();

router.get('/match/get/:matchId', checkJwt, matchController.getMatch);

router.get('/match/getall', checkJwt, matchController.getMatches);

// route for python to check if match was uploaded, doesnt need match info
router.get('/match/uploaded', checkApiKey, matchController.getMatchesData);

router.get('/match/getPlayer/:playerId', checkJwt, matchController.getPlayerMatches);

export default router;