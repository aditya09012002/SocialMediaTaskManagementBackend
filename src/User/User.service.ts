import { createResponse, IResponse } from '../types/GenericReponse';
import bcrypt from 'bcrypt';
import { UserModel } from './models/User.model';
import { JWTService } from '../common/Jwt.service';
import _ from 'lodash';

export class UserService {
  private jwtService: JWTService;

  constructor(jwtService: JWTService) {
    this.jwtService = jwtService;
  }

  public async registerUser(
    username: string,
    email: string,
    password: string,
    interests?: string[],
  ): Promise<IResponse> {
    try {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return createResponse(
          false,
          400,
          'User with this email already exists',
        );
      }
      const newUser = await UserModel.create({
        username,
        email,
        password,
        interests: interests || [],
      });

      // Can use lodash __.omit to exclude password from the response
      const cleanUser = _.omit(newUser.toObject(), ['password']);

      return createResponse(
        true,
        201,
        'User registered successfully',
        cleanUser,
      );
    } catch (error) {
      console.log(error);
      return createResponse(
        false,
        500,
        'Error registering user',
        error instanceof Error ? error.message : error,
      );
    }
  }

  public async loginUser(email: string, password: string): Promise<IResponse> {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return createResponse(false, 401, 'Invalid credentials');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return createResponse(false, 401, 'Invalid credentials');
      }

      const token = this.jwtService.generateToken({
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      });

      const cleanUser = _.omit(user.toObject(), ['password']);
      return createResponse(false, 200, 'User logged in successfully', {
        token,
        user: cleanUser,
      });
    } catch (error) {
      return createResponse(
        true,
        500,
        'Error logging in user',
        error instanceof Error ? error.message : error,
      );
    }
  }

  public async getUserById(userId: string): Promise<IResponse> {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return createResponse(false, 404, 'User not found');
      }
      const cleanUser = _.omit(user.toObject(), ['password']);
      return createResponse(false, 200, 'User found', cleanUser);
    } catch (error) {
      console.log(error);
      return createResponse(
        true,
        500,
        'Error getting user by id',
        error instanceof Error ? error.message : error,
      );
    }
  }
}
