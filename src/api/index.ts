import { FetchPost } from '/@/api/services';
export async function GetRegister(param: UserRegister) {
  const URL = '/auth/register';
  return await FetchPost(URL, param);
}
