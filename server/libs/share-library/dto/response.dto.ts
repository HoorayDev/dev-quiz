export interface ResponseDto<T> {
  statusCode: number;
  data: T;
}
