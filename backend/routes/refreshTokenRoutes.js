import express from 'express';
import { getNewAccessToken } from '../controllers/refreshTokenController.js';

const router = express.Router();

router.route('/').get(getNewAccessToken);

export default router; 