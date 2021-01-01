<template>
    <div>
        主体布局
        <button @click="handleLoginOut">退出</button>
    </div>
    <div class="chat">
        <div class="chat-form1">
            <ChatTool @logout="logout"></ChatTool>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { userStore } from '/@/store/modules/user';
import ChatTool from '/@/layouts/default/chatComponents/ChatTool.vue';
import background from '/@/assets/images/login/bannerimgs.jpg'
export default defineComponent ({
    components: {
        ChatTool
    },
    name: 'Chat',
    setup(){
        const logout = async () => {
            console.log('logout')
        }
        /**
         * 退出登录
         */
        function handleLoginOut() {
            userStore.confirmLoginOut();
        };

        return {
            logout,
            handleLoginOut,
            background
        }
    }
})
</script>
