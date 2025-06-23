import express from 'express';
import { checkJwt } from '../../middleware/auth.js';
import { checkApiKey } from '../../middleware/apiKey.js';
import * as playerStatsController from '../../controllers/playerStatsController.js';

const router = express.Router();

router.post('/log-player-stats', checkApiKey, playerStatsController.addPlayerStats);

router.get('/playersstatstable', checkApiKey, playerStatsController.getPlayerStatsTable);

router.get('/playerstats/:player', checkJwt, playerStatsController.getPlayerStats);

export default router;