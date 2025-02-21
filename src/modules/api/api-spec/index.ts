import { EndpointProp } from '../endpoints';

import { MiscEndpoints } from './misc';

export type SuccessResponse = {
  $success: boolean;
};

/** Returned for many 4xx errors. */
export type ErrorResponseWithReason<Reason = string> = {
  $success: false;
  $reason: Reason;
};

/** Returned for '400 Bad Request' */
export type ErrorResponseWithErrors = {
  $success: false;
  $errors: string[];
};

export type Endpoints = MiscEndpoints;

export namespace EndpointData {
  export type Body<Url extends keyof Endpoints> = EndpointProp<
    Endpoints,
    Url,
    'body'
  >;
  export type Params<Url extends keyof Endpoints> = EndpointProp<
    Endpoints,
    Url,
    'params'
  >;

  export type Query<Url extends keyof Endpoints> = EndpointProp<
    Endpoints,
    Url,
    'query'
  >;

  export type Response<Url extends keyof Endpoints> = EndpointProp<
    Endpoints,
    Url,
    'response'
  >;
}
