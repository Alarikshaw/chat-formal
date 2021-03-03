import { chatStore } from '/@/store/chat/chatStore';
import { userStore } from '/@/store/modules/user';
/**
 * socketio 操作
 */
export class SocketIoLink {
  static user: User = userStore.getUserInfoState;
  /**
   * 创建群
   */
  static async SocketAddGroup(groupName: string) {
    let socket = await chatStore.getSocketIO();
    console.log('user9789879----------', SocketIoLink.user);
    socket.emit('addGroup', {
      userId: SocketIoLink.user.userId,
      groupName: groupName,
      createTime: new Date().valueOf(),
    });
  }
}
