export interface IAppError extends Error {
  message: string;
  statusCode: number;
  status: string;
}
