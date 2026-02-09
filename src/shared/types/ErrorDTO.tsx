export const DETAILS_TYPES = {
  DUPLICATE_SCHEDULE_NAME: "There already exists a schedule with name",
  DUPLICATE_SCHEDULE_TIME: "There already exists a schedule at time",
  DUPLICATE_POLICY_NAME: "There already exists a policy with name",
};

export const ERROR_TYPES = {
  ARGUMENT_EXCEPTION: "ArgumentException",
} as const;

export type ErrorType = (typeof ERROR_TYPES)[keyof typeof ERROR_TYPES];

export interface ErrorDTO {
  type: ErrorType;
  title: string;
  detail: string;
}
