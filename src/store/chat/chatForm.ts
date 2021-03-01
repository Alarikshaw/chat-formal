import type {
  LoginParams,
  GetUserInfoByUserIdModel,
  GetUserInfoByUserIdParams,
} from '/@/api/sys/model/userModel';
import store from '/@/store/index';
import { setLocal, getLocal, setSession, getSession } from '/@/utils/helper/persistent';
import { CacheTypeEnum, USER_INFO_KEY, ROLES_KEY, TOKEN_KEY } from '/@/enums/cacheEnum';
import { useProjectSetting } from '/@/hooks/setting';
import { VuexModule } from 'vuex-module-decorators';
import { hotModuleUnregisterModule } from '/@/utils/helper/vuexHelper';
import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators';
import { userStore } from '../modules/user';
const NAME = 'chat';
hotModuleUnregisterModule(NAME);

const { permissionCacheType } = useProjectSetting();
function setCache(USER_INFO_KEY: string, info: any) {
  if (!info) return;
  // const fn = permissionCacheType === CacheTypeEnum.LOCAL ? setLocal : setSession;
  setLocal(USER_INFO_KEY, info, true);
  // TODO
  setSession(USER_INFO_KEY, info, true);
}
function getCache<T>(key: string) {
  const fn = permissionCacheType === CacheTypeEnum.LOCAL ? getLocal : getSession;
  return fn(key) as T;
}
@Module({ namespaced: true, name: NAME, dynamic: true, store })
class Chat extends VuexModule {
  @Action
  async connectSocket(param: any) {
    let userInfo = userStore.getUserInfoState;
  }
}
