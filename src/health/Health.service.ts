import { createResponse, IResponse } from '../types/GenericReponse';
export class HealthService {
  public checkHealth(): IResponse {
    return createResponse(false, 200, 'Service is healthy :)');
  }
}
