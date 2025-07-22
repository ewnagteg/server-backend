import express from 'express';
import { checkJwt } from '../../middleware/auth.js';
import * as matchController from '../../controllers/matchController.js';

const router = express.Router();

router.get('/match/get/:matchId', checkJwt, matchController.getMatch);

router.get('/match/getall', checkJwt, matchController.getMatches);

router.get('/match/getPlayer/:playerId', checkJwt, matchController.getPlayerMatches);

export default router;