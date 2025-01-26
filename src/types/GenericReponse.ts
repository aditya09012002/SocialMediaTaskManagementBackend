import { STATUS_CODES } from 'http';

export interface IResponse {
  error: boolean;
  status: number;
  message: string;
  statusCode: string;
  data?: unknown;
}

export function createResponse(
  error: boolean,
  status: number,
  message: string,
  data?: unknown,
): IResponse {
  if (status in STATUS_CODES) {
    return {
      error,
      status,
      message,
      statusCode: STATUS_CODES[status] || 'Unknown Status Code',
      data,
    };
  } else {
    throw new Error(`Invalid HTTP status code: ${status}`);
  }
}
