import { GetUserInfoByUserIdParams } from '/@/api/sys/model/userModel';
import { userStore } from '/@/store/modules/user';

export function getToken(): string {
  return userStore.getTokenState;
}

export function getTokenState(): GetUserInfoByUserIdParams {
  return userStore.getUserInfoState;
}
