import express from 'express';
import multer from 'multer';
import multerOptions from '../common/multer_options';
import TaskController from './Task.controller';
import { deserializerMiddleware } from '../common/middlewares/deserializeToken';
import { JWTService } from '../common/Jwt.service';
const router = express.Router();

const upload = multer(multerOptions);

router.use(deserializerMiddleware(JWTService.getInstance()));
router.post(
  '/submit',
  upload.array('images'),
  TaskController.SubmitTaskController,
);

router.get(
  '/getAllTasks',
  (req, res, next) => {
    console.log(req.user);
    if (req.user.role !== 'admin') {
      throw new Error('UnAuthorized');
    }
    next();
  },
  TaskController.GetAllTaskController,
);

router.get('/getOwnTasks', TaskController.GetUserTasks);
export default router;
