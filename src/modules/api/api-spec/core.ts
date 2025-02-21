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
