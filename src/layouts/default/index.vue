<template>
  <!-- <div>
        主体布局
        <button @click="handleLoginOut">退出</button>
    </div> -->
  <div class="chat">
    <div class="chat-form1">
      <ChatTool @logout="handleLoginOut"></ChatTool>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { userStore } from '/@/store/modules/user';
import ChatTool from '/@/layouts/default/chatComponents/ChatTool.vue';
import background from '/@/assets/images/login/bannerimgs.jpg';
export default defineComponent({
  components: {
    ChatTool,
  },
  name: 'Chat',
  setup() {
    const logout = async () => {
      console.log('logout');
    };
    /**
     * 退出登录
     */
    function handleLoginOut() {
      userStore.confirmLoginOut();
    }

    return {
      logout,
      handleLoginOut,
      background,
    };
  },
});
</script>
<style lang="less" scoped>
.chat {
  font-size: 16px;
  z-index: 999;
  //   max-width: 1000px;
  min-width: 300px;
  width: 100%;
  height: 80%;
  max-height: 900px;
  min-height: 470px;
  position: relative;
  margin: auto 20px;
  box-shadow: 10px 20px 80px rgba(0, 0, 0, 0.8);
  display: flex;
  overflow: hidden;
  margin: 0;
  height: 100%;
  .chat-form1 {
    width: 100px;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.7);
  }
}
</style>
