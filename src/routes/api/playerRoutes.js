import express from 'express';
import { checkJwt } from '../../middleware/auth.js';
import { checkApiKey } from '../../middleware/apiKey.js';
import * as playerController from '../../controllers/playerController.js';

const router = express.Router();

router.post('/create-player', checkApiKey, playerController.createPlayer);

router.get('/players', checkJwt, playerController.getPlayers);

export default router;