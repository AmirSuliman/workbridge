import { AxiosResponse } from 'axios';

import type { Endpoints } from './api-spec';
import { EndpointOptions, EndpointProp } from './endpoints';

export type EndpointsConfig<Url extends keyof Endpoints> = EndpointOptions<
  Endpoints,
  Url
>;

export type EndpointResponseType<Url extends keyof Endpoints> = EndpointProp<
  Endpoints,
  Url,
  'response'
>;

export enum ErrorReason {
  /**
   *  Raised by access being revoked for unknown reason
   */
  'ACCESS_REVOKED' = 'ACCESS_REVOKED',
  /**
   * Token is missing, expired or malformeds
   */
  'TOKEN' = 'TOKEN',
  /**
   * Invalid credentials have been provided
   */
  'CREDENTIALS' = 'CREDENTIALS',
  /**
   * Some unexpected error
   */
  'UNEXPECTED' = 'UNEXPECTED',
  /**
   * Access revoked because user is blocked
   */
  'USER_BLOCKED' = 'USER_BLOCKED',
  /**
   * Access revoked because user is inactive
   */
  'USER_INACTIVE' = 'USER_INACTIVE',
}

export type ApiError = AxiosResponse<{
  $reason: ErrorReason | null;
  $success: boolean;
}>;
