import express from 'express';
const router = express.Router();
import healthController from './Healtth.controller';

router.get('/', healthController.healthCheck);

export default router;
