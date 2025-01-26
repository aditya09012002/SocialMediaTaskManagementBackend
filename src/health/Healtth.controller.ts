import { Request, Response } from 'express';
import { HealthService } from './Health.service';

class HealthController {
  private healthService: HealthService;
  constructor() {
    this.healthService = new HealthService();
  }
  public healthCheck = (req: Request, res: Response): void => {
    const healthStatus = this.healthService.checkHealth();
    res.status(200).json(healthStatus);
  };
}

const healthControllerInstance = new HealthController();
export default healthControllerInstance;
