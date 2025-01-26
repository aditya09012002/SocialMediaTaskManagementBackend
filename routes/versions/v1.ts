import HealthRoutes from '../../src/health/routes';
import UserRoutes from '../../src/User/routes';
import TaskRoutes from '../../src/task/routes';
import express from 'express';
const router = express.Router();

router.use('/status', HealthRoutes);
router.use('/user', UserRoutes);
router.use('/task', TaskRoutes);

export default router;
