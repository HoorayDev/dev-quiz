export interface AuthClassInterface {
  generateUUIDv4(): string;
  verifyJWT(token: string): Promise<any>;
  signJWT(payload: any): string;
}
