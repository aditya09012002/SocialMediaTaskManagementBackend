import jwt from 'jsonwebtoken';

export class JWTService {
  private static instance: JWTService;
  private secretKey: string;
  private expiresIn: string;

  private constructor() {
    this.secretKey = process.env.JWT_SECRET_KEY || 'default-secret';
    this.expiresIn = process.env.JWT_EXPIRES_IN || '1h';
  }

  public static getInstance(): JWTService {
    if (!JWTService.instance) {
      JWTService.instance = new JWTService();
    }
    return JWTService.instance;
  }

  public generateToken(payload: object) {
    try {
      const token = jwt.sign(payload, this.secretKey, {
        expiresIn: this.expiresIn,
      });
      return token;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error generating token: ${error.message}`);
    }
  }

  public verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, this.secretKey);
      return decoded;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error verifying token: ${error.message}`);
    }
  }

  public decodeToken(token: string) {
    try {
      const decoded = jwt.decode(token);
      if (decoded) return decoded;
      return undefined;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error decoding token: ${error.message}`);
    }
  }
}
