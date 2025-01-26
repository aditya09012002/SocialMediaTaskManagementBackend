import express from 'express';
const router = express.Router();
import UserController from './User.controller';
import { validateSchema } from '../common/middlewares/schemaValidators';
import { registerUserSchema } from './schema/registerUser.schema';
import { loginUserSchema } from './schema/loginUser.schema';
import { deserializerMiddleware } from '../common/middlewares/deserializeToken';
import { JWTService } from '../common/Jwt.service';

router.post(
  '/auth/register',
  validateSchema(registerUserSchema),
  UserController.registerUser,
);

router.post(
  '/auth/verify',
  deserializerMiddleware(JWTService.getInstance()),
  UserController.verifyToken,
);

router.post(
  '/auth/login',
  validateSchema(loginUserSchema),
  UserController.loginUser,
);
router.post('/auth/logout', UserController.logoutUser);

export default router;
