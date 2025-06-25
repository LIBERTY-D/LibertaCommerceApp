export type ApiResponse<T> = {
  timeStamp: string;
  statusCode: number;
  status: string;
  message: string;
  data: T;
};

export type ApiResponseOrder<T> = {
  timeStamp: string;
  statusCode: number;
  status: string;
  message: string;
  results: T;
};