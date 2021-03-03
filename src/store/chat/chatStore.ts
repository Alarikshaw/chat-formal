import type {
  LoginParams,
  GetUserInfoByUserIdModel,
  GetUserInfoByUserIdParams,
} from '/@/api/sys/model/userModel';
import store from '/@/store/index';
import io from 'socket.io-client';
import { setLocal, getLocal, setSession, getSession } from '/@/utils/helper/persistent';
import { CacheTypeEnum, USER_INFO_KEY, ROLES_KEY, TOKEN_KEY } from '/@/enums/cacheEnum';
import { useProjectSetting } from '/@/hooks/setting';
import { hotModuleUnregisterModule } from '/@/utils/helper/vuexHelper';
import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators';
import { userStore } from '../modules/user';

import { watch } from 'vue';
const NAME = 'chat';
hotModuleUnregisterModule(NAME);
import {
  SET_SOCKET,
  SET_DROPPED,
  SET_ACTIVE_GROUP_USER,
  ADD_GROUP_MESSAGE,
  ADD_FRIEND_MESSAGE,
  SET_FRIEND_MESSAGES,
  SET_GROUP_GATHER,
  SET_FRIEND_GATHER,
  SET_USER_GATHER,
  SET_ACTIVE_ROOM,
  DEL_GROUP,
  DEL_FRIEND,
  ADD_UNREAD_GATHER,
} from './mutation-types';
import { useMessage } from '/@/hooks/web/useMessage';
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
  /**
   * socket连接
   */
  @Action
  protected getSocketIO(): Promise<any> {
    let user = userStore.getUserInfoState;
    return new Promise((resolve) => {
      resolve(
        io.connect(`/?userId=${user.userId}`, {
          reconnection: true,
        })
      );
    });
  }
  /**
   * 初始化socket连接和监听socket事件
   */
  @Action
  async connectSocket() {
    let user = userStore.getUserInfoState;
    let socket = await this.getSocketIO();
    socket.on('connect', async () => {
      console.log('连接成功');

      // 获取聊天室所需所有信息
      socket.emit('chatData', user);

      // 先保存好socket对象
      console.log('socket', socket);
    });
    // 初始化事件监听
    socket.on('activeGroupUser', (data: any) => {
      console.log('activeGroupUser', data);
    });

    socket.on('addGroup', (res: ServerRes) => {
      console.log('on addGroup', res);
    });

    socket.on('joinGroup', async (res: ServerRes) => {
      console.log('on joinGroup', res);
    });

    socket.on('joinGroupSocket', (res: ServerRes) => {
      console.log('on joinGroupSocket', res);
    });

    socket.on('groupMessage', (res: ServerRes) => {
      console.log('on groupMessage', res);
    });

    socket.on('addFriend', (res: ServerRes) => {
      console.log('on addFriend', res);
    });

    socket.on('joinFriendSocket', (res: ServerRes) => {
      console.log('on joinFriendSocket', res);
    });

    socket.on('friendMessage', (res: ServerRes) => {
      console.log('on friendMessage', res);
    });

    socket.on('chatData', (res: ServerRes) => {
      const { createMessage } = useMessage();
      if (res.code) {
        return createMessage.error(res.msg);
      }
      console.log('on chatData', res);
    });

    socket.on('exitGroup', (res: ServerRes) => {
      console.log('on exitGroup', res);
    });

    socket.on('exitFriend', (res: ServerRes) => {
      console.log('on exitFriend', res);
    });
  }

  @Action
  async doPublicBank(groupName: string) {
    let socket = await this.getSocketIO();
    socket.emit('addGroup', {
      userId: userStore.getUserInfoState.userId,
      groupName: groupName,
      createTime: new Date().valueOf(),
    });
  }
}
export const chatStore = getModule<Chat>(Chat);
