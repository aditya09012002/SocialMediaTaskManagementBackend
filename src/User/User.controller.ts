import { Request, Response } from 'express';
import { UserService } from './User.service';
import { JWTService } from '../common/Jwt.service';
import { createResponse } from '../types/GenericReponse';

class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService(JWTService.getInstance());
  }

  public registerUser = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;

    const response = await this.userService.registerUser(
      username,
      email,
      password,
    );
    res.status(response.status).json(response);
  };

  public loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const response = await this.userService.loginUser(email, password);
    res.status(response.status).json(response);
  };

  public logoutUser = async (req: Request, res: Response): Promise<void> => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res
        .status(400)
        .json(createResponse(false, 400, 'Token is required for logout'));
    }

    res
      .status(200)
      .json(createResponse(true, 200, 'User logged out successfully'));
  };

  public verifyToken = async (req: Request, res: Response) => {
    const response = await this.userService.getUserById(req.user.id);
    res.status(200).json(response);
  };
}

const UserControllerInstance = new UserController();
export default UserControllerInstance;
