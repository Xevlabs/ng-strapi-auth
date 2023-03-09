import { UserModel } from '../models';

export interface AuthResponseModel <T> {
  jwt: string,
  user: UserModel<T>
}
