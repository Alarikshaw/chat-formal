<template>
    <div class="tool">
        <div class="tool-avatar">
            <div
                class="tool-avatar-img"
                @click="showUserInfo()">
                <img src="" alt="">
            </div>
            <div class="tool-avatar-name">
                这是变量username
            </div>
        </div>
        <Tooltip
            placement="topLeft"
            arrow-point-at-center
            >
            <template v-slot:title>
                <div>请文明聊天</div>
                <div>截图粘贴可发送图片</div>
            </template>
        </Tooltip>
    </div>
</template>
<script lang="ts">
import {
    defineComponent,
    onMounted,
    onUpdated,
    onUnmounted,
    reactive
} from 'vue';
import {
    Tooltip
 } from 'ant-design-vue';
export default defineComponent({
    components: {
        Tooltip
    },
    setup() {
        const origin: any = {
            username: '',
            password: '',
            background: '',
            uploading: '',
            avatar: '',
            showUpload: false,
            showUserModal: false,
            showBackgroundModal: false,
        }
        const state = reactive(origin);
        const showUserInfo = (name) => {
            state.username = this.user.username;
            state.showUserModal = true;
        }
        onMounted(() => {
            console.log('mounted!')
        })
        onUpdated(() => {
            console.log('updated!')
        })
        onUnmounted(() => {
            console.log('unmounted!')
        })

        return {
            showUserInfo
        }
    }
})
</script>

<style scoped>

</style>
